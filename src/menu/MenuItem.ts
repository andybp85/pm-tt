// import crel from "crel"
//
// const prefix = "ProseMirror-menu"
// const XLINK = "http://www.w3.org/1999/xlink"
// const SVG = "http://www.w3.org/2000/svg"
//
// function hashPath(path) {
//   let hash = 0
//   for (let i = 0; i < path.length; i++)
//     hash = (((hash << 5) - hash) + path.charCodeAt(i)) | 0
//   return hash
// }
//
// function buildSVG(name, data) {
//   let collection = document.getElementById(prefix + "-collection")
//   if (!collection) {
//     collection = document.createElementNS(SVG, "svg")
//     collection.id = prefix + "-collection"
//     collection.style.display = "none"
//     document.body.insertBefore(collection, document.body.firstChild)
//   }
//   let sym = document.createElementNS(SVG, "symbol")
//   sym.id = name
//   sym.setAttribute("viewBox", "0 0 " + data.width + " " + data.height)
//   let path = sym.appendChild(document.createElementNS(SVG, "path"))
//   path.setAttribute("d", data.path)
//   collection.appendChild(sym)
// }
//
// export function getIcon(icon) {
//   let node = document.createElement("div")
//   node.className = prefix
//   if (icon.path) {
//     let name = "pm-icon-" + hashPath(icon.path).toString(16)
//     if (!document.getElementById(name)) buildSVG(name, icon)
//     let svg = node.appendChild(document.createElementNS(SVG, "svg"))
//     svg.style.width = (icon.width / icon.height) + "em"
//     let use = svg.appendChild(document.createElementNS(SVG, "use"))
//     use.setAttributeNS(XLINK, "href", /([^#]*)/.exec(document.location)[1] + "#" + name)
//   } else if (icon.dom) {
//     node.appendChild(icon.dom.cloneNode(true))
//   } else {
//     node.appendChild(document.createElement("span")).textContent = icon.text || ''
//     if (icon.css) node.firstChild.style.cssText = icon.css
//   }
//   return node
// }
//
// function translate(view, text) {
//   return view._props.translate ? view._props.translate(text) : text
// }
//
// // ::- An icon or label that, when clicked, executes a command.
// export class MenuItem {
//   // :: (MenuItemSpec)
//   constructor(spec) {
//     // :: MenuItemSpec
//     // The spec used to create the menu item.
//     this.spec = spec
//   }
//
//   // :: (EditorView) → {dom: dom.Node, update: (EditorState) → bool}
//   // Renders the icon according to its [display
//   // spec](#menu.MenuItemSpec.display), and adds an event handler which
//   // executes the command when the representation is clicked.
//   render(view) {
//     let spec = this.spec
//     let dom = spec. icon ? getIcon(spec.icon)
//       : spec.label ? crel("div", null, translate(view, spec.label))
//         : null
//     if (!dom) throw new RangeError("MenuItem without icon or label property")
//     if (spec.title) {
//       const title = (typeof spec.title === "function" ? spec.title(view.state) : spec.title)
//       dom.setAttribute("title", translate(view, title))
//     }
//     if (spec.class) dom.classList.add(spec.class)
//     if (spec.css) dom.style.cssText += spec.css
//
//     dom.addEventListener("mousedown", e => {
//       e.preventDefault()
//       spec.run(view.state, view.dispatch, view, e)
//     })
//
//     function update(state) {
//       if (spec.select) {
//         let selected = spec.select(state)
//         dom.style.display = selected ? "" : "none"
//         if (!selected) return false
//       }
//       let enabled = true
//       if (spec.enable) {
//         enabled = spec.enable(state) || false
//         dom.classList.toggle(prefix + "-disabled", !enabled)
//       }
//       if (spec.active) {
//         let active = enabled && spec.active(state) || false
//         dom.classList.toggle(prefix + "-active", active)
//       }
//       return true
//     }
//
//     return {dom, update}
//   }
// }