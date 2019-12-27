import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
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

export default function ColorPicker() {
	const { register, setValue, watch } = useFormContext()

	const color = watch('color')
	const selectedContainer = useRef<HTMLDivElement>(null)

	const { open, close, isOpen, Popup } = usePopup()

	return (
		<div className="color-picker">
			<input name="color" hidden type="text" ref={register} />

			<div className="input-wrapper color-picker__selected" ref={selectedContainer}>
				<label>Tag Color</label>
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
					{COLORS.map((c) => (
						<li
							className={color === c ? 'selected' : ''}
							key={c}
							onClick={() => {
								close()
								setValue('color', c)
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
