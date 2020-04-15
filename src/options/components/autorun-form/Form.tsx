import React, { useRef } from 'react'
import { Form as FinalForm, useFormState, useForm } from 'react-final-form'
import {
	constructAutorunInitialValues,
	AutorunFormFields,
	FormFields,
} from '../form/utils'
import FormContent from './FormContent'

interface Props {
	close: () => void
}

export default function Form({ close }: Props) {
	const { batch, change } = useForm()
	const { values } = useFormState<FormFields>({ subscription: { values: true } })
	const { current: initialValues } = useRef(constructAutorunInitialValues(values))

	const submit = (values: AutorunFormFields) => {
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
				<form
					onSubmit={handleSubmit}
					className="autorun-modal modal__with-sections"
				>
					<FormContent close={close} />
				</form>
			)}
		</FinalForm>
	)
}
