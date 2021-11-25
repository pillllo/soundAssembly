import { Artist } from "./Artist";
import { Image } from "./Artist";

export default interface Album {
  href: string,
  items: AlbumItem[],
  limit: number,
  next: string,
  offset: number,
  previous: null,
  total: number
}

export interface AlbumItem {
  artists: Artist[],
  external_urls: {spotify: string},
  href: string,
  id: string,
  images: Image[],
  name: string,
  release_date: string,
  uri: string,
}