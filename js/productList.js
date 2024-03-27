document.addEventListener("DOMContentLoaded", () => {
    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        return response.data;
    }
    async function populateProducts() {
        const productLists  = document.getElementById("productList");
        const products = await fetchProducts();
        products.forEach(product => {
            const productItem = document.createElement("a");
            productItem.target = "_blank";
            productItem.classList.add("product-item", "text-decoration-none", "d-inline-block")
            productItem.href = "productDetails.html";

            const productImage = document.createElement("div");
            const productName = document.createElement("div");
            const productPrice = document.createElement("div");


            productImage.classList.add("product-img");
            productName.classList.add("product-name", "text-center");
            productPrice.classList.add("product-price", "text-center");

            productName.textContent = product.title;
            productPrice.textContent = `&#8377; ${product.price}`;


            const imageInsideProductImage = document.createElement("img");
 imageInsideProductImage.src = product.image;

 // append divs

 productImage.appendChild(imageInsideProductImage);
 productItem.appendChild(productImage);
 productItem.appendChild(productName);
 productItem.appendChild(productPrice);

productLists.appendChild(productItem);
        })
    }

    populateProducts();
})