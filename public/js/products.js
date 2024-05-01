const addToCart = (productId, productName) => {
  // TODO 9.2
  // you can use addProductToCart(), available already from /public/js/utils.js
  // for showing a notification of the product's creation, /public/js/utils.js  includes createNotification() function
  addProductToCart(productId);
  const notificationMessage = `Added ${productName} to cart!`;
  createNotification(notificationMessage, 'notifications-container', true);
};

(async() => {
  //TODO 9.2 
  // - get the 'products-container' element from the /products.html
  // - get the 'product-template' element from the /products.html
  // - save the response from await getJSON(url) to get all the products. getJSON(url) is available to this script in products.html, as "js/utils.js" script has been added to products.html before this script file 
  // - then, loop throug the products in the response, and for each of the products:
  //    * clone the template
  //    * add product information to the template clone
  //    * remember to add an event listener for the button's 'click' event, and call addToCart() in the event listener's callback
  // - remember to add the products to the the page
  const productsContainer = document.getElementById('products-container');
  const productTemplate = document.getElementById('product-template');

  const products = await getJSON('/api/products');

  products.forEach(product => {
    const clone = productTemplate.content.cloneNode(true);

    const productNameElement = clone.querySelector('.product-name');
    productNameElement.textContent = product.name;
    productNameElement.id = `name-${product._id}`;

    const productDescriptionElement = clone.querySelector('.product-description');
    productDescriptionElement.textContent = product.description;
    productDescriptionElement.id = `description-${product._id}`;

    const productPriceElement = clone.querySelector('.product-price');
    productPriceElement.textContent = `${product.price}`;
    productPriceElement.id = `price-${product._id}`;

    const addToCartButton = clone.querySelector('button');
    addToCartButton.id = `add-to-cart-${product._id}`;
    addToCartButton.addEventListener('click', () => {
      addToCart(product._id, product.name);
    });

    productsContainer.appendChild(clone);
  });
})();