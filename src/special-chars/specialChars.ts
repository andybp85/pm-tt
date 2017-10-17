import {EditorView} from 'prosemirror-view'
import {Plugin} from 'prosemirror-state'

export const specialCharsDOM = document.createElement('div')
specialCharsDOM.className = 'ProseMirror-prompt'

export function specialChars() {
  return (state, dispatch) => {

    if (dispatch) {

      specialCharsDOM.style.display = 'block'

      // let closeIfOutside = (e) => {
      //   if (!specialCharsDOM.contains(e.target) && specialCharsDOM.style.display === 'block') {
      //     specialCharsDOM.style.display = 'none'
      //     window.removeEventListener('mousedown', closeIfOutside)
      //   }
      // }
      // setTimeout(() => window.addEventListener('mousedown',  closeIfOutside), 5)

      // let mouseOutside = e => { close() }
      //
      // setTimeout(() => window.addEventListener('mousedown', mouseOutside), 50)
      //
      // let close = () => {
      //   window.removeEventListener('mousedown', mouseOutside)
      //   specialCharsDOM.style.display = 'none'
      // }

    }

    return true
  }
}
