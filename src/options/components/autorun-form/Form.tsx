import React, { useRef } from 'react'
import { Form as FinalForm, useFormState, useForm } from 'react-final-form'
import { constructAutorunInitialValues } from '../form/utils'
import { AutorunFormFields, FormFields } from '../form/types'
import FormContent from './FormContent'

interface Props {
	close: () => void
}

export default function Form({ close }: Props) {
	const { batch, change } = useForm()
	const { values } = useFormState<FormFields>({ subscription: { values: true } })
	const { current: initialValues } = useRef(constructAutorunInitialValues(values))

	const submit = (values: AutorunFormFields) => {
		console.log('values are', values)

		batch(() => {
			change('autorun', values.autorun)
			change('on', values.on)
			change('filters', values.filters)
		})
		close()
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
