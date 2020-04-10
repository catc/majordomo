import React, { useEffect, useRef } from 'react'
import '@common/css/components/script-list.scss'
import useScripts from '@common/hooks/useScripts'
import useAppContext from '@common/hooks/useAppContext'
import AddNewScriptPrompt from '@common/components/AddNewScriptPrompt'
import { STATUS } from '@common/types/state'

import ScriptList from '@common/components/ScriptList'

export default function ScriptListWrapper() {
	const { scripts, isInitialFetching } = useScripts()
	const { setStatus, editorStatus } = useAppContext()

	const initialLoad = useRef(true)

	// if query param has script id, load that script in edit panel
	useEffect(() => {
		if (initialLoad.current && !isInitialFetching) {
			initialLoad.current = false
			const params = new URLSearchParams(window.location.search)
			const id = params.get('edit')
			if (id) {
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
			component = <ScriptList scripts={scripts} />
			break

		case editorStatus !== STATUS.NEW:
			component = (
				<AddNewScriptPrompt onClick={() => setStatus({ status: STATUS.NEW })} />
			)
	}

	return <div className="script-list-wrapper">{component}</div>
}
