import {toggleMark, setBlockType, wrapIn} from "prosemirror-commands"
import {schema} from "prosemirror-schema-basic"
import {NodeSelection} from "prosemirror-state"

// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// this is taken from setBlockType, semantics updated, changes are noted
function toggleBlockType(nodeType, attrs) {
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

// Helper function to create menu icons
function icon(text, name) {
  let span = document.createElement("span")
  span.className = "menuicon " + name
  span.title = name
  span.textContent = text
  return span
}

// function headingToggle(level, state) {
//   if (state.selection.$from.parent.hasMarkup(schema.nodes.heading, {level}))
//   console.log(state.selection.node)
//   setBlockType(schema.nodes.heading, {level})
// }

export function heading(level, thisIcon, thisName) {
  return {
    command: toggleBlockType(schema.nodes.heading, {level}),
    dom: icon(thisIcon, thisName)
  }
}

export function subHeader() {
  return heading(2, "H", "Subheader")
}

export function bold() {
    return {
      command: toggleMark(schema.marks.strong),
      dom: icon("B", "strong")
    }
}

export function italics() {
  return {
    command: toggleMark(schema.marks.em),
    dom: icon("i", "em")
  }
}

export function blockQuote() {
  return {
    command: toggleMark(schema.marks.blockquote),
    dom: icon(">", "blockquote")
  }
}
