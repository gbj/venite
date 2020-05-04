import { newE2EPage } from '@stencil/core/testing';
import { Psalm, PsalmVerse } from '../../../../ldf/src/psalm';

const PSALM_80 = {
  api: '',
  slug: 'psalm_80',
  label: 'Psalm 80',
  language: 'en',
  version: 'bcp1979',
  type: 'psalm' as 'psalm',
  style: 'psalm' as 'psalm',
  citation: 'Psalm 80',
  value: [
    [
      {
        number: '1',
        verse: 'Hear, O Shepherd of Israel, leading Joseph like a flock; * ',
        halfverse: 'shine forth, you that are enthroned upon the cherubim.'
      },
      {
        number: '2',
        verse: 'In the presence of Ephraim, Benjamin, and Manasseh, *',
        halfverse: 'stir up your strength and come to help us.'
      },
      {
        number: '3',
        verse: 'Restore us, O God of hosts; *',
        halfverse: 'show the light of your countenance, and we shall be saved.'
      }
    ]
  ]
};

describe('ldf-psalm', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    const psalm = new Psalm(PSALM_80);

    await page.setContent(`<ldf-psalm json="${JSON.stringify(psalm)}"></ldf-psalm>`);
    const element = await page.find('ldf-psalm');
    expect(element).toHaveClass('hydrated');
  });

});
