import {Plugin} from "prosemirror-state"

import Tooltip from "./tooltip"

export let TooltipPlugin = new Plugin({
  view(editorView) { return new Tooltip(editorView) }
})