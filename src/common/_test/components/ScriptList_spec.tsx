import React from 'react'
import { render } from '@testing-library/react'
import ScriptList from '@common/components/ScriptList'
import useAppContext from '@common/hooks/useAppContext'
import { Permissions } from '@common/types/state'
import { generateScripts } from '../mocks'

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

	it('displays "new" script button if addScript is true', () => {
		mockPermissions({ canAddScript: true } as Permissions)
		const wrapper = render(<ScriptList scripts={[]} />)
		expect(wrapper.queryByText(/new/i)).toBeTruthy()
	})

	it('hides "new" script button if addScript is false', () => {
		mockPermissions({ canAddScript: false } as Permissions)
		const wrapper = render(<ScriptList scripts={[]} />)

		expect(wrapper.queryByText(/new/i)).toBeNull()
		// if can't add script, Scripts heading shouldnt be visible
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeNull()
	})

	it('correctly displays the search bar if there 5+ scripts', () => {
		mockPermissions({ canAddScript: true } as Permissions)
		const wrapper = render(<ScriptList scripts={generateScripts(5)} />)

		expect(wrapper.queryByTestId('search-field')).toBeTruthy()
		// if search field is visible, scripts h2 shouldnt be visibles
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeNull()
	})

	it('correctly hides the search bar if there <5 scripts', () => {
		mockPermissions({ canAddScript: true } as Permissions)
		const wrapper = render(<ScriptList scripts={generateScripts(3)} />)

		expect(wrapper.queryByTestId('search-field')).toBeNull()
		// if search field is hidden, scripts heading should be vsibile if can add script
		expect(wrapper.queryByRole('heading', { name: /scripts/i })).toBeTruthy()
	})
})
