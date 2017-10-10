import {schema} from '.'

describe('schema', () => {
  it('is working', () => {
    expect(schema).toBeDefined()
  })
})

describe('custom nodes', () => {
  it('will be in schema', () => {
    expect(schema.nodes.group_assets).toBeDefined()
    // expect(schema.nodes.assets).toBeDefined()
    expect(schema.nodes.asset).toBeDefined()
    expect(schema.nodes.pullquote).toBeDefined()
    expect(schema.nodes.promocutoff).toBeDefined()
    expect(schema.nodes.wildcard).toBeDefined()
  })
})