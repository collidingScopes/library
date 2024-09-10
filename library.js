let carver = new Book("Carver","Cathedral","200",true);
let hemingway = new Book("Hemingway","The Sun Also Rises","300",true);
let mccarthy = new Book("McCarthy","The Road","400",false);
const myLibrary = [carver, hemingway, mccarthy];

let libraryContainer = document.querySelector(".libraryContainer");
let displayButton = document.querySelector(".displayButton");
displayButton.addEventListener("click",displayLibrary);

const showButton = document.getElementById("showDialog");
const addBookDialog = document.getElementById("addBookDialog");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");

let authorInput = document.querySelector("#authorInput");
let titleInput = document.querySelector("#titleInput");
let numPagesInput = document.querySelector("#numPagesInput");
let readInput = document.querySelector("#readInput");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  authorInput.value = "";
  titleInput.value = "";
  numPagesInput.value = "";
  readInput.value = true;
  addBookDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
addBookDialog.addEventListener("close", (e) => {
  let author = String(authorInput.value);
  let title = String(titleInput.value);
  let numPages = Number(numPagesInput.value);
  let read = Boolean(readInput.value);

  let newBook = new Book(author, title, numPages, read);
  myLibrary.push(newBook);

  displayLibrary();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  addBookDialog.close(); // Have to send the select box value here.
});

function Book(author, title, numPages, read) {
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.read = read;
}

function addBookToLibrary() {
  // do stuff here
}

function displayLibrary() {

  while (libraryContainer.lastElementChild) {
    libraryContainer.removeChild(libraryContainer.lastElementChild);
  }

  for(var i=0; i<myLibrary.length; i++){

    let card = document.createElement("div");
    card.classList.add("gridItem");
    card.dataset.index = i;

    let title = document.createElement("h3");
    title.textContent = "Book #"+(i+1);
    card.appendChild(title);

    let description = document.createElement("p");
    description.textContent = myLibrary[i].author+", "+myLibrary[i].title+
    ", "+myLibrary[i].numPages+", read yet: "+myLibrary[i].read;
    card.appendChild(description);

    let removeButton = document.createElement("button");
    removeButton.dataset.index = i;
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener("click", removeBook);
    card.appendChild(removeButton);

    let toggleButton = document.createElement("button");
    toggleButton.dataset.index = i;
    toggleButton.textContent = "Toggle Read Status";
    toggleButton.addEventListener("click", toggleReadStatus);
    card.appendChild(toggleButton);  

    libraryContainer.appendChild(card);

  }
}

function removeBook() {
  let index = this.dataset.index;
  console.log("remove book at index: "+index);
  myLibrary.splice(index,1);
  displayLibrary();
}

function toggleReadStatus() {
  let index = this.dataset.index;
  let currentReadStatus = myLibrary[index].read;
  console.log("current read status: "+currentReadStatus);

  let newReadStatus = !currentReadStatus;
  console.log("new read status: "+newReadStatus);

  myLibrary[index].read = newReadStatus;

  displayLibrary();

}