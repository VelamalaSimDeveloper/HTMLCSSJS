const maindiv = document.getElementById("main");
const categoryProductsDiv = document.getElementById("category-products");
const searchInput = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".category-button");
const modal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-product-image");
const modalTitle = document.getElementById("modal-product-title");
const modalPrice = document.getElementById("modal-product-price");
const modalDescription = document.getElementById("modal-product-description");
const modalCategory = document.getElementById("modal-product-category");
const closeBtn = document.querySelector(".close-btn");
const buyNowButton = document.getElementById("buy-now-button");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".section");
const orderForm = document.getElementById("order-form");

let allProducts = [];

async function fetchData() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    allProducts = data;
    displayProducts(data);

    searchInput.addEventListener("input", (e) => filterProducts(e.target.value));
    categoryButtons.forEach(button => button.addEventListener("click", (e) => filterByCategory(e.target.dataset.category)));
    navLinks.forEach(link => link.addEventListener("click", (e) => showSection(e.target.dataset.section)));
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayProducts(products, container = maindiv) {
  container.innerHTML = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
}

function createProductCard(product) {
  const div = document.createElement("div");
  div.classList.add("product-card");

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.title;

  const heading = document.createElement("h3");
  heading.textContent = product.title;

  const price = document.createElement("p");
  price.textContent = `$${product.price.toFixed(2)}`;

  const button = document.createElement("button");
  button.textContent = "View Details";
  button.addEventListener("click", () => openModal(product));

  div.append(image, heading, price, button);
  return div;
}

function filterProducts(searchTerm) {
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayProducts(filteredProducts);
}

function filterByCategory(category) {
  if (category === "all") {
    displayProducts(allProducts);
  } else {
    const filteredProducts = allProducts.filter(product => product.category === category);
    displayProducts(filteredProducts, categoryProductsDiv);
  }
}

function openModal(product) {
  modal.style.display = "flex";
  modalImage.src = product.image;
  modalImage.alt = product.title;
  modalTitle.textContent = product.title;
  modalPrice.textContent = `$${product.price}`;
  modalDescription.textContent = product.description;
  modalCategory.textContent = `Category: ${product.category}`;
}

function closeModal() {
  modal.style.display = "none";
}

function showSection(sectionId) {
  sections.forEach(section => section.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Order submitted! Thank you for your purchase.");
});

fetchData();
