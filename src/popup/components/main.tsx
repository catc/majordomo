import React, { useRef } from 'react'

import { setScript } from '@common/utils/storage'

export default function TextArea() {
	const textarea = useRef<HTMLTextAreaElement>(null)

	function save() {
		const data = textarea.current?.value
		if (data) {
			setScript(data)
		}
	}

	return (
		<div>
			<button
				onClick={() => {
					chrome.runtime.openOptionsPage()
				}}
			>
				Open options
			</button>
			<textarea name="" ref={textarea} id="" cols="30" rows="10"></textarea>

			<button onClick={save}>Save</button>
		</div>
	)
}
