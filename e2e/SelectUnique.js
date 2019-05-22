import Page from "./Page";

const page = new Page()

fixture('Select unique').page('https://ui.flexio.io:8080/');

test('La liste est visible quand je clique sur le bouton, disparait quand je clique sur un item', async t => {
  await t
    .expect(page.layerU.classNames).notContains('layers-layer-active', 'Liste non visible')
    .click(page.inputU)
    .expect(page.layerU.classNames).contains('layers-layer-active', 'Liste visible')
    .click(page.itemU1)
    .expect(page.layerU.classNames).notContains('layers-layer-active', 'Liste non visible')

    .click(page.inputU)
    .click(page.itemU2)
    .expect(page.layerU.classNames).notContains('layers-layer-active', 'Liste non visible')
});

test('Je peux selectionner un seul item dans une liste unique', async t => {
  await t
    .expect(page.inputU.value).eql('Choisir ...', 'Etat de base de l\'input')
    .expect(page.selectedItemsU.child().count).eql(0)
    .click(page.inputU)
    .click(page.itemU1)

  await t
    .expect(page.inputU.value).eql(await page.selectedItemsU.child(0).innerText, 'Input prend la valeur de itemU1')
    .expect(page.selectedItemsU.child().count).eql(1)

    .click(page.inputU)
    .click(page.itemU2)

  await t.expect(page.inputU.value).eql(await page.selectedItemsU.child(0).innerText, 'Input prend la valeur de itemU2')
    .expect(page.selectedItemsU.child().count).eql(1)
});

test('Je peux faire un shift clic, mais simule un clic normal', async t => {
  await t
    .expect(page.inputU.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(page.inputU)
  let value = await page.itemU2.innerText
  await t.click(page.itemU2, {modifiers: {shift: true}})
    .expect(page.inputU.value).eql(await page.itemU2.innerText, 'Input prend la valeur de itemU2')
    .expect(page.selectedItemsU.child().count).eql(1)
    .expect(page.selectedItemsU.child(0).innerText).eql(value)
    .expect(page.layerU.classNames).notContains('layers-layer-active', 'Liste non visible')
});

