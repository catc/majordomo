import React from 'react'
import { render } from '@testing-library/react'
import ScriptListContainer from '@common/components/script-list/ScriptListContainer'
import useAppContext from '@common/hooks/useAppContext'
import { Permissions } from '@common/types/state'
import { generateScripts } from '../../../test/mocks'

jest.mock('@common/hooks/useAppContext')
jest.mock('@common/hooks/inView', () => () => [false, {}])
jest.mock('@common/components/script-item/ScriptItemContent', () => () => (
	<div data-testid="script-item" />
))

const mockPermissions = (permissions: Permissions = {} as Permissions) => {
	// @ts-ignore
	return useAppContext.mockImplementation(() => {
		return { permissions }
	})
}

describe('ScriptListContainer', () => {
	beforeEach(() => {
		mockPermissions()
	})

	it('renders non-drag list', async () => {
		const scripts = generateScripts(3)
		const wrapper = render(<ScriptListContainer scripts={scripts} />)

		await wrapper.findByTestId('script-list')
		expect(wrapper.queryByTestId('script-list-container')).toBeTruthy()
		expect(wrapper.queryByTestId('script-list')).toBeTruthy()
		expect(wrapper.queryAllByTestId('script-item')).toHaveLength(3)
	})

	it('renders drag list', async () => {
		const scripts = generateScripts(3)
		const wrapper = render(<ScriptListContainer scripts={scripts} supportDrag />)

		await wrapper.findByTestId('script-list')
		expect(wrapper.queryByTestId('script-list-container')).toBeTruthy()
		expect(wrapper.queryByTestId('script-list')).toBeTruthy()
		expect(wrapper.queryAllByTestId('script-item')).toHaveLength(3)
	})

	// options page with scripts <5
	it('displays "new" script button if addScript is true', () => {
		mockPermissions({ canAddScript: true } as Permissions)
		const wrapper = render(<ScriptListContainer scripts={[]} />)
		expect(wrapper.queryByRole('button', { name: /new/i })).toBeTruthy()
		expect(wrapper.queryByTestId('search-field')).toBeNull()
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeTruthy()
	})

	// popup page with scripts <5
	it('hides "new" script button if addScript is false', () => {
		mockPermissions({ canAddScript: false } as Permissions)
		const wrapper = render(<ScriptListContainer scripts={[]} />)

		expect(wrapper.queryByRole('button', { name: /new/i })).toBeNull()
		// if can't add script, Scripts heading shouldnt be visible
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeNull()
	})

	// options page with 5+ scripts
	it('correctly displays the search bar if there 5+ scripts', () => {
		mockPermissions({ canAddScript: true } as Permissions)
		const wrapper = render(<ScriptListContainer scripts={generateScripts(5)} />)

		expect(wrapper.queryByRole('button', { name: /new/i })).toBeTruthy()
		expect(wrapper.queryByTestId('search-field')).toBeTruthy()
		// if search field is visible, scripts h2 shouldnt be visibles
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeNull()
	})

	// popup page with 5+ scripts
	it('correctly hides the search bar if there <5 scripts', () => {
		mockPermissions({ canAddScript: false } as Permissions)
		const wrapper = render(<ScriptListContainer scripts={generateScripts(5)} />)
		expect(wrapper.queryByTestId('search-field')).toBeTruthy()
		expect(wrapper.queryByRole('button', { name: /new/i })).toBeNull()
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeNull()
	})

	// if <5 results, cant add script, and don't show title
	it('does not display the top bar at all', () => {
		mockPermissions({ canAddScript: false } as Permissions)
		const scripts = generateScripts(3)
		const wrapper = render(<ScriptListContainer scripts={scripts} />)
		expect(wrapper.queryByTestId('script-list-top-bar')).toBeNull()
	})
})
