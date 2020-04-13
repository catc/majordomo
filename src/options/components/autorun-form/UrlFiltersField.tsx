import React from 'react'
import UrlFiltersEditor from './UrlFiltersEditor'

const URL = 'https://developer.chrome.com/extensions/events#type-UrlFilter'

interface Props {
	autorunEnabled: boolean
}

export default function UrlFilters({ autorunEnabled }: Props) {
	return (
		<div className={!autorunEnabled ? 'autorun-form__disabled' : ''}>
			<div className="autorun-form__section-title">URL filters</div>
			<p className="autorun-form__description">
				You can add URL filters to specify which pages should run your script. All
				criteria are case sensitive. See the full list of{' '}
				<a href={URL} target="_blank" rel="noopener noreferrer">
					supported filters
				</a>{' '}
				for more information.
				<br />
				<br />
				Filters should be an array of objects containing filter info.
			</p>
			<UrlFiltersEditor autorunEnabled={autorunEnabled} />
		</div>
	)
}
