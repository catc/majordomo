import React, { useEffect, useRef, useReducer } from 'react'
import { StateFromObject } from '@common/types/utils'
import '../css/components/popup.scss'

type Props = {
	isOpen: boolean
	children: React.ReactNode
	close: () => void
	className?: string
	highlightContent?: React.RefObject<HTMLElement>[]
}

const HIGHLIGHT_CLASS = 'popup__highlight'
const BACKGROUND_HIDE_DELAY = 305

const noop = () => {}

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

export default function Popup({
	children,
	isOpen,
	className = '',
	close,
	highlightContent = [],
}: Props) {
	const clearTimer = useRef<typeof noop>(noop)
	const [state, dispatch] = useReducer(stateReducer, initialState)
	const { isClosing, isVisible } = state

	// handling opening + closing
	useEffect(() => {
		if (isOpen && !isVisible) {
			dispatch({ type: 'OPEN' })
		} else if (!isOpen && isVisible && !isClosing) {
			dispatch({ type: 'START_CLOSE' })
		}
	}, [isClosing, isOpen, isVisible])

	// handle start closing
	useEffect(() => {
		if (isClosing) {
			const timer = setTimeout(() => {
				close()
				dispatch({ type: 'FINISH_CLOSE' })
			}, BACKGROUND_HIDE_DELAY)
			clearTimer.current = () => clearTimeout(timer)
		}
	}, [close, isClosing])

	// highlight content
	useEffect(() => {
		if (!isVisible) return

		highlightContent?.forEach((ref) => {
			ref.current?.classList.add(HIGHLIGHT_CLASS)
		})

		return () => {
			highlightContent.forEach((ref) => {
				ref.current?.classList.remove(HIGHLIGHT_CLASS)
			})
		}
	}, [highlightContent, isVisible])

	// clean up
	useEffect(() => clearTimer.current(), [])

	if (!isVisible) {
		return null
	}

	return (
		<>
			<div
				className={`popup__bg ${isClosing ? 'popup__close' : ''}`}
				onClick={() => dispatch({ type: 'START_CLOSE' })}
			></div>
			<div
				className={`popup__item ${className} ${isClosing ? 'popup__close' : ''}`}
			>
				{children}
			</div>
		</>
	)
}
