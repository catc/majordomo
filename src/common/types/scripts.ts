import { PartialBy } from '@common/types/utils'

export type Script = {
	id: string
	lastModified: number
	name: string
	color: string
	code: string
	description: string
	fav: boolean
}

export type ScriptDraft = PartialBy<Script, 'id' | 'lastModified' | 'fav'>
