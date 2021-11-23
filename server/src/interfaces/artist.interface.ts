export interface Artist {
  external_urls: {
    spotify: string,
  },
  followers: { href: null, total: number },
  genres: string[],
  href: string,
  id: string,
  // TODO: fix type
  images: [ [Object], [Object], [Object] ],
  name: string,
  popularity: number,
  type: string,
  uri: string,
  artistTags?: Tag[]
}

export interface Tag {
  name: string,
}