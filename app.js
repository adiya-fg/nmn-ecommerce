// Get the modal and buttons
const modal = document.getElementById('productModal');
const addProductButton = document.getElementById('addProductButton');
const cancelButton = document.getElementById('cancelButton');
const saveProductButton = document.getElementById('saveProductButton');
const productContainer = document.getElementById('product-container');

// Initialize product list from localStorage or default empty array
let products = JSON.parse(localStorage.getItem('products')) || [];

// Show products when the page loads
function loadProducts() {
    productContainer.innerHTML = ''; // Clear the product list

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.setAttribute('data-id', product.id);

        // Show product image and information
        productDiv.innerHTML = `
            <img src="images/${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Size: ${product.size}</p>
            <p>Color: ${product.color}</p>
            <p>Category: ${product.category}</p>
            <button class="editButton">Edit</button>
            <button class="deleteButton">Delete</button>
        `;
        productContainer.appendChild(productDiv);

        // Edit button functionality
        productDiv.querySelector('.editButton').addEventListener('click', () => {
            openModal('edit', product.id);
        });

        // Delete button functionality
        productDiv.querySelector('.deleteButton').addEventListener('click', () => {
            deleteProduct(product.id);
        });
    });
}

// Open the modal for Add or Edit
function openModal(mode, productId = null) {
    const modalTitle = document.getElementById('modalTitle');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productSize = document.getElementById('productSize');
    const productColor = document.getElementById('productColor');
    const productCategory = document.getElementById('productCategory');
    const productImage = document.getElementById('productImage');

    if (mode === 'edit') {
        const product = products.find(p => p.id === productId);
        modalTitle.textContent = 'Edit Product';
        productName.value = product.name;
        productPrice.value = product.price;
        productSize.value = product.size;
        productColor.value = product.color;
        productCategory.value = product.category;
        productImage.value = ''; // Image will be handled separately
        saveProductButton.setAttribute('data-id', productId);
    } else {
        modalTitle.textContent = 'Add Product';
        productName.value = '';
        productPrice.value = '';
        productSize.value = '';
        productColor.value = '';
        productCategory.value = '';
        productImage.value = '';
        saveProductButton.removeAttribute('data-id');
    }

    modal.style.display = 'block';
}

// Close the modal
cancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Save the product (Create or Update)
saveProductButton.addEventListener('click', () => {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productSize = document.getElementById('productSize').value;
    const productColor = document.getElementById('productColor').value;
    const productCategory = document.getElementById('productCategory').value;
    const productImage = document.getElementById('productImage').files[0];

    if (!productName || !productPrice || !productSize || !productColor || !productCategory || !productImage) {
        alert('Please fill all fields!');
        return;
    }

    const imageName = productImage.name;
    const reader = new FileReader();
    reader.onload = function(e) {
        // Save the image as base64 (you can save it to the `images/` folder if you're using a server-side solution)
        const product = {
            id: saveProductButton.getAttribute('data-id') || Date.now(),
            name: productName,
            price: productPrice,
            size: productSize,
            color: productColor,
            category: productCategory,
            image: imageName
        };

        if (saveProductButton.getAttribute('data-id')) {
            const index = products.findIndex(p => p.id === parseInt(saveProductButton.getAttribute('data-id')));
            products[index] = product;
        } else {
            products.push(product);
        }

        // Save the product list and image to localStorage
        localStorage.setItem('products', JSON.stringify(products));
        modal.style.display = 'none';
        loadProducts();
    };
    reader.readAsDataURL(productImage); // Simulate image storage
});

// Delete product
function deleteProduct(productId) {
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

// Load the products initially
loadProducts();

// Add Product Button functionality
addProductButton.addEventListener('click', () => {
    openModal('add');
});
