const maindiv = document.getElementById('main');

// Fetch books by category or search term
function fetchBooks(category = '') {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.items))
        .catch(err => console.error(err));
}

// Display books in the main content area
function displayBooks(books) {
    maindiv.innerHTML = ''; // Clear the existing content
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('book-card');
        
        const image = document.createElement('img');
        image.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
        image.alt = book.volumeInfo.title;

        const title = document.createElement('h2');
        title.textContent = book.volumeInfo.title;

        const author = document.createElement('h3');
        author.textContent = book.volumeInfo.authors ? `Author: ${book.volumeInfo.authors.join(', ')}` : 'Unknown Author';

        const description = document.createElement('p');
        description.textContent = book.volumeInfo.description ? book.volumeInfo.description : 'No description available.';

        div.append(image, title, author, description);
        maindiv.appendChild(div);
    });
}

// Advanced search by user input
function advancedSearch() {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        fetchBooks(query);
    } else {
        alert('Please enter a search term.');
    }
}

// Initial fetch for default books
fetchBooks('bestsellers');
