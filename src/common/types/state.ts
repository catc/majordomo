export enum STATUS {
	NONE = 'none',
	NEW = 'new',
	EDIT = 'edit',
}

export type Permissions = {
	canExecute: boolean
	canEditScript: boolean
	canAddScript: boolean
	canOpenOptions: boolean
	canToggleDescription: boolean
	canReorder: boolean
}
