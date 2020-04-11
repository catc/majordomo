import React from 'react'
import { useFormState } from 'react-final-form'
import PrimaryButton from '@common/components/PrimaryButton'
import useAppContext from '@common/hooks/useAppContext'
import DeleteButton from './DeleteButton'

export default function FormActions() {
	const { currentScript } = useAppContext()
	const { hasValidationErrors, submitting } = useFormState({
		subscription: { hasValidationErrors: true, submitting: true },
	})

	return (
		<div className="main-form-actions">
			<PrimaryButton type="submit" disabled={hasValidationErrors || submitting}>
				{currentScript ? 'Save' : 'Submit'}
			</PrimaryButton>

			{currentScript?.id && <DeleteButton currentScript={currentScript} />}
		</div>
	)
}
