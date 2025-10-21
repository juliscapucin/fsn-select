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
		<header className='pointer-events-none fixed top-0 right-0 left-0 z-30'>
			<MenuMobile navLinks={navLinks} />
			<div className='pointer-events-auto relative mx-auto h-header w-full container'>
				{/* LOGO */}
				<Link
					className='absolute left-0 top-0 bottom-0 z-30'
					onClick={(e) => {
						e.preventDefault()
						router.push('/')
					}}
					href='/'>
					<div className='-rotate-90 origin-bottom-left flex items-center gap-4 translate-y-[59vh] translate-x-[70px]'>
						<span className='heading-headline'>October – 2025</span>
						<Logo variant='secondary' />
					</div>
				</Link>

				{/* THEME SWITCHER */}
				<ThemeToggle variant='toggle' />

				{/* NAVIGATION */}
				<nav
					ref={navbarRef}
					className='w-full items-center justify-center gap-32 overflow-clip rounded-b-2xl bg-accent px-8 py-2 transition-[background-color] duration-800 md:hidden lg:flex'>
					{/* NAVLINKS */}
					<ul className='lg:flex lg:flex-col'>
						{navLinks.map(
							(link, index) =>
								link.slug !== '/' && (
									<Link
										className={`heading-title underlined-link uppercase ${
											pathname === link.slug
												? 'underline pointer-events-none'
												: ''
										}`}
										key={`panel-button-${index}`}
										onClick={(e) => {
											e.preventDefault()
											router.push(link.slug)
										}}
										href={link.slug}>
										{pathname === link.slug && <span>{'[->] '}</span>}
										{link.label}
									</Link>
								)
						)}
					</ul>
				</nav>
			</div>
		</header>
	)
}
