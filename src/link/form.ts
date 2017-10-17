// this is taken directly from prosemirror-example-setup
// https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/prompt.js

function getValues(fields, domFields) {
  let result = Object.create(null), i = 0
  for (let name in fields) {
    if (fields.hasOwnProperty(name)) {
      let field = fields[name], dom = domFields[i++]
      let value = field.read(dom), bad = field.validate(value)
      if (bad) {
        reportInvalid(dom, bad)
        return null
      }
      result[name] = field.clean(value)
    }
  }
  return result
}

function reportInvalid(dom, message) {
  // FIXME this is awful and needs a lot more work
  let parent = dom.parentNode
  let msg = parent.appendChild(document.createElement('div'))
  msg.style.left = (dom.offsetLeft + dom.offsetWidth + 2) + 'px'
  msg.style.top = (dom.offsetTop - 5) + 'px'
  msg.className = 'ProseMirror-invalid'
  msg.textContent = message
  setTimeout(() => parent.removeChild(msg), 1500)
}

export default function(options, wrapper, prefix) {

  let domFields = []

  for (let name in options.fields)
    domFields.push(options.fields[name].render())

  let submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.className = prefix + '-submit'
  submitButton.textContent = 'OK'

  let cancelButton = document.createElement('button')
  cancelButton.type = 'button'
  cancelButton.className = prefix + '-cancel'
  cancelButton.textContent = 'Cancel'
  cancelButton.addEventListener('click', close)

  let form = wrapper.appendChild(document.createElement('form'))

  if (options.title) form.appendChild(document.createElement('h5')).textContent = options.title
  domFields.forEach(field => {
    form.appendChild(document.createElement('div')).appendChild(field)
  })

  let buttons = form.appendChild(document.createElement('div'))
  buttons.className = prefix + '-buttons'
  buttons.appendChild(submitButton)
  buttons.appendChild(document.createTextNode(' '))
  buttons.appendChild(cancelButton)

  let box = wrapper.getBoundingClientRect()
  wrapper.style.top = ((window.innerHeight - box.height) / 2) + 'px'
  wrapper.style.left = ((window.innerWidth - box.width) / 2) + 'px'

  let submit = () => {
    let params = getValues(options.fields, domFields)
    if (params) {
      close()
      options.callback(params)
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault()
    submit()
  })

  form.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      e.preventDefault()
      close()
    } else if (e.keyCode === 13 && !(e.ctrlKey || e.metaKey || e.shiftKey)) {
      e.preventDefault()
      submit()
    } else if (e.keyCode === 9) {
      window.setTimeout(() => {
        if (!wrapper.contains(document.activeElement)) close()
      }, 500)
    }
  })

  let input = form.elements[0]
  // if (input) input.focus()
}