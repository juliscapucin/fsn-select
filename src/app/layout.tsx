import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { navLinks } from '@/lib/data'
import { Footer, Header } from '@/components'

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
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${font.variable} antialiased font-primary bg-primary`}>
				<Header navLinks={navLinks} />
				{children}
				<Footer />
			</body>
		</html>
	)
}
