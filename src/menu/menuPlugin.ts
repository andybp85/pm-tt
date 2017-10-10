import {Plugin} from 'prosemirror-state'
import {MenuView} from './MenuView'

export function menuPlugin(items) {
  return new Plugin({
    view(editorView) {
      const menuView = new MenuView(items, editorView)
      editorView.dom.parentNode.insertBefore(menuView.dom, editorView.dom)
      return menuView
    }
  })
}
