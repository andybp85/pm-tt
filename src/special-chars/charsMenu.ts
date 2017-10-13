import {specialChars} from './chars'

function makeCharsTable(prefix) {
  let charsTable = document.createElement('table')
  let thisRow = document.createElement('tr')
  charsTable.appendChild(thisRow)

  specialChars.forEach((value: string[], index: number) => {

    if (index > 0  && index % 25 === 0) {
      thisRow = document.createElement('tr')
      charsTable.appendChild(thisRow)
    }

    let cell = document.createElement('td')
    cell.title = value[0]
    cell.innerText = value[1]
    thisRow.appendChild(cell)
  })

  charsTable.className = prefix + '-special-characters'

  return charsTable
}

export default function(options, wrapper, prefix) {

  let charsTable = makeCharsTable(prefix)

  wrapper.appendChild( charsTable )

  charsTable.addEventListener('click', (e: any) => {
    if (e.target.nodeName === 'TD')
      options.callback(e.target.innerText)
  })

  let box = wrapper.getBoundingClientRect()
  wrapper.style.top = ((window.innerHeight - box.height) / 2) + 'px'
  wrapper.style.left = ((window.innerWidth - box.width) / 2) + 'px'

}
