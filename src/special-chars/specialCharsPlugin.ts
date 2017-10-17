import {Plugin} from 'prosemirror-state'
import {SpecialCharsView} from "./SpecialCharsView"

export function specialCharsPlugin() {
  return new Plugin({
    // props : {
    //   handleDOMEvents: {
    //     click: (view, event) => {
    //       console.log(event)
    //     }
    //   }
      // handleClickOn(editorView, pos, node, nodePos, event, direct) {
      //   console.log(editorView)
      // }
    // },
    view(editorView) {
      const specialCharsView = new SpecialCharsView(editorView)
      editorView.dom.parentNode.appendChild(specialCharsView.dom)
      return specialCharsView
    }
  })
}
