const title = document.querySelector("#title")
const author = document.querySelector("#author")
const isbn = document.querySelector("#isbn")

const check = document.querySelector("#read")

const library = document.querySelector(".library-main")

const submit = document.querySelector(".submit-btn")

let myLibrary = [
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

function createRecord(array) {
  let record = document.createElement("div")
  record.classList.add("record")
  library.appendChild(record)

  let title = document.createElement("div")
  title.classList.add("title")
  record.appendChild(title)
  title.textContent = array[i].title

  let author = document.createElement("div")
  author.classList.add("author")
  record.appendChild(author)
  author.textContent = array[i].author

  let pages = document.createElement("div")
  pages.classList.add("pages")
  record.appendChild(pages)
  pages.textContent = array[i].pages

  if (array[i].read == true) {
    let read = document.createElement("div")
    read.classList.add("read")
    record.appendChild(read)
    read.textContent = "Read"
  } else {
    let read = document.createElement("div")
    read.classList.add("read")
    record.appendChild(read)
    read.textContent = "Not Read"
  }



  let deleteBtn = document.createElement("button")
  deleteBtn.classList.add("delete")
  record.appendChild(deleteBtn)
  deleteBtn.textContent = "x"

}

function addBooksToLibrary(array) {
  for (i = 0; i < array.length; i++) {
    createRecord(array)
    console.log(array[i])
  }
}

function createNewRecord(obj) {

  if (!obj.title || !obj.author || !obj.pages) {
    console.log("Fill all fields")
  } else {
    let record = document.createElement("div")
    record.classList.add("record")
    library.appendChild(record)

    let title = document.createElement("div")
    title.classList.add("title")
    record.appendChild(title)
    title.textContent = obj.title

    let author = document.createElement("div")
    author.classList.add("author")
    record.appendChild(author)
    author.textContent = obj.author

    let pages = document.createElement("div")
    pages.classList.add("pages")
    record.appendChild(pages)
    pages.textContent = obj.pages

    if (check.checked) {
      let read = document.createElement("div")
      read.classList.add("read")
      record.appendChild(read)
      read.textContent = "Read"
    } else {
      let read = document.createElement("div")
      read.classList.add("read")
      record.appendChild(read)
      read.textContent = "Not read"
    }

    let deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete")
    record.appendChild(deleteBtn)
    deleteBtn.textContent = "x"


  }
}


submit.addEventListener("click", () => {
  let newBook = new Book(title.value, author.value, pages.value, read.value)
  myLibrary.push(newBook)
  createNewRecord(myLibrary[myLibrary.length - 1])
  console.log(myLibrary[myLibrary.length - 1])
})

addBooksToLibrary(myLibrary)