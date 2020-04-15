import React from 'react'
import { ModalHeader, ModalBody, CloseButton } from '@common/components/Modal'

interface Props {
	close: () => void
}

const content = [
	{
		name: 'urlMatches',
		type: 'string',
		description:
			'Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number',
	},
	{
		name: 'pathContains',
		type: 'string',
		description: 'Matches if the path segment of the URL contains a specified string',
	},
	{
		name: 'hostSuffix',
		type: 'string',
		description: 'Matches if the host name of the URL ends with a specified string',
	},
	{
		name: 'hostPrefix',
		type: 'string',
		description: 'Matches if the host name of the URL starts with a specified string',
	},
	{
		name: 'hostContains',
		type: 'string',
		description: 'Matches if the host name of the URL contains a specified string',
	},
	{
		name: 'urlContains',
		type: 'string',
		description:
			'Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number',
	},
	{
		name: 'querySuffix',
		type: 'string',
		description:
			'Matches if the query segment of the URL ends with a specified string',
	},
	{
		name: 'urlPrefix',
		type: 'string',
		description:
			'Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number',
	},
	{
		name: 'hostEquals',
		type: 'string',
		description: 'Matches if the host name of the URL is equal to a specified string',
	},
	{
		name: 'urlEquals',
		type: 'string',
		description:
			'Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number',
	},
	{
		name: 'queryContains',
		type: 'string',
		description:
			'Matches if the query segment of the URL contains a specified string',
	},
	{
		name: 'pathPrefix',
		type: 'string',
		description:
			'Matches if the path segment of the URL starts with a specified string',
	},
	{
		name: 'pathEquals',
		type: 'string',
		description:
			'Matches if the path segment of the URL is equal to a specified string',
	},
	{
		name: 'pathSuffix',
		type: 'string',
		description:
			'Matches if the path segment of the URL ends with a specified string',
	},
	{
		name: 'queryEquals',
		type: 'string',
		description:
			'Matches if the query segment of the URL is equal to a specified string',
	},
	{
		name: 'queryPrefix',
		type: 'string',
		description:
			'Matches if the query segment of the URL starts with a specified string',
	},
	{
		name: 'urlSuffix',
		type: 'string',
		description:
			'Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number',
	},
	{
		name: 'schemes',
		type: 'string[]',
		description:
			'Matches if the scheme of the URL is equal to any of the schemes specified in the array',
	},
	{
		name: 'ports',
		type: 'number|number[]',
		description:
			'Matches if the port of the URL is contained in any of the specified port lists. For example [80, 443, [1000, 1200]] matches all requests on port 80, 443 and in the range 1000-1200.',
	},
	{
		name: 'originAndPathMatches',
		type: 'string',
		description:
			'Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number',
	},
]

export default function FiltersInfoPopup({ close }: Props) {
	return (
		<div className="modal__with-sections url-filters-popup">
			<ModalHeader className="url-filters-popup__header">
				Supported filters
				<CloseButton close={close} small />
			</ModalHeader>
			<ModalBody className="url-filters-popup__body">
				<ul>
					{content.map(c => (
						<li key={c.name}>
							<div className="url-filters-popup__item">
								<span className="url-filters-popup__name">{c.name}</span>{' '}
								-{' '}
								<span className="url-filters-popup__type">{c.type}</span>
							</div>
							<div className="url-filters-popup__description">
								{c.description}
							</div>
						</li>
					))}
				</ul>
			</ModalBody>
		</div>
	)
}
