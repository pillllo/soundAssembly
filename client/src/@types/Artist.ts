interface Artist {
  externalUrls: {
    [key: string]: string,
  },
  followers: {
    href: [],
    total: number,
  },
  genres: [string]
  href: string,
  id: string,
  images: [{
    height: number,
    url: string,
    width: number,
  }],
  name: string,
  popularity: number,
  type: string,
  uri: string,
};

export default Artist;