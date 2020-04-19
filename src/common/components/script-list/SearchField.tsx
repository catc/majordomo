import React, { useRef, useEffect } from 'react'
import debounce from 'lodash/debounce'
import SearchIcon from '@common/components/icons/Search'

interface Props {
	setFilter: (text: string) => void
}

export default function SearchField({ setFilter }: Props) {
	const { current: debounceSetTerm } = useRef(
		debounce((val: string) => setFilter(val), 450),
	)

	// cleanup
	useEffect(() => {
		return () => debounceSetTerm.cancel()
	}, [debounceSetTerm, debounceSetTerm.cancel])

	return (
		<div className="script-list__search-wrapper" data-testid="search-field">
			<SearchIcon />
			<input
				placeholder="Search"
				autoComplete="off"
				className="input"
				onChange={e => debounceSetTerm(e.target.value)}
				type="text"
			/>
		</div>
	)
}
