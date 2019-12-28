import React from 'react'

type Props = {
	className?: string
}

export default function ChevronDownIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.293 9.707l6 6a.999.999 0 001.414 0l6-6a.999.999 0 10-1.414-1.414L12 13.586 6.707 8.293a.999.999 0 10-1.414 1.414z"/></svg>
}
