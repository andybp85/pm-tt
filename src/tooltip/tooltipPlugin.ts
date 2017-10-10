import {Plugin} from 'prosemirror-state'

import Tooltip from './Tooltip'

export let tooltipPlugin = new Plugin({
  view(editorView) { return new Tooltip(editorView) }
})