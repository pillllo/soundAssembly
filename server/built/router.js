"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artists_1 = require("./controller/artists");
const authorization_1 = require("./controller/authorization");
const library_1 = require("./controller/library");
const tags_1 = require("./controller/tags");
const router = (0, express_1.Router)();
// SPOTIFY API
// OAuth
router.post("/login", authorization_1.authorize);
// Fetch library (followed artists with with tags)
router.get("/importLibrary", library_1.importLibrary);
// FROM DB
// Artists
router.get("/artists/:artistId", artists_1.getArtist);
// Library (of the user)
router.get("/getLibrary", library_1.getLibrary);
// Tags
router.post("/tags", tags_1.createTag);
// TODO: #1 should be a put request as we are updating an artist?
router.post("/tags/add/:artistId", tags_1.tagArtist);
// TODO: #2 should be a delete request as we are updating an artist?
router.post("/tags/remove/:artistId", tags_1.untagArtist);
exports.default = router;
//# sourceMappingURL=router.js.map