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
        <slot name='start'></slot> {/* &nbsp; so they render and main slot always centered */}
        <slot></slot>
        <slot name='end'></slot>   {/* &nbsp; so they render and main slot always centered */}
      </Host>
    );
  }
}
