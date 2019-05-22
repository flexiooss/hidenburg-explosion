import {Selector} from 'testcafe';

export default class Page {
  constructor() {
    this.inputU = Selector('#HidenburgExplosion-hb_2-hb_2_3-button')
    this.closeU = Selector('#HidenburgExplosion-hb_2-hb_2_4-close')
    this.layerU = Selector('#HidenburgExplosion-hb_2-hb_2_1-layer_2')
    this.listU = Selector('#HidenburgExplosion-hb_2-hb_2_4-list')
    this.itemU1 = Selector('#HidenburgExplosion-hb_2-hb_2_4-item-1')
    this.itemU2 = Selector('#HidenburgExplosion-hb_2-hb_2_4-item-2')
    this.selectedItemsU = Selector('#HidenburgExplosion-hb_2-hb_2_4-selected_items')

    this.inputM = Selector('#HidenburgExplosion-hb_2-hb_2_5-button')
    this.closeM = Selector('#HidenburgExplosion-hb_2-hb_2_6-close')
    this.layerM = Selector('#HidenburgExplosion-hb_2-hb_2_1-layer_3')
    this.listM = Selector('#HidenburgExplosion-hb_2-hb_2_6-list')
    this.itemM1 = Selector('#HidenburgExplosion-hb_2-hb_2_6-item-1')
    this.itemM2 = Selector('#HidenburgExplosion-hb_2-hb_2_6-item-2')
    this.selectedItemsM = Selector('#HidenburgExplosion-hb_2-hb_2_6-selected_items')

  }
}
