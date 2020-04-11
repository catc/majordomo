import { getScriptDefaults, Script } from '@common/utils/scripts'
import { FormFields } from './types'

export function constructInitialValues(current: Script | null): FormFields {
	return {
		...getScriptDefaults(),
		...current,
	}
}
