import React from 'react'
import { render } from 'react-dom'

function Foo() {
	return <div>this is foo!</div>
}

render(<Foo />, document.getElementById('app'))
