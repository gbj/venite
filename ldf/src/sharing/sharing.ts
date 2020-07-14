export class Sharing {
  /** Username or API-readable string identifying the document's owner */
  owner: string;

  /** API-readable identifier of the organization to which this belongs, if any */
  organization?: string;

  /** Drafts only available to owner and collaborators, published to anyone who meets privacy standard */
  status: 'published' | 'draft';

  /** Who has permission to view this document?
   * `public` available to anyone
   * `organization` to any user who's part of organization
   * `private` only to owner and collaborators */
  privacy: 'public' | 'organization' | 'private';

  /** Username or API-readable identifying collaborators who have same permissions as owner, except editing collaborators or changing owner */
  collaborators: string[];

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Sharing> = {}) {
    Object.assign(this, data);
  }
}
