import {EditorView} from 'prosemirror-view'

import specialChars from './chars'

import {specialCharsDOM} from './specialChars'

export class SpecialCharsView {

  private specialChars: string[][]
  public dom: HTMLDivElement

  constructor(editorView: EditorView) {

    this.specialChars = specialChars()

    this.dom = document.body.appendChild(specialCharsDOM)
    this.dom.style.display = 'none'
    this.dom.className = 'special-characters'

    let table = this.populateTable(document.createElement('table'))
    this.dom.appendChild(table)

    table.addEventListener('click', (e: any) => {
      if (e.target.nodeName === 'TD') {
        let tr = editorView.state.tr.insertText(e.target.innerText)
        let newState = editorView.state.apply(tr)
        editorView.updateState(newState)
      }
    })

  }

  public update() {
    this.dom.style.display = 'none'
  }

  public destroy() { this.dom.remove() }

  private populateTable(table: HTMLTableElement) {

    let thisRow = document.createElement('tr')
    table.appendChild(thisRow)

    // iterate over the special characters and...
    this.specialChars.forEach((value, index) => {
      // ...25 to a row...
      if (index > 0  && index % 25 === 0) {
        thisRow = document.createElement('tr')
        table.appendChild(thisRow)
      }

      // ...add each char in its own cell
      let cell = document.createElement('td')
      thisRow.appendChild(cell)

      cell.title = value[0]
      cell.innerText = value[1]
    })

    return table
  }

}

