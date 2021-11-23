// const axios = require('axios');
// const Library = require('../model/librarySchema.js');
import axios from "axios";
import Library from "../model/librarySchema.js";
import { Request, Response } from "express";
import { Artist, Tag } from "../interfaces/artist.interface";
require("dotenv").config();

const access_token = process.env.ACCESS_TOKEN;

// Fetch existing library from db

exports.getLibrary = async (req: Request, res: Response) => {
  try {
    const userLibrary = await Library.find({ username: process.env.USERNAME });
    res.send(userLibrary);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

// Fetch list of items from API and send them to db

exports.importLibrary = async (req: Request, res: Response) => {
  try {
    // fetch followed artists for the specific account
    // TODO: #7 combine this into one step
    const artistFetch = await fetchArtists();
    const followedArtists = artistFetch.data.artists.items;
    // add tags array to each artist pre-populating some tags based on the genre
    const taggedArtists = populateTags(followedArtists);
    // fetch profile id for the specific account
    const userProfileData = await fetchUserProfile();
    const username = userProfileData.data.id;
    // create account with followed artists in the DB
    const userLibrary = await Library.create({
      username: username,
      tags: taggedArtists.tags,
      artists: taggedArtists.artistList,
    });
    res.send(userLibrary);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

// Spotify API calls

// TODO: #8 combine fetchArtists and fetchUserProfile into one function
// TODO: #9 rename to fetchArtistsFollowing
// function fetchArtists(req, res) {
function fetchArtists() {
  const response = axios(
    "https://api.spotify.com/v1/me/following?type=artist&limit=50",
    {
      method: "get",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );
  return response;
}

// function fetchUserProfile (req, res) {
function fetchUserProfile() {
  const response = axios("https://api.spotify.com/v1/me", {
    method: "get",
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
  return response;
}

// Helper functions

// TODO: #10 review helper function and possibly remove nested for loops
function populateTags(artistList: Artist[]) {
  // All existing tags on account
  const tags: Tag[] = [];

  for (const artist in artistList) {
    // All tags on the specific artist
    const artistTags: Tag[] = [];

    // List of genres for filtering
    const genreList = [
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

    genreList.forEach((item) => {
      if (artistList[artist].genres.some((genre) => genre.includes(item))) {
        artistTags.push({ name: item });
        if (!tags.some((tag) => tag.name === item)) {
          tags.push({ name: item });
        }
      }
    });
    // TO DO: improve genre logic -- example:
    // if (artistList[artist].genres.some(genre => (genre.includes("rap") || genre.includes("hip hop")))) {
    //   artistTags.push("hip-hop")
    // }

    // if (artistList[artist].genres.some(genre => (genre.includes("edm") || genre.includes("idm") || genre.includes("electro") || genre.includes("electronic")))) {
    //   artistTags.push("electronic")
    // }

    artistList[artist].artistTags = artistTags;
  }

  return { artistList: artistList, tags: tags };
}
