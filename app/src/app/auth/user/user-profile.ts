export class UserProfile {
  /** Firebase Auth UID */
  uid: string;
  photoURL: string;
  displayName: string;

  /** Array of IDs of orgs the user follows */
  orgs: string[];
}
