function findAccountById(accounts, id) {
  return accounts.find((acc) => acc.id === id)
}

function sortAccountsByLastName(accounts) {
  return names = accounts.sort((a, b) => a.name.last < b.name.last ? -1 : 1)
}

function getTotalNumberOfBorrows(account, books) {
  const accId = account.id
  let borrowed_num = 0
  let borrowed = books.filter(book => {
    book.borrows.filter(borrowed => {if (borrowed.id === accId) borrowed_num += 1})
  })
  
  return borrowed_num
}

function getBooksPossessedByAccount(account, books, authors) {
  let borrowed = []
  let allBooks = books.forEach(book => {
    book.borrows.forEach(borrow => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowed.push(book)
      }
    })
  })
  
  let fullInfo = borrowed.map(book => {
    book["author"] = authors.find(author => author.id === book.authorId)
  })
  
  return borrowed
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
