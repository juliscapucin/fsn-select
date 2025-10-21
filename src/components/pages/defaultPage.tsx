import { PageWrapper } from '@/components/ui'

type DefaultPageProps = {
	title: string
	children?: React.ReactNode
}

export default function DefaultPage({ title, children }: DefaultPageProps) {
	return (
		<PageWrapper>
			<h1 className='heading-display mb-8 mt-32'>{title}</h1>
			{children}
		</PageWrapper>
	)
}
