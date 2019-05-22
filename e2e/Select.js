import Page from "./Page";

fixture('Select').page('https://ui.flexio.io:8080/');

const page = new Page()

test('Je peux ouvrir et fermer les select avec la touche TAB', async t => {
  await t
    .expect(page.listU.visible).eql(false, 'Liste non visible')
    .expect(page.listM.visible).eql(false, 'Liste non visible')
    .pressKey('tab')
    .expect(page.listU.visible).eql(true, 'Liste non visible')
    .expect(page.listM.visible).eql(false, 'Liste non visible')
    .pressKey('tab')
    .expect(page.listU.visible).eql(false, 'Liste non visible')
    .expect(page.listM.visible).eql(true, 'Liste non visible')
}).skip
