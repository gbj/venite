import { FunctionalComponent, h } from '@stencil/core';

export const EditableNode : FunctionalComponent<{ uidOrSlug: string; path: string; text: string; index: number; }> = ({uidOrSlug, path, text, index}) => 
  <ldf-editable-text
    id={`${uidOrSlug}-heading-${index}`}
    text={text}
    path={`${path}/value/${index}`}
    short={true}
    inputType="text">
  </ldf-editable-text>