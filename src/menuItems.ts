import {schema} from './schema'
import {toggleMark} from 'prosemirror-commands'
// import {domino} from './index'
// import {contentHandler} from './content-handler'

import {icon, linkItem, heading} from './menu/index'

export function subHeader() {
  return heading(2, 'H', 'Subheader')
}

export function bold() {
  return {
    command: toggleMark(schema.marks.strong),
    dom: icon('B', 'strong')
  }
}

export function italics() {
  return {
    command: toggleMark(schema.marks.em),
    dom: icon('i', 'em')
  }
}

export function blockQuote() {
  return {
    command: toggleMark(schema.marks.blockquote),
    dom: icon('>', 'blockquote')
  }
}

export function link() {
  return {
    command: linkItem(),
    dom: icon('a', 'link')
  }
}

// function d2c() {
//   return (state, dispatch) => {
//     if (dispatch) {
//       // let domino = new DOMInO(schema)
//       // let frag = domino.serialize(state.doc.content)
//       // console.log( frag )
//       contentHandler()
//     }
//     return true
//   }
// }
//
// export function domToConsole() {
//   return {
//     command: d2c(),
//     dom: icon('dc', 'serialize`')
//   }
// }