'use client'

import { useRef } from 'react'
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

	return (
		navLinks && (
			<header className='fixed top-2 right-0 left-0 z-40 pointer-events-none block h-dvh lg:hidden'>
				<div className='z-40 pointer-events-auto absolute top-0 flex w-full items-center justify-end pr-4'>
					{/* BURGER BUTTON */}
					<ButtonBurger
						onClick={() => {
							if (mobileMenuRef.current) {
								animateMobileMenu(mobileMenuRef.current)
							}
						}}
					/>
				</div>

				{/* EXPANDED MENU */}
				<aside
					className='z-50 pointer-events-auto fixed top-0 min-h-svh w-full -translate-y-[120%] bg-primary transition-transform duration-300'
					ref={mobileMenuRef}>
					<div className='absolute top-4 right-4 z-100'>
						{/* CLOSE BUTTON */}
						<ButtonClose
							onClick={() => {
								if (mobileMenuRef.current) {
									animateMobileMenu(mobileMenuRef.current)
								}
							}}
						/>
					</div>

					{/* NAV LINKS */}
					<nav className='flex h-screen flex-col items-center justify-center gap-8'>
						{navLinks.map((link) => {
							return (
								<div
									className='relative flex w-full justify-center'
									key={link.slug}>
									<button
										className='block font-primary disabled:opacity-30'
										onClick={() =>
											animateMobileMenu(mobileMenuRef.current, () => {
												router.push(`${link.slug}`)
											})
										}
										disabled={
											(link.slug === '/' && pathname === '/') ||
											(link.slug !== '/' && pathname.includes(`${link.slug}`))
										}>
										<span className='font-headline text-headline-medium text-secondary uppercase sm:text-headline-large'>
											{link.label}
										</span>
									</button>
								</div>
							)
						})}
					</nav>
				</aside>
			</header>
		)
	)
}
