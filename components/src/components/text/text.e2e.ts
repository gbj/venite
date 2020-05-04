import { newE2EPage } from '@stencil/core/testing';

describe('ldf-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-text></ldf-text>');
    const element = await page.find('ldf-text');
    expect(element).toHaveClass('hydrated');
  });

  it('correctly appends response', async () => {
    const page = await newE2EPage();

    await page.setContent(`<ldf-text json='{ "value": ["Keep watch, dear Lord."], "metadata": { "response": "Boogaloo." }}'></ldf-text>`);
    await page.waitForChanges();

    const component = await page.find('ldf-text'),
          element = await page.find('ldf-text >>> p');
    expect(element).toEqualText(` Boogaloo.`);
  });

  it('adds response when "prayer" style is set', async () => {
    const page = await newE2EPage();

    await page.setContent(`<ldf-text json='{ "value": ["Keep watch, dear Lord."], "style": "prayer"}'></ldf-text>`);
    await page.waitForChanges();

    const component = await page.find('ldf-text'),
          element = await page.find('ldf-text >>> p');
    expect(element).toEqualText(` Amen.`);
  });

  it('correctly chunks text into spans', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-text></ldf-text>');
    const component = await page.find('ldf-text');
    let element = await page.find('ldf-text >>> p');
    expect(!element);

    component.setProperty('doc', { value: ["Keep watch, dear Lord."],metadata: { response: 'Boogaloo.' }});
    await page.waitForChanges();
    element = await page.find('ldf-text >>> p');
    expect(element.childNodes.length).toEqual(3);
  });

  it('correctly loads locale strings', async () => {
    const page = await newE2EPage();

    await page.setContent('<div lang="es"><ldf-text></ldf-text></div>');
    await page.waitForChanges();
    const component = await page.find('ldf-text');
    const localeStrings = await component.callMethod('getLocaleStrings');

    expect(localeStrings).toEqual({ "amen": "Amén." });
  });

});
