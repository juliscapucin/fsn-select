import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import InertiaPlugin from 'gsap/InertiaPlugin'

gsap.registerPlugin(InertiaPlugin, Draggable)

type CarouselConfig = {
	paused?: boolean
	paddingRight?: number
	draggable?: boolean
	repeat?: number
	reversed?: boolean
	center?: boolean | Element | Element[]
	speed?: number
	snap?: boolean | number | ((value: number) => number)
	onChange?: (element: Element, index: number) => void
}

type TweenVars = gsap.TweenVars

interface LoopTimeline extends gsap.core.Timeline {
	toIndex: (
		index: number,
		vars?: TweenVars
	) => gsap.core.Tween | gsap.core.Timeline
	next: (vars?: TweenVars) => gsap.core.Tween | gsap.core.Timeline
	previous: (vars?: TweenVars) => gsap.core.Tween | gsap.core.Timeline
	current: () => number
	times: number[]
	draggable?: Draggable
	closestIndex: (setCurrent?: boolean) => number
}

export function carouselLoop(
	items: Element[],
	config: CarouselConfig,
	wrapper: HTMLElement
): LoopTimeline {
	const onChange = config.onChange
	let lastIndex = 0

	const tl = gsap.timeline({
		repeat: config.repeat,
		paused: config.paused,
		defaults: { ease: 'none' },
		onUpdate:
			onChange &&
			function () {
				const i = (tl as LoopTimeline).closestIndex()
				if (lastIndex !== i) {
					lastIndex = i
					onChange(items[i], i)
				}
			},
		onReverseComplete: () => {
			tl.totalTime(tl.rawTime() + tl.duration() * 100)
		},
	}) as LoopTimeline

	const length = items.length
	const startX = items[0].getBoundingClientRect().left + wrapper.scrollLeft
	const times: number[] = []
	const widths: number[] = []
	const spaceBefore: number[] = []
	const xPercents: number[] = []
	let curIndex = 0
	let indexIsDirty = false
	const center = config.center
	const pixelsPerSecond = (config.speed || 1) * 100
	const snap =
		config.snap === false
			? (v: number) => v
			: gsap.utils.snap(typeof config.snap === 'number' ? config.snap : 1)

	let timeOffset = 0
	const container =
		center === true
			? wrapper
			: (center ? (gsap.utils.toArray(center)[0] as HTMLElement) : null) ||
			  wrapper

	const getTotalWidth = () =>
		items[length - 1].getBoundingClientRect().left +
		(xPercents[length - 1] / 100) * widths[length - 1] -
		startX +
		spaceBefore[0] +
		items[length - 1].getBoundingClientRect().width *
			Number(gsap.getProperty(items[length - 1], 'scaleX')) +
		(config.paddingRight || 0)

	const populateWidths = () => {
		let b1 = container.getBoundingClientRect()
		let b2: DOMRect
		items.forEach((el, i) => {
			widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string)
			xPercents[i] = snap(
				(parseFloat(gsap.getProperty(el, 'x', 'px') as string) / widths[i]) *
					100 +
					Number(gsap.getProperty(el, 'xPercent'))
			)
			b2 = el.getBoundingClientRect()
			spaceBefore[i] = b2.left - (i ? b1.right : b1.left)
			b1 = b2
		})
		gsap.set(items, {
			xPercent: (i: number) => xPercents[i],
		})
		totalWidth = getTotalWidth()
	}

	const getClosest = (values: number[], value: number, wrap: number) => {
		let i = values.length,
			closest = 1e10,
			index = 0,
			d: number
		while (i--) {
			d = Math.abs(values[i] - value)
			if (d > wrap / 2) d = wrap - d
			if (d < closest) {
				closest = d
				index = i
			}
		}
		return index
	}

	let timeWrap: (value: number) => number
	let totalWidth: number
	let proxy: HTMLDivElement

	const populateTimeline = () => {
		let i, item, curX, distanceToStart, distanceToLoop
		tl.clear()
		for (i = 0; i < length; i++) {
			item = items[i]
			curX = (xPercents[i] / 100) * widths[i]
			distanceToStart =
				item.getBoundingClientRect().left + curX - startX + spaceBefore[0]
			distanceToLoop =
				distanceToStart + widths[i] * Number(gsap.getProperty(item, 'scaleX'))

			tl.to(
				item,
				{
					xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
					duration: distanceToLoop / pixelsPerSecond,
				},
				0
			)
				.fromTo(
					item,
					{
						xPercent: snap(
							((curX - distanceToLoop + totalWidth) / widths[i]) * 100
						),
					},
					{
						xPercent: xPercents[i],
						duration:
							(curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
						immediateRender: false,
					},
					distanceToLoop / pixelsPerSecond
				)
				.add('label' + i, distanceToStart / pixelsPerSecond)
			times[i] = distanceToStart / pixelsPerSecond
		}
		timeWrap = gsap.utils.wrap(0, tl.duration())
	}

	const populateOffsets = () => {
		timeOffset = center
			? (tl.duration() * container.offsetWidth) / 2 / totalWidth
			: 0
		if (center) {
			times.forEach((t, i) => {
				times[i] = timeWrap(
					tl.labels['label' + i] +
						(tl.duration() * widths[i]) / 2 / totalWidth -
						timeOffset
				)
			})
		}
	}

	const refresh = (deep = false) => {
		const progress = tl.progress()
		tl.progress(0, true)
		populateWidths()
		if (deep) populateTimeline()
		populateOffsets()
		if (deep && tl.draggable) {
			tl.time(times[curIndex], true)
		} else {
			tl.progress(progress, true)
		}
	}

	gsap.set(items, { x: 0 })
	populateWidths()
	populateTimeline()
	populateOffsets()
	window.addEventListener('resize', () => refresh(true))

	const toIndex = (index: number, vars: TweenVars = {}) => {
		if (Math.abs(index - curIndex) > length / 2) {
			index += index > curIndex ? -length : length
		}
		const newIndex = gsap.utils.wrap(0, length, index)
		let time = times[newIndex]
		if (time > tl.time() !== index > curIndex && index !== curIndex) {
			time += tl.duration() * (index > curIndex ? 1 : -1)
		}
		if (time < 0 || time > tl.duration()) {
			vars.modifiers = { time: timeWrap }
		}
		curIndex = newIndex
		vars.overwrite = true
		gsap.killTweensOf(proxy)

		return vars.duration === 0
			? tl.time(timeWrap(time))
			: tl.tweenTo(time, vars)
	}

	tl.toIndex = (index, vars) => {
		syncIndex()
		return toIndex(index, vars)
	}
	tl.closestIndex = (setCurrent = false) => {
		const index = getClosest(times, tl.time(), tl.duration())
		if (setCurrent) {
			curIndex = index
			indexIsDirty = false
		}
		return index
	}
	tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex)
	tl.next = (vars) => {
		return toIndex(tl.current() + 1, vars)
	}
	tl.previous = (vars) => toIndex(tl.current() - 1, vars)
	tl.times = times
	tl.progress(1, true).progress(0, true)

	if (config.reversed) {
		tl.vars.onReverseComplete?.()
		tl.reverse()
	}

	const syncIndex = () => {
		const index = tl.closestIndex(true)
		curIndex = index
	}

	if (config.draggable && typeof Draggable === 'function') {
		proxy = document.createElement('div')
		const wrap = gsap.utils.wrap(0, 1)
		let ratio: number, startProgress: number
		let lastSnap: number, initChangeX: number
		const align = () => {
			tl.progress(
				wrap(startProgress + (draggable.startX - draggable.x) * ratio)
			)
		}

		const draggable = Draggable.create(proxy, {
			trigger: wrapper,
			type: 'x',
			lockAxis: true,
			onPressInit() {
				const x = this.x
				gsap.killTweensOf(tl)
				startProgress = tl.progress()
				refresh()
				ratio = 1 / totalWidth
				initChangeX = startProgress / -ratio - x
				gsap.set(proxy, { x: startProgress / -ratio })
			},
			onDrag: align,
			onThrowUpdate: align,
			overshootTolerance: 0,
			inertia: true,
			snap(value) {
				//note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back

				if (Math.abs(startProgress / -ratio - this.x) < 10) {
					return lastSnap + initChangeX
				}
				const time = -(value * ratio) * tl.duration()
				const wrappedTime = timeWrap(time)
				const snapTime = times[getClosest(times, wrappedTime, tl.duration())]
				let dif = snapTime - wrappedTime
				if (Math.abs(dif) > tl.duration() / 2) {
					dif += dif < 0 ? tl.duration() : -tl.duration()
				}
				lastSnap = (time + dif) / tl.duration() / -ratio

				return lastSnap
			},
			onRelease() {
				syncIndex()
				if (draggable.isThrowing) indexIsDirty = true
			},
			onThrowComplete: syncIndex,
		})[0]

		tl.draggable = draggable
	}

	tl.closestIndex(true)
	lastIndex = curIndex
	onChange?.(items[curIndex], curIndex)

	return tl
}
