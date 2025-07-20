// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Mobile product submenu toggle
const productBtn = document.getElementById("productBtn");
const productSubMenu = document.getElementById("productSubMenu");
const productIcon = document.getElementById("productIcon");

productBtn.addEventListener("click", () => {
  productSubMenu.classList.toggle("hidden");
  productIcon.classList.toggle("rotate-180");
});

// Desktop product submenu toggle on click
const desktopProductBtn = document.getElementById("desktopProductBtn");
const desktopProductSubMenu = document.getElementById("desktopProductSubMenu");
const desktopProductIcon = document.getElementById("desktopProductIcon");

desktopProductBtn.addEventListener("click", (e) => {
  e.preventDefault();
  desktopProductSubMenu.classList.toggle("hidden");
  desktopProductIcon.classList.toggle("rotate-180");
});

// Close desktop submenu if clicked outside
document.addEventListener("click", (e) => {
  if (
    !desktopProductBtn.contains(e.target) &&
    !desktopProductSubMenu.contains(e.target)
  ) {
    desktopProductSubMenu.classList.add("hidden");
    desktopProductIcon.classList.remove("rotate-180");
  }
});

// 🛒 Cart functionality
const cartButtons = document.querySelectorAll(".add-to-cart");
const cartCountSpan = document.getElementById("cart-count");

// Initial cart count update on page load
const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountSpan) {
    cartCountSpan.textContent = totalItems;
  }
};
updateCartCount();

// Add to cart logic
cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");

    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    const image = button.getAttribute("data-image");
    const quantityInput = product.querySelector(".product-quantity");
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    const cartItem = { name, price, quantity, image };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${quantity} of "${name}" added to cart!`);
  });
});
// Login modal control
const loginIcon = document.getElementById("loginIcon");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");

loginIcon.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});

loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.add("hidden");
  }
});
