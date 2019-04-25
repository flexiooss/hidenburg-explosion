import {assertType, FlexArray} from "flexio-jshelpers";
import {Person} from "../generated/io/flexio/component_select_person/types/Person";

export class PersonList extends FlexArray {
  _validate(v) {
    assertType(v instanceof Person, 'PersonList: input should be an instance of Person')
  }

}
