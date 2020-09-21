import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'ldf-label-bar',
  styleUrl: 'label-bar.scss',
  shadow: true
})
export class LabelBarComponent {
  @Prop({ reflect: true }) center : boolean = false;

  // Render
  render() {
    if(this.center) {
      return (
        <div class='label-bar center'>
          <slot name='start'></slot>
          <slot></slot>
          <slot name='end'></slot>
        </div>
      );
    } else {
      return (
        <div class='label-bar left'>
          <slot name='start'></slot>
          <slot></slot>
          <slot name='end'></slot>
        </div>
      );
    }
  }
}
