"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importLibrary = exports.getLibrary = void 0;
const axios_1 = __importDefault(require("axios"));
const librarySchema_js_1 = __importDefault(require("../model/librarySchema.js"));
require("dotenv").config();
const { ACCESS_TOKEN, USERNAME } = process.env;
// Fetch user's existing library from db
async function getLibrary(req, res) {
    try {
        const userLibrary = await librarySchema_js_1.default.find({ username: USERNAME });
        res.send(userLibrary);
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
}
exports.getLibrary = getLibrary;
;
// Fetch list of followed artists (library) from API and create an entry in the db
async function importLibrary(req, res) {
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
        const userLibrary = await librarySchema_js_1.default.create({
            username: username,
            tags: userTags,
            artists: artistsWithTags,
        });
        res.send(userLibrary);
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
}
exports.importLibrary = importLibrary;
;
// Spotify API call to import followed artists or profile information
function fetchFromSpotifyApi(dataType) {
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
    const response = (0, axios_1.default)(spotifyApi, {
        method: "get",
        headers: {
            Authorization: "Bearer " + ACCESS_TOKEN,
        },
    });
    return response;
}
// Helper functions to poulate tags
// Populate artist tags based on a set of pre-defined genres
function populateArtistTags(artistList) {
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
        const tags = [];
        // for each artist iterate through all genres in the list and assign a tag if the genre matches
        customGenreList.forEach((customGenre) => {
            const artistGenres = artistList[artist].genres;
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
function populateUserTags(artistList) {
    // All existing tags on a user account
    let userTags = [];
    for (const artist in artistList) {
        let artistTags = artistList[artist].tags;
        // add an artist's tag to the userTag list
        artistTags.forEach((artistTag) => {
            if (!userTags.some((userTag) => userTag.name === artistTag.name)) {
                userTags.push({ name: artistTag.name });
            }
        });
    }
    return userTags;
}
//# sourceMappingURL=library.js.map