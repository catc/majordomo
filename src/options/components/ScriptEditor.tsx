import React, { useRef } from 'react'
import useForm, { FormContext } from 'react-hook-form'
import ExpandingTextArea from '@common/components/ExpandingTextarea'
import PrimaryButton from '@common/components/PrimaryButton'
import { ScriptDraft, Script } from '@common/types/scripts'

import ColorPicker, { COLORS } from './ColorPicker'
import MonacoEditor, { MonacoEditorType } from '@options/components/MonacoEditor'
import DeleteButton from './DeleteButton'

type FormData = {
	name: string
	color: string
	description: string
}

type Props = {
	currentScript: null | Script
	save: (d: ScriptDraft) => void
}

const formDefaults = {
	color: COLORS[0],
	description: '',
	name: '',
}

export default function ScriptEditor({ save, currentScript }: Props) {
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {
			...formDefaults,
			...currentScript,
		},
	})
	const { register, handleSubmit, errors, formState } = methods
	const disabled = !formState.isValid
	const monaco = useRef<MonacoEditorType>(null)

	const onSubmit: any = (data: FormData) => {
		// combine initial script (if exists), data and monaco code
		const code = monaco.current?.getModel()?.getValue() || ''
		const script: ScriptDraft = { ...currentScript, ...data, code }
		save(script)
	}

	return (
		<FormContext {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="panel__item script-editor">
				<div className="script-editor__form-top">
					<h2 className="panel__title" style={{ marginBottom: '2em' }}>
						{currentScript?.id ? currentScript?.name : 'Add new script'}
					</h2>

					<div className="script-editor__name-wrapper">
						{/* name */}
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

						{/* color picker */}
						<ColorPicker />
					</div>

					{/* description */}
					<div className="input-wrapper" style={{ marginTop: '2em' }}>
						<label>Description</label>
						<ExpandingTextArea name="description" register={register} />
					</div>
				</div>

				{/* code */}
				<div className="script-editor__monaco-wrapper">
					<MonacoEditor monacoRef={monaco} initialValue={currentScript?.code} />
				</div>

				{/* save/update + delete */}
				<div className="script-editor__actions">
					<PrimaryButton type="submit" disabled={disabled}>
						{currentScript ? 'Save' : 'Submit'}
					</PrimaryButton>

					{currentScript?.id && <DeleteButton id={currentScript.id} />}
				</div>
			</form>
		</FormContext>
	)
}
