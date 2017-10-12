import {schema, wrapInList} from './schema'
import {toggleMark, wrapIn} from 'prosemirror-commands'
// import {domino} from './index'
// import {contentHandler} from './content-handler'

import {icon, linkItem, heading, toggleBlockType} from './menuHelpers'

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

export function blockquote() {
  return {
    command: wrapIn(schema.nodes.blockquote),
    dom: icon('"', 'blockquote')
  }
}

export function bullet_list() {
  return {
    command: wrapInList(schema.nodes.bullet_list),
    dom: icon('u', 'bullet list')
  }
}

export function ordered_list() {
  return {
    command: wrapInList(schema.nodes.ordered_list),
    dom: icon('o', 'ordered list')
  }
}

export function sup() {
  return {
    command: toggleMark(schema.marks.sup),
    dom: icon('∧', 'superscript')
  }
}

export function sub() {
  return {
    command: toggleMark(schema.marks.sub),
    dom: icon('∨', 'subscript')
  }
}

//////////////////////////////////////////////////
export function pullquote() {
  return {
    command: wrapIn(schema.nodes.pullquote),
    dom: icon('>', 'pullquote')
  }
}

export function link() {
  return {
    command: linkItem(),
    dom: icon('o-o', 'link')
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

