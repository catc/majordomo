import React, { useState, useCallback, useRef } from 'react'
import useAppContext from '@options/hooks/context'
import Popup from '@common/components/Popup'
import { STATUS } from '@options/hooks/state'
import { removeScript } from '@common/utils/storage'

type Props = {
	id: string
}

/*
	TODO - make popup a hook?
 */

export default function DeleteButton({ id }: Props) {
	const { setStatus } = useAppContext()
	const [isOpen, setIsOpen] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const close = useCallback(() => setIsOpen(false), [])
	const remove = useCallback(() => {
		removeScript(id)
		setStatus({ status: STATUS.NONE })
	}, [id, setStatus])

	return (
		<div className="script-editor__delete-wrapper">
			<button
				type="button"
				className="script-editor__delete-btn"
				onClick={() => {
					setIsOpen(true)
				}}
				ref={buttonRef}
			>
				Delete
			</button>

			<Popup
				isOpen={isOpen}
				close={close}
				className="script-editor__delete-confirm"
				highlightContent={[buttonRef]}
			>
				Are you sure you want to delete this script?
				<div className="script-editor__delete-confirm-buttons">
					<button type="button" onClick={remove}>
						Yes
					</button>
					<button type="button" onClick={close}>
						No
					</button>
				</div>
			</Popup>
		</div>
	)
}
