/* ============================================
   VINEYARD SOUNDS - Main JavaScript
   Sounds Mans Shop - Eldoret, Kenya
   ============================================ */

(function () {
    'use strict';

    /* ===== State Management ===== */
    const state = {
        cart: JSON.parse(localStorage.getItem('vineyard_cart') || '[]'),
        products: [],
        filteredProducts: [],
        activeFilters: {
            categories: [],
            brands: [],
            maxPrice: 500000
        }
    };

    /* ===== Product Catalog Data ===== */
    const products = [
        { id: 1, name: 'Pearl Roadster Drum Kit', category: 'drums', brand: 'Pearl', price: 89000, oldPrice: 105000, rating: 4.8, reviews: 124, badge: 'sale', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb33c7?w=600&q=80', desc: 'Professional 5-piece drum kit with cymbals' },
        { id: 2, name: 'Yamaha P-125 Digital Piano', category: 'keyboards', brand: 'Yamaha', price: 65000, oldPrice: null, rating: 4.9, reviews: 203, badge: 'new', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52e95583?w=600&q=80', desc: '88-key weighted digital piano with rich sound' },
        { id: 3, name: 'SoundKing Player Stratocaster', category: 'guitars', brand: 'Fender', price: 72000, oldPrice: 85000, rating: 4.7, reviews: 156, badge: 'sale', image: 'https://images.unsplash.com/photo-1525201548942-ded7cfe91913?w=600&q=80', desc: 'Classic electric guitar with maple neck' },
        { id: 4, name: 'Eminence SM58 Microphone', category: 'microphones', brand: 'Shure', price: 12500, oldPrice: null, rating: 4.9, reviews: 412, badge: null, image: 'https://images.unsplash.com/photo-1590602847663-e6e1e80c7e6e?w=600&q=80', desc: 'Legendary dynamic vocal microphone' },
        { id: 5, name: 'Roland TD-07 Electronic Drums', category: 'drums', brand: 'Roland', price: 145000, oldPrice: 165000, rating: 4.8, reviews: 89, badge: 'sale', image: 'https://images.unsplash.com/photo-1534177616072-962e2bedcd45?w=600&q=80', desc: 'Electronic drum kit with mesh heads' },
        { id: 6, name: 'Casio CTK-3500 Keyboard', category: 'keyboards', brand: 'Casio', price: 28000, oldPrice: null, rating: 4.6, reviews: 178, badge: null, image: 'https://images.unsplash.com/photo-1555456279-2b9e6f2b9e6f?w=600&q=80', desc: '61-key portable keyboard with 400 tones' },
        { id: 7, name: 'Gibson Les Paul Standard', category: 'guitars', brand: 'Gibson', price: 185000, oldPrice: null, rating: 5.0, reviews: 92, badge: 'new', image: 'https://images.unsplash.com/photo-1610626883842-962e2bedcd45?w=600&q=80', desc: 'Premium electric guitar with humbuckers' },
        { id: 8, name: 'AKG K240 Studio Headphones', category: 'accessories', brand: 'AKG', price: 9500, oldPrice: 12000, rating: 4.5, reviews: 234, badge: 'sale', image: 'https://images.unsplash.com/photo-1583394838336-acd977d87f3b?w=600&q=80', desc: 'Professional studio monitoring headphones' },
        { id: 9, name: 'Korg Minilogue Synthesizer', category: 'keyboards', brand: 'Korg', price: 98000, oldPrice: null, rating: 4.7, reviews: 67, badge: 'new', image: 'https://images.unsplash.com/photo-1598488035884-53f16a55127d?w=600&q=80', desc: '4-voice analog synthesizer with sequencer' },
        { id: 10, name: 'Tama Imperialstar Drum Kit', category: 'drums', brand: 'Tama', price: 67000, oldPrice: null, rating: 4.6, reviews: 145, badge: null, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292bdea?w=600&q=80', desc: 'Complete drum set with hardware included' },
        { id: 11, name: 'Ibanez Acoustic Guitar', category: 'guitars', brand: 'Ibanez', price: 32000, oldPrice: 38000, rating: 4.4, reviews: 198, badge: 'sale', image: 'https://images.unsplash.com/photo-1525201548942-ded7cfe91913?w=600&q=80', desc: 'Dreadnought acoustic with spruce top' },
        { id: 12, name: 'Rode NT1 Condenser Mic', category: 'microphones', brand: 'Rode', price: 24000, oldPrice: null, rating: 4.8, reviews: 156, badge: null, image: 'https://images.unsplash.com/photo-1590602847663-e6e1e80c7e6e?w=600&q=80', desc: 'Large diaphragm studio condenser microphone' }
    ];

    state.products = products;

    /* ===== Helper Functions ===== */
    function formatPrice(price) {
        return 'KSh ' + price.toLocaleString('en-KE');
    }

    function getStarRating(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < full; i++) stars += '★';
        if (half) stars += '☆';
        const empty = 5 - full - (half ? 1 : 0);
        for (let i = 0; i < empty; i++) stars += '☆';
        return stars;
    }

    function getInitials(name) {
        return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    }

    /* ===== Navigation Toggle ===== */
    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function () {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('open');
            });

            // Close menu when clicking a link
            navMenu.querySelectorAll('.nav-link').forEach(function (link) {
                link.addEventListener('click', function () {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('open');
                });
            });
        }

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Set active nav link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    /* ===== Cart Functions ===== */
    function saveCart() {
        localStorage.setItem('vineyard_cart', JSON.stringify(state.cart));
    }

    function addToCart(productId) {
        const product = state.products.find(function (p) { return p.id === productId; });
        if (!product) return;

        const existing = state.cart.find(function (item) { return item.id === productId; });
        if (existing) {
            existing.quantity += 1;
        } else {
            state.cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
        }
        saveCart();
        updateCartCount();
        renderCartItems();
        showToast(product.name + ' added to cart!');
    }

    function removeFromCart(productId) {
        state.cart = state.cart.filter(function (item) { return item.id !== productId; });
        saveCart();
        updateCartCount();
        renderCartItems();
    }

    function updateQuantity(productId, delta) {
        const item = state.cart.find(function (i) { return i.id === productId; });
        if (!item) return;
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            renderCartItems();
        }
    }

    function getCartTotal() {
        return state.cart.reduce(function (total, item) {
            return total + (item.price * item.quantity);
        }, 0);
    }

    function getCartCount() {
        return state.cart.reduce(function (count, item) {
            return count + item.quantity;
        }, 0);
    }

    function updateCartCount() {
        const countEl = document.querySelector('.cart-count');
        if (countEl) {
            const count = getCartCount();
            countEl.textContent = count;
            countEl.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    function renderCartItems() {
        const cartItemsEl = document.querySelector('.cart-items');
        const cartTotalEl = document.querySelector('.cart-total .amount');
        if (!cartItemsEl) return;

        if (state.cart.length === 0) {
            cartItemsEl.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty</p><a href="shop.html" class="btn btn-primary">Start Shopping</a></div>';
            if (cartTotalEl) cartTotalEl.textContent = formatPrice(0);
            return;
        }

        cartItemsEl.innerHTML = state.cart.map(function (item) {
            return '<div class="cart-item">' +
                '<img src="' + item.image + '" alt="' + item.name + '" class="cart-item-img">' +
                '<div class="cart-item-info">' +
                '<div class="cart-item-name">' + item.name + '</div>' +
                '<div class="cart-item-price">' + formatPrice(item.price) + '</div>' +
                '<div class="cart-item-controls">' +
                '<button class="qty-btn" onclick="updateQuantity(' + item.id + ', -1)">−</button>' +
                '<span class="qty-value">' + item.quantity + '</span>' +
                '<button class="qty-btn" onclick="updateQuantity(' + item.id + ', 1)">+</button>' +
                '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')" aria-label="Remove">✕</button>' +
                '</div>' +
                '</div>' +
                '</div>';
        }).join('');

        if (cartTotalEl) cartTotalEl.textContent = formatPrice(getCartTotal());
    }

    function initCart() {
        const cartBtn = document.querySelector('.cart-btn');
        const cartSidebar = document.querySelector('.cart-sidebar');
        const cartOverlay = document.querySelector('.cart-overlay');
        const cartClose = document.querySelector('.cart-close');

        if (cartBtn && cartSidebar) {
            cartBtn.addEventListener('click', function () {
                cartSidebar.classList.add('open');
                if (cartOverlay) cartOverlay.classList.add('show');
            });
        }

        if (cartClose && cartSidebar) {
            cartClose.addEventListener('click', function () {
                cartSidebar.classList.remove('open');
                if (cartOverlay) cartOverlay.classList.remove('show');
            });
        }

        if (cartOverlay) {
            cartOverlay.addEventListener('click', function () {
                cartSidebar.classList.remove('open');
                cartOverlay.classList.remove('show');
            });
        }

        const checkoutBtn = document.querySelector('.btn-checkout');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function () {
                if (state.cart.length === 0) {
                    showToast('Your cart is empty!');
                    return;
                }
                showToast('Order placed! We will contact you soon. 🎉');
                state.cart = [];
                saveCart();
                updateCartCount();
                renderCartItems();
                cartSidebar.classList.remove('open');
                if (cartOverlay) cartOverlay.classList.remove('show');
            });
        }

        updateCartCount();
        renderCartItems();
    }

    /* ===== Toast Notification ===== */
    let toastTimeout;
    function showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = '<span class="toast-icon">✓</span><span class="toast-message"></span>';
            document.body.appendChild(toast);
        }
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(function () {
            toast.classList.remove('show');
        }, 3000);
    }

    /* ===== Render Products ===== */
    function createProductCard(product) {
        const badgeHtml = product.badge ? '<span class="product-badge ' + product.badge + '">' + (product.badge === 'sale' ? 'Sale' : 'New') + '</span>' : '';
        const oldPriceHtml = product.oldPrice ? '<span class="price-old">' + formatPrice(product.oldPrice) + '</span>' : '';

        return '<div class="product-card" data-category="' + product.category + '" data-brand="' + product.brand.toLowerCase() + '" data-price="' + product.price + '">' +
            '<div class="product-image">' +
            badgeHtml +
            '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy">' +
            '</div>' +
            '<div class="product-info">' +
            '<div class="product-category">' + product.category.charAt(0).toUpperCase() + product.category.slice(1) + ' • ' + product.brand + '</div>' +
            '<h3 class="product-name">' + product.name + '</h3>' +
            '<div class="product-rating"><span class="stars">' + getStarRating(product.rating) + '</span><span class="rating-count">(' + product.reviews + ')</span></div>' +
            '<div class="product-price"><span class="price-current">' + formatPrice(product.price) + '</span>' + oldPriceHtml + '</div>' +
            '<div class="product-actions">' +
            '<button class="btn-add-cart" onclick="addToCart(' + product.id + ')">🛒 Add to Cart</button>' +
            '<button class="btn-wishlist" onclick="addToWishlist(' + product.id + ')" aria-label="Add to wishlist">♡</button>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    function renderFeaturedProducts() {
        const grid = document.querySelector('.featured-grid');
        if (!grid) return;
        const featured = state.products.slice(0, 8);
        grid.innerHTML = featured.map(createProductCard).join('');
    }

    function renderShopProducts() {
        const grid = document.querySelector('.shop-grid');
        if (!grid) return;
        applyFilters();
    }

    /* ===== Shop Filters ===== */
    function applyFilters() {
        const grid = document.querySelector('.shop-grid');
        if (!grid) return;

        const searchQuery = (document.querySelector('.shop-search input')?.value || '').toLowerCase();

        state.filteredProducts = state.products.filter(function (product) {
            const matchCategory = state.activeFilters.categories.length === 0 || state.activeFilters.categories.includes(product.category);
            const matchBrand = state.activeFilters.brands.length === 0 || state.activeFilters.brands.includes(product.brand.toLowerCase());
            const matchPrice = product.price <= state.activeFilters.maxPrice;
            const matchSearch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery) || product.brand.toLowerCase().includes(searchQuery) || product.category.toLowerCase().includes(searchQuery);
            return matchCategory && matchBrand && matchPrice && matchSearch;
        });

        // Apply sorting
        const sortValue = document.querySelector('.shop-sort select')?.value || 'popular';
        if (sortValue === 'price-low') {
            state.filteredProducts.sort(function (a, b) { return a.price - b.price; });
        } else if (sortValue === 'price-high') {
            state.filteredProducts.sort(function (a, b) { return b.price - a.price; });
        } else if (sortValue === 'rating') {
            state.filteredProducts.sort(function (a, b) { return b.rating - a.rating; });
        }

        const countEl = document.querySelector('.shop-results-count strong');
        if (countEl) countEl.textContent = state.filteredProducts.length;

        if (state.filteredProducts.length === 0) {
            grid.innerHTML = '<div class="no-results" style="grid-column:1/-1;"><div class="no-results-icon">🔍</div><h3>No products found</h3><p>Try adjusting your filters or search terms.</p></div>';
        } else {
            grid.innerHTML = state.filteredProducts.map(createProductCard).join('');
        }
    }

    function initShopFilters() {
        // Category checkboxes
        document.querySelectorAll('.filter-category').forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                state.activeFilters.categories = Array.from(document.querySelectorAll('.filter-category:checked')).map(function (cb) { return cb.value; });
                applyFilters();
            });
        });

        // Brand checkboxes
        document.querySelectorAll('.filter-brand').forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                state.activeFilters.brands = Array.from(document.querySelectorAll('.filter-brand:checked')).map(function (cb) { return cb.value; });
                applyFilters();
            });
        });

        // Price range
        const priceRange = document.querySelector('.price-range');
        if (priceRange) {
            priceRange.addEventListener('input', function () {
                state.activeFilters.maxPrice = parseInt(priceRange.value);
                const display = document.querySelector('.price-max-display');
                if (display) display.textContent = formatPrice(parseInt(priceRange.value));
                applyFilters();
            });
        }

        // Search
        const searchInput = document.querySelector('.shop-search input');
        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }

        // Sort
        const sortSelect = document.querySelector('.shop-sort select');
        if (sortSelect) {
            sortSelect.addEventListener('change', applyFilters);
        }

        // Clear filters
        const clearBtn = document.querySelector('.btn-clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                state.activeFilters = { categories: [], brands: [], maxPrice: 500000 };
                document.querySelectorAll('.filter-category, .filter-brand').forEach(function (cb) { cb.checked = false; });
                if (priceRange) {
                    priceRange.value = 500000;
                    const display = document.querySelector('.price-max-display');
                    if (display) display.textContent = formatPrice(500000);
                }
                if (searchInput) searchInput.value = '';
                applyFilters();
            });
        }
    }

    /* ===== Wishlist ===== */
    function addToWishlist(productId) {
        const product = state.products.find(function (p) { return p.id === productId; });
        if (product) showToast(product.name + ' added to wishlist! ♡');
    }

    /* ===== Contact Form ===== */
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const successMsg = document.querySelector('.form-success');
            if (successMsg) {
                successMsg.classList.add('show');
                successMsg.textContent = '✓ Thank you, ' + (form.querySelector('[name="name"]')?.value || 'friend') + '! Your message has been sent. We will get back to you within 24 hours.';
            }
            form.reset();
            setTimeout(function () {
                if (successMsg) successMsg.classList.remove('show');
            }, 6000);
        });
    }

    /* ===== Newsletter Form ===== */
    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            showToast('Subscribed! Welcome to the VINEYARD SOUNDS family. 🎵');
            form.reset();
        });
    }

    /* ===== Back to Top ===== */
    function initBackToTop() {
        const btn = document.querySelector('.back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ===== Scroll Reveal Animations ===== */
    function initScrollReveal() {
        const elements = document.querySelectorAll('.reveal');
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(function (el) { observer.observe(el); });
    }

    /* ===== Initialize Everything ===== */
    function init() {
        initNavigation();
        initCart();
        renderFeaturedProducts();
        renderShopProducts();
        initShopFilters();
        initContactForm();
        initNewsletterForm();
        initBackToTop();
        initScrollReveal();
    }

    // Expose functions for inline onclick handlers
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.addToWishlist = addToWishlist;

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
