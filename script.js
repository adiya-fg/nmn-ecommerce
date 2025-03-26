let categories = [];
let products = [];

function addCategory() {
    const categoryName = document.getElementById('categoryName').value;
    if (categoryName) {
        categories.push(categoryName);
        updateCategorySelect();
        displayCategories();
        document.getElementById('categoryName').value = '';
    } else {
        alert('Category name cannot be empty');
    }
}

function updateCategorySelect() {
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '<option disabled selected>Select Category</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.innerText = category;
        categorySelect.appendChild(option);
    });
}

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productSize = document.getElementById('productSize').value;
    const productColor = document.getElementById('productColor').value;
    const productImage = document.getElementById('productImage').files[0];
    const selectedCategory = document.getElementById('categorySelect').value;

    if (productName && productPrice && productSize && selectedCategory && productImage) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const product = {
                name: productName,
                price: productPrice,
                size: productSize,
                color: productColor,
                image: reader.result,
                category: selectedCategory,
            };
            products.push(product);
            displayCategories();
            clearProductForm();
        };
        reader.readAsDataURL(productImage);
    } else {
        alert('Please fill all product details');
    }
}

function displayCategories() {
    const categoriesList = document.getElementById('categoriesList');
    categoriesList.innerHTML = '';

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `<h3>${category}</h3>`;

        const categoryProducts = products.filter(product => product.category === category);
        categoryProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h4>${product.name}</h4>
                <p>Price: $${product.price}</p>
                <p>Size: ${product.size}</p>
                <p>Color: <span style="background-color: ${product.color}; display: inline-block; width: 20px; height: 20px;"></span></p>
                <img src="${product.image}" alt="${product.name}" />
            `;
            categoryDiv.appendChild(productDiv);
        });

        categoriesList.appendChild(categoryDiv);
    });
}

function clearProductForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productSize').value = '';
    document.getElementById('productColor').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('categorySelect').value = '';
}
