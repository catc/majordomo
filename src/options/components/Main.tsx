import React from 'react'

import ScriptList from './ScriptList'
import ScriptPanel from './ScriptPanel'

export default function Main() {
	return (
		<div className="main">
			<ScriptList />
			<ScriptPanel />
		</div>
	)
}
