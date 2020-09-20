import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ldf-label-bar',
  styleUrl: 'label-bar.scss',
  shadow: true
})
export class LabelBarComponent {
  // Render
  render() {
    return (
      <Host>
        <slot name='start'></slot>
        <slot></slot>
        <slot name='end'></slot>
      </Host>
    );
  }
}
