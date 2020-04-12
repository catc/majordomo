import React from 'react'
import { Field } from 'react-final-form'
import { validateName } from '../form/validate'
import Title from './Title'
import ExpandingTextArea from '@common/components/ExpandingTextarea'
import ColorPicker from './ColorPicker'
import AutorunForm from '../autorun-form'

interface Props {
	close: () => void
}

export default function TopBar({ close }: Props) {
	return (
		<div className="main-form__top-bar">
			{/* titles */}
			<Title close={close} />

			<div className="main-form__name-bar">
				{/* name */}
				<Field<string> name="name" validate={validateName}>
					{({ input, meta }) => (
						<div className="input-wrapper">
							<label className="input-label">Name</label>
							<input
								{...input}
								autoComplete="off"
								autoFocus
								className={`input medium ${
									meta.touched && meta.error ? 'error' : ''
								}`}
							/>
						</div>
					)}
				</Field>

				{/* auto run */}
				<AutorunForm />

				{/* color picker */}
				<Field name="color">
					{({ input }) => (
						<ColorPicker color={input.value} change={input.onChange} />
					)}
				</Field>
			</div>

			{/* description */}
			<Field<string> name="description">
				{({ input }) => (
					<div className="input-wrapper" style={{ marginTop: '2em' }}>
						<label>Description</label>
						<ExpandingTextArea {...input} />
					</div>
				)}
			</Field>
		</div>
	)
}
