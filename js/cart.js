document.addEventListener("DOMContentLoaded", () => {

    async function populateCart() {
        const cart = await fetchCartById(2);
        const cartProducts = cart.products;
        const productQuantityMapping = {};

        const cartProductDownloadPromise = cartProducts.map(product => {
            productQuantityMapping[product.productId] = product.quantity;
            return fetchProductById(product.productId)
        });
        const products = await Promise.all(cartProductDownloadPromise);
        let totalPrice = 0;
    
        products.forEach(product => {
            totalPrice += product.price;
        });


        document.getElementById("total-price").textContent = totalPrice;
        document.getElementById("net-price").textContent = totalPrice - 10;

    }
    populateCart();
});

