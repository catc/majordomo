import React, { useCallback, useRef } from 'react'
import { STATUS } from '@common/types/state'
import usePopup from '@common/components/Popup'
import { store, Script } from '@common/utils/scripts'
import useAppContext from '@common/hooks/useAppContext'

type Props = {
	currentScript: Script
}

export default function DeleteButton({ currentScript }: Props) {
	const { setStatus } = useAppContext()
	const { open, close, Popup } = usePopup()
	const buttonRef = useRef<HTMLButtonElement>(null)

	const remove = useCallback(() => {
		store.remove(currentScript)
		setStatus({ status: STATUS.NONE })
	}, [currentScript, setStatus])

	return (
		<div className="main-form-delete__wrapper">
			<button
				type="button"
				className="main-form-delete__btn"
				onClick={open}
				ref={buttonRef}
			>
				Delete
			</button>

			<Popup className="main-form-delete__confirm" highlightContent={[buttonRef]}>
				Are you sure you want to delete this script?
				<div className="main-form-delete__confirm-buttons">
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
