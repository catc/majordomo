import React, { useRef } from 'react'
import { Form as FinalForm, useFormState } from 'react-final-form'
import { constructAutorunInitialValues } from '../form/utils'
import { AutorunFormFields, FormFields } from '../form/types'
import FormContent from './FormContent'

interface Props {
	close: () => void
}

export default function Form({ close }: Props) {
	const { values } = useFormState<FormFields>({ subscription: { values: true } })
	const { current: initialValues } = useRef(constructAutorunInitialValues(values))

	const submit = (values: AutorunFormFields) => {
		console.log('values are', values)

		// close()
	}

	return (
		<FinalForm onSubmit={submit} initialValues={initialValues}>
			{({ handleSubmit }) => (
				<form onSubmit={handleSubmit} className="autorun-modal">
					<FormContent close={close} />
				</form>
			)}
		</FinalForm>
	)
}
