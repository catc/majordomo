import React from 'react'
import { render } from 'react-dom'
import './css/style.scss'

import { Provider } from '@common/hooks/useAppContext'
import Header from '@common/components/Header'
import ScriptListWrapper from './components/ScriptListWrapper'
import ScriptEditorSection from './components/ScriptEditorSection'
import Intro from './components/Intro'

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
				<Intro />
			</div>
		</Provider>
	)
}

render(<App />, document.getElementById('root'))
