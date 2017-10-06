import {Plugin} from "prosemirror-state"

import IoDom from "./DOMInO"

export let dominoPlugin = new Plugin({
  view(editorView) { return new IoDom(editorView) }
})