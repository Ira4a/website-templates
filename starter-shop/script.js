document.addEventListener("DOMContentLoaded", () => {
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
});
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
