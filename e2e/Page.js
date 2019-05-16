import {Selector} from 'testcafe';

export default class Page {
  constructor() {
    this.inputU = Selector('#HidenburgExplosion-hb_2-hb_2_2-inputHB')
    this.listU = Selector('#HidenburgExplosion-hb_2-hb_2_2-listHB')
    this.itemU1 = Selector('#HidenburgExplosion-hb_2-hb_2_2-item-1')
    this.itemU2 = Selector('#HidenburgExplosion-hb_2-hb_2_2-item-2')

    this.inputM = Selector('#HidenburgExplosion-hb_2-hb_2_3-inputHB')
    this.listM = Selector('#HidenburgExplosion-hb_2-hb_2_3-listHB')
    this.itemM1 = Selector('#HidenburgExplosion-hb_2-hb_2_3-item-1')
    this.itemM2 = Selector('#HidenburgExplosion-hb_2-hb_2_3-item-2')
  }
}
