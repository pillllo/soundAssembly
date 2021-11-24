const axios = require('axios');
const Library = require('../model/librarySchema.js');
require('dotenv').config();

const access_token = process.env.ACCESS_TOKEN;

// Fetch existing library from db

exports.getLibrary = async (req, res) => {
  try {
    const userLibrary = await Library.find({username: process.env.USERNAME});
    res.send(userLibrary);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Fetch list of items from API and send them to db

exports.importLibrary = async (req, res) => {
  try {
    // fetch followed artists for the specific account
    // TODO: #7 combine this into one step
    const apiResponse = await fetchArtists();
    const followedArtists = apiResponse.data.artists.items;
    // add tags array to each artist pre-populating some tags based on the genre
    const taggedArtists = populateTags(followedArtists);
    // fetch profile id for the specific account
    const profileData = await fetchProfile();
    const username = profileData.data.id;
    // create account with followed artists in the DB
    const userLibrary = await Library.create(
      {
        username: username,
        tags: taggedArtists.tags,
        artists: taggedArtists.artistList
      }
    );
    res.send(userLibrary);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Spotify API calls

// TODO: #8 combine fetchArtists and fetchProfile into one function
// TODO: #9 rename to fetchArtistsFollowing
function fetchArtists(req, res) {
  const response = axios('https://api.spotify.com/v1/me/following?type=artist&limit=50', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
  });
  return response
}

function fetchProfile (req, res) {
  const response = axios('https://api.spotify.com/v1/me', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
  });
  return response
}

// Helper functions

// TODO: #10 review helper function and possibly remove nested for loops
function populateTags(artistList) {
  // All existing tags on account
  const tags = [];

  for (const artist in artistList) {
    // All tags on the specific artist
    const artistTags = [];

    // List of genres for filtering
    const termsOfInterest = ["rock","metal","punk","jazz","ska","reggae","hip hop","EDM","indie"]

    termsOfInterest.forEach(term => {
      // genres is on the Spotify data - if an artist's genre matches one in
      // our "terms of interest"
      if (artistList[artist].genres.some(genre => genre.includes(term))) {
        artistTags.push({ name: term });
        if (!tags.some(tag => tag.name === item)) {
          tags.push({ name: item })
        }
      }
    })
    // TO DO: improve genre logic -- example:
    // if (artistList[artist].genres.some(genre => (genre.includes("rap") || genre.includes("hip hop")))) {
    //   artistTags.push("hip-hop")
    // }

    // if (artistList[artist].genres.some(genre => (genre.includes("edm") || genre.includes("idm") || genre.includes("electro") || genre.includes("electronic")))) {
    //   artistTags.push("electronic")
    // }

    // here we are adding an extra artistTags prop to the Spotify data
    artistList[artist].artistTags = artistTags;
  }

  return {
    artistList: artistList,
    tags: tags
  }
}
