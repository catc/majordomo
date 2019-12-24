import React from 'react'
import getScripts from '@common/hooks/getScripts'
import useAppContext from '@options/hooks/context'

import PrimaryButton from '@common/components/PrimaryButton'
import { STATUS } from '@options/hooks/state'

type Props = {}

export default function ScriptList({}: Props) {
	const { scripts, isFetching } = getScripts()
	const { setStatus, editorStatus } = useAppContext()

	if (isFetching) {
		return <div className="script-list" />
	}

	let component
	if (scripts.length) {
		component = (
			<ul>
				{/* TODO */}
				{scripts.map((s) => (
					<li key={s.id}>{s.name}</li>
				))}
			</ul>
		)
	} else if (editorStatus !== STATUS.NEW) {
		component = (
			<div className="script-list__empty">
				You have no scripts
				<br />
				<PrimaryButton
					onClick={() => setStatus({ status: STATUS.NEW })}
					style={{
						marginTop: 16,
					}}
				>
					Add new script
				</PrimaryButton>
			</div>
		)
	}

	return <div className="script-list">{component}</div>
}
