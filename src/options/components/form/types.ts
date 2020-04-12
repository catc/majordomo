import { Script } from '@common/utils/scripts'

export type FormFields = Omit<Script, 'lastModified' | 'id'> & { id?: string }

export type AutorunFormFields = Pick<Script, 'on' | 'filters' | 'autorun'>
