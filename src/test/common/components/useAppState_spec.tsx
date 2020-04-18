import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Permissions, STATUS } from '@common/types/state'
import useAppContext, { Provider } from '@common/hooks/useAppContext'
import { act } from 'react-dom/test-utils'
import { generateScript } from '../../../test/mocks'
import { Script } from '@common/utils/scripts'
import * as scriptUtils from '@common/utils/scripts'

describe('useAppContext', () => {
	it('waits for store to startup', async () => {
		const setupMock = jest.spyOn(scriptUtils, 'setup')

		/*
			mock chrome storage get, essentially pausing `_fetchScripts`
			method on store to verify content isnt loaded until store setup
		 */
		let resolve: any
		jest.spyOn(chrome.storage.sync, 'get').mockImplementationOnce((_, cb) => {
			resolve = cb
		})

		const wrapper = render(
			<Provider permissions={{} as Permissions}>
				<div data-testid="content" />
			</Provider>,
		)

		// should render nothing until promise resolves
		expect(wrapper.queryByTestId('content')).toBeNull()
		await act(async () => resolve())
		expect(wrapper.queryByTestId('content')).toBeTruthy()

		// store should be setup - this is more of a sanity check
		expect(setupMock).toHaveBeenCalled()
		expect(scriptUtils.store).toBeInstanceOf(scriptUtils.Store)
	})

	it('renders with permissions', async () => {
		function Child() {
			const { permissions } = useAppContext()
			return (
				<div>
					child
					{Object.keys(permissions).map(
						p => `${p}: ${permissions[p as keyof Permissions]}`,
					)}
				</div>
			)
		}

		const permissions = {
			canAddScript: true,
			canToggleDescription: false,
		} as Permissions

		const wrapper = render(
			<Provider permissions={permissions}>
				<Child />
			</Provider>,
		)
		await act(async () => {})

		expect(wrapper.queryByText(/child/)).toBeTruthy()
		expect(wrapper.queryByText(/canAddScript: true/)).toBeTruthy()
		expect(wrapper.queryByText(/canToggleDescription: false/)).toBeTruthy()
	})

	function Child({ script }: { script: Script }) {
		const { editorStatus, setStatus, currentScript } = useAppContext()

		function editScript() {
			setStatus({ status: STATUS.EDIT, script })
		}

		function editNew() {
			setStatus({ status: STATUS.NEW })
		}

		if (editorStatus === STATUS.NEW) {
			return <div>add new script</div>
		}

		if (editorStatus === STATUS.EDIT) {
			return <div>edit: {currentScript!.id}</div>
		}

		return (
			<div>
				<button onClick={editScript}>edit</button>
				<button onClick={editNew}>new</button>
				none
			</div>
		)
	}

	it('supports status change, none -> edit', async () => {
		const script = generateScript('scriptID_123')
		const permissions = {} as Permissions
		const wrapper = render(
			<Provider permissions={permissions}>
				<Child script={script} />
			</Provider>,
		)
		await act(async () => {})

		// initial state is none
		expect(wrapper.queryByText(/none/)).toBeTruthy()

		// click edit script
		fireEvent.click(wrapper.queryByText('edit')!)

		// should see editable script
		expect(wrapper.queryByText(/scriptID_123/)).toBeTruthy()
	})

	it('supports status change, none -> new', async () => {
		const script = generateScript('scriptID_123')
		const permissions = {} as Permissions
		const wrapper = render(
			<Provider permissions={permissions}>
				<Child script={script} />
			</Provider>,
		)
		await act(async () => {})

		// initial state is none
		expect(wrapper.queryByText(/none/)).toBeTruthy()

		// click edit script
		fireEvent.click(wrapper.queryByText('new')!)

		// should see editable script
		expect(wrapper.queryByText('add new script')).toBeTruthy()
	})
})
