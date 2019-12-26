import React from 'react'

type Props = {
	className?: string
}

export default function PlusIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 13h6v6a1 1 0 002 0v-6h6a1 1 0 000-2h-6V5a1 1 0 00-2 0v6H5a1 1 0 000 2z"/></svg>
}
