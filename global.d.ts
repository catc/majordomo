declare namespace NodeJS {
	interface Global {
		chrome: any
		storage: { [key: string]: object }
	}
}
