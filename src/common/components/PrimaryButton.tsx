import React from 'react'

type Props = {
	type?: 'submit' | 'button'
	children: React.ReactNode
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	style?: any
	disabled?: boolean
	icon?: 'icon' | 'with-text' | null
}

export default function ButtonPrimary({
	type = 'button',
	children,
	onClick,
	style = {},
	disabled = false,
	icon = null,
}: Props) {
	let classes = 'button-primary'
	// filthy, do something better
	if (icon) {
		classes += icon === 'icon' ? ' icon' : ' icon-with-text'
	}
	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			style={style}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
