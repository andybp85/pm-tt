import {EditorState} from "prosemirror-state"
import {schema} from "prosemirror-schema-basic"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"

import {menu} from "./menu/index"
import {tooltip} from "./tooltip/index"

// let options = {
//   schema,
//   floatingMenu: false
// }

let state = EditorState.create({
  schema,
  plugins: [
    history(),
    keymap({"Mod-z": undo, "Mod-y": redo}),
    keymap(baseKeymap),
    menu,
    tooltip
  ]
})

let view = new EditorView(document.body, {state})
