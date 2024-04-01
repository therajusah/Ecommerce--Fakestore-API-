document.addEventListener("DOMContentLoaded", async () => {
  const loaderBackdrop = document.getElementById("loader-backdrop");
  loaderBackdrop.style.display = 'block'; // Show loader initially

  function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const queryParamsObject = Object.fromEntries(queryParams.entries());
    return queryParamsObject;
  }

  async function fetchProducts() {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }

  async function fetchProductsByCategory(category) {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return response.data;
  }

  async function fetchProductById(id) {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  }

  const queryParams = getQueryParams();
  const category = queryParams['category'];

  let products;
  if (category) {
    products = await fetchProductsByCategory(category);
  } else {
    products = await fetchProducts();
  }

  const productList = document.getElementById("productList");

  products.forEach((product) => {
    const productItem = document.createElement("a");
    productItem.target = "_blank";
    productItem.classList.add(
      "product-item",
      "text-decoration-none",
      "d-inline-block"
    );
    productItem.href = `productDetails.html?id=${product.id}`;

    const productImage = document.createElement("div");
    const productName = document.createElement("div");
    const productPrice = document.createElement("div");

    productImage.classList.add("product-img");
    productName.classList.add("product-name", "text-center");
    productPrice.classList.add("product-price", "text-center");

    productName.textContent = product.title.substring(0, 12) + "...";
    productPrice.textContent = `₹ ${product.price}`;

    const imageInsideProductImage = document.createElement("img");
    imageInsideProductImage.src = product.image;

    // append divs
    productImage.appendChild(imageInsideProductImage);
    productItem.appendChild(productImage);
    productItem.appendChild(productName);
    productItem.appendChild(productPrice);

    productList.appendChild(productItem);
  });

  // Hide loader once content is loaded
  loaderBackdrop.style.display = 'none';

  const filterSearch = document.getElementById("search");
  filterSearch.addEventListener("click", async () => {
    const minPrice = Number(document.getElementById("minPrice").value);
    const maxPrice = Number(document.getElementById("maxPrice").value);

    const filteredProducts = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    productList.innerHTML = "";
    filteredProducts.forEach((product) => {
      const productItem = document.createElement("a");
      productItem.target = "_blank";
      productItem.classList.add(
        "product-item",
        "text-decoration-none",
        "d-inline-block"
      );
      productItem.href = `productDetails.html?id=${product.id}`;

      const productImage = document.createElement("div");
      const productName = document.createElement("div");
      const productPrice = document.createElement("div");

      productImage.classList.add("product-img");
      productName.classList.add("product-name", "text-center");
      productPrice.classList.add("product-price", "text-center");

      productName.textContent = product.title.substring(0, 12) + "...";
      productPrice.textContent = `₹ ${product.price}`;

      const imageInsideProductImage = document.createElement("img");
      imageInsideProductImage.src = product.image;

      // append divs
      productImage.appendChild(imageInsideProductImage);
      productItem.appendChild(productImage);
      productItem.appendChild(productName);
      productItem.appendChild(productPrice);

      productList.appendChild(productItem);
    });
  });

  const resetFilter = document.getElementById("clear");
  resetFilter.addEventListener("click", () => {
    window.location.reload();
  });
});
