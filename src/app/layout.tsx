import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { getFashionBeautyTopicPhotos } from '@/queries'
import handleError from '@/lib/handleError'

let introPhotos: string[] = []
let errorState: {
	type: 'not_found' | 'api_error' | 'network_error' | 'rate_limit'
	message: string
} | null = null

import { Intro } from '@/components'

try {
	introPhotos = await getFashionBeautyTopicPhotos({
		page: 1,
		per_page: 10,
	}).then((photos) => photos.map((photo) => photo.urls.small))
} catch (error) {
	console.error('Error fetching intro photos:', error)
	errorState = handleError(error)
}

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
	title: 'FSN Talent',
	description:
		'A curated selection of contemporary fashion and beauty imagery from Unsplash.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='overflow-hidden gutter-stable bg-secondary'>
			<body
				className={`${font.variable} antialiased font-primary uppercase text-secondary`}>
				{/* SKIP TO MAIN CONTENT LINK - for screen readers */}
				<a
					href='#main-content'
					className='fixed top-0 left-0 z-50 -translate-y-full bg-secondary text-primary px-4 py-2 underline focus:translate-y-0'>
					Skip to main content
				</a>
				{introPhotos.length > 0 && !errorState && (
					<Intro photos={introPhotos} />
				)}

				{children}
			</body>
		</html>
	)
}
