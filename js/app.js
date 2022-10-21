// variables
const $ = document;
const inputForm = $.querySelector("#book-form");
const titleField = $.querySelector("#title");
const authorFiled = $.querySelector("#author");
const year = $.querySelector("#year");
const thead = $.querySelector("thead");
let bookArray = [];
// functions
// if localStorage is empty(add books array)
function getLocalStorage() {
  if (!localStorage.getItem("books")) {
    localStorage.setItem("books", JSON.stringify(bookArray));
  }
}
function numberValidator(e) {
  if (e.which < 48 || e.which > 57) {
    e.preventDefault();
    // this function preventing inputing string in year filed!
  }
}
function newBook(e) {
  e.preventDefault();
  if (
    titleField.value.length != 0 &&
    authorFiled.value.length != 0 &&
    year.length != 0
  ) {
    let newBook = {
      bookTitle: titleField.value,
      bookAuthor: authorFiled.value,
      publishYear: year.value,
    };
    bookArray.push(newBook);
    bookGenerator(newBook);
    addToLocalStorage();
  }
}
// rendering in dom
function bookGenerator(bookObj) {
  // creating Elements
  let trElm = $.createElement("tr");
  let titleTd = $.createElement("td");
  let authorTd = $.createElement("td");
  let yearTd = $.createElement("td");
  // passing value
  titleTd.innerHTML = bookObj.bookTitle;
  authorTd.innerHTML = bookObj.bookAuthor;
  yearTd.innerHTML = bookObj.publishYear;
  //   adding elements value
  trElm.append(titleTd, authorTd, yearTd);
  //   appending new book to dom
  thead.append(trElm);
}

function addToLocalStorage() {
  //parse existing array
  let ls = JSON.parse(localStorage.getItem("books"));
  //   pushing new book to parsed array
  ls.push(bookArray);
  // push updated array to localstorage
  let pushToLs = localStorage.setItem("books", JSON.stringify(bookArray));
}

// event listeners
window.addEventListener("load", getLocalStorage);
year.addEventListener("keypress", numberValidator);
inputForm.addEventListener("submit", newBook);
