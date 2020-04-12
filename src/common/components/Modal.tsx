import React, { useCallback, ReactNode } from 'react'
import useBoolean from '@common/hooks/useBoolean'
import '../css/components/modal.scss'

const BACKGROUND_HIDE_DELAY = 305

type CloseFn = () => void

type Props = {
	isOpen: boolean
	onClose: CloseFn
	children: ({ close }: { close: CloseFn }) => ReactNode
}

export default function Modal({ isOpen, children, onClose }: Props) {
	const { value: isClosing, setTrue: startClose, setFalse: reset } = useBoolean(false)

	const close = useCallback(() => {
		startClose()
		const t = setTimeout(() => {
			reset()
			onClose()
		}, BACKGROUND_HIDE_DELAY)
		return () => clearTimeout(t)
	}, [onClose, reset, startClose])

	if (!isOpen) {
		return null
	}

	return (
		<div className={`modal ${isClosing ? 'state_closing' : ''}`}>
			<div className="modal__bg" onClick={close}></div>
			<div className="modal__content">{children({ close })}</div>
		</div>
	)
}
