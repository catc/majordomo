import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ScriptItemContent from '@common/components/script-item/ScriptItemContent'
import { Permissions } from '@common/types/state'
import { Script } from '@common/utils/scripts'
import { runScript } from '@common/utils/execute'

jest.mock('@common/utils/execute')

describe('ScriptItemContent', () => {
	function getWrapper(script: Script, permissions: Permissions = {} as Permissions) {
		const setStatus = jest.fn()

		const wrapper = render(
			<ScriptItemContent
				script={script}
				permissions={permissions}
				setStatus={setStatus}
			/>,
		)

		return { wrapper, setStatus }
	}

	const script = {
		name: 'script name',
		color: '#fff',
		code: 'console.log("foo")',
		lastModified: new Date('Jan 5, 2020').getTime(),
		description: 'hello all you cool cats and kittens',
		autorun: true,
	} as Script

	it('renders correctly on options page', () => {
		const permissions = {
			canToggleDescription: false,
			canExecute: false,
			canEditScript: true,
		} as Permissions

		const { wrapper, setStatus } = getWrapper(script, permissions)

		expect(wrapper.queryByText('5 January, 2020')).toBeTruthy()
		// has name
		expect(wrapper.queryByText(script.name)).toBeTruthy()
		// has decription toggle
		expect(wrapper.queryByTestId('toggle-description')).toBeNull()
		// has execute button
		expect(wrapper.queryByTestId('execute')).toBeNull()

		// can edit
		fireEvent.click(wrapper.queryByTestId('script-content')!)
		expect(setStatus).toHaveBeenCalledTimes(1)
		expect(setStatus).toHaveBeenCalledWith(
			expect.objectContaining({
				status: 'edit',
				script: script,
			}),
		)
	})

	it('renders correctly on popup', () => {
		const permissions = {
			canToggleDescription: true,
			canExecute: true,
			canEditScript: false,
		} as Permissions

		const { wrapper } = getWrapper(script, permissions)

		// has correct date
		expect(wrapper.queryByText('5 January, 2020')).toBeTruthy()
		// has name
		expect(wrapper.queryByText(script.name)).toBeTruthy()
		// has decription toggle
		expect(wrapper.queryByTestId('toggle-description')).toBeTruthy()
		// can toggle description
		expect(wrapper.queryByText(script.description)).toBeNull()
		fireEvent.click(wrapper.queryByTestId('toggle-description')!)
		expect(wrapper.queryByText(script.description)).toBeTruthy()

		// has execute button
		expect(wrapper.queryByTestId('execute')).toBeTruthy()
		fireEvent.click(wrapper.queryByTestId('execute')!)
		expect(runScript).toHaveBeenCalledTimes(1)
		expect(runScript).toHaveBeenCalledWith(script)
	})
})
