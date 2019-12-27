import React from 'react'
import '../css/components/header.scss'

import useAppContext from '@common/hooks/useAppContext'
import SettingsIcon from '@common/components/icons/Settings'

const openOptions = () => {
	chrome.runtime.openOptionsPage()
}

export default function Header() {
	const {
		permissions: { canOpenOptions },
	} = useAppContext()
	return (
		<div className="header">
			<div className="header__left">
				<span className="header__icon">🤵</span>
				<span className="header__title">Majordomo</span>
			</div>

			{/* options */}
			{canOpenOptions && (
				<div className="header__right">
					<button
						onClick={openOptions}
						className="no-outline header__settings-btn"
					>
						<SettingsIcon />
					</button>
				</div>
			)}
		</div>
	)
}
