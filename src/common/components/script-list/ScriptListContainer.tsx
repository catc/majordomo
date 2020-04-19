import React, { useState, useMemo } from 'react'
import PrimaryButton from '@common/components/PrimaryButton'
import { STATUS } from '@common/types/state'
import useAppContext from '@common/hooks/useAppContext'
import PlusIcon from '@common/components/icons/Plus'
import useInView from '@common/hooks/inView'
import { Script } from '@common/utils/scripts'
import SearchField from './SearchField'

const ScriptListWithDrag = React.lazy(() =>
	import('@common/components/script-list/ScriptListWithDrag'),
)

const ScriptList = React.lazy(() => import('@common/components/script-list/ScriptList'))

type Props = {
	scripts: Script[]
	supportDrag?: boolean
}

/*
	- renders all scripts
	- displays search bar if 5+ scripts
*/

const MIN_SCRIPTS_FOR_SEARCH = 5

export default function ScriptListContainer({
	scripts: unfilteredScripts,
	supportDrag,
}: Props) {
	const { setStatus, permissions } = useAppContext()
	const [term, setSearchTerm] = useState('')
	const [topInView, bind] = useInView(true) // TODO - fix and move down this

	const scripts = useMemo(() => {
		if (term.length > 2) {
			const regex = new RegExp(term, 'i')
			return unfilteredScripts.filter(s => regex.test(s.name + s.description))
		}
		return unfilteredScripts
	}, [term, unfilteredScripts])

	const canDisplaySearch = unfilteredScripts.length >= MIN_SCRIPTS_FOR_SEARCH

	let component
	if (supportDrag) {
		component = (
			<React.Suspense fallback={null}>
				<ScriptListWithDrag
					scripts={scripts}
					bindInView={bind}
					setStatus={setStatus}
					permissions={permissions}
				/>
			</React.Suspense>
		)
	} else {
		component = (
			<React.Suspense fallback={null}>
				<ScriptList
					scripts={scripts}
					bindInView={bind}
					setStatus={setStatus}
					permissions={permissions}
				/>
			</React.Suspense>
		)
	}

	return (
		<div className="script-list" data-testid="script-list">
			{/* TODO - add whether to display top or not, bugs out in popup, fix tests */}
			<div className={`script-list__top ${!topInView ? 'bottom-shadow' : ''}`}>
				{permissions.canAddScript && !canDisplaySearch && (
					<h2 className="panel__title">Scripts</h2>
				)}

				{canDisplaySearch && <SearchField setFilter={setSearchTerm} />}

				{permissions.canAddScript && (
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
			{component}
		</div>
	)
}
