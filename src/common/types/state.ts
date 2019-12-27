export enum STATUS {
	NONE = 'none',
	NEW = 'new',
	EDIT = 'edit',
}

export type Permissions = {
	canFav: boolean
	canExecute: boolean
	canEditScript: boolean
	canOpenOptions: boolean
	canToggleDescription: boolean
}
