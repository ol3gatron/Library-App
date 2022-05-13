class Book {
  constructor(title, author, pages, isbn, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isbn = isbn;
    this.read = read;
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector(".book-list")
    // Create tr element
    const row = document.createElement("tr");

    let read;
    if (book.read) {
      read = "Yes"
    } else {
      read = "No"
    }
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.isbn}</td>
      <td class="read">${read}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row)
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement("div")
    // Add class name
    div.className = `alert ${className}`
    // Add text
    div.appendChild(document.createTextNode(message))
    // Get parent
    const container = document.querySelector(".container")
    // Get form
    const form = document.querySelector(".book-form")
    // Insert alert
    container.insertBefore(div, form)

    // Timeout after 2 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 2000)
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }

  readStatus(target) {
    if (target.textContent === "No") {
      target.textContent = "Yes"
    } else {
      target.textContent = "No"
    }
  }

  clearFields() {
    const title = document.querySelector("#title").value = ""
    const author = document.querySelector("#author").value = ""
    const pages = document.querySelector("#pages").value = ""
    const isbn = document.querySelector("#isbn").value = ""
    const read = document.querySelector("#read").checked = false
  }
}

// Local storage class
class Store {
  static getBooks() {
    let books
    if(localStorage.getItem("books") === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem("books"))
    }

    return books
  }

  static displayBooks() {
    const books = Store.getBooks()

    books.forEach(function(book) {
      const ui = new UI

      // Add book to UI
      ui.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks()

    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks()

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
}

// DOM Load event
document.addEventListener("DOMContentLoaded", Store.displayBooks)

// Event listener for add book
const form = document.querySelector(".book-form")
form.addEventListener("submit", function(e) {
  // Get form values
  const title = document.querySelector("#title").value
  const author = document.querySelector("#author").value
  const pages = document.querySelector("#pages").value
  const isbn = document.querySelector("#isbn").value
  const read = document.querySelector("#read").checked

  // Instantiate book
  const book = new Book(title, author, pages, isbn, read)

  // Instantiate UI
  const ui = new UI()

  // Validate
  if (!title || !author || !pages || !isbn) {
    ui.showAlert("Please fill all fields", "error")
  } else {
    ui.showAlert("Book added!", "success")

    // Add book to list
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book)

    // Clear fiels
    ui.clearFields()
  }

  e.preventDefault()
})

// Event listener for delete
document.querySelector(".book-list").addEventListener("click", function(e) {
  if (e.target.textContent === "X") {
    // Instantiate UI
    const ui = new UI()

    // Delete book
    ui.deleteBook(e.target)

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)

    //Show message
    ui.showAlert("Book removed!", "success")
  }


  e.preventDefault()
})

// Event listener for read status
document.querySelector(".book-list").addEventListener("click", function(e) {
  // Instantiate UI
  const ui = new UI()

  if (e.target.textContent === "No") {
    // Change read status
    ui.readStatus(e.target)

    // Show message
    ui.showAlert("Read status changed!", "success")
  } else if ((e.target.textContent === "Yes")) {
    // Change read status
    ui.readStatus(e.target)

    //Show message
    ui.showAlert("Read status changed!", "success")
  }


  e.preventDefault()
})