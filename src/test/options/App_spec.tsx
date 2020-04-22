import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import App from '@options/App'
import { generateScript, setScriptsToStorage } from '../mocks'

jest.mock('@options/components/form/MonacoEditor.tsx', () => () => <div />)
jest.mock('@common/hooks/inView', () => () => [false, {}])

/*
	TODO - eventually build out and add more tests
*/

describe('Options App', () => {
	it.only('renders', async () => {
		const s1 = generateScript()
		const s2 = generateScript()
		setScriptsToStorage([s1, s2])
		const wrapper = render(<App />)
		await act(async () => {})

		// should have 2 scripts
		const scripts = wrapper.getAllByTestId('script-content')
		expect(scripts).toHaveLength(2)
		expect(wrapper.container.querySelector('.form-container')).toBeNull()

		// click and observe form
		await fireEvent.click(scripts[0])

		const form = wrapper.container.querySelector('.form-container')
		expect(form).toBeTruthy()
		expect(form?.textContent?.includes(s1.name)).toBe(true)
	})
})
