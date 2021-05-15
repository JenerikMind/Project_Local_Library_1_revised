function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let allBooks = [[], []]
  
  let filtered = books.filter(book => {
    if (book.borrows.every(borrowed => borrowed.returned)){
      allBooks[1].push(book)
    }else{
      allBooks[0].push(book)
    }
  })
  
  return allBooks
}

function getBorrowersForBook(book, accounts) {
  let borrowed = book.borrows
  let borrows = []
  let borrowers = borrowed.map(borrow => {
    let account = accounts.find(acc => acc.id === borrow.id)
    borrow["returned"] = borrow.returned
    borrow["name"] = account.name
    borrow["email"] = account.email
    
    borrows.push(borrow)
  })
  
  return borrows.slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
