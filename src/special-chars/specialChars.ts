import {EditorView} from 'prosemirror-view'
import {Plugin} from 'prosemirror-state'

import {openPrompt} from '../prompt'

import charsMenu from './charsMenu'

import {view} from '..'

export function specialChars() {
  return (state, dispatch) => {

    if (dispatch)
      openPrompt( charsMenu, {
       callback: (specChar: string) => {
         let tr = state.tr.insertText(specChar)
         view.updateState(state.apply(tr))
       }
      })

    return true
  }
}
