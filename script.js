// Book constructor
function Book(title, author, pages, isbn, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isbn = isbn;
  this.read = read;
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
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
    <td>${read}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row)
}

UI.prototype.showAlert = function(message, className) {
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

  // Timeout after 3 sec
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000)
}

// Clear fiels
UI.prototype.clearFields = function() {
  const title = document.querySelector("#title").value = ""
  const author = document.querySelector("#author").value = ""
  const pages = document.querySelector("#pages").value = ""
  const isbn = document.querySelector("#isbn").value = ""
  const read = document.querySelector("#read").checked = false
}

// Event listener
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

    // Clear fiels
    ui.clearFields()
  }

  e.preventDefault()
})