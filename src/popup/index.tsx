import React from 'react'
import { render } from 'react-dom'
import './css/styles.scss'

import TextArea from './components/main'
import ScriptList from './components/ScriptList'

function Foo() {
	return (
		<div>
			this is foo!
			<TextArea />
			<ScriptList />
		</div>
	)
}

render(<Foo />, document.getElementById('app'))
