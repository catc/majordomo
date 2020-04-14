import React from 'react'

type Props = {
	className?: string
}

export default function HelpCircleIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 12c0-3.037-1.232-5.789-3.222-7.778S15.037 1 12 1 6.211 2.232 4.222 4.222 1 8.963 1 12s1.232 5.789 3.222 7.778S8.963 23 12 23s5.789-1.232 7.778-3.222S23 15.037 23 12zm-2 0c0 2.486-1.006 4.734-2.636 6.364S14.486 21 12 21s-4.734-1.006-6.364-2.636S3 14.486 3 12s1.006-4.734 2.636-6.364S9.514 3 12 3s4.734 1.006 6.364 2.636S21 9.514 21 12zM10.033 9.332c.183-.521.559-.918 1.022-1.14s1.007-.267 1.528-.083c.458.161.819.47 1.05.859.183.307.285.665.286 1.037 0 .155-.039.309-.117.464a1.93 1.93 0 01-.368.49c-.709.709-1.831 1.092-1.831 1.092a1 1 0 10.633 1.897s1.544-.506 2.613-1.575c.279-.279.545-.614.743-1.01.2-.4.328-.858.328-1.369a4.06 4.06 0 00-.567-2.049 3.993 3.993 0 00-5.162-1.557 3.989 3.989 0 00-2.044 2.28.999.999 0 101.886.664zM13 17a1 1 0 10-2 0 1 1 0 002 0z"/></svg>
}