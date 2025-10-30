import gsap from 'gsap'

export function animatePageExit(routerAction: () => void) {
	gsap.fromTo(
		'.gsap-page-transition',
		{ xPercent: -100, duration: 0.6, ease: 'power2.out' },
		{
			xPercent: 0,
			onComplete: () => {
				routerAction()
			},
		}
	)
	gsap.to('.gsap-page-wrapper', {
		xPercent: 50,
		duration: 0.5,
		ease: 'power2.out',
	})
}
