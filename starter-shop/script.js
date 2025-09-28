document.addEventListener("DOMContentLoaded", () => {
  // Product animation
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, index * 200);
  });

  // Cart functionality
  const cartBtn = document.getElementById('cart-btn');
  const cartDropdown = document.getElementById('cart-dropdown');
  const closeCart = document.getElementById('close-cart');
  
  cartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    cartDropdown.classList.toggle('active');
  });
  
  closeCart.addEventListener('click', function() {
    cartDropdown.classList.remove('active');
  });

  // Close cart when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.cart-container')) {
      cartDropdown.classList.remove('active');
    }
  });

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('p').textContent;
      const productImage = productCard.querySelector('img').src;
      
      addToCart(productName, productPrice, productImage);
    });
  });

  // Initialize cart
  initializeCart();
});

let cart = [];

function initializeCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  renderCartItems();
}

function addToCart(name, price, image) {
  // Check if item already exists in cart
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart display
  renderCartItems();
  
  // Show confirmation
  showCartNotification(`${name} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

function renderCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartEmpty = document.querySelector('.cart-empty');
  const cartTotal = document.querySelector('.cart-total');
  
  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    if (cartTotal) cartTotal.style.display = 'none';
    return;
  }
  
  cartEmpty.style.display = 'none';
  
  let total = 0;
  
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    // Extract numeric price from string (remove $ sign)
    const price = parseFloat(item.price.replace('$', ''));
    const itemTotal = price * item.quantity;
    total += itemTotal;
    
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.price} x ${item.quantity}</p>
        <p class="item-total">$${itemTotal.toFixed(2)}</p>
      </div>
      <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
  
  // Update total
  if (cartTotal) {
    cartTotal.style.display = 'block';
    cartTotal.innerHTML = `<div class="cart-total-amount">Total: $${total.toFixed(2)}</div>`;
  }
}

function showCartNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #333;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    transition: opacity 0.3s;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Make removeFromCart available globally
window.removeFromCart = removeFromCart;