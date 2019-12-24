import React, { useRef } from 'react'
import useForm, { FormContext } from 'react-hook-form'

import ExpandingTextArea from '@common/components/ExpandingTextarea'
import PrimaryButton from '@common/components/PrimaryButton'

import ColorPicker, { COLORS } from './ColorPicker'
import MonacoEditor, { MonacoEditorType } from '@options/components/MonacoEditor'

export default function NewScript() {
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {
			color: COLORS[0],
		},
	})
	const { register, handleSubmit, errors, formState } = methods
	const disabled = !formState.isValid
	const monaco = useRef<MonacoEditorType>(null)

	const onSubmit = (data) => {
		// TODO - get monaco code and send to parent along with form data
		console.log(data)
	}

	return (
		<FormContext {...methods}>
			<div className="new-script">
				<h2 className="new-script__title">New script</h2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="new-script__name-wrapper">
						<div className="input-wrapper">
							<label className="input-label">Name</label>
							<input
								autoComplete="off"
								className={`input medium ${errors.name ? 'error' : ''}`}
								autoFocus
								name="name"
								type="text"
								ref={register({ required: true })}
							/>
						</div>

						<ColorPicker />
					</div>

					<div className="input-wrapper" style={{ marginTop: '2em' }}>
						<label>Description</label>
						<ExpandingTextArea name="description" register={register} />
					</div>

					<div className="new-script__monaco-wrapper">
						<MonacoEditor monacoRef={monaco} />
					</div>

					<PrimaryButton
						onClick={() => console.log('create')}
						disabled={disabled}
						style={{
							marginTop: '2em',
						}}
					>
						Submit
					</PrimaryButton>
				</form>
			</div>
		</FormContext>
	)
}
