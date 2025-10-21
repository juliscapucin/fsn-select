'use client'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	classes?: string
	children?: React.ReactNode
}

const CustomButton = ({ classes, children, ...props }: ButtonProps) => {
	return (
		<button className={`pointer-events-auto ${classes || ''}`} {...props}>
			{children}
		</button>
	)
}

export default CustomButton
