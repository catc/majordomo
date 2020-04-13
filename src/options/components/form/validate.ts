import { FieldValidator } from 'final-form'
import { AutorunFormFields } from './types'
import { validate } from './parseFilters'
import { UrlFilter } from '@common/types/url-filters'

export const validateName: FieldValidator<null | string> = val => {
	return !val
}

// @ts-ignore
export const validateFilters: FieldValidator<UrlFilter[]> = (
	val,
	fields: AutorunFormFields,
) => {
	if (!fields.autorun) {
		return
	}
	return validate(val)
}
