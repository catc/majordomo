import React from 'react'
import '../css/components/header.scss'

import useAppContext from '@common/hooks/useAppContext'
import SettingsIcon from '@common/components/icons/Settings'
import { openOptionsPage } from '@common/utils/link'
import Intro from '@options/components/Intro'

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

			<div className="header__right">
				{/* options */}
				{canOpenOptions && (
					<button
						onClick={() => openOptionsPage()}
						className="no-outline header__settings-btn"
					>
						<SettingsIcon />
					</button>
				)}

				{/* intro */}
				{!canOpenOptions && <Intro />}
			</div>
		</div>
	)
}
