import React, { useRef } from 'react'
import usePopup from '@common/components/Popup'

export const COLORS = [
	'#ffffff',
	'#ffeb3b',
	'#ff9800',
	'#f44336',
	'#4caf50',
	'#2196f3',
	'#673ab7',
	'#000',
]

type Props = {
	color: string
	change: (event: any) => void
}

export default function ColorPicker({ color, change }: Props) {
	const selectedContainer = useRef<HTMLDivElement>(null)

	const { open, close, isOpen, Popup } = usePopup()

	return (
		<div className="color-picker">
			<div className="input-wrapper color-picker__selected" ref={selectedContainer}>
				<label>Color</label>
				<div
					className="color-picker__selected-color"
					onClick={() => (isOpen ? close() : open())}
				>
					<span
						style={{
							background: color,
						}}
					/>
				</div>
			</div>

			<Popup className="color-picker__popup" highlightContent={[selectedContainer]}>
				<ul className="color-picker__colors">
					{COLORS.map(c => (
						<li
							className={color === c ? 'selected' : ''}
							key={c}
							onClick={() => {
								close()
								change(c)
							}}
						>
							<span style={{ background: c }} />
						</li>
					))}
				</ul>
			</Popup>
		</div>
	)
}
