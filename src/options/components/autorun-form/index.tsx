import React from 'react'

interface Props {
	// ...
}

export default function AutorunForm({}: Props) {
	return (
		<div>
			{Object.keys(EVENT_TYPES).map(key => {
				return (
					<Field
						type="checkbox"
						name={`on.${key}`}
						key={key}
						// ...
					>
						{({ input }) => (
							<>
								<br />
								<label htmlFor={key}>
									key: {key}
									<input {...input} id={key} />
								</label>
							</>
						)}
					</Field>
				)
			})}
		</div>
	)
}
