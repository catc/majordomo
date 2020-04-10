import { PartialBy } from '@common/types/utils'

const enum EventTypes {
	// https://developer.chrome.com/extensions/webNavigation
	onDOMContentLoaded = 'onDOMContentLoaded',
	onCompleted = 'onCompleted',
	// TODO - add remaining
}

export type ScriptV1 = {
	id: string
	lastModified: number
	name: string
	color: string
	code: string
	description: string
	fav: boolean
}

export type Script = {
	id: string
	lastModified: number
	name: string
	color: string
	code: string
	description: string
	order: number
	filters: {
		/* TODO */
	}
	on: {
		[key in keyof typeof EventTypes]?: boolean
	}
}

export type ScriptDraft = PartialBy<ScriptV1, 'id' | 'lastModified' | 'fav'>
