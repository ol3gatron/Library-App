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
  for (let i = 0; i < booksArray.length; i++) {
    createRecordElement(booksArray, i)
  }

  let deleteBtns = document.querySelectorAll(".deleteBtn")
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
     myLibrary.splice(btn.parentElement.getAttribute("data-record"), 1)
      console.log(myLibrary)
      clearRecords()
      displayBooks(myLibrary)
    })
  })

  let reads = document.querySelectorAll(".read")
reads.forEach((read) => {
  read.addEventListener("click", () => {
    myLibrary[read.parentElement.getAttribute("data-record")].readSwitch()
    clearRecords()
    displayBooks(myLibrary)
  })
})
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

  const read = document.createElement("div")
  read.classList.add("read")
  record.appendChild(read)
  if (booksArray[i].read) {
    read.textContent = "Read"
  } else {
    read.textContent = "Not Read"
  }

  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("deleteBtn")
  record.appendChild(deleteBtn)
  deleteBtn.textContent = "X"
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



submitBtn.addEventListener("click", () => {
  if (isInputsEmpy()) {
    warningMsg.classList.add("warning-hiden")
  } else {
    warningMsg.classList.remove("warning-hiden")
    addBookToLibrary()
    clearInputs()
    clearRecords()
    displayBooks(myLibrary)
  }
})

displayBooks(myLibrary)