import { ImagesPageServer, PageWrapper } from '@/components'

export default async function Home() {
	return (
		<PageWrapper variant='primary'>
			<ImagesPageServer variant='grid' />
		</PageWrapper>
	)
}
