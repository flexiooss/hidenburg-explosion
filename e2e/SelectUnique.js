import {Selector} from 'testcafe';

fixture('Select unique').page('https://ui.flexio.io:8080/');

let inputU = Selector('#HidenburgExplosion-hb_2-hb_2_1-inputHB')()
let listU = Selector('#HidenburgExplosion-hb_2-hb_2_1-listHB')()
let itemU1 = Selector('#HidenburgExplosion-hb_2-hb_2_1-item-1')()
let itemU2 = Selector('#HidenburgExplosion-hb_2-hb_2_1-item-2')()

let inputM = Selector('#HidenburgExplosion-hb_2-hb_2_2-inputHB')()

test('la liste est visible quand je clique dessus ou sur le champ', async t => {
  await t
    .expect(listU.visible).eql(false, 'Liste non visible')
    .click(inputU)
    .expect(listU.visible).eql(true, 'Liste visible')
    .click(itemU1)
    .expect(listU.visible).eql(true, 'Liste visible')
    .click(itemU2)
    .expect(listU.visible).eql(true, 'Liste visible')
    .click(inputM)
    .expect(listU.visible).eql(false, 'Liste non visible')
})

test('Je peux selectionner un seul item dans une liste unique', async t => {
  await t
    .expect(inputU.value).eql('Choisir ...', 'Etat de base de l\'inputU')
    .click(inputU)
    .click(itemU1)
    .expect(inputU.value).eql(await itemU1.innerText, 'Input prend la valeur de l\'itemU1')

    .click(itemU2)
    .expect(inputU.value).eql(await itemU2.innerText, 'Input prend la valeur de l\'itemU2')
});
