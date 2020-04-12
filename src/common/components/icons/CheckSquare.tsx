import React from 'react'

type Props = {
	className?: string
}

export default function CheckSquareIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.293 11.707l3 3a.999.999 0 001.414 0l10-10a.999.999 0 10-1.414-1.414L12 12.586l-2.293-2.293a.999.999 0 10-1.414 1.414zM20 12v7c0 .276-.111.525-.293.707S19.276 20 19 20H5c-.276 0-.525-.111-.707-.293S4 19.276 4 19V5c0-.276.111-.525.293-.707S4.724 4 5 4h11a1 1 0 000-2H5a2.997 2.997 0 00-3 3v14a2.997 2.997 0 003 3h14a2.997 2.997 0 003-3v-7a1 1 0 00-2 0z"/></svg>
}
