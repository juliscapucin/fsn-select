import Image from 'next/image'

export default function Home() {
	return (
		<main>
			<h1 className='heading-display'>Welcome to My Website</h1>
			<p>
				This is a simple Next.js application.{' '}
				<a className='underlined-link' href='#'>
					This is a link
				</a>
			</p>
			<Image
				src='/path/to/image.jpg'
				alt='Description of image'
				width={500}
				height={300}
			/>
		</main>
	)
}
