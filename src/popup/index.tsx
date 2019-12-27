import React from 'react'
import { render } from 'react-dom'
import './css/styles.scss'

import { Provider } from '@common/hooks/useAppContext'
import Header from '@common/components/Header'

const permissions = {
	canFav: false,
	canEditScript: false,
	canExecute: true,
	canOpenOptions: true,
	canToggleDescription: true,
}

function Foo() {
	return (
		<Provider permissions={permissions}>
			<Header />
			{/* TODO */}
		</Provider>
	)
}

render(<Foo />, document.getElementById('root'))
