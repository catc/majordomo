import React from 'react'
import useScripts from '@common/hooks/useScripts'
import AddNewScriptPrompt from '@common/components/AddNewScriptPrompt'
import ScriptListContainer from '@common/components/script-list/ScriptListContainer'
import { openOptionsPage, QUERY_TYPE } from '@common/utils/link'

export default function ScriptListWrapper() {
	const { scripts, isInitialFetching } = useScripts()

	switch (true) {
		case isInitialFetching:
			return null

		case scripts.length === 0:
			return <AddNewScriptPrompt onClick={() => openOptionsPage(QUERY_TYPE.new)} />

		default:
			return <ScriptListContainer scripts={scripts} className="popup-script-list" />
	}
}
