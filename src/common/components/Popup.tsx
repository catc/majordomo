import React, { useEffect, useRef, useReducer, useCallback, useMemo } from 'react'
import { StateFromObject } from '@common/types/utils'
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

const initialState = {
	isVisible: false,
	isClosing: false,
}
type State = StateFromObject<typeof initialState>

type Action = { type: 'START_CLOSE' } | { type: 'OPEN' } | { type: 'FINISH_CLOSE' }

function stateReducer(_: State, action: Action) {
	switch (action.type) {
		case 'OPEN':
			return { isVisible: true, isClosing: false }
		case 'START_CLOSE':
			return { isVisible: true, isClosing: true }
		case 'FINISH_CLOSE':
			return { isVisible: false, isClosing: true }
		default:
			throw new Error('unsupported action')
	}
}

export default function usePopup() {
	const [state, dispatch] = useReducer(stateReducer, initialState)
	const { isClosing, isVisible } = state

	const timer = useRef<number>(0)

	const open = useCallback(() => dispatch({ type: 'OPEN' }), [])
	const close = useCallback(() => dispatch({ type: 'START_CLOSE' }), [])

	// handle start closing fade animation
	useEffect(() => {
		if (isClosing) {
			const t = window.setTimeout(() => {
				close()
				dispatch({ type: 'FINISH_CLOSE' })
			}, BACKGROUND_HIDE_DELAY)
			timer.current = t
		}
	}, [close, isClosing])

	// clean up timer
	useEffect(() => clearTimeout(timer.current), [])

	// create popup
	const popup = useMemo(() => createPopup(isVisible, isClosing, close), [
		close,
		isClosing,
		isVisible,
	])

	return { open, close, isOpen: isVisible, Popup: popup }
}
