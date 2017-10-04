import {toggleMark, setBlockType, wrapIn} from "prosemirror-commands"
import {schema} from "prosemirror-schema-basic"

import {menuPlugin} from "./menuPlugin"

// Helper function to create menu icons
function icon(text, name) {
  let span = document.createElement("span")
  span.className = "menuicon " + name
  span.title = name
  span.textContent = text
  return span
}

function heading(level, thisIcon, thisName) {
  return {
    command: setBlockType(schema.nodes.heading, {level}),
    dom: icon(thisIcon, thisName)
  }
}

function subHeader() {
  return heading(2, "H", "Subheader")
}

function bold() {
    return {
      command: toggleMark(schema.marks.strong),
      dom: icon("B", "strong")
    }
}

function italics() {
  return {
    command: toggleMark(schema.marks.em),
    dom: icon("i", "em")
  }
}

function blockQuote() {
  return {
    command: toggleMark(schema.marks.blockquote),
    dom: icon(">", "blockquote")
  }
}

export let menu = menuPlugin([
  subHeader(),
  bold()
])
