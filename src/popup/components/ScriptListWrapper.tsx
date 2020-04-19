import React from 'react'
import '@common/css/components/script-list.scss'
import useScripts from '@common/hooks/useScripts'
import AddNewScriptPrompt from '@common/components/AddNewScriptPrompt'
import ScriptListContainer from '@common/components/script-list/ScriptListContainer'
import { openOptionsPage, QUERY_TYPE } from '@common/utils/link'

export default function ScriptListWrapper() {
	const { scripts, isInitialFetching } = useScripts()

	let component = null
	switch (true) {
		case isInitialFetching:
			component = null
			break

		case scripts.length > 0:
			component = <ScriptListContainer scripts={scripts} />
			break

		default:
			component = (
				<AddNewScriptPrompt onClick={() => openOptionsPage(QUERY_TYPE.new)} />
			)
	}

	return <div className="script-list-wrapper">{component}</div>
}
