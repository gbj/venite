/** Represents a category of liturgy, e.g., 'Morning Prayer Opening Sentence'
  * Analogous to a "tag" in other ways of representing metadata
  * Representing categories as their own class makes it easy to build a many-to-many database relationship */
export class Category {
  name: string;
}
