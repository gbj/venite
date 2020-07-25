import { FunctionalComponent, h } from '@stencil/core';

export const EditableNode : FunctionalComponent<{ text: string; index: number; }> = ({text, index}) => (
  <ldf-editable-text
    id={`${this.obj.uid || this.obj.slug}-heading-${index}`}
    text={text}
    path={`${this.path}/value/${index}`}>
  </ldf-editable-text>
);