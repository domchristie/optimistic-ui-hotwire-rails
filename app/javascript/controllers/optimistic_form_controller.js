import { Controller } from '@hotwired/stimulus'
import { fill, escape, raw } from '@domchristie/composite'

export default class OptimisticFormController extends Controller {
  static targets = ['actions']

  async performActions () {
    this.element.insertAdjacentHTML(
      'beforeend', fill(this.actionsTarget, {
        controller: this,
        params: this.params
      })
    )
  }

  get params () {
    return Object.fromEntries(new FormData(this.element))
  }

  simpleFormat (text) {
    text = escape(text)
    text = text
      .replace(/\r\n?/g, '\n')
      .replace(/\n\n+/g, '</p>\n\n<p>')
      .replace(/([^\n]\n)(?=[^\n])/g, '$1<br/>')
    return raw(`<p>${text}</p>`)
  }
}
