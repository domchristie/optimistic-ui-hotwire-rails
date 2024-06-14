import { Controller } from '@hotwired/stimulus'
import { fill } from '@domchristie/composite'

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
}
