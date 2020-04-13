import { getScriptDefaults, Script } from '@common/utils/scripts'
import cloneDeep from 'lodash/cloneDeep'
import { validate as validateFilters } from './parseFilters'
import { FieldValidator } from 'final-form'
import { UrlFilter } from '@common/types/url-filters'

export type FormFields = Omit<Script, 'lastModified' | 'id'> & { id?: string }

export type AutorunFormFields = Pick<Script, 'on' | 'filters' | 'autorun'>

export function constructInitialValues(current: Script | null): FormFields {
	return {
		...getScriptDefaults(),
		...current,
	}
}

export function constructAutorunInitialValues(current: FormFields): AutorunFormFields {
	return {
		autorun: current.autorun,
		on: { ...current.on },
		filters: cloneDeep(current.filters) || [],
	}
}

export const validateName: FieldValidator<null | string> = val => {
	return !val
}

// @ts-ignore
export const validateUrlFilters: FieldValidator<UrlFilter[]> = (
	val,
	fields: AutorunFormFields,
) => {
	if (!fields.autorun) {
		return
	}
	return validateFilters(val)
}
