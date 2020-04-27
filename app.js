
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary('Rich Dad, Poor Dad', 'Robery Kiyosaki', 235, 0);
addBookToLibrary('Think and Grow Rich', 'Napolean Hill', 334, 0);

function displayAlert(message, messageType) {
  const alert = document.querySelector('.alert');
  const alertMessage = document.querySelector('#message');
  const alertType = document.querySelector('#message-type');
  alert.style.display = 'block';
  alertMessage.innerHTML = message;
  alertType.innerHTML = messageType;
  if (messageType === 'Danger!') {
    alert.style.backgroundColor = '#ff5c33';
  } else if (messageType === 'Success!') {
    alert.style.backgroundColor = '#00cc66';
  } else {
    alert.style.backgroundColor = '#ffa31a';
  }
}

function render() {
  const container = document.querySelector('.items-container');
  container.innerHTML = '';
  let counter = 0;
  myLibrary.forEach(obj => {
    container.innerHTML
    += `
      <div class='item card'> 
          <p class='title'><span>Title: </span>${obj.title}</p>
          <p class='pages'>${obj.pages}<span> Pages</span></p>
          <p class='author'><span>By: </span>${obj.author}</p>
          
          <div class='action-btns'>
            <button class='btn read-btn' onclick='updateReadStatus(${counter})'>
            ${obj.read === 0 ? 'Not read' : 'Read'}
            </button>
            <button class='btn delete-btn' onclick='deleteBook(${counter})'>Delete</button>
          </div>
      </div>
    `;
    counter += 1;
  });
}
const buttonNewBook = document.getElementById('btnNewBook');
buttonNewBook.addEventListener('click', () => {
  const form = document.querySelector('#form');
  form.style.display = 'block';
});

function addFormValues() {
  const form = document.getElementById('form');
  function handleForm(event) { event.preventDefault(); }
  form.addEventListener('submit', handleForm);
  const btnAddBook = document.getElementById('addBook');
  btnAddBook.addEventListener('click', () => {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const read = document.getElementById('read').checked ? 1 : 0;
    const pages = document.getElementById('pages');
    if (title.value === null || title.value === '') {
      displayAlert('Title must not be empty.', 'Danger!');
    } else if (author.value === null || author.value === '') {
      displayAlert('Author must not be empty.', 'Danger!');
    } else if (pages.value === null || pages.value === '') {
      displayAlert('Book pages must not be empty.', 'Danger!');
    } else {
      addBookToLibrary(title.value, author.value, parseInt(pages.value, 10), read);
      title.value = '';
      author.value = '';
      pages.value = '';
      document.getElementById('read').checked = false;
      render();
      displayAlert('Book added successfully', 'Success!');
    }
  });
}

function deleteBook(position) { // eslint-disable-line no-unused-vars
  myLibrary.splice(position, 1);
  render();
  displayAlert('Book deleted successfully', 'Danger!');
}

function updateReadStatus(position) { // eslint-disable-line no-unused-vars
  if (myLibrary[position].read === 0) {
    myLibrary[position].read = 1;
  } else {
    myLibrary[position].read = 0;
  }
  render();
}

render();
addFormValues();