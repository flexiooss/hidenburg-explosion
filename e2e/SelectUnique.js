import Page from "./Page";

const page = new Page()

fixture('Select unique').page('https://ui.flexio.io:8080/');

test('La liste est visible quand je clique sur le champ, sinon disparait', async t => {
  await t
    .expect(page.listU.visible).eql(false, 'Liste non visible')
    .click(page.inputU)
    .expect(page.listU.visible).eql(true, 'Liste visible')
    .click(page.itemU1)
    .expect(page.listU.visible).eql(false, 'Liste non visible')

    .click(page.inputU)
    .click(page.itemU2)
    .expect(page.listU.visible).eql(false, 'Liste non visible')
})

test('Je peux selectionner un seul item dans une liste unique', async t => {
  await t
    .expect(page.inputU.value).eql('Choisir ...', 'Etat de base de l\'page.inputU')
    .click(page.inputU)
    .click(page.itemU1)
    .expect(page.inputU.value).eql(await page.itemU1.innerText, 'Input prend la valeur de l\'page.itemU1')
    .expect(page.itemU1.getAttribute('selected')).eql('true')
    .expect(page.itemU2.getAttribute('selected')).eql('false')


    .click(page.inputU)
    .click(page.itemU2)
    .expect(page.inputU.value).eql(await page.itemU2.innerText, 'Input prend la valeur de l\'page.itemU2')
    .expect(page.itemU1.getAttribute('selected')).eql('false')
    .expect(page.itemU2.getAttribute('selected')).eql('true')
});

test('Je peux faire un shift clic, mais simule un clic normal', async t => {
  await t
    .expect(page.inputU.value).eql('Choisir ...', 'Etat de base de l\'input')
    .click(page.inputU)
    .click(page.itemU2, {modifiers: {shift: true}})
    .expect(page.inputU.value).eql(await page.itemU2.innerText, 'Input prend la valeur de l\'page.itemU2')
    .expect(page.itemU1.getAttribute('selected')).eql('false')
    .expect(page.itemU2.getAttribute('selected')).eql('true')
    .expect(page.listU.visible).eql(false, 'Liste non visible')
})
