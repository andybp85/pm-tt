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

// Create an icon for a heading at the given level
function heading(level) {
    return {
        command: setBlockType(schema.nodes.heading, {level}),
        dom: icon("H" + level, "heading")
    }
}

export let menu = menuPlugin([
    {command: toggleMark(schema.marks.strong), dom: icon("B", "strong")},
    {command: toggleMark(schema.marks.em), dom: icon("i", "em")},
    {command: setBlockType(schema.nodes.paragraph), dom: icon("p", "paragraph")},
    heading(1), heading(2), heading(3),
    {command: wrapIn(schema.nodes.blockquote), dom: icon(">", "blockquote")}
])
