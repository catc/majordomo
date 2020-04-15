import React from 'react'
import UrlFiltersEditor from './UrlFiltersEditor'
import { validateUrlFilters } from '../form/utils'
import { Field } from 'react-final-form'
import FiltersInfoPopup from './FiltersInfoPopup'
import HelpCircle from '@common/components/icons/HelpCircle'
import Modal from '@common/components/Modal'
import useBoolean from '@common/hooks/useBoolean'

const URL = 'https://developer.chrome.com/extensions/events#type-UrlFilter'

interface Props {
	autorunEnabled: boolean
}

export default function UrlFilters({ autorunEnabled }: Props) {
	const { value: showModal, setTrue: open, setFalse: close } = useBoolean(false)

	return (
		<div
			className={!autorunEnabled ? 'autorun-form__disabled' : ''}
			style={{ marginBottom: '1em' }}
		>
			<Modal isOpen={showModal} onClose={close} enableEsc>
				{({ close }) => <FiltersInfoPopup close={close} />}
			</Modal>

			<div
				className="autorun-form__section-title autorun-filters__info-trigger"
				onClick={open}
			>
				URL filters <HelpCircle />
			</div>
			<p className="autorun-form__description">
				You can add{' '}
				<a onClick={open} className="autorun-filters__info-trigger">
					URL filters
				</a>{' '}
				to specify which pages should run your script. See the official{' '}
				<a href={URL} target="_blank" rel="noopener noreferrer">
					chrome docs
				</a>{' '}
				for more information on each filter.
				<br />
				<br />
				Filters must be an array of objects containing filter criteria, and all
				values are case sensitive.
			</p>

			<Field name="filters" validate={validateUrlFilters}>
				{({ meta: { error } }) => (
					<>
						{error && <div className="autorun-filters__error">{error}</div>}
						<div
							className={`autorun-filters__editor ${
								!autorunEnabled ? 'disabled' : ''
							}`}
						>
							<UrlFiltersEditor autorunEnabled={autorunEnabled} />
						</div>
					</>
				)}
			</Field>
		</div>
	)
}
