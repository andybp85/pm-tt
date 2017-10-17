import specialChars from './chars'

export function makeCharsTable(prefix) {
  // parses the array of arrays from chars.ts in to a table
  let charsTable = document.createElement('table')
  let thisRow = document.createElement('tr')
  charsTable.appendChild(thisRow)

  specialChars().forEach((value: string[], index: number) => {

    // 25 to a row
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

  // set up the special charachters table
  let charsTable = makeCharsTable(prefix)

  wrapper.appendChild( charsTable )

  // add the event listener callback
  charsTable.addEventListener('click', (e: any) => {
    if (e.target.nodeName === 'TD')
      options.callback(e.target.innerText)
  })

  // let box = wrapper.getBoundingClientRect()
  // wrapper.style.top = ((window.innerHeight - box.height) / 2) + 'px'
  // wrapper.style.left = ((window.innerWidth - box.width) / 2) + 'px'

}
