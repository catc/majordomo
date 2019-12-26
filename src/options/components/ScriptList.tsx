import React, { useState, useRef, useEffect, useMemo } from 'react'
import debounce from 'lodash/debounce'
import { Script } from '@common/types/scripts'
import ScriptItem from './ScriptItem'
import PrimaryButton from '@common/components/PrimaryButton'
import { STATUS } from '@options/hooks/state'
import useAppContext from '@options/hooks/context'
import SearchIcon from '@common/components/icons/Search'
import PlusIcon from '@common/components/icons/Plus'

import useInView from '../hooks/inView'

type Props = {
	scripts: Script[]
}

export default function ScriptList({ scripts: unfilteredScripts }: Props) {
	const { setStatus } = useAppContext()
	const [term, setSearchTerm] = useState('')
	const [isScrolledDown, bind] = useInView()

	const { current: debounceSetTerm } = useRef(
		debounce((val: string) => setSearchTerm(val), 450),
	)

	const scripts = useMemo(() => {
		if (term.length > 2) {
			const regex = new RegExp(term, 'i')
			return unfilteredScripts.filter((s) => regex.test(s.name + s.description))
		}
		return unfilteredScripts
	}, [term, unfilteredScripts])

	// cleanup
	useEffect(() => {
		return () => debounceSetTerm.cancel()
	}, [debounceSetTerm, debounceSetTerm.cancel])

	return (
		<div className="script-list">
			<div className={`script-list__top ${!isScrolledDown ? 'bottom-shadow' : ''}`}>
				<h2 className="panel__title">
					Scripts
					<PrimaryButton
						icon="with-text"
						style={{ float: 'right' }}
						onClick={() => setStatus({ status: STATUS.NEW })}
					>
						<PlusIcon />
						Add new
					</PrimaryButton>
				</h2>

				<div className="script-list__search-wrapper">
					<SearchIcon />
					<input
						placeholder="Search"
						autoComplete="off"
						className="input"
						onChange={(e) => debounceSetTerm(e.target.value)}
						type="text"
					/>
				</div>
			</div>

			<ul className="script-list__list">
				<li {...bind}></li>

				{scripts.map((s, i) => (
					<ScriptItem key={s.id} script={s} index={i} />
				))}
			</ul>
		</div>
	)
}
