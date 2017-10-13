import {Plugin} from 'prosemirror-state'

import {specialChars} from './specialChars'

export function specialCharsPlugin(items: object[]) {
  return new Plugin({
    view(editorView) { return new specialChars(editorView, items) }
  })
}