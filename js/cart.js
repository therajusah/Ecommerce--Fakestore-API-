document.addEventListener("DOMContentLoaded", () => {
   function prepareWrapperDivForCartItems(product) {
    const orderDetailsProduct = document.createElement("div");
    orderDetailsProduct.classList.add("order-details-product", "d-flex", "flex-row");


    const orderDetailsProductImg = document.createElement("div");
    orderDetailsProductImg.classList.add("order-details-product-img", "d-flex");
    const image = document.createElement("img");
    image.src = product.image;
    orderDetailsProductImg.appendChild(image);
    const orderDetailsProductData = document.createElement("div");
    orderDetailsProductData.classList.add("order-details-product-data", "d-flex", "flex-row");
    const name = document.createElement("div");
    const price = document.createElement("div");
    name.textContent = product.title;
    price.textContent = product.price;

    const orderDetailsProductActions = document.createElement("div");
    orderDetailsProductActions.classList.add("order-details-product-action", "d-flex", "flex-column");
    const orderDetailsProductQuatity = document.createElement("div");
    orderDetailsProductQuatity.classList.add("order-details-product-quantity");
    const quantityLabel = document.createElement("div");
    quantityLabel.textContent = Quantity;
    quantityLabel.classList.add("fw-bold");
   }

    async function populateCart() {
    const cart = await fetchCartById(2);
    const cartProducts = cart.products;
    const productQuantityMapping = {};

    const cartProductDownloadPromise = cartProducts.map((product) => {
      productQuantityMapping[product.productId] = product.quantity;
      return fetchProductById(product.productId);
    });
    const products = await Promise.all(cartProductDownloadPromise);
    let totalPrice = 0;

    products.forEach((product) => {
      totalPrice += product.price;
    });

    document.getElementById("total-price").textContent = totalPrice;
    document.getElementById("net-price").textContent = totalPrice - 10;
  }
  populateCart();
});
