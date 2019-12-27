import React, { useCallback, useRef } from 'react'
import useAppContext from '@common/hooks/useAppContext'
import { STATUS } from '@common/types/state'
import { removeScript } from '@common/utils/storage'
import usePopup from '@common/components/Popup'

type Props = {
	id: string
}

export default function DeleteButton({ id }: Props) {
	const { setStatus } = useAppContext()

	const { open, close, Popup } = usePopup()

	const buttonRef = useRef<HTMLButtonElement>(null)

	const remove = useCallback(() => {
		removeScript(id)
		setStatus({ status: STATUS.NONE })
	}, [id, setStatus])

	return (
		<div className="script-editor__delete-wrapper">
			<button
				type="button"
				className="script-editor__delete-btn"
				onClick={open}
				ref={buttonRef}
			>
				Delete
			</button>

			<Popup
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
