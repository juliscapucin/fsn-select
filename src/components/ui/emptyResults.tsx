type EmptyResultsProps = {
	message: string
}

export default function EmptyResults({ message }: EmptyResultsProps) {
	return (
		<div className='flex items-center justify-center'>
			<p className='heading-headline'>{message}</p>
		</div>
	)
}
