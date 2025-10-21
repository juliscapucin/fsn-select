'use client'

import { useRouter, usePathname } from 'next/navigation'

import { MenuMobile } from '@/components/ui'
import { NavLink as NavLinkType } from '@/types/ui'
import { ThemeToggle, Logo } from '@/components'
import { useRef } from 'react'
import Link from 'next/dist/client/link'

type HeaderProps = {
	navLinks: NavLinkType[]
}

export default function Header({ navLinks }: HeaderProps) {
	const router = useRouter()
	const pathname = usePathname()

	const navbarRef = useRef<HTMLElement>(null)

	return (
		<header className='pointer-events-none fixed top-2 right-0 left-0 z-30'>
			<MenuMobile navLinks={navLinks} />
			<div className='pointer-events-auto relative mx-auto h-header w-full container flex items-start justify-end'>
				{/* LOGO */}
				<Link
					className='absolute left-0 top-0 bottom-0'
					onClick={(e) => {
						e.preventDefault()
						router.push('/')
					}}
					href='/'>
					<div className='-rotate-90 origin-bottom-left flex items-center gap-4 translate-y-[59vh] translate-x-[70px]'>
						<span className='heading-title'>October – 2025</span>
						<Logo variant='secondary' />
					</div>
				</Link>

				{/* NAVIGATION */}
				<nav
					ref={navbarRef}
					className='w-fit items-center justify-center gap-32 overflow-clip px-8 py-2 transition-[background-color] duration-800 md:hidden lg:flex'>
					{/* NAVLINKS */}
					<ul className='flex flex-col'>
						{navLinks.map(
							(link, index) =>
								link.slug !== '/' && (
									<Link
										className={`text-navlink text-navlink uppercase ${
											pathname === link.slug ? 'pointer-events-none' : ''
										}`}
										key={`panel-button-${index}`}
										onClick={(e) => {
											e.preventDefault()
											router.push(link.slug)
										}}
										href={link.slug}>
										<span
											className={`${
												pathname === link.slug ? 'opacity-100' : 'opacity-0'
											}`}>
											{'[->] '}
										</span>
										<span className='underlined-link'>{link.label}</span>
									</Link>
								)
						)}
					</ul>
				</nav>
			</div>
		</header>
	)
}
