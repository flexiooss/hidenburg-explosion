import {ComponentSelect, ComponentSelectConfig, ItemList, ItemListBuilder} from "@flexio-oss/hidenburg";
import {PublicStoreHandler, StoreBuilder, StoreTypeParam} from "@flexio-oss/hotballoon";
import {ProxyParams} from "@flexio-oss/hotballoon/src/js/Store/StoreBuilder";
import {StorePerson} from "../stores/StorePerson";
import {PersonList} from "./PersonList";
import {PersonBuilder} from "../generated/io/flexio/component_select_person/types/Person";
import {ViewContainerPerson} from "../view/ViewContainerPerson";
import {ComponentAtmosphereLayersBuilder} from "@flexio-oss/atmosphere-layers";
import {TimePicker, TimePickerConfig} from "@flexio-oss/tea-time";

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
        new PersonBuilder().id('1').age(22).firstname('Sue').lastname('Palonion').build(),
        new PersonBuilder().id('2').age(25).firstname('Judas').lastname('Nanasse').build(),
        new PersonBuilder().id('3').age(22).firstname('René').lastname('Gat').build(),
        new PersonBuilder().id('4').age(21).firstname('Rémy').lastname('Sphere').build(),
        new PersonBuilder().id('5').age(31).firstname('Laurent').lastname('Outan').build(),
        new PersonBuilder().id('6').age(42).firstname('Dick').lastname('Sionnaire').build(),
        new PersonBuilder().id('7').age(21).firstname('Sandy').lastname('Killaw').build(),
        new PersonBuilder().id('8').age(21).firstname('Mouss').lastname('Tache').build(),
        new PersonBuilder().id('9').age(21).firstname('Maude').lastname('Erne').build(),
        new PersonBuilder().id('10').age(23).firstname('Lydie').lastname('Haut-du-Village').build(),
        new PersonBuilder().id('11').age(21).firstname('Mehdi').lastname('Zan').build(),
        new PersonBuilder().id('12').age(24).firstname('Roobie').lastname('Gnaul').build(),
        new PersonBuilder().id('13').age(31).firstname('Ali').lastname('Gator').build(),
        new PersonBuilder().id('14').age(41).firstname('Hector').lastname('Ticolis').build(),
        new PersonBuilder().id('15').age(31).firstname('Annabelle').lastname('Védaire').build(),
        new PersonBuilder().id('16').age(25).firstname('Tony').lastname('Truand').build(),
        new PersonBuilder().id('17').age(28).firstname('Aude').lastname('Vi').build(),
        new PersonBuilder().id('18').age(29).firstname('Larry').lastname('Car').build(),
        new PersonBuilder().id('19').age(20).firstname('Jean').lastname('Tourloupe').build(),
        new PersonBuilder().id('20').age(24).firstname('Homer').lastname('Dalors').build(),
        new PersonBuilder().id('11').age(28).firstname('Emma').lastname('Yonaise').build(),
        new PersonBuilder().id('22').age(26).firstname('Bart').lastname('Haba').build(),
        new PersonBuilder().id('23').age(29).firstname('Ursule').lastname('Fureux').build(),
        new PersonBuilder().id('24').age(32).firstname('Al').lastname('Colik').build(),
        new PersonBuilder().id('25').age(33).firstname('Gaspard').lastname('Touze').build(),
        new PersonBuilder().id('26').age(30).firstname('Aubin').lastname('Sahalor').build(),
        new PersonBuilder().id('27').age(30).firstname('Jean').lastname('Ticipe').build()
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

    this.__layersManager = ComponentAtmosphereLayersBuilder.build(this.__componentContext)
  }

  initViews() {
    this.__layer = this.__layersManager.addLayer()
    this.__layersManager.mountView(this.__parentNode)

    let node = this.__layersManager.getElementByLayer(this.__layer)
    this.__viewContainer = new ViewContainerPerson(this.__componentContext, node)

    let label1 = 'Select unique'
    let label2 = 'Select multiple'
    let label3 = 'Time picker'

    this.__addSelectUnique(label1)
    this.__addSelectMultiple(label2)
    this.__addTimePicker(label3)

    this.__render(label1, label2, label3)
  }

  __addSelectUnique(label) {
    this.__viewContainer.createViewItems(label, 'Peut selectionner un unique element. Fermeture automatique')

    let config = new ComponentSelectConfig()
      .withComponentContext(this.__componentContext)
      .withStore(this.__proxyStore)
      .withLayersManager(this.__layersManager)

    this.__componentSelectUnique = new ComponentSelect(config)
  }

  __addSelectMultiple(label) {
    this.__viewContainer.createViewItems(label, 'Peut selectionner plusieurs elements')

    let config = new ComponentSelectConfig()
      .withComponentContext(this.__componentContext)
      .withStore(this.__proxyStore)
      .withLayersManager(this.__layersManager)
      .withProperties({multiple: true})

    this.__componentSelectMultiple = new ComponentSelect(config)
  }

  __addTimePicker(label){
    this.__viewContainer.createViewItems(label, 'Select unique d\'heure, periode : 15')

    let config = new TimePickerConfig()
      .withLayersManager(this.__layersManager)
      .withComponentContext(this.__componentContext)
      .setPeriod(15)

    this.__timePicker = new TimePicker(config)
  }

  __render(label1, label2, label3){
    this.__viewContainer.renderAndMount()

    this.__componentSelectUnique.mountView(this.__viewContainer.getView(label1).getNode())
    this.__componentSelectMultiple.mountView(this.__viewContainer.getView(label2).getNode())
    this.__timePicker.mountView(this.__viewContainer.getView(label3).getNode())
  }

  __mapperPersonListToItemList(list) {
    let itemListBuilder = new ItemListBuilder()
    list.forEach(el => {
      itemListBuilder.addItem(el.id(), el.id(), el.firstname() + ' ' + el.lastname() + ' ' + el.age() + ' ans')
    })
    return itemListBuilder.build()
  }

}
