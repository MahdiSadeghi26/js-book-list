// variables
const $ = document;
const inputForm = $.querySelector("#book-form");
const titleField = $.querySelector("#title");
const authorFiled = $.querySelector("#author");
const year = $.querySelector("#year");
const thead = $.querySelector("thead");
const bookList = $.querySelector("#book-list");
let bookArray = [];
// functions
// if localStorage is empty(add books array)
function setLocalStorage(bookArr) {
	localStorage.setItem("books", JSON.stringify(bookArr));
}

function numberValidator(e) {
	if (e.which < 48 || e.which > 57) {
		e.preventDefault();
		// this function preventing inputing string in year filed!
	}
}
// adding new book
function newBook(e) {
	e.preventDefault();
	if (titleField.value.length != 0 && authorFiled.value.length != 0 && year.length != 0) {
		let newBook = {
			id:bookArray.length +1,
			bookTitle: titleField.value,
			bookAuthor: authorFiled.value,
			publishYear: year.value,
		};
		bookArray.push(newBook);
		bookGenerator(bookArray);
		setLocalStorage(bookArray);
	}
}
// add in dom
function bookGenerator(books) {
	// empty current value in dom(render again)
	bookList.innerHTML = "";
	books.forEach((element) => {
		// creating Elements
		let trElm = $.createElement("tr");
		let titleTd = $.createElement("td");
		let authorTd = $.createElement("td");
		let yearTd = $.createElement("td");		
		// passing value
		titleTd.innerHTML = element.bookTitle;
		authorTd.innerHTML = element.bookAuthor;
		yearTd.innerHTML = element.publishYear;
		//   adding elements value
		trElm.append(titleTd, authorTd, yearTd,deleteBtn);
		//   appending new book to dom
		bookList.append(trElm);
	});
}
// adding new Book to localStorage
function addToLocalStorage() {
	//parse existing array
	let ls = JSON.parse(localStorage.getItem("books"));
	//   pushing new book to parsed array
	ls.push(bookArray);
	// push updated array to localstorage
	let pushToLs = localStorage.setItem("books", JSON.stringify(bookArray));
}
// load books from localStorage	
function loadFromlocalStorage() {
	let loadBooks = JSON.parse(localStorage.getItem("books"));
	if (loadBooks) {
		bookArray = loadBooks;
		console.log(bookArray);
	} else {
		bookArray = [];
	}
	bookGenerator(bookArray);
}

// event listeners
window.addEventListener("load", loadFromlocalStorage);
year.addEventListener("keypress", numberValidator);
inputForm.addEventListener("submit", newBook);