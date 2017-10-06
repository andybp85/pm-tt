import {EditorState} from "prosemirror-state"
import {schema} from "prosemirror-schema-basic"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"

import {menuPlugin} from "./menu"
import {subHeader, bold, link} from "./menuItems"
import {tooltipPlugin} from "./tooltip"
import {dominoPlugin} from "./domino"

let domino = dominoPlugin

let menu = menuPlugin([
  subHeader(),
  bold(),
  link()
])

let tooltip = tooltipPlugin


let state = EditorState.create({
  schema,
  plugins: [
    history(),
    keymap({"Mod-z": undo, "Mod-y": redo}),
    keymap(baseKeymap),
    menu,
    tooltip,
    domino
  ]
})

let view = new EditorView(document.body, {state})
