import {schema} from "prosemirror-schema-basic"
import {toggleMark} from "prosemirror-commands"

import {icon, linkItem, heading} from "./menu/index"

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

export function link() {
  return {
    command: linkItem(),
    dom: icon("a", "link")
  }
}