import React from 'react'
import { QUERY_TYPE, parseOptionsPageParams } from '@common/utils/link'
import HelpCircle from '@common/components/icons/HelpCircle'
import Zap from '@common/components/icons/Zap'
import Star from '@common/components/icons/Star'
import FileText from '@common/components/icons/FileText'
import useBoolean from '@common/hooks/useBoolean'
import Modal from '@common/components/Modal'
import ButtonPrimary from '@common/components/PrimaryButton'

export default function Intro() {
	const { value: displayIntro, setTrue: open, setFalse: onClose } = useBoolean(
		() => parseOptionsPageParams()?.type === QUERY_TYPE.intro,
	)

	return (
		<>
			<button onClick={open} className="no-outline header__settings-btn">
				<HelpCircle />
			</button>

			<Modal isOpen={displayIntro} onClose={onClose}>
				{({ close }) => (
					<div className="intro-modal">
						<div className="intro-modal__title">🤵</div>
						<p>
							Welcome to Majordomo - your one-stop shop for all your custom
							script needs. This extension comes with a variety of features
							including:
						</p>
						<ul>
							<li>
								<FileText />
								Add and save scripts to execute on any page
							</li>
							<li>
								<Zap />
								Automatically execute scripts on pages based on custom URL
								filters and page events
							</li>
							<li>
								<Star />
								Easily organize scripts via color tags and sorting
							</li>
						</ul>
						<p className="intro-modal__git">
							Find a bug or want to contribute to the project? See the{' '}
							<a
								href="https://github.com/catc/majordomo"
								target="_blank"
								rel="noopener noreferrer"
							>
								source code on github
							</a>
							.
						</p>
						<ButtonPrimary onClick={close}>Get started</ButtonPrimary>
					</div>
				)}
			</Modal>
		</>
	)
}
