import Tag from "./Tag";

export interface Artist {
  externalUrls: {
    [key: string]: string;
  };
  followers: {
    href: [];
    total: number;
  };
  genres: [string];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
  _id: string;
  tags: Tag[];
}

export interface Image {
  height: number;
  url: string;
  width: number;
}
