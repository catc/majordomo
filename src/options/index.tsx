import React from 'react'
import { render } from 'react-dom'
import './css/style.scss'

import { Provider } from '@common/hooks/useAppContext'
import Header from '@common/components/Header'
import ScriptListWrapper from './components/ScriptListWrapper'
import ScriptEditorWrapper from './components/ScriptEditorWrapper'

const permissions = {
	canFav: true,
	canEditScript: true,
	canExecute: false,
	canOpenOptions: false,
	canToggleDescription: false,
}

function App() {
	return (
		<Provider permissions={permissions}>
			<Header />
			<div className="main">
				<ScriptListWrapper />
				<ScriptEditorWrapper />
			</div>
		</Provider>
	)
}

render(<App />, document.getElementById('root'))
