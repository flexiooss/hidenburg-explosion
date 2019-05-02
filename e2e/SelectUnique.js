import {Selector} from 'testcafe';

fixture('Select unique').page`https://ui.flexio.io:8080/`;

test('Selection', async t => {
  let input = await Selector('#HidenburgExplosion-hb_2-hb_2_1-inputHB')
  let list = await Selector('#HidenburgExplosion-hb_2-hb_2_1-listHB')
  let item1 = await Selector('#HidenburgExplosion-hb_2-hb_2_1-item-1')
  let item2 = await Selector('#HidenburgExplosion-hb_2-hb_2_1-item-2')
  await t
    .setNativeDialogHandler(() => true)
    .expect(list.visible).eql(false, 'List not visible')
    .click(input)
    .expect(input.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(item1)
    .expect(input.value).eql(await item1.innerText, 'Input prend la valeur de l\'item1')
    .click(item2)
    .expect(input.value).eql(await item2.innerText, 'Input prend la valeur de l\'item2')
});
