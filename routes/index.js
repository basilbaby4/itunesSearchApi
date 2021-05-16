const express = require('express');
const router = express.Router();
const itunes_helper = require("../helpers/itunes_helper");
router.use(itunes_helper.validateQuery)
router.get('/searchArtist', itunes_helper.searchArtist);
router.get('/', itunes_helper.searchAlbum);
module.exports = router;
