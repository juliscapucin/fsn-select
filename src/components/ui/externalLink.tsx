import { IconArrowUpRight } from '../icons'

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	variant: 'primary' | 'secondary'
	classes?: string
}

export default function ExternalLink({
	variant,
	classes,
	...props
}: ExternalLinkProps) {
	return (
		<a
			className={`group flex gap-2 ${
				variant === 'primary' ? 'text-primary' : 'text-secondary'
			} ${classes}`}
			{...props}
			target='_blank'
			rel='noopener noreferrer'>
			<span className='underlined-link '>{props.children}</span>

			{/* ICON ARROW RIGHT UP */}
			<span className='overflow-clip relative inline-block'>
				<span
					className={`transition-all opacity-0 duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 inline-block ${
						variant === 'primary' ? 'text-primary' : 'text-secondary'
					}`}>
					<IconArrowUpRight
						color={
							variant === 'primary' ? 'white' : 'black'
						}></IconArrowUpRight>
				</span>
			</span>
		</a>
	)
}
