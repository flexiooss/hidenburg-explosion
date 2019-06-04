import {e, View, RECONCILIATION_RULES} from '@flexio-oss/hotballoon'
import {camelCase} from "@flexio-oss/js-type-helpers";

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
              .reconciliationRules(
                RECONCILIATION_RULES.BYPASS
              )
          ),
          this.html(
            e('p#description')
              .text(this.__description)
              .reconciliationRules(
                RECONCILIATION_RULES.BYPASS
              )
          ),
          this.__node
        )
    )
  }

  getNode() {
    return this.__node
  }
}
