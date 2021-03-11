export type Favorite = {
  user: string;
  date_modified?: any | undefined;
  date_created?: any | undefined;
  url: string;
  fragment: string | null;
  citation: string | null;
  text: string;
  note: string;
  tags: string[];
};
