'use client'

import { useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/dist/client/link'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { animatePageExit } from '@/lib/animations'
import { MenuMobile, Logo } from '@/components/ui'
import { navLinks } from '@/lib/data'

type HeaderProps = {
	variant?: 'primary' | 'secondary'
}

export default function Header({ variant }: HeaderProps) {
	const router = useRouter()
	const pathname = usePathname()

	const navbarRef = useRef<HTMLElement>(null)

	const headerContainerRef = useRef<HTMLDivElement>(null)
	const headerContentRef = useRef<HTMLAnchorElement>(null)

	return (
		<>
			<MenuMobile navLinks={navLinks} />

			{/* HEADER DESKTOP */}
			<header
				className={`pointer-events-none fixed top-2 right-0 left-0 ${
					variant === 'primary' ? 'text-primary' : 'text-secondary'
				} z-50`}>
				<div
					ref={headerContainerRef}
					className='mx-auto h-full w-full container flex items-start justify-end'>
					{/* VERTICAL HEADER */}
					<Link
						ref={headerContentRef}
						className='pointer-events-auto absolute left-0 top-0 bottom-0 -translate-x-full origin-top-right -rotate-90'
						onClick={(e) => {
							e.preventDefault()
							animatePageExit(() => router.push('/'))
						}}
						href='/'>
						<div className='flex items-end gap-8 h-10'>
							{/* DATE */}
							<div className='h-8 overflow-clip flex items-center min-w-fit'>
								<span className='heading-title leading-none'>
									{new Date().toLocaleString('default', { month: 'long' })}
									&mdash;{new Date().getFullYear()}
								</span>
							</div>
							{/* LOGO */}
							<Logo variant={variant === 'primary' ? 'primary' : 'secondary'} />
						</div>
					</Link>
				</div>
			</header>

			{/* NAVIGATION DESKTOP */}
			<nav
				ref={navbarRef}
				className={`fixed top-0 right-0 w-fit items-center justify-center gap-32 overflow-clip px-2 py-2 transition-[background-color] duration-800 hidden md:flex z-50 ${
					variant === 'primary' ? 'text-primary' : 'text-secondary'
				}`}>
				{/* NAVLINKS */}
				<ul className='flex flex-col'>
					{navLinks.map(
						(link, index) =>
							link.slug !== '/' && (
								<li key={`panel-button-${index}`}>
									<Link
										className={`text-link-lg navlink uppercase ${
											pathname === link.slug ? 'pointer-events-none' : ''
										}`}
										onClick={(e) => {
											e.preventDefault()
											animatePageExit(() => router.push(`/${link.slug}`))
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
								</li>
							)
					)}
				</ul>
			</nav>
		</>
	)
}
