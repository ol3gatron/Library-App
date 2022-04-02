//UI Elements
const submitBtn = document.querySelector(".submit-btn");


myLibrary = [
  {
    title: "Carrie",
    author: "Stephen King ",
    pages: "199",
    read: false,
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    pages: "525",
    read: true,
  }
]



function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Create and add book object to books array from user's input
function addBookToLibrary() {
  let title = document.querySelector("#title").value
  let author = document.querySelector("#author").value
  let pages = document.querySelector("#pages").value
  let read = document.querySelector("#read").checked

  let newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
}

// Loop throuh books array to display them on page
function displayBooks(booksArray) {
  for (let i = 0; i < booksArray.length; i++) {
    createRecordElement(booksArray, i)
  }
}

// Create DOM elemetns such as: record > title, author, pages, read
function createRecordElement(booksArray, i) {
  const library = document.querySelector(".library-main")

  const record = document.createElement("div")
  record.classList.add("record")
  record.setAttribute("data-record", `${i}`)
  library.appendChild(record)

  const title = document.createElement("div")
  title.classList.add("title")
  record.appendChild(title)
  title.textContent = booksArray[i].title

  const author = document.createElement("div")
  author.classList.add("author")
  record.appendChild(author)
  author.textContent = booksArray[i].author

  const pages = document.createElement("div")
  pages.classList.add("pages")
  record.appendChild(pages)
  pages.textContent = booksArray[i].pages

  const read = document.createElement("read")
  read.classList.add("read")
  record.appendChild(read)
  if (booksArray[i].read) {
    read.textContent = "Read"
  } else {
    read.textContent = "Not Read"
  }
}

function clearInputs() {
  let title = document.querySelector("#title").value = null
  let author = document.querySelector("#author").value = null
  let pages = document.querySelector("#pages").value = null
  let read = document.querySelector("#read").checked = null
  let record = document.querySelector(".record")
}

function clearRecords() {
  let library = document.querySelector(".library-main")
  console.log(library)
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
}

submitBtn.addEventListener("click", () => {
  addBookToLibrary()
  clearInputs()
  clearRecords()
  displayBooks(myLibrary)
})

displayBooks(myLibrary)