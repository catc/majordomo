const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

// budget moment.js
export function formatDate(date: number) {
	const d = new Date(date)
	return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`
}
