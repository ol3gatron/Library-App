//UI Elements
const submitBtn = document.querySelector(".submit-btn");
const warningMsg = document.querySelector(".warning")


myLibrary = [
  {
    title: "Девушка с татуировкой дракона",
    author: "Стиг Ларссон",
    pages: "525",
    read: true,
    readSwitch: function() {
      this.read = !this.read
    }
  },
  {
    title: "Магистр дьявольского культа",
    author: "Мосян Тунсю",
    pages: "1481",
    read: true,
    readSwitch: function() {
      this.read = !this.read
    }
  },
  {
    title: "Кэрри",
    author: "Стивен Кинг",
    pages: "199",
    read: false,
    readSwitch: function() {
      this.read = !this.read
    }
  },{
    title: "Учитель и ученик",
    author: "Клаудия Грэй",
    pages: "337",
    read: false,
    readSwitch: function() {
      this.read = !this.read
    }
  },{
    title: "Лето в пионерском галстуке",
    author: "Катерина Сильванова",
    pages: "423",
    read: false,
    readSwitch: function() {
      this.read = !this.read
    }
  },
]



function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readSwitch = function() {
  this.read = !this.read

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
  createHeader()

  for (let i = 0; i < booksArray.length; i++) {
    createRecordElement(booksArray, i)
  }

  let deleteBtns = document.querySelectorAll(".deleteBtn")
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
     myLibrary.splice(btn.getAttribute("data-record"), 1)
      console.log(myLibrary)
      clearRecords()
      displayBooks(myLibrary)
    })
  })

  let reads = document.querySelectorAll(".read")
  reads.forEach((read) => {
  read.addEventListener("click", () => {
    myLibrary[read.getAttribute("data-record")].readSwitch()
    clearRecords()
    displayBooks(myLibrary)
  })
})
}

// Create DOM elemetns such as: record > title, author, pages, read
function createRecordElement(booksArray, i) {
  const library = document.querySelector(".library-main")

  const title = document.createElement("div")
  title.classList.add("title")
  title.setAttribute("data-record", `${i}`)
  library.appendChild(title)
  title.textContent = booksArray[i].title

  const author = document.createElement("div")
  author.classList.add("author")
  author.setAttribute("data-record", `${i}`)
  library.appendChild(author)
  author.textContent = booksArray[i].author

  const pages = document.createElement("div")
  pages.classList.add("pages")
  pages.setAttribute("data-record", `${i}`)
  library.appendChild(pages)
  pages.textContent = booksArray[i].pages

  const read = document.createElement("div")
  read.classList.add("read")
  read.setAttribute("data-record", `${i}`)
  library.appendChild(read)
  if (booksArray[i].read) {
    read.textContent = "Read"
  } else {
    read.textContent = "Not Read"
  }

  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("deleteBtn")
  deleteBtn.setAttribute("data-record", `${i}`)
  library.appendChild(deleteBtn)
  deleteBtn.textContent = "X"
}

function createHeader() {
  const library = document.querySelector(".library-main")

  const titleHead = document.createElement("div")
  titleHead.classList.add("title-header")
  library.appendChild(titleHead)
  titleHead.textContent = "Title"

  const authorHead = document.createElement("div")
  authorHead.classList.add("author-header")
  library.appendChild(authorHead)
  authorHead.textContent = "Author"

  const pagesHead = document.createElement("div")
  pagesHead.classList.add("pages-header")
  library.appendChild(pagesHead)
  pagesHead.textContent = "Pages"

  const readHead = document.createElement("div")
  readHead.classList.add("read-header")
  library.appendChild(readHead)
  readHead.textContent = "Read?"

  const dltBtn = document.createElement("button")
  dltBtn.classList.add("dlt")
  dltBtn.classList.add("dlt-header")
  library.appendChild(dltBtn)
  dltBtn.textContent = "X"
}

function isInputsEmpy() {
  let title = document.querySelector("#title").value
  let author = document.querySelector("#author").value
  let pages = document.querySelector("#pages").value

  if (!title || !author || !pages) {
    return true
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
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
}

function warningMsgHide() {
  warningMsg.classList.remove("warning-hiden")
}

submitBtn.addEventListener("click", () => {
  if (isInputsEmpy()) {
    warningMsg.classList.add("warning-hiden")
    setTimeout(() => {warningMsg.classList.remove("warning-hiden")}, 3000)
  } else {
    warningMsg.classList.remove("warning-hiden")
    addBookToLibrary()
    clearInputs()
    clearRecords()
    displayBooks(myLibrary)
  }
})

displayBooks(myLibrary)