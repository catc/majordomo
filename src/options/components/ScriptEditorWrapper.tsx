import React, { useCallback } from 'react'
import useAppContext from '@common/hooks/useAppContext'
import { STATUS } from '@common/types/state'
import { ScriptDraft, ScriptV1 } from '@common/types/scripts'
import { createID, saveScript } from '@common/utils/storage_v1'

import ScriptEditor from './ScriptEditor'

/*
	wraps script editor and contains functionality
	around saving + updating scripts
*/

export default function ScriptPanel() {
	const { editorStatus, setStatus, currentScript } = useAppContext()

	const close = useCallback(() => setStatus({ status: STATUS.NONE }), [setStatus])

	function save(data: ScriptDraft) {
		const now = Date.now()
		data.lastModified = now

		// is new - set an id
		if (!data.id) {
			data.id = createID()
			data.fav = false
		}

		saveScript(data as ScriptV1)

		setStatus({ status: STATUS.NONE })
	}

	if (editorStatus === STATUS.NONE) {
		return null
	}

	return (
		<ScriptEditor
			save={save}
			currentScript={currentScript}
			key={currentScript?.id}
			close={close}
		/>
	)
}
