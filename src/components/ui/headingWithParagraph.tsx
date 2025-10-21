import { ParagraphFeature } from '@/components/ui'

type HeadingWithParagraphProps = {
	title: string
	paragraphs: string[]
}

export default function HeadingWithParagraph({
	title,
	paragraphs,
}: HeadingWithParagraphProps) {
	return (
		<div>
			<h2 className='heading-display text-center'>{title}</h2>
			{paragraphs.map((paragraph, index) => (
				<ParagraphFeature key={index} variant='title'>
					{paragraph}
				</ParagraphFeature>
			))}
		</div>
	)
}
