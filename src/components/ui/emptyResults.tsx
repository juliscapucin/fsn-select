import { PageWrapper } from '@/components'

type EmptyResultsProps = {
	message: string
}

export default function EmptyResults({ message }: EmptyResultsProps) {
	// split message into multiple lines if it contains periods
	const lines = message
		.split('. ')
		.filter((line) => line.trim() !== '')
		.map((line, index, array) => (index < array.length - 1 ? line + '.' : line))

	return (
		<PageWrapper
			variant='secondary'
			hasContainer={false}
			classes='flex flex-col items-center justify-center h-svh'>
			<h1 className='heading-headline text-center text-pretty'>{lines[0]}</h1>
			<div className='max-w-prose'>
				{lines.length > 1 &&
					lines.slice(1).map((line, index) => (
						<p key={index} className='mt-4 text-pretty text-center mb-2'>
							{line}
						</p>
					))}
			</div>
		</PageWrapper>
	)
}
