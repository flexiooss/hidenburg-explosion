import {ViewContainer, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewSelectPerson} from "./views/ViewSelectPerson";

export class ViewContainerPerson extends ViewContainer {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param parentNode

   */
  constructor(componentContext, parentNode) {
    let id = componentContext.nextID()
    let constructorConfig = new ViewContainerParameters(componentContext, id, parentNode)
    super(constructorConfig)

    this.__views = new Map()
  }

  /**
   * @param {string} label
   * @param {string} description
   */
  createViewItems(label, description) {
    let view = this.addView(new ViewSelectPerson(this, label, description))
    this.__views.set(label, view)
  }


  /**
   * @param {string} label
   */
  getView(label) {
    return this.__views.get(label)
  }
}
