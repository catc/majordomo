import React from 'react'

type Props = {
	className?: string
}

export default function ZapIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.585 5.26l-.577 4.616A1 1 0 0012 11h6.865l-6.45 7.74.577-4.616A1 1 0 0012 13H5.135zm.647-3.9l-10 12A1 1 0 003 15h7.867l-.859 6.876a.999.999 0 001.76.764l10-12A1 1 0 0021 9h-7.867l.859-6.876a.999.999 0 00-1.76-.764z"/></svg>
}
