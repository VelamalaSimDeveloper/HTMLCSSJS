const maindiv = document.getElementById("main");
const searchInput = document.getElementById("search");
const categoryButtons = document.querySelectorAll('.category-button');
const categoryProductsDiv = document.getElementById('category-products');
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links a');
const toggleButton = document.querySelector('.toggle-button');
const navLinks = document.querySelector('.nav-links');

async function fetchData() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    displayProducts(data);

    searchInput.addEventListener("input", (e) => filterProducts(data, e.target.value));

    categoryButtons.forEach(button => {
      button.addEventListener('click', () => filterByCategory(data, button.dataset.category));
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayProducts(products) {
  maindiv.innerHTML = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);
    maindiv.appendChild(productCard);
  });
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}" />
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
  `;
  return productCard;
}

function filterProducts(products, searchTerm) {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayProducts(filteredProducts);
}

function filterByCategory(products, category) {
  if (category === 'all') {
    displayProducts(products);
  } else {
    const filteredProducts = products.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    displayCategoryProducts(filteredProducts);
  }
}

function displayCategoryProducts(products) {
  categoryProductsDiv.innerHTML = '';
  products.forEach(product => {
    const productCard = createProductCard(product);
    categoryProductsDiv.appendChild(productCard);
  });
}

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(item.dataset.section).classList.add('active');
  });
});

fetchData();
