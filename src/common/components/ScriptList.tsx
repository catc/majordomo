import React, { useState, useRef, useEffect, useMemo } from 'react'
import debounce from 'lodash/debounce'
import { Script } from '@common/types/scripts'
import ScriptItem from './ScriptItem'
import PrimaryButton from '@common/components/PrimaryButton'
import { STATUS } from '@common/types/state'
import useAppContext from '@common/hooks/useAppContext'
import SearchIcon from '@common/components/icons/Search'
import PlusIcon from '@common/components/icons/Plus'

import useInView from '@common/hooks/inView'

type Props = {
	scripts: Script[]
}

/*
	- renders all scripts
	- displays search bar if more than 3 scripts
*/

export default function ScriptList({ scripts: unfilteredScripts }: Props) {
	const {
		setStatus,
		permissions: {
			canAddScript,
			canFav,
			canToggleDescription,
			canExecute,
			canEditScript,
		},
	} = useAppContext()
	const [term, setSearchTerm] = useState('')
	const [topInView, bind] = useInView(true)

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

	const displaySearch = unfilteredScripts.length > 3
	const displayTop = canAddScript || displaySearch

	return (
		<div className="script-list">
			{displayTop && (
				<div className={`script-list__top ${!topInView ? 'bottom-shadow' : ''}`}>
					{canAddScript && (
						<h2 className="panel__title">
							Scripts
							<PrimaryButton
								icon="with-text"
								style={{ float: 'right' }}
								onClick={() => setStatus({ status: STATUS.NEW })}
							>
								<PlusIcon />
								New
							</PrimaryButton>
						</h2>
					)}

					<div
						className="script-list__search-wrapper"
						style={{ display: !displaySearch ? 'none' : '' }}
					>
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
			)}

			<ul className="script-list__list">
				<li {...bind}></li>

				{scripts.map((s, i) => (
					<ScriptItem
						key={s.id}
						script={s}
						setStatus={setStatus}
						// permissions
						canFav={canFav}
						canToggleDescription={canToggleDescription}
						canExecute={canExecute}
						canEditScript={canEditScript}
					/>
				))}
			</ul>
		</div>
	)
}