import { getScriptDefaults, Script } from '@common/utils/scripts'
import { FormFields, AutorunFormFields } from './types'
import cloneDeep from 'lodash/cloneDeep'

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
