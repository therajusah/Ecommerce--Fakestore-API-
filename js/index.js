
console.log("Index JS Loaded")


async function fetchCategories() {
    // This function is market async so this will also return a promise
 const response = await fetch("https://fakestoreapi.com/products/categories");
const data =  await response.json();
return data;
}


async function populateCategories() {
    const categories = await fetchCategories();
}