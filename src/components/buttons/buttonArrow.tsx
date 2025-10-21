import { IconArrow, IconArrowShort } from "@/components/icons"

interface ButtonArrowProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	classes?: string
	isShort?: boolean
}

export default function ButtonArrow({
	classes,
	isShort,
	...props
}: ButtonArrowProps) {
	return (
		<button
			className={`flex justify-center items-center opacity-30 hover:opacity-100 transition-opacity duration-300 ${classes || ""}`}
			{...props}>
			{isShort ? <IconArrowShort /> : <IconArrow />}
		</button>
	)
}
