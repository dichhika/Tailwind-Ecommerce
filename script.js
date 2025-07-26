// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Mobile product submenu toggle
const productBtn = document.getElementById("productBtn");
const productSubMenu = document.getElementById("productSubMenu");
const productIcon = document.getElementById("productIcon");
productBtn?.addEventListener("click", () => {
  productSubMenu.classList.toggle("hidden");
  productIcon.classList.toggle("rotate-180");
});

// Desktop product submenu toggle
const desktopProductBtn = document.getElementById("desktopProductBtn");
const desktopProductSubMenu = document.getElementById("desktopProductSubMenu");
const desktopProductIcon = document.getElementById("desktopProductIcon");

desktopProductBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  desktopProductSubMenu.classList.toggle("hidden");
  desktopProductIcon.classList.toggle("rotate-180");
});

document.addEventListener("click", (e) => {
  if (
    !desktopProductBtn?.contains(e.target) &&
    !desktopProductSubMenu?.contains(e.target)
  ) {
    desktopProductSubMenu?.classList.add("hidden");
    desktopProductIcon?.classList.remove("rotate-180");
  }
});

// Cart counter update
const cartCountSpan = document.getElementById("cart-count");
const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountSpan) cartCountSpan.textContent = totalItems;
};
updateCartCount();

// Add to Cart functionality
const cartButtons = document.querySelectorAll(".add-to-cart");
cartButtons?.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    const image = button.getAttribute("data-image");
    const quantityInput = product.querySelector(".product-quantity");
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, quantity, image });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${quantity} of "${name}" added to cart!`);
  });
});

// Cart page rendering
const renderCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalBox = document.getElementById("cart-summary");
  const totalSpan = document.getElementById("total");
  const deliverySpan = document.getElementById("delivery");
  const grandTotalSpan = document.getElementById("grand-total");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML =
      "<p class='text-center text-lg text-gray-600'>Your cart is empty.</p>";
    totalBox?.classList.add("hidden");
    return;
  }

  let total = 0;
  const deliveryCharge = 150;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "flex items-center bg-white p-4 rounded shadow";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded mr-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold">${item.name}</h3>
        <p class="text-sm text-gray-500">Price: Rs. ${item.price}</p>
        <div class="flex items-center gap-2 mt-2">
          <button class="decrease px-2 py-1 bg-gray-300 rounded" data-index="${index}">-</button>
          <button class="increase px-2 py-1 bg-gray-300 rounded" data-index="${index}">+</button>
        </div>
        <p class="text-green-700 font-medium mt-1">Total: Rs. ${itemTotal}</p>
      </div>
      <button class="remove-item text-red-600 ml-4 text-xl" data-index="${index}" title="Remove">
        <i class="fas fa-trash"></i>
      </button>`;
    container.appendChild(itemDiv);
  });

  totalSpan.textContent = `Rs. ${total}`;
  deliverySpan.textContent = `Rs. ${deliveryCharge}`;
  grandTotalSpan.textContent = `Rs. ${total + deliveryCharge}`;
  totalBox?.classList.remove("hidden");

  attachEvents();
};

const updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
};

const attachEvents = () => {
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.onclick = () => {
      const index = parseInt(btn.dataset.index);
      cart.splice(index, 1);
      updateCart();
    };
  });

  document.querySelectorAll(".increase").forEach((btn) => {
    btn.onclick = () => {
      const index = parseInt(btn.dataset.index);
      cart[index].quantity++;
      updateCart();
    };
  });

  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.onclick = () => {
      const index = parseInt(btn.dataset.index);
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCart();
      }
    };
  });
};

// Run renderCart if cart page is loaded
if (document.getElementById("cart-items")) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
}

// Login modal logic
const loginIconDesktop = document.getElementById("loginIconDesktop");
const loginIconMobile = document.getElementById("loginIconMobile");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const checkoutBtn = document.getElementById("checkout-btn");

const openLoginModal = () => loginModal?.classList.remove("hidden");
const closeLoginModal = () => loginModal?.classList.add("hidden");

// Attach event listeners to both login icons
loginIconDesktop?.addEventListener("click", openLoginModal);
loginIconMobile?.addEventListener("click", openLoginModal);
checkoutBtn?.addEventListener("click", openLoginModal);
closeModal?.addEventListener("click", closeLoginModal);

loginModal?.addEventListener("click", (e) => {
  if (e.target === loginModal) closeLoginModal();
});
