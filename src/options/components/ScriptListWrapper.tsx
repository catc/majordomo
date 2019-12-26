import React from 'react'
import getScripts from '@common/hooks/getScripts'
import useAppContext from '@options/hooks/context'
import PrimaryButton from '@common/components/PrimaryButton'
import { STATUS } from '@options/hooks/state'

import ScriptList from './ScriptList'

export default function ScriptListWrapper() {
	const { scripts, isInitialFetching } = getScripts()
	const { setStatus, editorStatus } = useAppContext()

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
				<div className="script-list-wrapper__empty">
					You have no scripts
					<br />
					<PrimaryButton
						onClick={() => setStatus({ status: STATUS.NEW })}
						style={{
							marginTop: 16,
						}}
					>
						Add new script
					</PrimaryButton>
				</div>
			)
	}

	return <div className="script-list-wrapper">{component}</div>
}
