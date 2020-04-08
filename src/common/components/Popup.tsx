import React, { useEffect, useState, useCallback, useMemo } from 'react'
import '../css/components/popup.scss'

type PopupProps = {
	children: React.ReactNode
	className?: string
	highlightContent?: React.RefObject<HTMLElement>[]
}

const HIGHLIGHT_CLASS = 'popup__highlight'
const BACKGROUND_HIDE_DELAY = 305

const noop = () => {}

function createPopup(isVisible: boolean, isClosing: boolean, startClose: typeof noop) {
	return function Popup({ className, children, highlightContent }: PopupProps) {
		// highlight content
		useEffect(() => {
			if (!isVisible) return

			highlightContent?.forEach((ref) => {
				ref.current?.classList.add(HIGHLIGHT_CLASS)
			})

			return () => {
				highlightContent?.forEach((ref) => {
					ref.current?.classList.remove(HIGHLIGHT_CLASS)
				})
			}
		}, [highlightContent])

		if (!isVisible) {
			return null
		}

		return (
			<>
				<div
					className={`popup__bg ${isClosing ? 'popup__close' : ''}`}
					onClick={startClose}
				></div>
				<div
					className={`popup__item ${className} ${
						isClosing ? 'popup__close' : ''
					}`}
				>
					{children}
				</div>
			</>
		)
	}
}

export default function usePopup() {
	const [isVisible, setVisible] = useState(false)
	const [isClosing, setIsClosing] = useState(false)

	const open = useCallback(() => {
		setVisible(true)
		setIsClosing(false)
	}, [])
	const close = useCallback(() => {
		setVisible(true)
		setIsClosing(true)
	}, [])

	// handle start closing fade animation
	useEffect(() => {
		if (isClosing) {
			const t = window.setTimeout(() => {
				close()
				setVisible(false)
			}, BACKGROUND_HIDE_DELAY)
			return () => clearTimeout(t)
		}
	}, [close, isClosing])

	// create popup
	const popup = useMemo(() => createPopup(isVisible, isClosing, close), [
		close,
		isClosing,
		isVisible,
	])

	return { open, close, isOpen: isVisible, Popup: popup }
}
