import React, { useEffect, useRef } from 'react'
import useScripts from '@common/hooks/useScripts'
import useAppContext from '@common/hooks/useAppContext'
import AddNewScriptPrompt from '@common/components/AddNewScriptPrompt'
import { STATUS } from '@common/types/state'

import ScriptListContainer from '@common/components/script-list/ScriptListContainer'
import { QUERY_TYPE, parseOptionsPageParams } from '@common/utils/link'

export default function ScriptListWrapper() {
	const { scripts, isInitialFetching } = useScripts()
	const { setStatus, editorStatus } = useAppContext()

	const initialLoad = useRef(true)

	// if query param has script id, load that script in edit panel
	useEffect(() => {
		if (initialLoad.current && !isInitialFetching) {
			initialLoad.current = false
			const { type, id } = parseOptionsPageParams() || {}
			if (type === QUERY_TYPE.edit && id) {
				const script = scripts.find(s => s.id === id)
				if (script) setStatus({ status: STATUS.EDIT, script })
			}
		}
	}, [isInitialFetching, scripts, setStatus])

	let component = null
	switch (true) {
		case isInitialFetching:
			component = null
			break

		case scripts.length > 0:
			component = <ScriptListContainer scripts={scripts} supportDrag />
			break

		// state is in edit mode for new script
		case editorStatus !== STATUS.NEW:
			component = (
				<AddNewScriptPrompt onClick={() => setStatus({ status: STATUS.NEW })} />
			)
	}

	return <div className="script-list-wrapper">{component}</div>
}
