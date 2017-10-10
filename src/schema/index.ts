import {Schema} from 'prosemirror-model'
import {nodes, marks} from 'prosemirror-schema-basic'

nodes.group_assets = {}
// nodes.assets = {}
nodes.asset = {}
nodes.pullquote = {}
nodes.promocutoff = {}
nodes.wildcard = {}

export const schema = new Schema({nodes, marks})