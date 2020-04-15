import React from 'react'
import X from '@common/components/icons/X'
import ToggleLeft from '@common/components/icons/ToggleLeft'
import ToggleRight from '@common/components/icons/ToggleRight'
import { Field, useField } from 'react-final-form'
import PrimaryButton from '@common/components/PrimaryButton'
import EventFields from './EventFields'
import UrlFiltersField from './UrlFiltersField'
import { ModalHeader, ModalFooter, ModalBody } from '@common/components/Modal'
import Zap from '@common/components/icons/Zap'

interface Props {
	close: () => void
}

export default function FormContent({ close }: Props) {
	const {
		input: { value: autorunEnabled },
	} = useField('autorun', { subscription: { value: true } })

	return (
		<>
			<ModalHeader className="autorun-modal__head">
				<h2 className="panel__title autorun-modal__title">
					<Zap />
					Auto-execute script
				</h2>
				<button type="button" className="main-form__close" onClick={close}>
					<X />
				</button>
			</ModalHeader>

			<ModalBody className="autorun-modal__body">
				<p className="autorun-form__description">
					Enable your scripts to autmoatically run on pages by adding URL filter
					criteria and selecting page events.
				</p>
				<Field name="autorun" type="checkbox">
					{({ input }) => (
						<>
							<span className="autorun-form__section-title">Enable</span>
							<label htmlFor="autorun_input">
								<input
									id="autorun_input"
									{...input}
									type="checkbox"
									hidden
								/>
								<div className="autorun-form__toggle">
									<span className={!input.checked ? 'active' : ''}>
										Off
									</span>
									{!input.checked ? (
										<ToggleLeft className="autorun-form__toggle-off" />
									) : (
										<ToggleRight className="autorun-form__toggle-on" />
									)}
									<span className={input.checked ? 'active' : ''}>
										On
									</span>
								</div>
							</label>
						</>
					)}
				</Field>

				{/* event types */}
				<EventFields autorunEnabled={autorunEnabled} />

				{/* filters */}
				<UrlFiltersField autorunEnabled={autorunEnabled} />
			</ModalBody>
			<ModalFooter className="autorun-modal__actions">
				<PrimaryButton type="submit">Save</PrimaryButton>
			</ModalFooter>
		</>
	)
}
