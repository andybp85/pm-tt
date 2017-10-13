import {toggleMark, wrapIn, setBlockType} from 'prosemirror-commands'
import {NodeSelection} from 'prosemirror-state'

import {schema, wrapInList} from './schema'
import {linkItem} from './link'
import {specialChars} from './special-chars'

// import {domino} from './index'
// import {contentHandler} from './content-handler'

// function markActive(state, type) {
//   let {from, $from, to, empty} = state.selection
//   if (empty) return type.isInSet(state.storedMarks || $from.marks())
//   else return state.doc.rangeHasMark(from, to, type)
// }

// Helper function to create menu icons
function icon(text, name) {
  let span = document.createElement('span')
  span.className = 'menuicon ' + name
  span.title = name
  span.textContent = text
  return span
}

// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// this is taken from setBlockType, semantics updated, changes are noted
function toggleBlockType(nodeType: Node, attrs = {}) {
  return (state, dispatch) => {
    let ref = state.selection
    let $from = ref.$from
    let $to = ref.$to
    let depth, target
    if (state.selection instanceof NodeSelection) {
      depth = $from.depth
      target = state.selection.node
    } else {
      if (!$from.depth || $to.pos > $from.end())
        return false
      depth = $from.depth - 1
      target = $from.parent
    }
    if (!target.isTextblock)
      return false

    let index = $from.index(depth)
    if (!$from.node(depth).canReplaceWith(index, index + 1, nodeType))
      return false
    if (dispatch) {
      let where = $from.before(depth + 1)

      // this part is different, - revert to p if it's already a whatever node
      // this might be better to do with history
      if (target.hasMarkup(nodeType, attrs)) {                      // tslint:disable-line curly
        dispatch(state.tr
          .clearIncompatible(where, nodeType)
          .setNodeMarkup(where, schema.nodes.paragraph, attrs)
          .scrollIntoView())
      } else {                                                      // tslint:disable-line curly
        dispatch(state.tr
          .clearIncompatible(where, nodeType)
          .setNodeMarkup(where, nodeType, attrs)
          .scrollIntoView())
      }

    }
    return true
  }
}

function heading(level, headingIcon, headingName) {
  return {
    command: toggleBlockType(schema.nodes.heading, {level}),
    dom: icon(headingIcon, headingName)
  }
}

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

export function specialCharacters() {
  return {
    command: specialChars(),
    dom: icon('Ω', 'Special Chars')
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
