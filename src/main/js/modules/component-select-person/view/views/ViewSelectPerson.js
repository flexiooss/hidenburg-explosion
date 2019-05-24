import {e, View} from '@flexio-oss/hotballoon'
import {camelCase} from 'flexio-jshelpers'

export class ViewSelectPerson extends View {
  /**
   *
   * @param {ViewContainer} viewContainer
   * @param {string} label
   * @param {string} description
   */
  constructor(viewContainer, label, description) {
    super(viewContainer)

    this.__node = null
    this.__label = label
    this.__description = description
  }

  template() {
    this.__node = this.html(
      e('div#container')
    )

    return this.html(
      e('div#' + camelCase(this.__label, ' '))
        .childNodes(
          this.html(
            e('h3')
              .text(this.__label)
          ),
          this.html(
            e('p#description')
              .text(this.__description)
          ),
          this.__node
        )
    )
  }

  getNode() {
    return this.__node
  }
}
