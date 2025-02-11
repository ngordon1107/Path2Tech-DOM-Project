// selecting element that will get hover effect 
let table = document.getElementById("table");

// adding row functionality
document.querySelector(".add-book").addEventListener('click', (e) => {
    e.preventDefault();
    let title = document.querySelector('.book-title').value.trim();
    let author = document.querySelector('.book-author').value.trim();
    let publisher = document.querySelector('.book-publisher').value.trim();

    // making sure form will be valid
    if (!title || !author || !publisher) {
        alert('Please fill out all fields');
        return; 
    }

    // adding that new row
    let newRow = table.insertRow(-1);
    newRow.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${publisher}
            <button class="delete-button">Delete</button>
        </td>
    `;

    // adding hover effect to the new row
    newRow.addEventListener('mouseover', () => {
        newRow.style.backgroundColor = "lightgray";
    });
    newRow.addEventListener('mouseout', () => {
        newRow.style.backgroundColor = "";
    });

    // adding delete functionality
    newRow.querySelector(".delete-button").addEventListener("click", function() {
        this.closest('tr').remove();
    });

    // Clearing the fields after "add book" is pressed
    document.querySelector('.book-title').value = '';
    document.querySelector('.book-author').value = '';
    document.querySelector('.book-publisher').value = '';
});

// adding delete functionality to individual rows
document.querySelectorAll('.delete-button').forEach(button =>
    {
    button.addEventListener('click', function() {
        this.closest('tr').remove();
    });
});

// adding hover effect to existing rows
document.querySelectorAll('tbody tr').forEach(row => {
    row.addEventListener('mouseover', () => {
        row.style.backgroundColor = "lightgray";
    });
    row.addEventListener('mouseout', () => {
        row.style.backgroundColor = "";
    });
});