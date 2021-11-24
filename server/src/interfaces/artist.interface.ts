export interface Artist {
  external_urls: {
    spotify: string,
  },
  followers: {
    href: null,
    total: number
  },
  genres: string[],
  href: string,
  id: string,
  // TODO: fix type
  images: Image[],
  name: string,
  popularity: number,
  type: string,
  uri: string,
  tags: Tag[]
}

export interface Tag {
  name: string,
}

export interface Image {
  url?: string,
}