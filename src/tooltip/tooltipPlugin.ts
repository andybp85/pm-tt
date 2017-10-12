import {Plugin} from 'prosemirror-state'

import Tooltip from './Tooltip'

export function tooltipPlugin(items: object[]) {
  return new Plugin({
    view(editorView) { return new Tooltip(editorView, items) }
  })
}
// export let tooltipPlugin =