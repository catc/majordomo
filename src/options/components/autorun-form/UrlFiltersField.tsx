import React from 'react'
import UrlFiltersEditor from './UrlFiltersEditor'
import { validateFilters } from '../form/validate'
import { Field } from 'react-final-form'

const URL = 'https://developer.chrome.com/extensions/events#type-UrlFilter'

interface Props {
	autorunEnabled: boolean
}

export default function UrlFilters({ autorunEnabled }: Props) {
	return (
		<div
			className={!autorunEnabled ? 'autorun-form__disabled' : ''}
			style={{ marginBottom: '1em' }}
		>
			<div className="autorun-form__section-title">URL filters</div>
			<p className="autorun-form__description">
				You can add URL filters to specify which pages should run your script. All
				values are case sensitive. See the full list of{' '}
				<a href={URL} target="_blank" rel="noopener noreferrer">
					supported filters
				</a>{' '}
				for more information.
				<br />
				<br />
				Filters must be an array of objects containing filter criteria.
			</p>

			<Field name="filters" validate={validateFilters}>
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
