import React from 'react'

type Props = {
	className?: string
}

export default function ZapOffIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.402 6.873l.59-4.75a1 1 0 00-1.761-.763l-2.43 2.92c-.353.425-.295 1.055.129 1.409s1.055.296 1.408-.129l.249-.299-.17 1.366a1 1 0 001.985.247zm5.936 6.678l2.43-2.91A1 1 0 0021 9h-5.34a1 1 0 000 2h3.202l-1.06 1.269a1 1 0 001.536 1.282zm-6.377.824l1.686 1.686-2.232 2.678zM8.067 9.481L11.586 13H5.135zM.293 1.707l6.354 6.354-4.415 5.299A1 1 0 003 15h7.867l-.859 6.876a.999.999 0 001.76.764l4.299-5.159 6.226 6.226a.999.999 0 101.414-1.414l-22-22A.999.999 0 10.293 1.707z"/></svg>
}
