import Page from "./Page";

fixture('Select multiple').page('https://ui.flexio.io:8080/');

const page = new Page()

test('La liste est visible quand je clique dessus ou sur le champ, disparait sinon', async t => {
  await t
    .expect(page.listM.visible).eql(false, 'Liste non visible')
    .click(page.inputM)
    .expect(page.listM.visible).eql(true, 'Liste visible')
    .click(page.itemM1)
    .expect(page.listM.visible).eql(true, 'Liste visible')
    .click(page.itemM2)
    .expect(page.listM.visible).eql(true, 'Liste visible')
    .click(page.inputU)
    .expect(page.listM.visible).eql(false, 'Liste non visible')
})

test('Je peux selectionner/déselectionner plusieurs items', async t => {
  await t
    .expect(page.inputM.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(page.inputM)
    .click(page.itemM1)
    .expect(page.inputM.value).eql(await page.itemM1.innerText)
    .expect(page.itemM1.getAttribute('selected')).eql('true')
    .click(page.itemM2)
    .expect(page.inputM.value).eql('2 éléments selectionnés')
    .expect(page.itemM1.getAttribute('selected')).eql('true')
    .expect(page.itemM2.getAttribute('selected')).eql('true')
    .click(page.itemM1)
    .expect(page.inputM.value).eql(await page.itemM2.innerText)
});

test('Je peux selectionner une liste d\'item en faisant un shift clic', async t => {
  await t
    .expect(page.inputM.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(page.inputM)
    .click(page.itemM2, {modifiers: {shift: true}})
    .expect(page.inputM.value).eql('2 éléments selectionnés')
    .expect(page.listM.visible).eql(true, 'Liste visible')
    .expect(page.itemM1.getAttribute('selected')).eql('true')
    .expect(page.itemM2.getAttribute('selected')).eql('true')
})

test('Je peux selectionner une liste d\'item en faisant un shift clic parmi les elements', async t => {
  await t
    .expect(page.inputM.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(page.inputM)
    .expect(page.listM.visible).eql(true, 'Liste visible')
    .click(page.listM.child(1))
    .click(page.listM.child(3), {modifiers: {shift: true}})
    .expect(page.listM.visible).eql(true, 'Liste visible')
    .expect(page.inputM.value).eql('3 éléments selectionnés')
    .expect(page.listM.visible).eql(true, 'Liste visible')
    .expect(page.itemM1.getAttribute('selected')).eql('false')
})
