import React from 'react'

type Props = {
	className?: string
}

export default function SearchIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.041 15.856a.995.995 0 00-.186.186A6.97 6.97 0 0111 18c-1.933 0-3.682-.782-4.95-2.05S4 12.933 4 11s.782-3.682 2.05-4.95S9.067 4 11 4s3.682.782 4.95 2.05S18 9.067 18 11a6.971 6.971 0 01-1.959 4.856zm5.666 4.437l-3.675-3.675A8.967 8.967 0 0020 11c0-2.485-1.008-4.736-2.636-6.364S13.485 2 11 2 6.264 3.008 4.636 4.636 2 8.515 2 11s1.008 4.736 2.636 6.364S8.515 20 11 20a8.967 8.967 0 005.618-1.968l3.675 3.675a.999.999 0 101.414-1.414z"/></svg>
}
