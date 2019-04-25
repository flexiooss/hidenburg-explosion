import {ComponentSelect, ComponentSelectConfig, ItemList, ItemListBuilder} from "hidenburg";
import {PublicStoreHandler, StoreBuilder, StoreTypeParam} from "hotballoon";
import {ProxyParams} from "hotballoon/src/js/Store/StoreBuilder";
import {StorePerson} from "../stores/StorePerson";
import {PersonList} from "./PersonList";
import {PersonBuilder} from "../generated/io/flexio/component_select_person/types/Person";

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
    console.log(this.__publicStore)
    this.__store.set(
      new PersonList(new PersonBuilder().id('1').age(24).firstname('Romain').lastname('Mekarni').build(),
        new PersonBuilder().id('2').age(25).firstname('Thomas').lastname('Chatelain').build())
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
    console.log(this.__proxyStore)
    let configSelect = new ComponentSelectConfig()
      .withComponentContext(componentContext)
      .withParentNode(parentNode)
      .withProxyStore(this.__proxyStore)

    this.__componentSelect = new ComponentSelect(configSelect)
    this.__componentSelect.initView()
  }

  initViews() {

  }

  __mapperPersonListToItemList(list) {
    let itemListBuilder = new ItemListBuilder()
    list.forEach(el => {
      itemListBuilder.addItem(el.id(), el.firstname() + ' ' + el.lastname() + ' ' + el.age() + ' ans')
    })
    console.log(itemListBuilder)
    return itemListBuilder.build()
  }

}
