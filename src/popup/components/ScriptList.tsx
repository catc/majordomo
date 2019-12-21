import React, { useEffect, useState } from 'react'
import { Script } from '@popup/types/scripts'

import { getScripts } from '@popup/utils/script-storage'

export default function ScriptList() {
	const [scripts, setScripts] = useState<Script[]>([])

	// fetch
	useEffect(() => {
		async function fetchAll() {
			const scripts = await getScripts()
			setScripts(scripts)
		}
		fetchAll()
	}, [])

	function execute(code: string) {
		console.log('would run', code)
		chrome.tabs.executeScript(
			null,
			{
				code,
			},
			(a, b, c) => {
				console.log('done executing!', a, b, c)
			},
		)
	}

	return (
		<div>
			script list:
			<ul>
				{scripts.map((s) => (
					<li key={s.id}>
						{s.name}
						<button type="button" onClick={() => execute(s.code)}>
							Execute
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
