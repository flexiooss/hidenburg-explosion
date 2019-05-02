import {Selector} from 'testcafe';

fixture('Select multiple').page('https://ui.flexio.io:8080/');

let inputU = Selector('#HidenburgExplosion-hb_2-hb_2_1-inputHB')()

let inputM = Selector('#HidenburgExplosion-hb_2-hb_2_2-inputHB')()
let listM = Selector('#HidenburgExplosion-hb_2-hb_2_2-listHB')()
let itemM1 = Selector('#HidenburgExplosion-hb_2-hb_2_2-item-1')()
let itemM2 = Selector('#HidenburgExplosion-hb_2-hb_2_2-item-2')()

test('La liste est visible quand je clique dessus ou sur le champ, disparait sinon', async t => {
  await t
    .expect(listM.visible).eql(false, 'Liste non visible')
    .click(inputM)
    .expect(listM.visible).eql(true, 'Liste visible')
    .click(itemM1)
    .expect(listM.visible).eql(true, 'Liste visible')
    .click(itemM2)
    .expect(listM.visible).eql(true, 'Liste visible')
    .click(inputU)
    .expect(listM.visible).eql(false, 'Liste not visible')
})

test('Je peux selectionner/déselectionner plusieurs items', async t => {
  await t
    .expect(inputM.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(inputM)
    .click(itemM1)
    .expect(inputM.value).eql(await itemM1.innerText)
    .click(itemM2)
    .expect(inputM.value).eql('2 éléments selectionnés')
    .click(itemM1)
    .expect(inputM.value).eql(await itemM2.innerText)
});
