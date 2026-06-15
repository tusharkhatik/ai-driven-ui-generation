// ============================================================================
// MARKETPLACE GENERATOR - Amazon/eBay-like Marketplace UI
// ============================================================================

export class MarketplaceGenerator {
  static generate(rng, colors, analysis = {}) {
    const products = this.generateProducts(rng, 12);
    const sellers = this.generateSellers(rng, 3);

    return `
      <div class="marketplace-wrapper">
        <!-- Header -->
        <header class="marketplace-header">
          <div class="header-container">
            <div class="marketplace-logo">🛍️ MarketHub</div>
            <div class="header-search">
              <input type="text" placeholder="🔍 Search products, sellers..." class="search-input">
              <button class="search-btn">Search</button>
            </div>
            <div class="header-actions">
              <button class="header-btn">❤️ Favorites</button>
              <button class="header-btn">🛒 Cart (3)</button>
              <button class="header-btn">👤 Account</button>
            </div>
          </div>
        </header>

        <!-- Categories -->
        <nav class="categories-nav">
          <button class="category-btn active">All</button>
          <button class="category-btn">Electronics</button>
          <button class="category-btn">Fashion</button>
          <button class="category-btn">Home & Garden</button>
          <button class="category-btn">Sports</button>
          <button class="category-btn">Books</button>
        </nav>

        <div class="marketplace-container">
          <!-- Left Sidebar - Filters -->
          <aside class="marketplace-sidebar">
            <div class="filter-section">
              <h3>Filters</h3>
              
              <div class="filter-group">
                <h4>Price Range</h4>
                <input type="range" min="0" max="1000" value="500" class="price-slider">
                <div class="price-display">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>

              <div class="filter-group">
                <h4>Rating</h4>
                <label><input type="checkbox"> ⭐⭐⭐⭐⭐ 5 stars</label>
                <label><input type="checkbox"> ⭐⭐⭐⭐ 4+ stars</label>
                <label><input type="checkbox"> ⭐⭐⭐ 3+ stars</label>
              </div>

              <div class="filter-group">
                <h4>Seller Type</h4>
                <label><input type="checkbox"> Verified Sellers</label>
                <label><input type="checkbox"> Prime Eligible</label>
              </div>

              <button class="clear-filters">Clear All</button>
            </div>

            <div class="trending-section">
              <h3>Trending</h3>
              <div class="trending-item">🔥 Wireless Earbuds</div>
              <div class="trending-item">🔥 Smart Watches</div>
              <div class="trending-item">🔥 Phone Cases</div>
            </div>
          </aside>

          <!-- Main Products Grid -->
          <main class="marketplace-main">
            <div class="view-options">
              <button class="view-btn active">⊞ Grid</button>
              <button class="view-btn">≡ List</button>
              <select class="sort-select">
                <option>Sort by: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Top Rated</option>
              </select>
            </div>

            <div class="products-grid">
              ${products.map((product, i) => `
                <div class="marketplace-product">
                  <div class="product-image" style="background: ${colors.gradient}">
                    ${product.image}
                    ${product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
                    ${product.prime ? `<div class="prime-badge">Prime</div>` : ''}
                  </div>

                  <div class="product-info">
                    <h3>${product.name}</h3>
                    
                    <div class="product-rating">
                      <span class="stars">${'⭐'.repeat(product.rating)}</span>
                      <span class="rating-count">(${product.reviews} reviews)</span>
                    </div>

                    <div class="seller-info">
                      <img src="" alt="seller" class="seller-avatar">
                      <span class="seller-name">${product.seller}</span>
                      <span class="seller-badge">✓ Verified</span>
                    </div>

                    <div class="product-price">
                      <span class="original-price">$${product.originalPrice}</span>
                      <span class="current-price">$${product.price}</span>
                    </div>

                    <p class="product-desc">${product.description}</p>

                    <div class="product-actions">
                      <button class="btn-cart">🛒 Add to Cart</button>
                      <button class="btn-favorite">❤️</button>
                    </div>

                    <div class="shipping-info">
                      <small>📦 Free Shipping • Arrives in 2-3 days</small>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Pagination -->
            <div class="pagination">
              <button class="pagination-btn">← Previous</button>
              <button class="pagination-btn active">1</button>
              <button class="pagination-btn">2</button>
              <button class="pagination-btn">3</button>
              <button class="pagination-btn">Next →</button>
            </div>
          </main>

          <!-- Right Sidebar - Featured Sellers -->
          <aside class="marketplace-sellers-sidebar">
            <h3>Featured Sellers</h3>
            ${sellers.map(seller => `
              <div class="seller-card">
                <div class="seller-cover" style="background: ${colors.gradient}"></div>
                <div class="seller-avatar">👤</div>
                <h4>${seller.name}</h4>
                <div class="seller-stats">
                  <span>⭐ ${seller.rating}</span>
                  <span>📦 ${seller.products}K products</span>
                </div>
                <p class="seller-desc">${seller.description}</p>
                <button class="visit-seller-btn">Visit Store</button>
              </div>
            `).join('')}
          </aside>
        </div>
      </div>
    `;
  }

  static generateProducts(rng, count = 12) {
    const names = [
      'Wireless Earbuds Pro',
      'Smart Watch Ultra',
      'USB-C Fast Charger',
      'Phone Case Premium',
      'Portable SSD 1TB',
      'Mechanical Keyboard',
      'Gaming Mouse RGB',
      'Webcam 4K',
      'USB Hub 7-in-1',
      'Phone Mount Stand',
      'Screen Protector Pack',
      'Phone Cooling Fan'
    ];

    const sellers = ['TechHub Store', 'ElectroMax', 'Digital World', 'Premium Electronics', 'Tech Paradise'];

    const products = [];
    for (let i = 0; i < count; i++) {
      const originalPrice = rng.int(50, 500);
      const discount = rng.int(5, 40);
      const price = Math.round(originalPrice * (1 - discount / 100));

      products.push({
        name: names[i % names.length],
        image: ['🎧', '⌚', '🔌', '📱', '💾', '⌨️', '🖱️', '📹', '🔀', '📲', '🛡️', '❄️'][i % 12],
        price: price,
        originalPrice: originalPrice,
        discount: discount,
        rating: rng.int(3, 5),
        reviews: rng.int(100, 5000),
        seller: sellers[rng.int(0, sellers.length - 1)],
        description: 'High-quality product with excellent reviews and fast shipping.',
        prime: rng.bool(0.7)
      });
    }
    return products;
  }

  static generateSellers(rng, count = 3) {
    const names = ['TechHub Pro', 'ElectroMax Store', 'Digital Paradise'];
    const descriptions = [
      '5 years experience • Trusted by 100K+ customers',
      '10+ years in electronics • Official retailer',
      'Premium quality • 30-day returns'
    ];

    const sellers = [];
    for (let i = 0; i < count; i++) {
      sellers.push({
        name: names[i],
        rating: '4.' + rng.int(5, 9),
        products: rng.int(50, 500),
        description: descriptions[i]
      });
    }
    return sellers;
  }
}
