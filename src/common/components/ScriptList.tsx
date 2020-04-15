import React, { useState, useMemo } from 'react'
import ScriptItem from './ScriptItem'
import PrimaryButton from '@common/components/PrimaryButton'
import { STATUS } from '@common/types/state'
import useAppContext from '@common/hooks/useAppContext'
import PlusIcon from '@common/components/icons/Plus'
import useInView from '@common/hooks/inView'
import { Script } from '@common/utils/scripts'
import SearchField from './SearchField'

type Props = {
	scripts: Script[]
}

/*
	- renders all scripts
	- displays search bar if more than 3 scripts
*/

const MIN_SCRIPTS_FOR_SEARCH = 5

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

	const scripts = useMemo(() => {
		if (term.length > 2) {
			const regex = new RegExp(term, 'i')
			return unfilteredScripts.filter(s => regex.test(s.name + s.description))
		}
		return unfilteredScripts
	}, [term, unfilteredScripts])

	const canShowSearch = unfilteredScripts.length > MIN_SCRIPTS_FOR_SEARCH

	return (
		<div className="script-list">
			<div className={`script-list__top ${!topInView ? 'bottom-shadow' : ''}`}>
				{canAddScript && !canShowSearch && (
					<h2 className="panel__title">Scripts</h2>
				)}

				{canShowSearch && <SearchField setFilter={setSearchTerm} />}

				{canAddScript && (
					<PrimaryButton
						icon="with-text"
						style={{ flexShrink: 0, marginLeft: '2em' }}
						onClick={() => setStatus({ status: STATUS.NEW })}
					>
						<PlusIcon />
						New
					</PrimaryButton>
				)}
			</div>
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
