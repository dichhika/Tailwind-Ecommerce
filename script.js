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

// Mobile floating search toggle input visibility

document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;
  const cartCountSpan = document.querySelector(".fa-shopping-cart + span");
  const addToCartButtons = document.querySelectorAll("[data-name]");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.getAttribute("data-name");

      // Update cart count
      cartCount++;
      if (cartCountSpan) {
        cartCountSpan.textContent = cartCount;
      }

      // You can optionally store the product or show a message
      alert(`${productName} added to cart`);
    });
  });
});
