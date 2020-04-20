import React from 'react'
import { render } from 'react-dom'
import './css/styles.scss'

import { Provider } from '@common/hooks/useAppContext'
import Header from '@common/components/Header'
import ScriptListWrapper from './components/ScriptListWrapper'

const permissions = {
	canEditScript: false,
	canAddScript: false,
	canExecute: true,
	canOpenOptions: true,
	canToggleDescription: true,
	canReorder: false,
}

function Foo() {
	return (
		<Provider permissions={permissions}>
			<Header />
			<ScriptListWrapper />
		</Provider>
	)
}

render(<Foo />, document.getElementById('root'))
