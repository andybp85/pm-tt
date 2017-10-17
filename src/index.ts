import './reset.css'
import './styles.css'

import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {undo, redo, history} from 'prosemirror-history'
import {keymap} from 'prosemirror-keymap'
import {baseKeymap, chainCommands, newlineInCode, createParagraphNear, liftEmptyBlock,
  splitBlock} from 'prosemirror-commands'

import {schema, splitListItem, liftListItem, sinkListItem} from './schema'
import {menuPlugin} from './menu'
import {tooltipPlugin} from './tooltip'
import {subHeader, bold, italics, link, bullet_list, ordered_list, blockquote, sup, sub,
  specialCharacters} from './menuItems'

import {specialCharsPlugin} from './special-chars'

export const menu = menuPlugin([
  subHeader(),
  bold(),
  italics(),
  link(),
  bullet_list(),
  ordered_list(),
  blockquote(),
  sup(),
  sub(),
  specialCharacters()
])

export const tooltip = tooltipPlugin([
  subHeader(),
  bold(),
  italics(),
  link(),
  blockquote()
])

const customKeymap = {
  'Mod-z': undo,
  'Mod-y': redo,
  'Enter': splitListItem(schema.nodes.list_item),
  'Mod-[': liftListItem(schema.nodes.list_item),
  'Mod-]': sinkListItem(schema.nodes.list_item)
}

export const state = EditorState.create({
  schema,
  plugins: [
    history(),
    keymap(customKeymap),
    keymap(baseKeymap),
    menu,
    tooltip,
    specialCharsPlugin()
  ]
})

export const view = new EditorView(document.body, {state})
