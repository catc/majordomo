import React, { useCallback, ReactNode, useRef, useEffect } from 'react'
import useBoolean from '@common/hooks/useBoolean'
import '../css/components/modal.scss'
import { createPortal } from 'react-dom'
import X from '@common/components/icons/X'

const BACKGROUND_HIDE_DELAY = 305

type CloseFn = () => void

type Props = {
	isOpen: boolean
	onClose: CloseFn
	enableEsc?: boolean
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

export default function Modal({ isOpen, children, onClose, enableEsc }: Props) {
	const { value: isClosing, setTrue: startClose, setFalse: reset } = useBoolean(false)
	const ref = useRef<HTMLDivElement>(null)

	const { current: el } = useRef(getModalRoot())

	const close = useCallback(() => {
		startClose()
		const t = setTimeout(() => {
			reset()
			onClose()
		}, BACKGROUND_HIDE_DELAY)
		return () => clearTimeout(t)
	}, [onClose, reset, startClose])

	// if most recently opened modal is this one, close it
	useEffect(() => {
		if (!isOpen || !enableEsc) {
			return
		}
		const handler = e => {
			if (e.keyCode !== 27) return
			const modals = Array.from(document.querySelectorAll('#modal .modal'))
			if (!modals.length) {
				return
			}
			const lastModal = modals[modals.length - 1]
			if (ref.current && ref.current === lastModal) {
				close()
			}
		}
		document.addEventListener('keydown', handler, false)
		return () => document.removeEventListener('keydown', handler, false)
	}, [close, enableEsc, isOpen])

	if (!isOpen) {
		return null
	}

	return createPortal(
		<div className={`modal ${isClosing ? 'state_closing' : ''}`} ref={ref}>
			<div className="modal__bg" onClick={close}></div>
			<div className="modal__content">{children({ close })}</div>
		</div>,
		el,
	)
}

type ModalSectionProps = Partial<React.HTMLAttributes<HTMLDivElement>> & {
	children: React.ReactNode
}

function createModalPart(sectionClassName: string) {
	return function ModalFooter({
		children,
		className = '',
		...rest
	}: ModalSectionProps) {
		return (
			<div {...rest} className={`${sectionClassName} ${className}`}>
				{children}
			</div>
		)
	}
}

export const ModalHeader = createModalPart('modal__header')
export const ModalFooter = createModalPart('modal__footer')
export const ModalBody = createModalPart('modal__body')

type CloseButtonProps = {
	close: () => void
	className?: string
	small?: boolean
}
export const CloseButton = ({ close, className = '', small }: CloseButtonProps) => (
	<button
		type="button"
		onClick={close}
		className={`modal__close ${className} ${small ? 'small' : ''}`}
	>
		<X />
	</button>
)
