const Library = require('../model/librarySchema.js');

// Fetches all followed artists from db for a specific user

exports.getFollowedArtists = async (req, res) => {
  try {
    const {username} = req.body;
    const artists = await Library.find({username: username});
    res.send(artists);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Fetches a queried artist from db for a specific user

exports.getArtist = async (req, res) => {
  try {
    const id = req.params.artistId;
    const artist = await Library.findOne({username: 'natpil'}, {artists: 1, artists: {$elemMatch: {id: id}}});
    // TODO: #5 refactor function so that artist = artist, not an array of artists
    res.send(artist.artists[0]);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
