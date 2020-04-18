import React from 'react'
import { render } from '@testing-library/react'
import ScriptList from '@common/components/ScriptList'
import useAppContext from '@common/hooks/useAppContext'
import { Permissions } from '@common/types/state'
import { generateScripts } from '../../../test/mocks'

jest.mock('@common/hooks/useAppContext')
jest.mock('@common/components/ScriptItem', () => () => <div data-testid="script-item" />)

const mockPermissions = (permissions: Permissions = {} as Permissions) => {
	// @ts-ignore
	return useAppContext.mockImplementation(() => {
		return { permissions }
	})
}

// @ts-ignore
window.IntersectionObserver = jest.fn(() => ({
	observe: jest.fn(),
	disconnect: jest.fn(),
}))

describe('ScriptList', () => {
	beforeEach(() => {
		mockPermissions()
	})

	it('renders', () => {
		const scripts = generateScripts(3)
		const wrapper = render(<ScriptList scripts={scripts} />)

		expect(wrapper.queryByTestId('script-list')).toBeTruthy()
		expect(wrapper.queryAllByTestId('script-item')).toHaveLength(3)
	})

	// options page with scripts <5
	it('displays "new" script button if addScript is true', () => {
		mockPermissions({ canAddScript: true } as Permissions)
		const wrapper = render(<ScriptList scripts={[]} />)
		expect(wrapper.queryByRole('button', { name: /new/i })).toBeTruthy()
		expect(wrapper.queryByTestId('search-field')).toBeNull()
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeTruthy()
	})

	// popup page with scripts <5
	it('hides "new" script button if addScript is false', () => {
		mockPermissions({ canAddScript: false } as Permissions)
		const wrapper = render(<ScriptList scripts={[]} />)

		expect(wrapper.queryByRole('button', { name: /new/i })).toBeNull()
		// if can't add script, Scripts heading shouldnt be visible
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeNull()
	})

	// options page with 5+ scripts
	it('correctly displays the search bar if there 5+ scripts', () => {
		mockPermissions({ canAddScript: true } as Permissions)
		const wrapper = render(<ScriptList scripts={generateScripts(5)} />)

		expect(wrapper.queryByRole('button', { name: /new/i })).toBeTruthy()
		expect(wrapper.queryByTestId('search-field')).toBeTruthy()
		// if search field is visible, scripts h2 shouldnt be visibles
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeNull()
	})

	// popup page with 5+ scripts
	it('correctly hides the search bar if there <5 scripts', () => {
		mockPermissions({ canAddScript: false } as Permissions)
		const wrapper = render(<ScriptList scripts={generateScripts(5)} />)
		expect(wrapper.queryByTestId('search-field')).toBeTruthy()
		expect(wrapper.queryByRole('button', { name: /new/i })).toBeNull()
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeNull()
	})
})
