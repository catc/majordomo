import React from 'react'

type Props = {
	className?: string
}

export default function StarIcon({ className }: Props){
	return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.897 1.557a1 1 0 00-1.793 0L8.246 7.346l-6.391.935a1 1 0 00-.553 1.705l4.623 4.503-1.091 6.362a1 1 0 001.452 1.054L12 18.9l5.715 3.005a1 1 0 001.451-1.054l-1.091-6.362 4.623-4.503a1 1 0 00-.553-1.706l-6.39-.934zM12 4.259l2.193 4.444c.151.305.436.499.752.547l4.906.717-3.549 3.457a1 1 0 00-.288.885l.837 4.883-4.386-2.307a1.001 1.001 0 00-.931 0l-4.386 2.307.837-4.883a.996.996 0 00-.288-.885L4.148 9.967l4.907-.718a1 1 0 00.752-.546z"/></svg>
}
