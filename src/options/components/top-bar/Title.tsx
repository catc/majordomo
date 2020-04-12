import React from 'react'
import useAppContext from '@common/hooks/useAppContext'
import X from '@common/components/icons/X'

interface Props {
	close: () => void
}

export default function Title({ close }: Props) {
	const { currentScript } = useAppContext()
	return (
		<h2 className="panel__title form-title" style={{ marginBottom: '2em' }}>
			{currentScript?.id ? currentScript?.name : 'Add new script'}

			<button type="button" className="main-form__close" onClick={close}>
				<X />
			</button>
		</h2>
	)
}
