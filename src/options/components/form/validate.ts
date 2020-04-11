import { FieldValidator } from 'final-form'

// TODO - move this to utils file if no other validate functions

export const validateName: FieldValidator<null | string> = val => {
	return !val
}
