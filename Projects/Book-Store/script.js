const maindiv = document.getElementById('main');

function fetchBooks(category = '') {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${category}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayBooks(data.items))
        .catch(error => console.error('Error fetching books:', error));
}

function displayBooks(books) {
    maindiv.innerHTML = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-card';

        const img = document.createElement('img');
        img.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
        img.alt = book.volumeInfo.title;

        const content = document.createElement('div');
        content.className = 'content';

        const title = document.createElement('h2');
        title.textContent = book.volumeInfo.title;

        const author = document.createElement('h3');
        author.textContent = book.volumeInfo.authors ? `Author: ${book.volumeInfo.authors.join(', ')}` : 'Unknown Author';

        const description = document.createElement('p');
        description.textContent = book.volumeInfo.description ? book.volumeInfo.description : 'No description available.';

        content.append(title, author, description);
        div.append(img, content);
        maindiv.appendChild(div);
    });
}

function advancedSearch() {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        fetchBooks(query);
    } else {
        alert('Please enter a search term.');
    }
}

fetchBooks('bestsellers');
