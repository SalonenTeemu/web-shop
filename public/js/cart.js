const addToCart = productId => {
  // TODO 9.2
  // use addProductToCart(), available already from /public/js/utils.js
  // call updateProductAmount(productId) from this file
  addProductToCart(productId);
  updateProductAmount(productId);
};

const decreaseCount = productId => {
  // TODO 9.2
  // Decrease the amount of products in the cart, /public/js/utils.js provides decreaseProductCount()
  // Remove product from cart if amount is 0,  /public/js/utils.js provides removeElement = (containerId, elementId
  const newCount = decreaseProductCount(productId);
  updateProductAmount(productId);

  if (newCount === 0) {
    removeElement('cart-container', productId);
  }
};

const updateProductAmount = productId => {
  // TODO 9.2
  // - read the amount of products in the cart, /public/js/utils.js provides getProductCountFromCart(productId)
  // - change the amount of products shown in the right element's innerText
  const productCount = getProductCountFromCart(productId);
  document.getElementById(`amount-${productId}`).innerText = `${productCount}x`;
};

const placeOrder = async() => {
  // TODO 9.2
  // Get all products from the cart, /public/js/utils.js provides getAllProductsFromCart()
  // show the user a notification: /public/js/utils.js provides createNotification = (message, containerId, isSuccess = true)
  // for each of the products in the cart remove them, /public/js/utils.js provides removeElement(containerId, elementId)
  const cartItems = getAllProductsFromCart();

  createNotification('Successfully created an order!', 'notifications-container', true);
  clearCart();
  cartItems.forEach(item => {
    removeElement('cart-container', `item-row-${item.productId}`);
  });
};

(async() => {
  // TODO 9.2
  // - get the 'cart-container' element
  // - use getJSON(url) to get the available products
  // - get all products from cart
  // - get the 'cart-item-template' template
  // - for each item in the cart
  //    * copy the item information to the template
  //    * hint: add the product's ID to the created element's as its ID to 
  //        enable editing ith 
  //    * remember to add event listeners for cart-minus-plus-button
  //        cart-minus-plus-button elements. querySelectorAll() can be used 
  //        to select all elements with each of those classes, then its 
  //        just up to finding the right index.  querySelectorAll() can be 
  //        used on the clone of "product in the cart" template to get its two
  //        elements with the "cart-minus-plus-button" class. Of the resulting
  //        element array, one item could be given the ID of 
  //        `plus-${product_id`, and other `minus-${product_id}`. At the same
  //        time we can attach the event listeners to these elements. Something 
  //        like the following will likely work:
  //          clone.querySelector('button').id = `add-to-cart-${prodouctId}`;
  //          clone.querySelector('button').addEventListener('click', () => addToCart(productId, productName));
  //
  // - in the end remember to append the modified cart item to the cart 
  const placeOrderButton = document.getElementById('place-order-button');
  placeOrderButton.addEventListener('click', () => {
    placeOrder();
  })
  const cartContainer = document.getElementById('cart-container');
  const availableProducts = await getJSON('/api/products');
  const cartItems = getAllProductsFromCart();
  const cartItemTemplate = document.getElementById('cart-item-template');

  cartItems.forEach(item => {
    const product = availableProducts.find(product => product._id === item.productId);

    if (product) {
      const clone = cartItemTemplate.content.cloneNode(true);

      const itemRowElement = clone.querySelector('.item-row');
      itemRowElement.id = `item-row-${product._id}`;

      const productNameElement = clone.querySelector('.product-name');
      productNameElement.textContent = product.name;
      productNameElement.id = `name-${product._id}`;

      const productPriceElement = clone.querySelector('.product-price');
      productPriceElement.textContent = `${product.price}`;
      productPriceElement.id = `price-${product._id}`;

      const productAmountElement = clone.querySelector('.product-amount');
      productAmountElement.textContent = `${item.productCount}x`;
      productAmountElement.id = `amount-${product._id}`;

      const buttons = clone.querySelectorAll('.cart-minus-plus-button');
      const plusButton = buttons[0];
      const minusButton = buttons[1];

      plusButton.textContent = `+`;
      plusButton.id = `plus-${product._id}`;

      minusButton.textContent = `-`;
      minusButton.id = `minus-${product._id}`;

      plusButton.addEventListener('click', () => {
        const productId = product._id;
        const productCount = addProductToCart(productId);
        productAmountElement.innerText = `${productCount}x`;
      });

      minusButton.addEventListener('click', () => {
        const productId = product._id;
        const productCount = decreaseProductCount(productId);
        if (productCount === 0) {
          removeElement('cart-container', `item-row-${productId}`);
        } else {
          productAmountElement.innerText = `${productCount}x`;
        }
      });

      cartContainer.appendChild(clone);
    }
  });

})();