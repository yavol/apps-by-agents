const products = [
    { id: 1, name: 'Classic Hookah', description: 'Traditional shisha pipe', price: 49.99 },
    { id: 2, name: 'Modern Hookah', description: 'Sleek, modern design', price: 69.99 },
    { id: 3, name: 'Shisha Tobacco (Mint)', description: 'Refreshing mint flavor', price: 9.99 },
    { id: 4, name: 'Shisha Tobacco (Apple)', description: 'Sweet apple flavor', price: 9.99 },
    { id: 5, name: 'Charcoal Pack', description: 'Quick-lighting coals', price: 4.99 }
];

const cart = [];

function renderProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>$${product.price.toFixed(2)}</strong></p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsDiv.appendChild(div);
    });
}

function renderCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}
            <button onclick="removeFromCart(${idx})">Remove</button>
        `;
        cartList.appendChild(li);
    });
    document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    renderCart();
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    renderCart();
}

// Initial render
renderProducts();
renderCart();
