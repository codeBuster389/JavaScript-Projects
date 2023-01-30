//Getting UI elements
let form = document.querySelector('#book-form');
let bookList = document.querySelector('#book-list');



// Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class
class UI {

    static addToBooklist(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="btn btn-sm btn-danger">X</a></td>`
        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#book-name').value = "";
        document.querySelector('#author-name').value = "";
        document.querySelector('#isbn').value = "";
    }

    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2300);
    }

    static deleteFromBook(target) {
        if (target.hasAttribute('href')) {
            if (confirm("Are you sure want to delete the book?")) {
                target.parentElement.parentElement.remove();
                Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
                UI.showAlert("Book Removed!", "success");
            }
        }
    }
}

// Local Storage class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks() {
        let books = Store.getBooks();
        books.forEach(book => {
            UI.addToBooklist(book);
        });
    }

    static removeBook(isbn) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Add event listener
form.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);
document.addEventListener("DOMContentLoaded", Store.displayBooks());


// Define functions
function newBook(e) {
    let title = document.querySelector('#book-name').value,
        author = document.querySelector('#author-name').value,
        isbn = document.querySelector('#isbn').value;
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill all the fields!", "error");
    } else {
        let book = new Book(title, author, isbn);
        UI.addToBooklist(book);
        UI.clearFields();
        UI.showAlert("Book added successfully", "success")
        Store.addBook(book);
    }

    e.preventDefault();
}

function removeBook(e) {
    UI.deleteFromBook(e.target);
    e.preventDefault();
}