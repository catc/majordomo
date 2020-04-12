import React from 'react'
import { Field } from 'react-final-form'
import { EVENT_TYPES } from '@common/utils/scripts'
import Square from '@common/components/icons/Square'
import CheckSquare from '@common/components/icons/CheckSquare'

interface Props {
	autorunEnabled: boolean
}

const EVENTS = Object.keys(EVENT_TYPES)
const URL = 'https://developer.chrome.com/extensions/webNavigation#toc'

export default function EventFields({ autorunEnabled }: Props) {
	return (
		<div className={!autorunEnabled ? 'autorun-form__disabled' : ''}>
			<div className="autorun-form__section-title">Page events</div>
			<div className="event-types-form__description">
				Select page events to execute script on. See{' '}
				<a href={URL} target="_blank" rel="noopener noreferrer">
					chrome docs
				</a>{' '}
				for full info on each event.
			</div>

			<div className="event-types-form__options">
				{EVENTS.map(key => (
					<Field type="checkbox" name={`on.${key}`} key={key}>
						{({ input }) => (
							<>
								<label htmlFor={key} className="event-types-form__option">
									<input
										{...input}
										id={key}
										hidden
										disabled={!autorunEnabled}
									/>
									{input.checked ? <CheckSquare /> : <Square />}
									{key}
								</label>
							</>
						)}
					</Field>
				))}
			</div>
		</div>
	)
}
