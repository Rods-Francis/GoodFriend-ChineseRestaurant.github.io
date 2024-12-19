let menu = document.querySelector('#menubars');
let navbar = document.querySelector('.nav-bar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');


}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');


}

document.querySelector('#search-icon').onclick= () =>{
    document.querySelector('#search-form').classList.toggle('active');


}

document.querySelector('#close').onclick= () =>{
    document.querySelector('#search-form').classList.remove('active');


}


        function addToOrder(itemName) {
            alert(itemName + ' has been added to your order!');
        }
 
// Initialize cart
let cart = [];
let cartDropdown = document.getElementById('cart-dropdown');
let cartIcon = document.getElementById('cart-icon');
let cartItemsList = document.getElementById('cart-items');
let totalPriceElement = document.getElementById('total-price');
let orderNowButton = document.getElementById('order-now');

// Toggle cart visibility
cartIcon.onclick = function () {
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
};

// Function to update the cart display
function updateCart() {
    cartItemsList.innerHTML = ''; // Clear previous cart content
    let totalPrice = 0;

    // Add each item to the cart list
    cart.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ₱${item.price.toFixed(2)}`;

        // Add a "Remove" button
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function () {
            removeFromCart(index);
        };

        listItem.appendChild(removeButton);
        cartItemsList.appendChild(listItem);

        totalPrice += item.price;
    });

    // Update total price
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to add an item to the cart
function addToOrder(itemName, itemPrice) {
    // Add item to the cart
    cart.push({ name: itemName, price: itemPrice });

    // Notify the user
    alert(`${itemName} has been added to your order!`);

    // Update the cart display
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    // Remove item from the cart
    cart.splice(index, 1);

    // Update the cart display
    updateCart();
}

// Hook "Add to Order" buttons
document.querySelectorAll('.menu-item .overlay button').forEach((button) => {
    let itemName = button.parentElement.previousElementSibling.querySelector('h3').textContent;
    let itemPrice = parseFloat(button.parentElement.previousElementSibling.querySelector('p').textContent.replace('₱', ''));

    button.onclick = function () {
        addToOrder(itemName, itemPrice);
    };
});

// "Order Now" button functionality
orderNowButton.onclick = function () {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items to your order.");
    } else {
        alert("Thank you for your order! We will process it shortly.");
        cart = []; // Clear the cart
        updateCart(); // Update the cart display
    }
};


let currentIndex = 0; // Start at the first slide
const carousel = document.querySelector('.carousel');
const totalImages = carousel.children.length; // Number of images
const imageWidth = document.querySelector('.carousel-container').offsetWidth; // Width of a single image

// Function to move to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalImages; // Increment index, loop back if at the end
  updateCarouselPosition();
}

// Function to move to the previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Decrement index, loop back if at the beginning
  updateCarouselPosition();
}

// Function to update the carousel position
function updateCarouselPosition() {
  carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`; // Slide based on currentIndex
}

// Event listeners for buttons
document.querySelector('.carousel-control-prev').addEventListener('click', prevSlide);
document.querySelector('.carousel-control-next').addEventListener('click', nextSlide);

// Auto-slide functionality
let autoSlideInterval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds

// Function to reset the auto-slide timer
function resetAutoSlide() {
  clearInterval(autoSlideInterval); // Clear the current interval
  autoSlideInterval = setInterval(nextSlide, 3000); // Restart auto-slide
}

// Attach reset functionality to the buttons
document.querySelector('.carousel-control-prev').addEventListener('click', resetAutoSlide);
document.querySelector('.carousel-control-next').addEventListener('click', resetAutoSlide);

// Handle resizing to update image width
window.addEventListener('resize', () => {
  imageWidth = document.querySelector('.carousel-container').offsetWidth; // Recalculate image width
  updateCarouselPosition(); // Update position to match the resized width
});
