const prefix = 'ProseMirror-prompt'

export function openPrompt(callback, options) {
  let wrapper = document.body.appendChild(document.createElement('div'))
  wrapper.className = prefix

  callback(options, wrapper, prefix)

}
