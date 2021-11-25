import { Router } from "express";
import { getArtist } from "./controller/artists";
import { authorize, refreshToken } from "./controller/authorization";
import { getLibrary, importLibrary } from "./controller/library";
import { createTag, tagArtist, untagArtist } from "./controller/tags";
const router = Router();

// SPOTIFY API

// OAuth
router.post("/login", authorize);

// Fetch library (followed artists with with tags)
router.get("/importLibrary", importLibrary);

// FROM DB

// Artists
router.get("/artists/:artistId", getArtist);

// Library (of the user)
router.get("/getLibrary", getLibrary);

// Tags
router.post("/tags", createTag);
// TODO: #1 should be a put request as we are updating an artist?
router.post("/tags/add/:artistId", tagArtist);
// TODO: #2 should be a delete request as we are updating an artist?
router.post("/tags/remove/:artistId", untagArtist);

export default router;
