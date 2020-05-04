import { newE2EPage } from '@stencil/core/testing';

describe('ldf-refrain', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-refrain></ldf-refrain>');
    const element = await page.find('ldf-refrain');
    expect(element).toHaveClass('hydrated');
  });

  it('renders doc property', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-refrain></ldf-refrain>');
    const component = await page.find('ldf-refrain');
    let element = await page.find('ldf-refrain >>> p');
    expect(element).toBeFalsy();

    component.setProperty('doc', { value: ["Hail&nbsp;Mary&nbsp;full&nbsp;of&nbsp;grace, the&nbsp;Lord&nbsp;is&nbsp;with&nbsp;you;"]});
    await page.waitForChanges();
    element = await page.find('ldf-refrain >>> p');
    expect(element.textContent).toEqual(`Hail Mary full of grace, the Lord is with you;`);
  });

  it('renders changes to doc when JSON changes', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-refrain></ldf-refrain>');
    const component = await page.find('ldf-refrain');
    let element = await page.find('ldf-refrain >>> p');
    expect(element).toBeFalsy();

    component.setProperty('json', '{"value": ["Hail&nbsp;Mary&nbsp;full&nbsp;of&nbsp;grace, the&nbsp;Lord&nbsp;is&nbsp;with&nbsp;you;"]}');
    await page.waitForChanges();
    element = await page.find('ldf-refrain >>> p');
    expect(element.textContent).toEqual(`Hail Mary full of grace, the Lord is with you;`);
  });
});
