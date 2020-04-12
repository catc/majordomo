import React from 'react'
import Zap from '@common/components/icons/Zap'
import ZapOff from '@common/components/icons/ZapOff'
import { useField } from 'react-final-form'
import Form from './Form'
import Modal from '@common/components/Modal'
import useBoolean from '@common/hooks/useBoolean'

export default function AutorunForm() {
	const { value: showModal, setTrue: open, setFalse: close } = useBoolean(true)
	const {
		input: { value: autorunEnabled },
	} = useField('autorun', { subscription: { value: true } })

	return (
		<>
			<div className="input-wrapper autorun-form-trigger">
				<label className="input-label">Auto Execute</label>
				<div
					className={`autorun-form-trigger__button ${
						autorunEnabled ? 'active' : ''
					}`}
					onClick={open}
				>
					{autorunEnabled ? <Zap /> : <ZapOff />}
				</div>
			</div>

			<Modal isOpen={showModal} onClose={close}>
				{({ close }) => <Form close={close} />}
			</Modal>
		</>
	)
}
