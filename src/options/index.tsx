import React from 'react'
import { render } from 'react-dom'
import './css/style.scss'

import { Provider } from '@common/hooks/useAppContext'
import Header from '@common/components/Header'
import ScriptListWrapper from './components/ScriptListWrapper'
import ScriptEditorSection from './components/ScriptEditorSection'

const permissions = {
	canFav: true,
	canEditScript: true,
	canAddScript: true,
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
				<ScriptEditorSection />
			</div>
		</Provider>
	)
}

render(<App />, document.getElementById('root'))
