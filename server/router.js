const { Router } = require('express');
const { getFollowedArtists, getArtist } = require('./controller/artists');
const { authorize, refreshToken } = require('./controller/authorization');
// TODO: #3 rename library controller // possibly rename variable getLibrary and importLibrary
const { getLibrary, importLibrary } = require('./controller/getLibrary');
const { getTags, createTag, tagArtist, untagArtist } = require('./controller/tags');
const router = Router();

// SPOTIFY API

// OAuth
router.post('/login', authorize)
// router.get('/refresh_token', refreshToken); // Currently unused

// Fetch artists
router.get('/importLibrary', importLibrary);

// FROM DB

// Artists
// router.get('/artists', getFollowedArtists); // Currently unused
router.get('/artists/:artistId', getArtist);

// Fetch library for the account
router.get('/getLibrary', getLibrary);

// Tags
// router.get('/tags', getTags); // Currently unused
router.post('/tags', createTag);
// TODO: #1 should be a put request as we are updating an artist?
router.post('/tags/add/:artistId', tagArtist);
// TODO: #2 should be a delete request as we are updating an artist?
router.post('/tags/remove/:artistId', untagArtist)


module.exports = router;