import React from 'react'
import { render } from '@testing-library/react'
import Header from '@common/components/Header'
import useAppContext from '@common/hooks/useAppContext'

jest.mock('@common/hooks/useAppContext')

describe('header', () => {
	// @ts-ignore
	useAppContext.mockImplementation(() => {
		return {
			permissions: {
				canOpenOptions: false,
			},
		}
	})

	it('displays the modal if intro query param', async () => {
		Object.defineProperty(window, 'location', {
			value: {
				search: '?status=intro',
			},
			writable: true,
		})

		const wrapper = render(<Header />)
		expect(wrapper.queryByText(/Welcome to Majordomo/i)).toBeTruthy()
	})

	it(`doesn't display intro modal if wrong query param`, async () => {
		Object.defineProperty(window, 'location', {
			value: {
				search: '?status=new',
			},
			writable: true,
		})

		const wrapper = render(<Header />)
		expect(wrapper.queryByText(/Welcome to Majordomo/i)).toBeNull()
	})
})
