import { Controller } from '@hotwired/stimulus'

export default class OptimisticFormController extends Controller {
  static targets = ['actions']

  async performActions () {
    this.element.insertAdjacentHTML(
      'beforeend', this.#render(this.actionsTarget, {
        escape,
        controller: this,
        params: this.params
      })
    )
  }

  get params () {
    return Object.fromEntries(new FormData(this.element))
  }

  #render (template, props) {
    return (new Function(
    ...Object.keys(props), `return \`${template.innerHTML}\``
    ))(...Object.values(props))
  }
}

function escape (string) {
  var div = document.createElement('div')
  div.appendChild(document.createTextNode(string))
  return div.innerHTML
}
