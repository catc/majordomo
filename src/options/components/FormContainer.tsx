import React, { useRef } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { constructInitialValues, FormFields } from './form/utils'
import Form from './Form'
import { Script } from '@common/utils/scripts'

interface Props {
	currentScript: null | Script
	save: (data: FormFields) => void
	close: () => void
}

export default function FormWrapper({ save, close, currentScript }: Props) {
	const { current: initialValues } = useRef(constructInitialValues(currentScript))

	return (
		<FinalForm onSubmit={save} initialValues={initialValues}>
			{({ handleSubmit }) => (
				<form onSubmit={handleSubmit} className="panel__item form-container">
					<Form close={close} />
				</form>
			)}
		</FinalForm>
	)
}
