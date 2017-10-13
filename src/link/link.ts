import {toggleMark} from 'prosemirror-commands'

import {schema} from '../schema'
import {TextField, openPrompt} from '../prompt'

export function linkItem() {
  return (state, dispatch) => {

    // if (markActive(state, markType)) {
    //   toggleMark(markType)(state, dispatch)
    //   return true
    // }

    if (dispatch) {

      let selectedLinkNodes = []

      state.selection.content().content.descendants(node => {
        if ( schema.marks.link.isInSet(node.marks) )
          selectedLinkNodes.push(node)
      })

      if (selectedLinkNodes.length > 0)
        toggleMark(schema.marks.link)(state, dispatch)
      else
        openPrompt({
          title: 'Create a link',
          fields: {
            href: new TextField({
              label: 'Link target',
              required: true,
              clean: (val) => {
                if (!/^https?:\/\//i.test(val))
                  val = 'http://' + val
                return val
              }
            }),
            title: new TextField({label: 'Title'})
          },
          callback(attrs) {
            toggleMark(schema.marks.link, attrs)(state, dispatch)
            // view.focus()
          }
        })
    }
    return true
  }
}