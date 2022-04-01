const title = document.querySelector("#title")
const author = document.querySelector("#author")
const isbn = document.querySelector("#isbn")

const submit = document.querySelector(".submit-btn")

const library = document.querySelector(".library-main")

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

submit.addEventListener("click", () => {
  let newBook = new Book(title.value, author.value, isbn.value)
  console.log(newBook)
})