'use client'

import { useRouter, usePathname } from 'next/navigation'

import { MenuMobile, NavLink } from '@/components/ui'
import { NavLink as NavLinkType } from '@/types/ui'
import { ThemeToggle } from '@/components'
import { useRef } from 'react'

type HeaderProps = {
	navLinks: NavLinkType[]
}

export default function Header({ navLinks }: HeaderProps) {
	const router = useRouter()
	const pathname = usePathname()

	const bottomBorderRef = useRef<HTMLDivElement>(null)
	const navbarRef = useRef<HTMLElement>(null)

	return (
		<header className='pointer-events-none fixed top-0 right-0 left-0 z-50'>
			<MenuMobile navLinks={navLinks} />
			<nav
				ref={navbarRef}
				className='pointer-events-auto relative mx-auto h-(--header-height) w-fit max-w-[--max-width] items-center justify-between gap-32 overflow-clip rounded-b-2xl bg-accent px-8 py-2 transition-[background-color] duration-800 md:hidden lg:flex'>
				{/* NAVLINKS */}
				<ul className='gap-8 lg:flex'>
					{/* START */}
					<NavLink
						label='Start'
						variant='primary'
						onClick={() => router.push('/')}
						disabled={pathname === '/'}
					/>
					{navLinks.map(
						(link, index) =>
							link.slug !== '/' && (
								<NavLink
									label={link.label}
									variant='primary'
									key={`panel-button-${index}`}
									onClick={() => router.push(link.slug)}
								/>
							)
					)}
					{/* BOTTOM BORDER */}
					<div
						ref={bottomBorderRef}
						className='pointer-events-none absolute bottom-1 left-0 z-50 h-2 w-full'
						aria-hidden='true'>
						<div className='h-[2px] bg-secondary'></div>
					</div>
				</ul>

				{/* THEME SWITCHER */}
				<ThemeToggle variant='toggle' />
			</nav>
		</header>
	)
}
