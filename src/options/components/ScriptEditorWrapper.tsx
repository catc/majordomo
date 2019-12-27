import React from 'react'
import useAppContext from '@common/hooks/useAppContext'
import { STATUS } from '@common/types/state'
import { ScriptDraft, Script } from '@common/types/scripts'
import { createID, saveScript } from '@common/utils/storage'

import ScriptEditor from './ScriptEditor'

/*
	wraps script editor and contains functionality
	around saving + updating scripts
*/

export default function ScriptPanel() {
	const { editorStatus, setStatus, currentScript } = useAppContext()

	function save(data: ScriptDraft) {
		const now = Date.now()
		data.lastModified = now

		// is new - set an id
		if (!data.id) {
			data.id = createID()
			data.fav = false
		}

		saveScript(data as Script)

		setStatus({ status: STATUS.NONE })
	}

	if (editorStatus === STATUS.NONE) {
		return null
	}

	return (
		<ScriptEditor save={save} currentScript={currentScript} key={currentScript?.id} />
	)
}
