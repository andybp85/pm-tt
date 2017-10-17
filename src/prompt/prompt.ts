// this is taken and modified from prosemirror-example-setup
// https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/prompt.js

const prefix = 'ProseMirror-prompt'

// takes a callback and options for the callback that define the content of the prompt
export function openPrompt(callback, options = {}) {
  let wrapper = document.body.appendChild(document.createElement('div'))
  wrapper.className = prefix

  let mouseOutside = e => { if (!wrapper.contains(e.target)) close() }

  setTimeout(() => window.addEventListener('mousedown', mouseOutside), 50)

  let close = () => {
    window.removeEventListener('mousedown', mouseOutside)
    if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper)
  }

  callback(options, wrapper, prefix)

}
