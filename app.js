let myLibrary = [];

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0);
    }
}

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

if (storageAvailable('localStorage')) {
    alert("Local Storage will be used");
    if(localStorage.length === 0){
        myLibrary = [{title:"The Art of War",
        author: "Sun Tzu",
        numOfPages: 234,
        read: "Read" },
        {title:"Rich Dad, Poor Dad",
        author: "Robert Kiyosaki",
        numOfPages: 335,
        read: "Read" },
        {title:"Think and Grow Rich",
        author: "Napolean Hill",
        numOfPages: 256,
        read: "Unread" },]; 
    }
    else {
    myLibrary = localStorage.getObj("library");
}
}
else {
  alert("Local Storage is not available on this browser.");
    myLibrary = [{title:"The Art of War",
    author: "Sun Tzu",
    numOfPages: 234,
    read: "Read" },
    {title:"Rich Dad, Poor Dad",
    author: "Robert Kiyosaki",
    numOfPages: 335,
    read: "Read" },
    {title:"Think and Grow Rich",
    author: "Napolean Hill",
    numOfPages: 256,
    read: "Unread" },]; 
}

function Book(title, author, numOfPages, read){
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    
    if(read){
        this.read = "Read";
    }
    else {
        this.read = "Unread";
    }
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.read}`;
    }
}

const table = document.getElementById("library_catalog");
const secondTable = document.getElementById("lib_content");

function addBookToLibrary(){
    
    let title = document.getElementById("Title").value;
    let author = document.getElementById("Author").value;
    if(title === "" || author === "" || !pages){
        alert('Please fill out the entire form');
        return;
    }
    
    let numOfPages = document.getElementById("pages").value;
    if(isNaN(Number(numOfPages))){
        alert('Please use numbers only');
        return;
    }
    else {
        numOfPages = Number(numOfPages);
        console.log(typeof numOfPages);
    }

    let read = document.getElementById("read?").checked;
    myLibrary.push(new Book(title,author,numOfPages,read));
    secondTable.innerHTML="";
    render();
}

function render(){ 
    
    secondTable.innerHTML="";
    for(let i = myLibrary.length-1; i >= 0; i--){
        console.log(i);
        let row = secondTable.insertRow(0);
        row.setAttribute("data-index", `${i}`);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerHTML = myLibrary[i].title;
        cell2.innerHTML = myLibrary[i].author;
        cell3.innerHTML = myLibrary[i].numOfPages;
        cell4.innerHTML = `<button class="button">${myLibrary[i].read}</button>`;
        cell4.id = "toggle";
        cell5.innerHTML = i + 1;
        cell6.id = "remove";
        cell6.innerHTML = `<button class="button">Delete</button>`;
    }

    let allremoveButton  = document.querySelectorAll("#remove");
    for (const button of allremoveButton) {
        button.addEventListener('click', remove);
    }
    let allToggle = document.querySelectorAll("#toggle");
    for( const toggles of allToggle){
        toggles.addEventListener('click', toggle)
    }
    if (storageAvailable('localStorage')) {
        localStorage.setObj("library", myLibrary);
        console.log(localStorage);
    }
}

function remove(){
    myLibrary.splice(Number(this.parentNode.dataset.index),1);
    render();
}

function toggle(){
    
    if(myLibrary[this.parentNode.dataset.index].read === "Read"){
        myLibrary[this.parentNode.dataset.index].read = "Unread"; 
    }else if(myLibrary[this.parentNode.dataset.index].read === "Unread"){
        myLibrary[this.parentNode.dataset.index].read = "Read";
    }
    render();
}
render();

let submit = document.querySelector("button");

submit.addEventListener("click", addBookToLibrary);