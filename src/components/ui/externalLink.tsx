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
		<div className='group flex gap-2'>
			<a
				className={`underlined-link ${
					variant === 'primary' ? 'text-primary' : 'text-secondary'
				} ${classes}`}
				{...props}
				target='_blank'
				rel='noopener noreferrer'>
				{props.children}
			</a>
			{/* ICON ARROW RIGHT UP */}
			<div className='overflow-clip relative inline-block'>
				<div className='translate-y-1/2 group-hover:translate-x-full transition-transform duration-300 group-hover:translate-y-0'>
					<div
						className={`w-4 h-5 overflow-clip ${
							variant === 'primary' ? 'text-primary' : 'text-secondary'
						}`}>
						<IconArrowUpRight
							color={
								variant === 'primary' ? 'white' : 'black'
							}></IconArrowUpRight>
					</div>
					<div
						className={`w-4 h-5 overflow-clip -translate-x-full ${
							variant === 'primary' ? 'text-primary' : 'text-secondary'
						}`}>
						<IconArrowUpRight
							color={
								variant === 'primary' ? 'white' : 'black'
							}></IconArrowUpRight>
					</div>
				</div>
			</div>
		</div>
	)
}
