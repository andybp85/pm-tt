import {DOMSerializer} from "prosemirror-model"

export default class DOMInO {

  private serializer: DOMSerializer

  constructor(view) {
    this.serializer = new DOMSerializer(view.state.doc)
  }

  public imSuperSerializer() {
    console.log("fire")
  }

}