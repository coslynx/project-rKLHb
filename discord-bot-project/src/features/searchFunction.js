const searchFunction = (manhwaLibrary, searchTerm, filters) => {
    let searchResults = manhwaLibrary.filter(manhwa => {
        let include = true;

        if (searchTerm) {
            include = manhwa.title.toLowerCase().includes(searchTerm.toLowerCase());
        }

        if (filters) {
            if (filters.genre && !manhwa.genre.toLowerCase().includes(filters.genre.toLowerCase())) {
                include = false;
            }
            if (filters.popularity && manhwa.popularity < filters.popularity) {
                include = false;
            }
            if (filters.releaseDate && manhwa.releaseDate < filters.releaseDate) {
                include = false;
            }
        }

        return include;
    });

    return searchResults;
};

module.exports = searchFunction;