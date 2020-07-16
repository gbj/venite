import { newE2EPage } from '@stencil/core/testing';

describe('ldf-responsive-prayer', () => {

  it('renders preces type as table', async () => {
    const page = await newE2EPage();

    await page.setContent(`<ldf-responsive-prayer json='{"style": "preces", "value": [{"label": "℣", "text": "O Lord, open thou our lips."}, {"label": "℟", "text": "And our mouth shall show forth thy praise."}]}'></ldf-responsive-prayer>`);
    await page.waitForChanges();

    const component = await page.find('ldf-responsive-prayer'),
          element = await page.find('ldf-responsive-prayer >>> table');
    expect(element).toBeTruthy();
  });

  it('renders litany type with its response div', async () => {
    const page = await newE2EPage();

    await page.setContent(`<ldf-responsive-prayer json='{"style": "litany", "metadata": { "response": "We entreat you, O Lord." }, "value": [{"text": "That this evening may be holy, good, and peaceful,"}, {"text": "That your holy angels may lead us in paths of peace and goodwill,"}]}'></ldf-responsive-prayer>`);
    await page.waitForChanges();

    const component = await page.find('ldf-responsive-prayer'),
          element = await page.find('ldf-responsive-prayer >>> p >>> div.response');
    expect(element).toBeTruthy();
  });

  it('renders responsive type with divs', async () => {
    const page = await newE2EPage();

    await page.setContent(`<ldf-responsive-prayer json='{"style": "responsive", "value": [{"text": "The Lord be with you.", "response": "And also with you."}, {"text": "Let us pray."}]}'></ldf-responsive-prayer>`);
    await page.waitForChanges();

    const component = await page.find('ldf-responsive-prayer'),
          element = await page.find('ldf-responsive-prayer >>> p >>> div');
    expect(element).toBeTruthy();
  });

});
