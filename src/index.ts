// import './style.css'
import {EditorState} from "prosemirror-state"
import {schema} from "prosemirror-schema-basic"
import {EditorView} from "prosemirror-view"


let options = {
  schema: schema,
  floatingMenu: false
}


let state = EditorState.create({
  schema,
  plugins: []
})

let view = new EditorView(document.body, {state})
