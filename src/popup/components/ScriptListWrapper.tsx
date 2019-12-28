import React from 'react'
import '@common/css/components/script-list.scss'
import getScripts from '@common/hooks/getScripts'
import AddNewScriptPrompt from '@common/components/AddNewScriptPrompt'
import ScriptList from '@options/components/ScriptList'
import { openOptionsPage } from '@common/utils/link'

export default function ScriptListWrapper() {
	const { scripts, isInitialFetching } = getScripts()

	let component = null
	switch (true) {
		case isInitialFetching:
			component = null
			break

		case scripts.length > 0:
			component = <ScriptList scripts={scripts} />
			break

		default:
			component = <AddNewScriptPrompt onClick={() => openOptionsPage('new')} />
	}

	return <div className="script-list-wrapper">{component}</div>
}
