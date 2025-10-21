'use client'

import { useRouter, usePathname } from 'next/navigation'

import { MenuMobile } from '@/components/ui'
import { NavLink as NavLinkType } from '@/types/ui'
import { ThemeToggle } from '@/components'
import { useRef } from 'react'
import Link from 'next/dist/client/link'
import Logo from './logo'

type HeaderProps = {
	navLinks: NavLinkType[]
}

export default function Header({ navLinks }: HeaderProps) {
	const router = useRouter()
	const pathname = usePathname()

	const navbarRef = useRef<HTMLElement>(null)

	return (
		<header className='pointer-events-none fixed top-0 right-0 left-0 z-50'>
			<MenuMobile navLinks={navLinks} />
			{/* START */}
			<Link
				className='absolute left-0 top-0'
				onClick={(e) => {
					e.preventDefault()
					router.push('/')
				}}
				href='/'>
				<Logo variant='secondary' />
			</Link>
			<nav
				ref={navbarRef}
				className='pointer-events-auto relative mx-auto h-(--header-height) w-fit max-w-[--max-width] items-center justify-between gap-32 overflow-clip rounded-b-2xl bg-accent px-8 py-2 transition-[background-color] duration-800 md:hidden lg:flex'>
				{/* NAVLINKS */}
				<ul className='gap-8 lg:flex'>
					{navLinks.map(
						(link, index) =>
							link.slug !== '/' && (
								<Link
									className={`underlined-link uppercase ${
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
									{link.label}
								</Link>
							)
					)}
				</ul>

				{/* THEME SWITCHER */}
				<ThemeToggle variant='toggle' />
			</nav>
		</header>
	)
}
