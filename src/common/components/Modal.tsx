import React, { useCallback, ReactNode, useRef } from 'react'
import useBoolean from '@common/hooks/useBoolean'
import '../css/components/modal.scss'
import { createPortal } from 'react-dom'

const BACKGROUND_HIDE_DELAY = 305

type CloseFn = () => void

type Props = {
	isOpen: boolean
	onClose: CloseFn
	children: ({ close }: { close: CloseFn }) => ReactNode
}

function getModalRoot() {
	const modal = document.getElementById('modal')
	if (modal) {
		return modal
	}
	const el = document.createElement('div')
	el.id = 'modal'
	document.body.appendChild(el)
	return el
}

export default function Modal({ isOpen, children, onClose }: Props) {
	const { value: isClosing, setTrue: startClose, setFalse: reset } = useBoolean(false)

	const { current: el } = useRef(getModalRoot())

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

	return createPortal(
		<div className={`modal ${isClosing ? 'state_closing' : ''}`}>
			<div className="modal__bg" onClick={close}></div>
			<div className="modal__content">{children({ close })}</div>
		</div>,
		el,
	)
	return (
		<div className={`modal ${isClosing ? 'state_closing' : ''}`}>
			<div className="modal__bg" onClick={close}></div>
			<div className="modal__content">{children({ close })}</div>
		</div>
	)
}
