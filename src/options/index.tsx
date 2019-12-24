import React from 'react'
import { render } from 'react-dom'
import './css/style.scss'

import { Provider } from '@options/hooks/context'
import Main from './components/Main'

function App() {
	return (
		<Provider>
			<div className="header">
				<span className="header__icon">🤵</span>
				<span className="header__title">Majordomo</span>
			</div>
			<Main />
		</Provider>
	)
}

render(<App />, document.getElementById('root'))
