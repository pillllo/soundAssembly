const Library = require('../model/librarySchema.js');

// Get all tags in the account

exports.getTags = async (req, res) => {
  try {
    const tags = await Library.find({username: "mavienajera"}, { tags: 1 });
    res.send(tags[0].tags);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Create a new tag

exports.createTag = async (req, res) => {
  try {
    const {name} = req.body;
    const tag = await Library.findOneAndUpdate({username: "mavienajera"}, {
      $push: {
        "tags": {name: name}
      }
    })
    res.send(tag);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Add new tag to artist

exports.tagArtist = async (req, res) => {
  try {
    const {name} = req.body;
    const tag = await Library.updateOne({username: "mavienajera"})
    res.send(tag);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// db.collection.update({
//   username: "mavienajera",
//   artists: {
//     $elemMatch: {
//       id: "0CKa42Jqrc9fSFbDjePaXP"
//     }
//   }
// },
// {
//   $set: {
//     artists: "OMG"
//   }
// })