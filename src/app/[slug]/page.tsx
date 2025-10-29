import { notFound } from 'next/navigation'

import { ImagesPageServer } from '@/components'

import { navLinks } from '@/lib/data'

// Return a list of `params` to populate the [artist] dynamic segment
export async function generateStaticParams() {
	try {
		// exclude home & get first 3 nav link pages
		const imagePages = navLinks.slice(1, 4)

		return imagePages.map((page) => ({
			page: page.slug.replace('/', ''),
		}))
	} catch (error) {
		console.error('Error generating static params:', error)
	}
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: 'grid' | 'list' | 'artists' | 'gallery' }>
}) {
	const { slug } = await params

	// throw error if slug is not in navLinks
	const imagePages = navLinks.slice(1, 4)

	const validImagePages = imagePages.map((page) => ({
		page: page.slug.replace('/', ''),
	}))

	// Check if the slug is valid + add 'artists' as a valid page
	if (
		slug !== 'artists' &&
		!validImagePages.some((page) => page.page === slug)
	) {
		return notFound()
	}

	return <ImagesPageServer variant={slug === 'artists' ? 'list' : slug} />
}
