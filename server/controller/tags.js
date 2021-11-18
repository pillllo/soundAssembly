const Library = require('../model/librarySchema.js');

// Get all tags in the account

exports.getTags = async (req, res) => {
  try {
    // TODO: #11 refactor function so that tags = tags, not an array of tags
    const tags = await Library.find({username: "natpil"}, { tags: 1 });
    res.send(tags[0].tags);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Create a new tag

exports.createTag = async (req, res) => {
  try {
    // TODO: #12 rename 'name' to tag for readbility
    const {name} = req.body;
    const tag = await Library.findOneAndUpdate({username: "natpil"}, {
      $push: {
        "tags": {name: name}
      }
    })
    res.send(tag)
    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Add new tag to artist

exports.tagArtist = async (req, res) => {
  try {
    const id = req.params.artistId;
    // TODO: #13 rename 'name' to tag for readability
    const {name} = req.body;
    const tag = await Library.updateOne({
      "username": "natpil"
    },
    {
      $push: {
        "artists.$[i].artistTags": {
          name: name
        }
      }
    },
    {
      arrayFilters: [
        {
          "i.id": id
        }
      ]
    });
    res.send(tag);
    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Untag artist

exports.untagArtist = async (req, res) => {
  try {
    const id = req.params.artistId;
    // TODO: #14 rename 'name' to tag for readability
    const {name} = req.body;
    const tag = await Library.updateOne({
      "username": "natpil"
    },
    {
      $pull: {
        "artists.$[i].artistTags": {
          name: name
        }
      }
    },
    {
      arrayFilters: [
        {
          "i.id": id
        }
      ]
    })
    res.send(tag);
    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
