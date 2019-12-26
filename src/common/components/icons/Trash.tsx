import React from 'react'

type Props = {
	className?: string
}

export default function TrashIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 7v13c0 .276-.111.525-.293.707S17.276 21 17 21H7c-.276 0-.525-.111-.707-.293S6 20.276 6 20V7zm-1-2V4a2.997 2.997 0 00-3-3h-4a2.997 2.997 0 00-3 3v1H3a1 1 0 000 2h1v13a2.997 2.997 0 003 3h10a2.997 2.997 0 003-3V7h1a1 1 0 000-2zM9 5V4c0-.276.111-.525.293-.707S9.724 3 10 3h4c.276 0 .525.111.707.293S15 3.724 15 4v1zm0 6v6a1 1 0 002 0v-6a1 1 0 00-2 0zm4 0v6a1 1 0 002 0v-6a1 1 0 00-2 0z"/></svg>
}
