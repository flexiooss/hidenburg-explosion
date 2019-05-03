import {e, View} from 'hotballoon'
import {camelCase} from 'flexio-jshelpers'

export class ViewSelectPerson extends View {
  /**
   *
   * @param {ViewContainer} viewContainer
   * @param {string} label
   */
  constructor(viewContainer, label) {
    super(viewContainer)

    this.__node = null
    this.__label = label
  }

  template() {
    this.__node = this.html(
      e('div#container')
    )

    console.log(this.__node)

    return this.html(
      e('div#' + camelCase(this.__label, ' '))
        .childNodes(
          this.html(
            e('h3')
              .text(this.__label)
          ),
          this.__node
        )
    )
  }

  getNode() {
    return this.__node
  }
}
