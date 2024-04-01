document.addEventListener("DOMContentLoaded", async () => {

    document.getElementById("loader-backdrop").style.display = "flex";
  
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');
  
    if (!productId) {
      console.error('Product ID not provided');
      hideLoader();
      return;
    }
  
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const product = await response.json();
  
      const productName = document.getElementById("prod-name");
      const productPrice = document.getElementById("prod-price");
      const productDesc = document.getElementById("prod-description-data");
      const productImg = document.getElementById("prod-Image");
  
      productName.textContent = product.title;
      productDesc.textContent = product.description;
      productImg.src = product.image;
      productPrice.textContent = `₹ ${product.price}`; //the price is in INR
  

      document.getElementById("productDetailsContent").style.display = "block";
    } catch (error) {
      console.error('Error fetching or displaying product details:', error);
    } finally {
     
      hideLoader();
    }
  });
  
  function hideLoader() {
    document.getElementById("loader-backdrop").style.display = "none";
  }
  