import React from 'react'
import { render } from 'react-dom'
import './css/style.scss'

import { Provider } from '@options/hooks/context'
import ScriptListWrapper from './components/ScriptListWrapper'
import ScriptPanel from './components/ScriptPanel'

function App() {
	return (
		<Provider>
			<div className="header">
				<span className="header__icon">🤵</span>
				<span className="header__title">Majordomo</span>
			</div>
			<div className="main">
				<ScriptListWrapper />
				<ScriptPanel />
			</div>
		</Provider>
	)
}

render(<App />, document.getElementById('root'))
