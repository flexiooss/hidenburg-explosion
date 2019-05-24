import {InMemoryStoreParams, PublicStoreHandler, StoreTypeParam} from "@flexio-oss/hotballoon";
import {PersonList} from "../component/PersonList";
import {StoreBuilder} from "@flexio-oss/hotballoon/src/js/Store/StoreBuilder";

export class StorePerson {
  constructor(componentContext) {
    this.__componentContext = componentContext

    this.__store = this.__componentContext.addStore(
      StoreBuilder.InMemory(
        new InMemoryStoreParams(
          new StoreTypeParam(
            PersonList,
            (data) => {
              return data
            },
            (data) => {
              return true
            },
            (obj) => {

            }
          ), new PersonList()
        )
      ))
    this.__storePublic = new PublicStoreHandler(this.__store)
  }

  /**
   * @returns {StoreInterface<PersonList>}
   */
  getStorePublic() {
    return this.__storePublic
  }

  /**
   * @returns {Store<PersonList>}
   */
  getStore() {
    return this.__store
  }
}
