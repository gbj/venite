import { newE2EPage } from '@stencil/core/testing';
import { StringComponent } from './text';

describe('ldf-string', () => {
  it('renders text property', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-string text="Keep watch, dear Lord"></ldf-string>');
    const element = await page.find('ldf-string >>> span');
    expect(element.textContent).toEqual(`Keep watch, dear Lord`);
  });

  it('replaces tetragrammaton accurately', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-string text="Keep watch, dear LORD"></ldf-string>');
    const element = await page.find('ldf-string >>> span');
    expect(element.childNodes[1].innerText).toEqual(`Lord`);
  });

  it('adds tetragrammaton class', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-string text="Keep watch, dear LORD"></ldf-string>');
    const element = await page.find('ldf-string >>> span');
    expect(element.childNodes[1].getAttribute('class')).toEqual(`tetragrammaton`);
  });

  it('renders dropcap when forced — any length and index', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-string text="Keep watch, dear LORD" dropcap="force" index=1></ldf-string>');
    const element = await page.find('ldf-string >>> span > span > span');
    expect(element.getAttribute('class')).toEqual(`drop`);
  });

  it('renders dropcap when enabled w/ appropriate text and index', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-string text="Keep watch, dear LORD" dropcap="enabled" index=0 dropcap-min-length=5></ldf-string>');
    const element = await page.find('ldf-string >>> span > span > span');
    expect(element.getAttribute('class')).toEqual(`drop`);
  });

  it('does not render dropcap when enabled with short text', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-string text="Keep watch, dear LORD" dropcap="enabled"></ldf-string>');
    const element = await page.find('ldf-string >>> span > span > span');
    expect(!element);
  });

  it('does not render dropcap when enabled with long text and index > 0', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-string dropcap="enabled" index=1 text="enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna"></ldf-string>');
    const element = await page.find('ldf-string >>> span > span > span');
    expect(!element);
  });

  it('does not render dropcap when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-string dropcap="disabled" index=0 text="enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna"></ldf-string>');
    const element = await page.find('ldf-string >>> span > span > span');
    expect(!element);
  });

});
