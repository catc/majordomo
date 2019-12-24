import React from 'react'

type Props = {
	children: React.ReactElement | string
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	style?: any
	disabled?: boolean
}

export default function ButtonPrimary({
	children,
	onClick,
	style = {},
	disabled = false,
}: Props) {
	return (
		<button
			className="button-primary"
			onClick={onClick}
			style={style}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
