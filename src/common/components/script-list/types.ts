import { Script } from '@common/utils/scripts'
import { InViewRefBind } from '@common/hooks/inView'
import { SetStatusActionProps } from '@common/hooks/state'
import { Permissions } from '@common/types/state'

export type ScriptListProps = {
	scripts: Script[]
	bindInView: InViewRefBind
	permissions: Permissions
	setStatus: (p: SetStatusActionProps) => void
}
