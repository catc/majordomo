import React from 'react'
import './css/style.scss'

import { Provider } from '@common/hooks/useAppContext'
import Header from '@common/components/Header'
import ScriptListWrapper from './components/ScriptListWrapper'
import ScriptEditorSection from './components/ScriptEditorSection'

const permissions = {
	canEditScript: true,
	canAddScript: true,
	canExecute: false,
	canOpenOptions: false,
	canToggleDescription: false,
	canReorder: true,
}

export default function App() {
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
