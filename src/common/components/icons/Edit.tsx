import React from 'react'

type Props = {
	className?: string
}

export default function EditIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 2.293l-13.5 13.5a.995.995 0 00-.258.444l-1.5 5.5a1 1 0 001.228 1.228l5.5-1.5a.99.99 0 00.444-.258l13.5-13.5c.747-.747 1.121-1.729 1.121-2.707s-.374-1.96-1.121-2.707S19.978 1.172 19 1.172s-1.96.374-2.707 1.121zm1.414 1.414c.357-.357.824-.535 1.293-.535s.936.178 1.293.536.535.823.535 1.292-.178.936-.535 1.293L6.981 19.605l-3.556.97.97-3.555z"/></svg>
}
