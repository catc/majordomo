import React from 'react'
import { render, act } from '@testing-library/react'
import App from '@popup/App'
import { generateScript, setScriptsToStorage } from '../mocks'

jest.mock('@common/hooks/inView', () => () => [false, {}])

/*
	TODO - eventually build out and add more tests
*/

describe('Options App', () => {
	it.only('renders', async () => {
		setScriptsToStorage([generateScript(), generateScript()])
		const wrapper = render(<App />)
		await act(async () => {})

		// should have 2 scripts
		const scripts = wrapper.getAllByTestId('script-content')
		expect(scripts).toHaveLength(2)
	})
})
