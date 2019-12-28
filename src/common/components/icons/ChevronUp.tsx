import React from 'react'

type Props = {
	className?: string
}

export default function ChevronUpIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.707 14.293l-6-6a.999.999 0 00-1.414 0l-6 6a.999.999 0 101.414 1.414L12 10.414l5.293 5.293a.999.999 0 101.414-1.414z"/></svg>
}