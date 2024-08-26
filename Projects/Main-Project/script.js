const mainDiv = document.getElementById("productsList");
const searchInput = document.getElementById("searchInput");

const fetchData = async (category = '', searchQuery = '') => {
    let url = 'https://dummyjson.com/products';
    if (category) {
        url += `/category/${category}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    const filteredData = data.products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    displayData(filteredData);
};

function displayData(data) {
    mainDiv.innerHTML = "";
    data.forEach(val => {
        const proDiv = document.createElement('div');
        proDiv.classList.add('product', 'col');
        const proImage = document.createElement('img');
        proImage.src = val.thumbnail;
        const proTitle = document.createElement('h2');
        proTitle.textContent = val.title;
        const proPrice = document.createElement('p');
        proPrice.textContent = "Price: ₹" + val.price;
        const proLink = document.createElement('a');
        proLink.href = `./product.html?pid=${val.id}`;
        proLink.textContent = "View Details";
        const proButton = document.createElement('button');
        proButton.textContent = "ADD to Cart";
        proDiv.append(proImage, proTitle, proPrice, proLink, proButton);
        mainDiv.appendChild(proDiv);
    });
}

function fetchCategories() {
    fetch("https://dummyjson.com/products/categories")
        .then(res => res.json())
        .then(data => {
            const catSelect = document.getElementById('cat');
            data.forEach(o => {
                const op = document.createElement("option");
                op.value = o.slug;
                op.textContent = o.name;
                catSelect.append(op);
            });
        });
}

fetchCategories();

document.getElementById('cat').addEventListener('change', function (e) {
    fetchData(e.target.value, searchInput.value);
});

searchInput.addEventListener('input', function () {
    fetchData(document.getElementById('cat').value, searchInput.value);
});

document.getElementById('resetFilters').addEventListener('click', function () {
    document.getElementById('cat').value = '';
    searchInput.value = '';
    fetchData();
});

fetchData();
