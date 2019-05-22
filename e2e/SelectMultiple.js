import Page from "./Page";

fixture('Select multiple').page('https://ui.flexio.io:8080/');

const page = new Page()

test('La liste est visible quand je clique dessus ou sur le champ, disparait sinon', async t => {
  await t
    .expect(page.layerM.classNames).notContains('layers-layer-active', 'Liste non visible')
    .click(page.inputM)
    .expect(page.layerM.classNames).contains('layers-layer-active', 'Liste visible')
    .click(page.itemM1)
    .expect(page.layerM.classNames).contains('layers-layer-active', 'Liste visible')
    .click(page.itemM2)
    .expect(page.layerM.classNames).contains('layers-layer-active', 'Liste visible')
    .click(page.closeM)
    .expect(page.layerM.classNames).notContains('layers-layer-active', 'Liste non visible')
})

test('Je peux selectionner/déselectionner plusieurs items', async t => {
  await t
    .expect(page.inputM.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(page.inputM)
    .click(page.itemM1)
    .expect(page.selectedItemsM.child().count).eql(1)

  await t
    .expect(page.inputM.value).eql(await page.selectedItemsM.child(0).innerText)
    .click(page.itemM2)

  await t
    .expect(page.selectedItemsM.child().count).eql(2)
    .expect(page.inputM.value).eql('2 éléments selectionnés')

  await t
    .click(page.selectedItemsM.nth(0))
    .expect(page.inputM.value).eql('2 éléments selectionnés')

});

test('Je peux selectionner une liste d\'item en faisant un shift clic', async t => {
  await t
    .expect(page.inputM.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(page.inputM)
    .click(page.itemM2, {modifiers: {shift: true}})
    .expect(page.inputM.value).eql('2 éléments selectionnés')
    .expect(page.layerM.classNames).contains('layers-layer-active', 'Liste visible')
    .expect(page.selectedItemsM.child().count).eql(2)
    .expect(page.selectedItemsM.child(0).innerText).eql(await page.itemM1.innerText)
    .expect(page.selectedItemsM.child(1).innerText).eql(await page.itemM2.innerText)
});


test('Je peux selectionner une liste d\'item en faisant un shift clic parmi les elements', async t => {
  await t
    .expect(page.inputM.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(page.inputM)
    .expect(page.layerM.classNames).contains('layers-layer-active', 'Liste visible')
    .click(page.listM.child(2), {modifiers: {shift: true}})
    .expect(page.listM.visible).eql(true, 'Liste visible')
    .expect(page.inputM.value).eql('3 éléments selectionnés')
})
