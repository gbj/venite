/** A church or other organization, within which users can view, share, and edit content by default */
export class Organization {
  /** Database ID */
  id?: string;

  /** Slug used in URLs */
  slug: string;

  /** Human-readable name
   * @example 'St. Anne’s Episcopal Church' */
  name: string;

  /** Human-readable location
   * @example 'Lincoln, MA' */
  location?: string;

  /** URL of an avatar for the organization */
  photoURL?: string;

  /** URL to access their page
   * @example 'www.stanneslincoln.org' */
  url?: string;

  /** UID of user who can manage who joins the group */
  owner: string;

  /** Array of UIDs of users who can edit documents the organization owns */
  editors: string[];
}
