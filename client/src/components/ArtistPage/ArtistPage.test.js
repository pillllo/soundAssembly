import {
  getAllByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ArtistPage from "./ArtistPage";

const mockArtistId = 1;
let mockTags = [
  { name: "Teen Pop", status: "inactive" },
  { name: "Country", status: "inactive" },
  { name: "Hairspray Rock", status: "inactive" },
];
const mockArtistList = [
  {
    _id: 1,
    id: 0,
    tags: [{ name: "Indie" }, { name: "Rock" }],
    name: "Rick",
    images: [
      {
        url: "https://www.sundaypost.com/wp-content/uploads/sites/13/2019/05/5ce7a7c4148740.04326664-e1558705666850-574x372.jpg",
      },
    ],
  },
  {
    _id: 1,
    id: 1,
    tags: [{ name: "Indie" }],
    name: "Nick",
    images: [
      {
        url: "https://www.sundaypost.com/wp-content/uploads/sites/13/2019/05/5ce7a7c4148740.04326664-e1558705666850-574x372.jpg",
      },
    ],
  },
  {
    _id: 2,
    id: 2,
    tags: [],
    name: "Sammy",
    images: [
      {
        url: "https://www.sundaypost.com/wp-content/uploads/sites/13/2019/05/5ce7a7c4148740.04326664-e1558705666850-574x372.jpg",
      },
    ],
  },
];
const mockAlbums = {
  items: [
    {
      id: 0,
      name: "Crazy Chopin",
      release_date: "2021-11-20",
      external_urls: {
        spotify: "https://open.spotify.com/album/0uiOS7hd1IgfnXItORYK6m",
      },
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d0000b273c3ff300e62b18a5e926d690f",
        },
      ],
    },
    {
      id: 1,
      name: "Música Clásica Chopin",
      release_date: "2019-09-14",
      external_urls: {
        spotify: "https://open.spotify.com/album/6JvxBDtGpPARb6cwJtVMbc",
      },
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d0000b2738cbfb75adace1c1b93086ac9",
        },
      ],
    },
  ],
};
const mockArtist = {
  id: 0,
  name: "Frédéric Chopin",
  artistTags: [],
  followers: { total: 2581645 },
  images: [
    {
      url: "https://i.scdn.co/image/ab6761610000e5ebe55372097569b7b56b439365",
    },
  ],
};
function setMockTags() {}
function setMockArtistList() {}

jest.mock("../../ApiService", () => {
  return {
    getAlbums: () => {
      return Promise.resolve(mockAlbums);
    },
    getArtist: () => {
      return Promise.resolve(mockArtist);
    },
  };
});

describe("ArtistPage", () => {
  test.only("should display all albums of the artist with id passed through the params", async () => {
    render(
      <ArtistPage
        tags={mockTags}
        setTags={setMockTags}
        artistList={mockArtistList}
        setArtistList={setMockArtistList}
      />
    );
    const allAlbums = await waitFor(() => screen.getAllByTestId("album"));
    expect(allAlbums.length).toBe(2);
    expect(screen.getByText(/Crazy Chopin/)).toBeInTheDocument();
    expect(screen.getByText(/Crazy Chopin (2021)/)).toBeInTheDocument();
  });
});
