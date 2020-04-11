import React, { useCallback } from 'react'
import useAppContext from '@common/hooks/useAppContext'
import { STATUS } from '@common/types/state'
import { Script, store } from '@common/utils/scripts'
import FormContainer from './FormContainer'
import { genID } from '@common/utils/scripts'
import { FormFields } from './form/types'

/*
	wraps script editor and contains functionality
	around saving + updating scripts
*/

export default function ScriptPanel() {
	const { editorStatus, setStatus, currentScript } = useAppContext()

	const close = useCallback(() => setStatus({ status: STATUS.NONE }), [setStatus])

	async function save(form: FormFields) {
		const data: Script = {
			...form,
			lastModified: Date.now(),
			id: currentScript?.id || genID(),
		}

		// save
		await store.saveScript(data)

		// close editor panel
		setStatus({ status: STATUS.NONE })
	}

	if (editorStatus === STATUS.NONE) {
		return null
	}

	return (
		<FormContainer
			key={currentScript?.id}
			save={save}
			close={close}
			currentScript={currentScript}
		/>
	)
}
