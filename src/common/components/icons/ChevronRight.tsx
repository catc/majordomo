import React from 'react'

type Props = {
	className?: string
}

export default function ChevronRightIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.707 18.707l6-6a.999.999 0 000-1.414l-6-6a.999.999 0 10-1.414 1.414L13.586 12l-5.293 5.293a.999.999 0 101.414 1.414z"/></svg>
}
