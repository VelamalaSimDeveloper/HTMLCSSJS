const maindiv = document.getElementById("main");
const searchInput = document.getElementById("search");

async function fetchData() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    displayProducts(data);

    searchInput.addEventListener("input", (e) =>
      filterProducts(data, e.target.value)
    );
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

function filterProducts(products, searchTerm) {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayProducts(filteredProducts);
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
  button.textContent = "Buy Now";

  div.append(image, heading, price, button);
  return div;
}

fetchData();
