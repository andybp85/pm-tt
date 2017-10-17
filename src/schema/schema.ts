import {Schema} from 'prosemirror-model'
import {schema as baseSchema, marks} from 'prosemirror-schema-basic'
import {addListNodes} from 'prosemirror-schema-list'

let nodes = addListNodes(baseSchema.spec.nodes, 'paragraph (ordered_list | bullet_list)*', 'block')
    .append({
        pullquote: baseSchema.spec.nodes.get('blockquote'),
        group_assets: {},
        assets: {},
        asset: {},
        promocutoff: {},
        wildcard: {}
    })

marks.sup = {
    parseDOM: [{tag: 'sup'}],
    toDOM() { return ['sup'] }
}

marks.sub = {
    parseDOM: [{tag: 'sub'}],
    toDOM() { return ['sub'] }
}

// export our entire schema and the helpers from the list schema
export const schema = new Schema({nodes, marks})