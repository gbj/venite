import { LiturgicalDocument, BibleReading, Liturgy, Heading, Meditation, Option, Psalm, Refrain, ResponsivePrayer, Rubric, Text } from '..';

/** Transforms a generic `LiturgicalDocument` (either a class instance or an `Object` that matches the type),
  * into an instance of a more-specific inherited class */
export function specificClass(obj : LiturgicalDocument) : LiturgicalDocument {
  switch(obj.type) {
    case 'liturgy':
      return new Liturgy(obj as Liturgy);
    case 'heading':
      return new Heading(obj as Heading);
    case 'option':
      return new Option(obj as Option);
    case 'refrain':
      return new Refrain(obj as Refrain);
    case 'rubric':
      return new Rubric(obj as Rubric);
    case 'text':
      return new Text(obj as Text);
    case 'responsive':
      return new ResponsivePrayer(obj as ResponsivePrayer);
    case 'bible-reading':
      return new BibleReading(obj as BibleReading);
    case 'psalm':
      return new Psalm(obj as Psalm);
    case 'meditation':
      return new Meditation(obj as Meditation);
    default:
      return obj;
  }
}
