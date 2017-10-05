import {EditorState} from "prosemirror-state"
import {schema} from "prosemirror-schema-basic"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"

import {menuPlugin, subHeader, bold} from "./menu/index"
import {TooltipPlugin} from "./tooltip/index"

let tooltip = TooltipPlugin

let menu = menuPlugin([
  subHeader(),
  bold()
])

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
