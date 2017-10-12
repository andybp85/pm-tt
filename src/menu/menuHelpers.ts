import {toggleMark, setBlockType, wrapIn} from 'prosemirror-commands'
import {schema, wrapInList} from '../schema'
import {NodeSelection} from 'prosemirror-state'

import {TextField, openPrompt} from '../prompt'
// import {MenuItem} from './MenuItem'

// function markActive(state, type) {
//   let {from, $from, to, empty} = state.selection
//   if (empty) return type.isInSet(state.storedMarks || $from.marks())
//   else return state.doc.rangeHasMark(from, to, type)
// }

// Helper function to create menu icons
export function icon(text, name) {
  let span = document.createElement('span')
  span.className = 'menuicon ' + name
  span.title = name
  span.textContent = text
  return span
}

// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// this is taken from setBlockType, semantics updated, changes are noted
export function toggleBlockType(nodeType: Node, attrs = {}) {
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

export function linkItem() {
  return (state, dispatch) => {

    // if (markActive(state, markType)) {
    //   toggleMark(markType)(state, dispatch)
    //   return true
    // }

    if (dispatch) {

      let selectedLinkNodes = []

      state.selection.content().content.descendants(node => {
        if ( schema.marks.link.isInSet(node.marks) )
          selectedLinkNodes.push(node)
      })

      if (selectedLinkNodes.length > 0)
        toggleMark(schema.marks.link)(state, dispatch)
      else
        openPrompt({
          title: 'Create a link',
          fields: {
            href: new TextField({
              label: 'Link target',
              required: true,
              clean: (val) => {
                if (!/^https?:\/\//i.test(val))
                  val = 'http://' + val
                return val
              }
            }),
            title: new TextField({label: 'Title'})
          },
          callback(attrs) {
            toggleMark(schema.marks.link, attrs)(state, dispatch)
            // view.focus()
          }
        })
    }
    return true
  }
}

export function heading(level, headingIcon, headingName) {
  return {
    command: toggleBlockType(schema.nodes.heading, {level}),
    dom: icon(headingIcon, headingName)
  }
}