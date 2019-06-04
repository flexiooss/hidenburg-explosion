import {Person} from "../generated/io/flexio/component_select_person/types/Person";
import {FlexArray} from "@flexio-oss/flex-types"
import {assertType} from "@flexio-oss/assert";

export class PersonList extends FlexArray {
  _validate(v) {
    assertType(v instanceof Person, 'PersonList: input should be an instance of Person')
  }

}
