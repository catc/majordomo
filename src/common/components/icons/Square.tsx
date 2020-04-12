import React from 'react'

type Props = {
	className?: string
}

export default function SquareIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 2a2.997 2.997 0 00-3 3v14a2.997 2.997 0 003 3h14a2.997 2.997 0 003-3V5a2.997 2.997 0 00-3-3zm0 2h14c.276 0 .525.111.707.293S20 4.724 20 5v14c0 .276-.111.525-.293.707S19.276 20 19 20H5c-.276 0-.525-.111-.707-.293S4 19.276 4 19V5c0-.276.111-.525.293-.707S4.724 4 5 4z"/></svg>
}
