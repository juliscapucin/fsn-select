import gsap from 'gsap'

let transitionOverlayRef: HTMLElement | null = null
let pageWrapperRef: HTMLElement | null = null

// Function to register the refs coming from PageWrapper component
export const registerTransitionRefs = (el1: HTMLElement, el2: HTMLElement) => {
	transitionOverlayRef = el1
	pageWrapperRef = el2
}

// Function to animate page exit used in link components
export function animatePageExit(routerAction: () => void) {
	if (!transitionOverlayRef || !pageWrapperRef) return

	gsap.fromTo(
		transitionOverlayRef,
		{ xPercent: -100, duration: 0.6, ease: 'power2.out' },
		{
			xPercent: 0,
			onComplete: () => {
				routerAction()
			},
		}
	)
	gsap.to(pageWrapperRef, {
		xPercent: 50,
		duration: 0.5,
		ease: 'power2.out',
	})
}
