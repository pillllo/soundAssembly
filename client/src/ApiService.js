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

function login (code) {
  return axios.post(base_url + '/login', {
    code,
  })
}

// TODO: #17 use same way to declare functions in whole file

// Import/refresh library via Spotify

const importLibrary = () => {
  return fetchRequest('/importLibrary')
}

// Fetch existing list of followed artists and tags from db

const getLibrary = () => {
  return fetchRequest('/getLibrary')
}

const getArtist = (artistId) => {
  return fetchRequest(`/artists/${artistId}`)
}

// Create tag

const createTag = (tagName) => {
  return fetchRequest(`/tags`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    // TODO: #18 rename name to tag in all API calls
    body: JSON.stringify({name: tagName})
  })
}

// Add tag to artist

const tagArtist = (artistId, tagName) => {
  return fetchRequest(`/tags/add/${artistId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: tagName})
  })
}

// Remove tag from artist

const untagArtist = (artistId, tagName) => {
  return fetchRequest(`/tags/remove/${artistId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: tagName})
  })
}

// Requests directly to Spotify API
// TODO: #19 move all Spotify API calls to server?

const access_token = "BQAgbiisEOlIjwFpJQUUzT7est9o-9JdT8pR4YsplPlBW94FrkbIGwHMlrYIooZ2zrQsduncPRFfDszSjdJPN9tgx7Nhe_uJzp3FqSlo_TBaektDFlHb30ZCi6EwlPCVdcBFMM0ObEbe1_HHxR-mMrLoLXEVuL8";

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