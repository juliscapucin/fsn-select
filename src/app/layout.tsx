import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Load custom font //
const font = localFont({
	variable: '--font-pp-neue-corp',
	src: [
		{
			path: '../../public/fonts/PPNeueCorp-CompactMedium.otf',
		},
	],
})

export const metadata: Metadata = {
	title: 'FSN Select',
	description:
		'A curated selection of contemporary fashion and beauty imagery from Unsplash.',
}

export default function RootLayout({
	children,
	contact,
	about,
	gallery,
	grid,
	list,
}: Readonly<{
	children: React.ReactNode
	contact: React.ReactNode
	grid: React.ReactNode
	about: React.ReactNode
	gallery: React.ReactNode
	list: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${font.variable} antialiased font-primary bg-primary uppercase overflow-clip`}>
				{/* SKIP TO MAIN CONTENT LINK - for screen readers */}
				<a
					href='#main-content'
					className='fixed top-0 left-0 z-50 -translate-y-full bg-secondary text-primary px-4 py-2 underline focus:translate-y-0'>
					Skip to main content
				</a>

				{children}
				<div className='fixed inset-0'>{contact}</div>
				<div className='fixed inset-0'>{grid}</div>
				<div className='fixed inset-0'>{about}</div>
				<div className='fixed inset-0'>{gallery}</div>
				<div className='fixed inset-0'>{list}</div>
			</body>
		</html>
	)
}
