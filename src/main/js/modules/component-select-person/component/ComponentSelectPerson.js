import {ComponentSelect, ComponentSelectConfig, ItemList, ItemListBuilder} from "hidenburg";
import {PublicStoreHandler, StoreBuilder, StoreTypeParam} from "hotballoon";
import {ProxyParams} from "hotballoon/src/js/Store/StoreBuilder";
import {StorePerson} from "../stores/StorePerson";
import {PersonList} from "./PersonList";
import {PersonBuilder} from "../generated/io/flexio/component_select_person/types/Person";
import {ViewContainerPerson} from "../view/ViewContainerPerson";

export class ComponentSelectPerson {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Element} parentNode
   */
  constructor(componentContext, parentNode) {
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    let store = new StorePerson(componentContext)
    this.__store = store.getStore()
    this.__publicStore = store.getStorePublic()
    this.__store.set(
      new PersonList(
        new PersonBuilder().id('1').age(22).firstname('Romain').lastname('Merakni').build(),
        new PersonBuilder().id('2').age(25).firstname('Timothé').lastname('Jonneat').build(),
        new PersonBuilder().id('3').age(22).firstname('Camille').lastname('Bronu').build(),
        new PersonBuilder().id('4').age(21).firstname('Thomas').lastname('Hayhay').build(),
        new PersonBuilder().id('5').age(21).firstname('Fabrice').lastname('Bechaut').build(),
        new PersonBuilder().id('6').age(21).firstname('Nicolas').lastname('Grandlen').build()
      )
    )

    this.__proxyStore = StoreBuilder.Proxy(
      new ProxyParams(
        new StoreTypeParam(
          ItemList,
          () => {
          },
          () => true,
          o => o
        ),
        new PublicStoreHandler(this.__store),
        (list) => this.__mapperPersonListToItemList(list)
      )
    )

    let configSelect = new ComponentSelectConfig()
      .withComponentContext(componentContext)
      .withStore(this.__proxyStore)

    this.__componentSelectUnique = new ComponentSelect(configSelect)

    configSelect.withProperties({multiple: true})
    this.__componentSelectMultiple = new ComponentSelect(configSelect)
  }

  initViews() {
    this.__viewContainer = new ViewContainerPerson(this.__componentContext, this.__parentNode)

    let label1 = 'Select unique'
    let label2 = 'Select multiple'
    this.__viewContainer.createViewItems(label1, 'Peut selectionner un unique element. Fermeture non automatique')
    this.__viewContainer.createViewItems(label2, 'Peut selectionner plusieurs elements')
    this.__viewContainer.renderAndMount()

    this.__componentSelectUnique.initView(this.__viewContainer.getView(label1).getNode())
    this.__componentSelectMultiple.initView(this.__viewContainer.getView(label2).getNode())
  }

  __mapperPersonListToItemList(list) {
    let itemListBuilder = new ItemListBuilder()
    list.forEach(el => {
      itemListBuilder.addItem(el.id(), el.id(), el.firstname() + ' ' + el.lastname() + ' ' + el.age() + ' ans')
    })
    return itemListBuilder.build()
  }

}
