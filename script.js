// Book constructor
function Book(title, author, isbn, read) {
  this.title = title;
  this.author = author;
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
    <td>${book.isbn}</td>
    <td>${read}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row)
}

// Event listener
const form = document.querySelector(".book-form")
form.addEventListener("submit", function(e) {
  // Get form values
  const title = document.querySelector("#title").value
  const author = document.querySelector("#author").value
  const isbn = document.querySelector("#isbn").value
  const read = document.querySelector("#read").checked

  // Instantiate book
  const book = new Book(title, author, isbn, read)

  // Instantiate UI
  const ui = new UI()

  // Add book to list
  ui.addBookToList(book);

  e.preventDefault()
})