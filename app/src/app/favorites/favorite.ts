import firebase from "firebase/app";

export type Favorite = {
  classic?: boolean | undefined;
  user: string;
  date_modified?: firebase.firestore.Timestamp | undefined;
  date_created?: firebase.firestore.Timestamp | undefined;
  url: string;
  fragment: string | null;
  citation: string | null;
  text: string;
  note: string;
  tags: string[];
};
