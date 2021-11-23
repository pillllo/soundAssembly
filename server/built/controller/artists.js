const Library = require("../model/librarySchema.js");
// Fetches all followed artists from db for a specific user
// Currently not used
// exports.getFollowedArtists = async (req, res) => {
//   try {
//     const { username } = req.body;
//     const artists = await Library.find({ username: username });
//     res.send(artists);
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//   }
// };
// Fetches a queried artist from db for a specific user
exports.getArtist = async (req, res) => {
    try {
        const id = req.params.artistId;
        // returns array whith 1 object, which is the artist that matches the id
        const artistArr = await Library.findOne({ username: "22ejpen6z5sisae7nj4lua01r" }, { artists: 1, artists: { $elemMatch: { id: id } } });
        const artist = artistArr.artists[0];
        res.send(artist);
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
};
//# sourceMappingURL=artists.js.map