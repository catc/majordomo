const isTesting = process.env.NODE_ENV === 'test'

const STYLES = {
	blue_bold: 'font-weight: bold; color: #2196f3;',
	green_bold: 'font-weight: bold; color: #43a047;',
	default: '',
}

export const log = (msg: string, style: keyof typeof STYLES = 'default') => {
	if (isTesting) return
	console.log(`%c${msg}`, STYLES[style])
}
