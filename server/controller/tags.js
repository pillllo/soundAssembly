const Library = require('../model/librarySchema.js');

// Get all tags in the account

exports.getTags = async (req, res) => {
  try {
    // TODO: #11 refactor function so that tags = tags, not an array of tags
    const tags = await Library.find({username: process.env.USERNAME}, { tags: 1 });
    console.log(tags)
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
    const tag = req.body;
    console.log(tag);
    // TODO: remove hardcoded username see #8
    const { tags: updatedTags } = await Library.findOneAndUpdate({username: process.env.USERNAME}, {
      $push: {
        "tags": { name: tag.name }
      }
    }, { new: true }) // ensure we return the tag we just created
    console.log(updatedTags)
    res.send(updatedTags);
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
      "username": process.env.USERNAME
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
      "username": process.env.USERNAME
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
