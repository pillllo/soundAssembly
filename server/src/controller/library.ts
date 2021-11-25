import axios from "axios";
import Library from "../model/librarySchema.js";
import { Request, Response } from "express";
import { Artist, Tag } from "../interfaces/artist.interface";

require("dotenv").config();

const { ACCESS_TOKEN, USERNAME } = process.env;

// Fetch user's existing library from db

exports.getLibrary = async (req: Request, res: Response) => {
  try {
    const userLibrary = await Library.find({ username: USERNAME });
    res.send(userLibrary);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

// Fetch list of followed artists (library) from API and create an entry in the db

exports.importLibrary = async (req: Request, res: Response) => {
  try {
    // fetch followed artists for the specific account
    const artistsFetch = await fetchFromSpotifyApi("artists");
    const followedArtists = artistsFetch.data.artists.items;
    // add tags array to each artist pre-populating some tags based on the genre
    const artistsWithTags = populateArtistTags(followedArtists);

    // fetch profile id for the specific account
    const userProfileFetch = await fetchFromSpotifyApi("userProfile");
    const username = userProfileFetch.data.id;
    // add tags array to user with all unique tags existing on the user's artists
    const userTags = populateUserTags(followedArtists);

    // create library with followed artists and their tags in the DB
    const userLibrary = await Library.create({
      username: username,
      tags: userTags,
      artists: artistsWithTags,
    });
    res.send(userLibrary);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

// Spotify API call to import followed artists or profile information

function fetchFromSpotifyApi(dataType: string) {
  let spotifyApi = "";
  switch (dataType) {
    case "artists":
      spotifyApi =
        "https://api.spotify.com/v1/me/following?type=artist&limit=50";
      break;
    case "userProfile":
      spotifyApi = "https://api.spotify.com/v1/me";
      break;
  }

  const response = axios(spotifyApi, {
    method: "get",
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  });
  return response;
}


// Helper functions to poulate tags

// Populate artist tags based on a set of pre-defined genres
function populateArtistTags(artistList: Artist[]) {
  // List of desired genres, based on which tags are assigned to artists
  const customGenreList = [
    "rock",
    "metal",
    "punk",
    "jazz",
    "ska",
    "reggae",
    "hip hop",
    "EDM",
    "indie",
  ];

  for (const artist in artistList) {
    // All tags on a specific artist
    const tags: Tag[] = [];

    // for each artist iterate through all genres in the list and assign a tag if the genre matches
    customGenreList.forEach((customGenre) => {
      const artistGenres: string[] = artistList[artist].genres;
      // if a genre from the list of genres provided by Spotigy
      // includes any of the words from the customGenreList
      if (artistGenres.some((genre) => genre.includes(customGenre))) {
        // add the customGenre as a tag to the tags
        tags.push({ name: customGenre });
      }
    });
    artistList[artist].tags = tags;
  }

  return artistList;
}

// Populate user tags based on unique tags of the user's artists
function populateUserTags(artistList: Artist[]) {
  // All existing tags on a user account
  let userTags: Tag[] = [];

  for (const artist in artistList) {
    let artistTags: Tag[] = artistList[artist].tags;
    // add an artist's tag to the userTag list
    artistTags.forEach((artistTag) => {
      if (!userTags.some((userTag) => userTag.name === artistTag.name)) {
        userTags.push({ name: artistTag.name });
      }
    });
  }
  return userTags;
}
