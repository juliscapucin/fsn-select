import { ImagesPage } from '@/components'

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
		// Return empty array if there's an error
		return []
	}
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: 'grid' | 'index' | 'gallery' }>
}) {
	const { slug } = await params

	return <ImagesPage variant={slug} />
}
