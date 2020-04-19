import { getScripts as getScriptsV1 } from '@common/utils/storage_v1'
import { store, Script, getScriptDefaults, genID } from '@common/utils/scripts'
import { remove } from '@common/utils/storage'

// migrate v1 scripts to v2
export default async function migrate_v1() {
	const scriptsv1 = await getScriptsV1()
	if (scriptsv1.length) {
		try {
			// convert v1 scripts to v2
			const scriptsv2 = scriptsv1.map(s =>
				newScript({
					id: s.id,
					name: s.name,
					description: s.description,
					code: s.code,
					color: s.color,
					lastModified: s.lastModified,
				}),
			)

			// save v2 scripts
			await store.saveScripts(scriptsv2)

			// remove old scripts
			const oldScriptKeys = scriptsv1.map(s => s.id).filter(a => a != null)
			await remove(oldScriptKeys)

			console.log(
				`%cFinished migrating ${scriptsv2.length} script${
					scriptsv2.length === 1 ? '' : 's'
				} from v1 to v2`,
				'font-weight: bold; color: #2196f3;',
			)
		} catch (err) {
			console.error('Error migrating v1 scripts to v2', err)
			logError(err)
		}
	}
}

function logError(err: any = {}) {
	const message = err.message
	const trace = err.trace ? String(err.trace) : 'no trace :('
	const msg = `
There was an error migrating scripts to v2, please open a ticket on:

https://github.com/catc/majordomo

with the stack trace:

${message ? message : 'trace'}:
${trace}
`
	window.alert(msg)
}

export function newScript(data: Partial<Script>): Script {
	return {
		...getScriptDefaults(),
		lastModified: Date.now(),
		id: genID(),
		...data,
	}
}
