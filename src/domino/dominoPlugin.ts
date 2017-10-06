import {Plugin} from "prosemirror-state"

import DOMInO from "./DOMInO"

export let dominoPlugin = new Plugin({
  view(editorView) { return new DOMInO(editorView) }
})