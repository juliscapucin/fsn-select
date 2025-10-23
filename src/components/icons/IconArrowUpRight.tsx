type IconArrowProps = {
	color?: string
}

export default function IconArrowUpRight({ color }: IconArrowProps) {
	return (
		<svg
			width='17'
			height='15'
			viewBox='0 0 17 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M13 4H4V2H13V4Z'
				fill={color}
			/>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M11 11L11 2L13 2L13 11L11 11Z'
				fill={color}
			/>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M12.8574 3.6198L2.06066 14.4166L0.644104 13L11.4409 2.20324L12.8574 3.6198Z'
				fill={color}
			/>
		</svg>
	)
}
