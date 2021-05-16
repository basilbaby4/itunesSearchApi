const itunesAPI = require("node-itunes-search");
const itunes_helper = {
    validateQuery: (req, res, next) => {
        var query = req.query;
        if (query.artistName != '' && query.artistName != undefined) {
            next();
        } else {
            res.json([]);
        }
    },
    searchArtist: (req, res, next) => {
        var query = req.query;
        const searchOptions = new itunesAPI.ItunesSearchOptions({
            term: query.artistName,
            country: 'gb',
            entity: 'album',
        });
        itunesAPI.searchItunes(searchOptions).then((result) => {
            var artistList = [];
            result.results.map(x => artistList.filter(a => a == x.artistName).length > 0 ? null : artistList.push(x.artistName));
            res.json(artistList);
        }).catch(() => {
            res.json([]);
        })
    },
    searchAlbum: (req, res, next) => {
        var query = req.query;
        const searchOptions = new itunesAPI.ItunesSearchOptions({
            term: query.artistName,
            country: 'gb',
            entity: 'album',
            limit: 200
        });
        itunesAPI.searchItunes(searchOptions).then((result) => {
            const albums = result.results.filter(record => record.artistName.toLowerCase() === query.artistName.toLowerCase());
            const uniqueAlbums = [];
            albums.map(x => uniqueAlbums.filter(a => a.collectionName.toLowerCase() == x.collectionName.toLocaleLowerCase()).length > 0 ? null : uniqueAlbums.push({ collectionId: x.collectionId, collectionName: x.collectionName, artworkUrl100: x.artworkUrl100, artistName: x.artistName }));
            res.json(uniqueAlbums);
        }).catch(() => {
            res.json([]);
        })
    }
};
module.exports = itunes_helper;