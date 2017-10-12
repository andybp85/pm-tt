import {schema} from '.'

describe('schema', () => {
  it('is working', () => {
    expect(schema).toBeDefined()
  })
})

describe('List nodes', () => {
  it('will be in schema', () => {
    expect(schema.nodes.ordered_list).toBeDefined()
    expect(schema.nodes.bullet_list).toBeDefined()
    expect(schema.nodes.list_item).toBeDefined()
  })
})

describe('custom nodes', () => {
  it('will be in schema', () => {
    expect(schema.nodes.group_assets).toBeDefined()
    expect(schema.nodes.assets).toBeDefined()
    expect(schema.nodes.asset).toBeDefined()
    expect(schema.nodes.pullquote).toBeDefined()
    expect(schema.nodes.promocutoff).toBeDefined()
    expect(schema.nodes.wildcard).toBeDefined()
  })
})