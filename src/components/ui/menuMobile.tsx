'use client'

import { useRef, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { ButtonBurger, ButtonClose } from '@/components/buttons'

import type { NavLink } from '@/types/ui'

type NavLinksProps = {
	navLinks: NavLink[]
}

const animateMobileMenu = (
	el: HTMLElement | null,
	routerAction?: () => void
) => {
	if (!el) return
	if (el.classList.contains('opacity-0')) el.classList.remove('opacity-y-0')

	el.classList.toggle('-translate-y-[120%]')

	if (routerAction) {
		routerAction()
	}
}

export default function MenuMobile({ navLinks }: NavLinksProps) {
	const mobileMenuRef = useRef(null)
	const pathname = usePathname()
	const router = useRouter()

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = (routerAction?: () => void) => {
		setIsMenuOpen(!isMenuOpen)

		animateMobileMenu(
			mobileMenuRef.current,
			routerAction ? routerAction : undefined
		)
	}

	// Handle escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isMenuOpen) {
				toggleMenu()
			}
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isMenuOpen])

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isMenuOpen])

	return (
		navLinks && (
			<>
				{/* BURGER BUTTON - Outside header for blend mode */}
				<ButtonBurger
					className='z-40 pointer-events-auto fixed top-0 flex w-full items-center justify-end pr-4 mix-blend-exclusion md:hidden'
					onClick={() => toggleMenu()}
					aria-expanded={isMenuOpen}
					aria-controls='mobile-menu'
					aria-label={'Open navigation menu'}
				/>
				<header className='fixed top-2 right-0 left-0 z-40 pointer-events-none block h-dvh md:hidden'>
					{/* EXPANDED MENU */}
					<aside
						className='z-50 pointer-events-auto fixed top-0 min-h-svh w-full -translate-y-[120%] bg-secondary transition-transform duration-300'
						ref={mobileMenuRef}
						role='dialog'
						aria-modal='true'
						aria-labelledby='mobile-menu-title'>
						<div className='absolute top-4 right-4 z-100'>
							{/* CLOSE BUTTON */}
							<ButtonClose
								aria-label='Close navigation menu'
								onClick={() => toggleMenu()}
							/>
						</div>

						{/* SCREEN READER TITLE */}
						<h2 id='mobile-menu-title' className='sr-only'>
							Navigation Menu
						</h2>

						{/* NAV LINKS */}
						<nav
							aria-label='Navigation'
							className='flex h-screen flex-col items-center justify-center gap-8'>
							{navLinks.map((link) => {
								const isCurrentPage =
									(link.slug === '/' && pathname === '/') ||
									(link.slug !== '/' && pathname.includes(`${link.slug}`))

								return (
									<div
										className='relative flex w-full justify-center'
										key={link.slug}>
										<button
											className='block font-primary disabled:opacity-40'
											onClick={() =>
												toggleMenu(() => {
													router.push(`${link.slug}`)
												})
											}
											disabled={isCurrentPage}
											aria-current={isCurrentPage ? 'page' : undefined}
											tabIndex={isMenuOpen ? 0 : -1}>
											<span className='heading-display text-primary md:text-secondary uppercase'>
												{link.label}
											</span>
										</button>
									</div>
								)
							})}
						</nav>
					</aside>
				</header>
			</>
		)
	)
}
