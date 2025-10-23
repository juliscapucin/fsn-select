import { ImagesPage, PageWrapper } from '@/components'

export default async function Home() {
	return (
		<PageWrapper variant='primary'>
			<ImagesPage variant='grid' />
		</PageWrapper>
	)
}
