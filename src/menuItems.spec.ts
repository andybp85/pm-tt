import {subHeader, bold, italics, pullquote, link} from './menuItems'

describe('Test menu items import', () => {
  it('working', () => {
    expect(subHeader).toBeDefined()
    expect(bold).toBeDefined()
    expect(italics).toBeDefined()
    expect(pullquote).toBeDefined()
    expect(link).toBeDefined()
  })
})

describe('Test italics', () => {
  it('working', () => {
    let i = italics()
    expect(i.dom).toMatch('em')
    // console.log(i.command)
})
})