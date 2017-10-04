import {EditorView} from "prosemirror-view"

export default class MenuView {

    private items: Array<any>
    private editorView: EditorView
    public dom: Element

    constructor(items, editorView) {
        this.items = items
        this.editorView = editorView

        this.dom = document.createElement("div")
        this.dom.className = "menubar"
        items.forEach(({dom}) => this.dom.appendChild(dom))
        this.update()

        this.dom.addEventListener("mousedown", e => {
            e.preventDefault()
            editorView.focus()
            items.forEach(({command, dom}) => {
                if (dom.contains(e.target))
                    command(editorView.state, editorView.dispatch, editorView)
            })
        })
    }

    public update() {
        this.items.forEach(({command, dom}) => {
            let active = command(this.editorView.state, null, this.editorView)
            dom.style.display = active ? "" : "none"
        })
    }

    public destroy() { this.dom.remove() }
}
