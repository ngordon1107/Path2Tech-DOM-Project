// DOM Elements
const table = document.getElementById("table");
const title = document.querySelector(".book-title");
const author = document.querySelector(".book-author");
const publisher = document.querySelector(".book-publisher");

API = "https://bookstore-api-six.vercel.app/api/books";
window.onload = async function () {
  // Fetch books from the backend
  const books = await (await fetch(API)).json();

  // Render each book
  books.forEach((book) => {
    const newRow = table.insertRow(-1);
    newRow.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.publisher}
                  <button class="delete-button">Delete</button>
              </td>
          `;
  });

  // adding row functionality
  document.querySelector(".add-book").addEventListener("click", async (e) => {
    e.preventDefault();
    const bookTitle = title.value.trim();
    const bookAuthor = author.value.trim();
    const bookPublisher = publisher.value.trim();

    // Putting into single object for sending to the backend
    const book = {
      title: bookTitle,
      author: bookAuthor,
      publisher: bookPublisher,
    };

    // making sure form will be valid
    if (!bookTitle || !bookAuthor || !bookPublisher) {
      alert("Please fill out all fields");
      return;
    }

    // adding that new row
    const newRow = table.insertRow(-1);
    newRow.innerHTML = `
            <td>${bookTitle}</td>
            <td>${bookAuthor}</td>
            <td>${bookPublisher}
                <button class="delete-button">Delete</button>
            </td>
        `;

    // creating book and sending the backend
    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    // adding hover effect to the new row
    newRow.addEventListener("mouseover", () => {
      newRow.style.backgroundColor = "lightgray";
    });
    newRow.addEventListener("mouseout", () => {
      newRow.style.backgroundColor = "";
    });

    // adding delete functionality
    newRow
      .querySelector(".delete-button")
      .addEventListener("click", async function () {
        this.closest("tr").remove();
        // Sending request to delete book to backend
        await fetch(`${API}/1}`, { method: "DELETE" });
      });

    // Clearing the fields after "add book" is pressed
    document.querySelector(".book-title").value = "";
    document.querySelector(".book-author").value = "";
    document.querySelector(".book-publisher").value = "";
  });

  // adding delete functionality to individual rows
  document.querySelectorAll(".delete-button").forEach((button, i) => {
    button.addEventListener("click", async function () {
      this.closest("tr").remove();

      // Sending request to delete book to backend
      await fetch(`${API}/${books[i].id}`, { 
        method: "DELETE" 
       });
    });
  });

  // adding hover effect to existing rows
  document.querySelectorAll("tbody tr").forEach((row) => {
    row.addEventListener("mouseover", () => {
      row.style.backgroundColor = "lightgray";
    });
    row.addEventListener("mouseout", () => {
      row.style.backgroundColor = "";
    });
  });
};