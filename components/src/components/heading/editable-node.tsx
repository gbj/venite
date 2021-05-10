import { FunctionalComponent, h } from '@stencil/core';

export const EditableNode : FunctionalComponent<{ uidOrSlug: string; path: string; text: string; index: number; bodyText: boolean; }> = ({uidOrSlug, path, text, index, bodyText}) => 
  <ldf-editable-text
    class={{'body-text': bodyText}}
    id={`${uidOrSlug}-heading-${index}`}
    text={text}
    path={`${path}/value/${index}`}
    short={true}
    inputType="text">
  </ldf-editable-text>