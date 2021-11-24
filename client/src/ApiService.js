import axios from "axios";

// DB requests

const base_url = "http://localhost:8889"

function fetchRequest (path, options) {
  return fetch(base_url + path, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.status !== 204 ? res.json(): res)
    .catch(err => {
      console.error("Error: ", err);
    })
}

// Spotify OAuth

// Used: Login component
function login (code) {
  return axios.post(base_url + '/login', {
    code,
  })
}

// Import/refresh library via Spotify

// Used: Logout component
function importLibrary() {
  return fetchRequest('/importLibrary');
}


// Fetch existing list of followed artists and tags from db

// Used: Dashboard component
function getLibrary() {
  return fetchRequest('/getLibrary');
}

// Used: ArtistPage component
function getArtist(artistId) {
  return fetchRequest(`/artists/${artistId}`);
}


// Create tag

// Used: TagList component
function createTag(tagName) {
  return fetchRequest(`/tags`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    // TODO: #18 rename name to tag in all API calls
    body: JSON.stringify({ name: tagName })
  });
}

// Add tag to artist

// Used: ArtistTag ArtistTagList component
function tagArtist(artistId, tagName) {
  return fetchRequest(`/tags/add/${artistId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: tagName })
  });
}

// Remove tag from artist

// Used: ArtistTag ArtistTagList component
function untagArtist(artistId, tagName) {
  return fetchRequest(`/tags/remove/${artistId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: tagName })
  });
}

// Requests directly to Spotify API
// TODO: #19 move all Spotify API calls to server?

const access_token = "BQDXFHcjLzF3OcEdymFrSVOyABQhwSxOoe9sUFXW7be9Hp-_z7donRHjC4_CXSFHNdYnsCxPzDQua-U9kdzlHbQrjkXVJ5YD5PnRPoWnDFT0hpjkQcr6DVz8LqPhlfTB4ctmUFh3h_YM-mQR8ziRBPXHh18yz4gPpu-WqMiGA2v4YJAqM5M0";

// Used: ArtistPage component
async function getAlbums(artistId, req, res) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
  });
  const albums = await response.json();
  return albums;
}

export { login, importLibrary, getLibrary, getAlbums, getArtist, createTag, tagArtist, untagArtist };