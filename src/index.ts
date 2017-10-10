import './styles.css'
import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {undo, redo, history} from 'prosemirror-history'
import {keymap} from 'prosemirror-keymap'
import {baseKeymap} from 'prosemirror-commands'

import {schema} from './schema'
import {menuPlugin} from './menu'
import {subHeader, bold, link} from './menuItems'
import {tooltipPlugin} from './tooltip'
// import {dominoPlugin} from './content-handler'

// let content-handler = dominoPluin

console.log(process.env.TEST_VAR)

export let menu = menuPlugin([
  subHeader(),
  bold(),
  link()
])

export let tooltip = tooltipPlugin

// export let domino = dominoPlugin


export let state = EditorState.create({
  schema,
  plugins: [
    history(),
    keymap({'Mod-z': undo, 'Mod-y': redo}),
    keymap(baseKeymap),
    menu,
    tooltip
  ]
})

export let view = new EditorView(document.body, {state})
