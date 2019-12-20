import React from 'react'
import { render } from 'react-dom'
import './css/styles.scss'

function Foo() {
	return <div>this is foo!</div>
}

render(<Foo />, document.getElementById('app'))
