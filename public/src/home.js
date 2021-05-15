function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let borrowed = books.filter(book => book.borrows[0].returned === false)
  return borrowed.length
}

function getMostCommonGenres(books) {
  let bookGenres = books.map(book => book.genre).sort((a, b) => a < b ? -1 : 1)

  let favorites = []
  
  bookGenres.forEach((genre) => {
    if (favorites.length == 0 || favorites.find(f => f.name === genre) === undefined){
      let obj = {}
      obj["name"] = genre
      obj["count"] = 1
      
      favorites.push(obj)
    }else{
      let obj = favorites.find(f => f.name === genre)
      obj.count += 1
    }
  })
  
  let newFavs = favorites.sort((a, b) => a.count > b.count ? -1 : 1)
  return newFavs.slice(0, 5)
}

function createObjForArray(arr, stringToCheck){
  let obj = {};
  let item = arr.find(item => item.name === stringToCheck)
  if (arr.length === 0 || item === undefined){
    obj["name"] = genre;
    obj["count"] = 1;
  }else{
    item.count += 1;
  }

  return obj;
}

function getMostPopularBooks(books) {
  let favorites = books.sort((a, b) => a.borrows.length > b.borrows.length ? -1 : 1).slice(0, 5)
  
  let newFavs = []
  favorites.forEach(fav => {
      let obj = {}
      obj["name"] = fav.title
      obj["count"] = fav.borrows.length
      newFavs.push(obj)
  })
  
  return newFavs
}

function getMostPopularAuthors(books, authors) {
  let popAuths = []

  authors.forEach(({id, name}) => {
    const written = books.filter(book => book.authorId === id)    

    let obj = {};
    let count = 0;
    const counted = written.reduce((acc, {borrows}) => {return acc + borrows.length}, count);
  
    obj["name"] = `${name.first} ${name.last}`;
    obj["count"] = counted
    
    popAuths.push(obj);
  })

  return popAuths.sort((a, b) => a.count > b.count ? -1 : 1).slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
