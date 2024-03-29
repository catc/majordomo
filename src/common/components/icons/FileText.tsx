import React from 'react'

type Props = {
	className?: string
}

export default function FileTextIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 1H6a2.997 2.997 0 00-3 3v16a2.997 2.997 0 003 3h12a2.997 2.997 0 003-3V8a.997.997 0 00-.293-.707l-6-6A.998.998 0 0014 1zm3.586 6H15V4.414zM13 3v5a1 1 0 001 1h5v11c0 .276-.111.525-.293.707S18.276 21 18 21H6c-.276 0-.525-.111-.707-.293S5 20.276 5 20V4c0-.276.111-.525.293-.707S5.724 3 6 3zm3 9H8a1 1 0 000 2h8a1 1 0 000-2zm0 4H8a1 1 0 000 2h8a1 1 0 000-2zm-6-8H8a1 1 0 000 2h2a1 1 0 000-2z"/></svg>
}
