function getTotalBooksCount(books) {
    return books.length;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    let borrowed = books.filter(book => book.borrows[0].returned === false);
    return borrowed.length;
}

function getMostCommonGenres(books) {
    let bookGenres = books.map(book => book.genre).sort((a, b) => a < b ? -1 : 1);
    let favorites = [];

    bookGenres.forEach((genre) => {
        // helper method
        favorites = createGenreCountObjArray(favorites, genre);
    })

    let newFavs = favorites.sort((a, b) => a.count > b.count ? -1 : 1);
    return newFavs.slice(0, 5);
}

function getMostPopularBooks(books) {
    let favorites = books.sort((a, b) => a.borrows.length > b.borrows.length ? -1 : 1).slice(0, 5);

    let newFavs = [];
    favorites.forEach(fav => {
        let obj = {};
        obj["name"] = fav.title;
        obj["count"] = fav.borrows.length;
        newFavs.push(obj);
    })

    return newFavs;
}

function getMostPopularAuthors(books, authors) {
    let popAuths = [];

    authors.forEach(({ id, name }) => {
        const written = books.filter(book => book.authorId === id);

        let obj = {};
        let count = 0;
        const counted = written.reduce((acc, { borrows }) => { return acc + borrows.length }, count);

        obj["name"] = `${name.first} ${name.last}`;
        obj["count"] = counted;

        popAuths.push(obj);
    })

    return popAuths.sort((a, b) => a.count > b.count ? -1 : 1).slice(0, 5);
}



// HELPER FUNCTION
function createGenreCountObjArray(arr, stringToCheck) {
    let obj = {};
    let newArr = [...arr];
    let item = newArr.find(item => item.name === stringToCheck);

    if (arr.length === 0 || item === undefined) {
        obj["name"] = stringToCheck;
        obj["count"] = 1;
        newArr.push(obj);
    } else {
        item.count += 1;
    }

    return newArr;
}




module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};