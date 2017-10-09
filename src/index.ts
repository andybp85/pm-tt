import {EditorState} from "prosemirror-state"
import {schema} from "prosemirror-schema-basic"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"

import {menuPlugin} from "./menu"
import {subHeader, bold, link, domToConsole} from "./menuItems"
import {tooltipPlugin} from "./tooltip"
import {dominoPlugin} from "./domino"

// let domino = dominoPluin

export let menu = menuPlugin([
  subHeader(),
  bold(),
  link(),
  domToConsole()
])

export let tooltip = tooltipPlugin


export let state = EditorState.create({
  schema,
  plugins: [
    history(),
    keymap({"Mod-z": undo, "Mod-y": redo}),
    keymap(baseKeymap),
    menu,
    tooltip
  ]
})

export let view = new EditorView(document.body, {state})
