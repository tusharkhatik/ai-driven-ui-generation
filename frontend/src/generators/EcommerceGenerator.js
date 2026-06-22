/**
 * EcommerceGenerator.js - Generator for E-Commerce UIs
 * Supports: E-Commerce Store, Marketplace, Fashion Store
 * Layouts: marketplace, product-grid, amazon-style, luxury-store, minimal-store
 * 
 * @extends BaseWebsiteGenerator
 * @version 2.0.0
 */

import BaseWebsiteGenerator from './base/BaseWebsiteGenerator.js';

class EcommerceGenerator extends BaseWebsiteGenerator {
  constructor(config = {}) {
    super(config);
    this.category = 'ecommerce';
    this.subcategory = config.subcategory || 'ecommerceStore';
    this.layoutType = config.layout || 'product-grid';
  }

  /**
   * Generate E-Commerce HTML
   * @returns {Promise<string>} HTML content
   */
  async generateHTML() {
    let content = '';

    switch (this.layoutType) {
      case 'marketplace':
        content = this.generateMarketplaceLayout();
        break;
      case 'amazon-style':
        content = this.generateAmazonStyleLayout();
        break;
      case 'luxury-store':
        content = this.generateLuxuryStoreLayout();
        break;
      case 'minimal-store':
        content = this.generateMinimalStoreLayout();
        break;
      case 'product-grid':
      default:
        content = this.generateProductGridLayout();
    }

    return this.wrapDocument(content, await this.generateCSS(), await this.generateJS());
  }

  /**
   * Generate Marketplace Layout
   * @returns {string} HTML
   */
  generateMarketplaceLayout() {
    const products = this.mockData.products || this.generateMockProducts(12);
    const categories = this.mockData.categories || this.generateMockCategories();
    const filters = this.mockData.filters || this.generateMockFilters();

    return `
<div class="ecommerce">
  ${this.generateEcommerceNav()}
  
  <section class="marketplace-hero">
    <div class="hero-content">
      <h1>Discover Amazing Products</h1>
      <p>Shop from thousands of verified sellers</p>
      ${this.generateSearchBar()}
    </div>
  </section>
  
  <div class="marketplace-container">
    <aside class="marketplace-sidebar">
      ${this.generateCategoryMenu(categories)}
      ${this.generateFiltersPanel(filters)}
    </aside>
    
    <main class="marketplace-main">
      <div class="toolbar">
        <p class="results-count">Showing ${products.length} products</p>
        <div class="sort-controls">
          <select class="sort-select">
            <option>Recommended</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Best Selling</option>
            <option>Top Rated</option>
          </select>
        </div>
      </div>
      
      <div class="products-grid">
        ${products.map(product => this.generateProductCard(product)).join('')}
      </div>
      
      <div class="pagination">
        <button class="pagination-btn">← Previous</button>
        <button class="pagination-btn active">1</button>
        <button class="pagination-btn">2</button>
        <button class="pagination-btn">3</button>
        <button class="pagination-btn">Next →</button>
      </div>
    </main>
  </div>
  
  ${this.generateFooter()}
</div>
    `.trim();
  }

  /**
   * Generate Amazon-Style Layout
   * @returns {string} HTML
   */
  generateAmazonStyleLayout() {
    const products = this.mockData.products || this.generateMockProducts(20);
    const featured = this.mockData.featured || this.generateMockFeatured();
    const filters = this.mockData.filters || this.generateMockFilters();

    return `
<div class="ecommerce">
  ${this.generateEcommerceNav()}
  
  <div class="amazon-container">
    <aside class="amazon-sidebar">
      <h3>Filters</h3>
      ${this.generateFiltersPanel(filters)}
    </aside>
    
    <main class="amazon-main">
      <section class="featured-banner">
        ${featured.map(item => `
          <div class="featured-item">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <button class="btn btn-primary">Shop Now</button>
          </div>
        `).join('')}
      </section>
      
      <section class="deals-section">
        <h2>Today's Deals</h2>
        <div class="deals-grid">
          ${products.slice(0, 8).map(product => `
            <div class="deal-card">
              ${product.discount ? `<span class="discount-badge">${product.discount}% OFF</span>` : ''}
              <div class="deal-image">${product.image}</div>
              <div class="deal-info">
                <p class="deal-title">${product.name}</p>
                <div class="deal-price">
                  <span class="current-price">$${product.price}</span>
                  ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <div class="deal-rating">
                  ${'⭐'.repeat(Math.floor(product.rating))}
                  <span>(${product.reviews} reviews)</span>
                </div>
                <button class="btn btn-primary btn-small">Add to Cart</button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
      
      <section class="recommendations-section">
        <h2>Recommended For You</h2>
        <div class="recommendations-grid">
          ${products.slice(8, 16).map(product => this.generateProductCard(product)).join('')}
        </div>
      </section>
    </main>
  </div>
  
  ${this.generateFooter()}
</div>
    `.trim();
  }

  /**
   * Generate Luxury Store Layout
   * @returns {string} HTML
   */
  generateLuxuryStoreLayout() {
    const products = this.mockData.products || this.generateMockProducts(8);
    const collections = this.mockData.collections || this.generateMockCollections();

    return `
<div class="ecommerce luxury-store">
  ${this.generateEcommerceNav()}
  
  <section class="luxury-hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="luxury-title">Luxury Collection</h1>
      <p class="luxury-subtitle">Discover Timeless Elegance</p>
      <button class="btn btn-light btn-lg">Explore Collection</button>
    </div>
  </section>
  
  <section class="collections-showcase">
    <div class="container">
      <h2>Our Collections</h2>
      <div class="collections-grid">
        ${collections.map(collection => `
          <div class="collection-card">
            <div class="collection-image">${collection.image}</div>
            <h3>${collection.name}</h3>
            <p>${collection.description}</p>
            <a href="#" class="collection-link">View Collection →</a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  
  <section class="featured-products">
    <div class="container">
      <h2>Featured Pieces</h2>
      <div class="luxury-products-grid">
        ${products.map(product => `
          <div class="luxury-product-card">
            <div class="luxury-image">${product.image}</div>
            <div class="luxury-info">
              <h4>${product.name}</h4>
              <p class="luxury-description">${product.description || 'Premium quality product'}</p>
              <p class="luxury-price">$${product.price.toLocaleString()}</p>
              <div class="luxury-actions">
                <button class="btn btn-dark">View Details</button>
                <button class="btn-wishlist">♡</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  
  <section class="testimonials-luxury">
    <div class="container">
      <h2>Client Stories</h2>
      <div class="testimonials-grid-luxury">
        ${this.generateLuxuryTestimonials()}
      </div>
    </div>
  </section>
  
  ${this.generateFooter()}
</div>
    `.trim();
  }

  /**
   * Generate Minimal Store Layout
   * @returns {string} HTML
   */
  generateMinimalStoreLayout() {
    const products = this.mockData.products || this.generateMockProducts(12);

    return `
<div class="ecommerce minimal-store">
  ${this.generateMinimalNav()}
  
  <section class="minimal-hero">
    <h1>Shop Our Collection</h1>
    ${this.generateSearchBar()}
  </section>
  
  <main class="minimal-main">
    <div class="minimal-products">
      ${products.map(product => `
        <div class="minimal-product-card">
          <div class="minimal-image">${product.image}</div>
          <h3>${product.name}</h3>
          <p class="minimal-category">${product.category}</p>
          <p class="minimal-price">$${product.price}</p>
          <button class="btn btn-primary">Add to Cart</button>
        </div>
      `).join('')}
    </div>
  </main>
  
  ${this.generateMinimalFooter()}
</div>
    `.trim();
  }

  /**
   * Generate Product Grid Layout (Default)
   * @returns {string} HTML
   */
  generateProductGridLayout() {
    const products = this.mockData.products || this.generateMockProducts(12);
    const categories = this.mockData.categories || this.generateMockCategories();

    return `
<div class="ecommerce">
  ${this.generateEcommerceNav()}
  
  <section class="hero-section">
    <div class="hero-content">
      <h1>Welcome to Our Store</h1>
      <p>Find everything you need</p>
      ${this.generateSearchBar()}
    </div>
  </section>
  
  <section class="categories-section">
    <div class="container">
      <h2>Shop by Category</h2>
      <div class="categories-grid">
        ${categories.map(cat => `
          <a href="#" class="category-card">
            <div class="category-icon">${cat.icon}</div>
            <h3>${cat.name}</h3>
            <p>${cat.count} items</p>
          </a>
        `).join('')}
      </div>
    </div>
  </section>
  
  <section class="featured-section">
    <div class="container">
      <h2>Featured Products</h2>
      <div class="products-grid">
        ${products.map(product => this.generateProductCard(product)).join('')}
      </div>
    </div>
  </section>
  
  ${this.generateCTA()}
  ${this.generateFooter()}
</div>
    `.trim();
  }

  /**
   * Generate Navigation
   * @returns {string} HTML
   */
  generateEcommerceNav() {
    return `
<nav class="ecom-navbar">
  <div class="navbar-container">
    <div class="navbar-brand">🛍️ ShopHub</div>
    <div class="navbar-menu">
      <a href="#" class="nav-link">Home</a>
      <a href="#" class="nav-link">Shop</a>
      <a href="#" class="nav-link">Categories</a>
      <a href="#" class="nav-link">Deals</a>
    </div>
    <div class="navbar-actions">
      <input type="text" placeholder="🔍 Search products..." class="search-input">
      <button class="cart-btn">🛒 Cart <span class="cart-count">0</span></button>
      <button class="account-btn">👤 Account</button>
    </div>
  </div>
</nav>
    `.trim();
  }

  /**
   * Generate Minimal Navigation
   * @returns {string} HTML
   */
  generateMinimalNav() {
    return `
<nav class="minimal-nav">
  <div class="nav-container">
    <h1>Shop</h1>
    <button class="cart-btn">🛒 <span class="cart-count">0</span></button>
  </div>
</nav>
    `.trim();
  }

  /**
   * Generate Product Card
   * @param {Object} product - Product data
   * @returns {string} HTML
   */
  generateProductCard(product) {
    return `
<div class="product-card">
  <div class="product-image">${product.image}</div>
  ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
  <div class="product-info">
    <h3>${product.name}</h3>
    <p class="product-category">${product.category}</p>
    <div class="product-rating">
      ${'⭐'.repeat(Math.floor(product.rating))}
      <span>(${product.reviews})</span>
    </div>
    <div class="product-price">
      <span class="price">$${product.price}</span>
      ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
    </div>
    <button class="btn btn-primary btn-add-cart">Add to Cart</button>
    <button class="btn-wishlist">♡ Wishlist</button>
  </div>
</div>
    `.trim();
  }

  /**
   * Generate Category Menu
   * @param {Array} categories - Categories
   * @returns {string} HTML
   */
  generateCategoryMenu(categories) {
    return `
<div class="category-menu">
  <h3>Categories</h3>
  <ul>
    ${categories.map(cat => `
      <li>
        <a href="#" class="category-link">${cat.icon} ${cat.name}</a>
        <span class="category-count">${cat.count}</span>
      </li>
    `).join('')}
  </ul>
</div>
    `.trim();
  }

  /**
   * Generate Filters Panel
   * @param {Array} filters - Filter options
   * @returns {string} HTML
   */
  generateFiltersPanel(filters) {
    return `
<div class="filters-panel">
  ${filters.map(filter => `
    <div class="filter-group">
      <h4>${filter.name}</h4>
      <div class="filter-options">
        ${filter.options.map(option => `
          <label class="filter-option">
            <input type="checkbox" value="${option}">
            <span>${option}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('')}
  <button class="btn btn-primary btn-full">Apply Filters</button>
</div>
    `.trim();
  }

  /**
   * Generate Search Bar
   * @returns {string} HTML
   */
  generateSearchBar() {
    return `
<div class="search-bar-container">
  <form class="search-form">
    <input type="text" placeholder="What are you looking for?" class="search-input-large">
    <button type="submit" class="btn btn-primary">Search</button>
  </form>
</div>
    `.trim();
  }

  /**
   * Generate Minimal Footer
   * @returns {string} HTML
   */
  generateMinimalFooter() {
    return `
<footer class="minimal-footer">
  <p>&copy; 2024 ShopHub. All rights reserved.</p>
</footer>
    `.trim();
  }

  /**
   * Generate Luxury Testimonials
   * @returns {string} HTML
   */
  generateLuxuryTestimonials() {
    const testimonials = [
      {
        text: 'Exquisite craftsmanship and impeccable service. Truly a luxury experience.',
        author: 'Victoria Sterling',
        title: 'CEO, Luxury Enterprises'
      },
      {
        text: 'The attention to detail is remarkable. Every product is a work of art.',
        author: 'James Mitchell',
        title: 'Collector'
      },
      {
        text: 'Exceptional quality and timeless elegance. Highly recommended.',
        author: 'Alexandra Shaw',
        title: 'Fashion Enthusiast'
      }
    ];
    
    return testimonials.map(t => `
      <div class="testimonial-luxury">
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <h4>${t.author}</h4>
          <p>${t.title}</p>
        </div>
      </div>
    `).join('');
  }

  /**
   * Generate CSS
   * @returns {Promise<string>} CSS
   */
  async generateCSS() {
    const layoutCSS = this.getLayoutSpecificCSS();
    
    return `
${this.generateBaseCss()}
${this.generateWebsiteCss()}

/* E-Commerce Base Styles */
.ecommerce {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navbar */
.ecom-navbar {
  background: ${this.theme.surface};
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: ${this.theme.primary};
  white-space: nowrap;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
  flex: 1;
}

.nav-link {
  color: ${this.theme.text};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: ${this.theme.primary};
}

.navbar-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  min-width: 250px;
}

.cart-btn,
.account-btn {
  padding: 0.75rem 1.5rem;
  background: ${this.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

.cart-btn:hover,
.account-btn:hover {
  background: ${this.theme.secondary};
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

/* Hero Sections */
.hero-section,
.marketplace-hero,
.minimal-hero {
  background: linear-gradient(135deg, ${this.theme.primary} 0%, ${this.theme.secondary} 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-section h1,
.marketplace-hero h1,
.minimal-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.marketplace-hero p,
.minimal-hero p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

/* Search Bar */
.search-bar-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-form {
  display: flex;
  gap: 0.5rem;
}

.search-input-large {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

/* Categories */
.categories-section {
  padding: 3rem 2rem;
  background: ${this.theme.bg};
}

.categories-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: ${this.theme.text};
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem 1rem;
  text-align: center;
  text-decoration: none;
  color: ${this.theme.text};
  transition: all 0.3s ease;
}

.category-card:hover {
  border-color: ${this.theme.primary};
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transform: translateY(-5px);
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.category-card h3 {
  margin-bottom: 0.5rem;
}

.category-card p {
  color: #6b7280;
  font-size: 0.9rem;
}

/* Products Grid */
.featured-section {
  padding: 3rem 2rem;
}

.featured-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: ${this.theme.text};
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, ${this.theme.primary}20, ${this.theme.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  overflow: hidden;
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${this.theme.primary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.product-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: ${this.theme.text};
}

.product-category {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.product-rating {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.product-rating span {
  color: #6b7280;
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.price {
  font-size: 1.3rem;
  font-weight: 700;
  color: ${this.theme.primary};
}

.original-price {
  font-size: 0.9rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.btn-add-cart {
  width: 100%;
  margin-bottom: 0.5rem;
}

.btn-wishlist {
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-wishlist:hover {
  border-color: ${this.theme.primary};
  color: ${this.theme.primary};
}

/* Marketplace Specific */
.marketplace-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  flex: 1;
}

.marketplace-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.category-menu,
.filters-panel {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.category-menu h3,
.filters-panel h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: ${this.theme.text};
}

.category-menu ul {
  list-style: none;
}

.category-menu li {
  margin-bottom: 0.75rem;
}

.category-link {
  color: ${this.theme.text};
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-link:hover {
  color: ${this.theme.primary};
}

.category-count {
  color: #9ca3af;
  font-size: 0.85rem;
  margin-left: auto;
}

.filter-group {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.filter-group:last-child {
  border-bottom: none;
}

.filter-group h4 {
  margin: 0 0 0.75rem 0;
  color: ${this.theme.text};
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${this.theme.text};
}

.filter-option input {
  cursor: pointer;
}

.marketplace-main {
  flex: 1;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.results-count {
  color: #6b7280;
  font-size: 0.95rem;
}

.sort-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: ${this.theme.surface};
  cursor: pointer;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  background: ${this.theme.surface};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover,
.pagination-btn.active {
  background: ${this.theme.primary};
  color: white;
  border-color: ${this.theme.primary};
}

/* Amazon Style */
.amazon-container {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.amazon-sidebar {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
}

.amazon-sidebar h3 {
  margin-top: 0;
  color: ${this.theme.text};
}

.featured-banner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.featured-item {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.featured-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.deals-section,
.recommendations-section {
  margin-bottom: 3rem;
}

.deals-section h2,
.recommendations-section h2 {
  margin-bottom: 1.5rem;
  color: ${this.theme.text};
}

.deals-grid,
.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.deal-card {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
}

.deal-card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.discount-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}

.deal-image {
  width: 100%;
  height: 150px;
  background: linear-gradient(135deg, ${this.theme.primary}20, ${this.theme.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.deal-info {
  padding: 1rem;
}

.deal-title {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
}

.deal-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.current-price {
  font-weight: 700;
  color: ${this.theme.primary};
}

.original-price {
  font-size: 0.85rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.deal-rating {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

/* Luxury Store */
.luxury-store {
  background: #fafaf9;
}

.luxury-hero {
  height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(135deg, ${this.theme.primary}, ${this.theme.secondary});
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
}

.luxury-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  z-index: 10;
  position: relative;
  font-weight: 300;
  letter-spacing: 2px;
}

.luxury-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  z-index: 10;
  position: relative;
  font-weight: 300;
  letter-spacing: 1px;
}

.btn-light {
  background: white;
  color: ${this.theme.primary};
  z-index: 10;
  position: relative;
}

.collections-showcase {
  padding: 5rem 2rem;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
}

.collection-card {
  text-align: center;
}

.collection-image {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, ${this.theme.primary}20, ${this.theme.secondary}20);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collection-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
}

.collection-card p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.collection-link {
  color: ${this.theme.primary};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.collection-link:hover {
  text-decoration: underline;
}

.featured-products {
  padding: 5rem 2rem;
}

.luxury-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
}

.luxury-product-card {
  text-align: center;
  transition: all 0.3s ease;
}

.luxury-product-card:hover {
  transform: scale(1.02);
}

.luxury-image {
  width: 100%;
  height: 350px;
  background: linear-gradient(135deg, ${this.theme.primary}20, ${this.theme.secondary}20);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.luxury-product-card h4 {
  font-size: 1.3rem;
  color: ${this.theme.text};
  margin-bottom: 0.5rem;
}

.luxury-description {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.luxury-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: ${this.theme.primary};
  margin-bottom: 1.5rem;
}

.luxury-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-dark {
  background: ${this.theme.text};
  color: white;
}

.btn-wishlist {
  width: 50px;
  height: 50px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.testimonials-luxury {
  padding: 5rem 2rem;
  background: ${this.theme.surface};
}

.testimonials-grid-luxury {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.testimonial-luxury {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.testimonial-text {
  font-style: italic;
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.testimonial-author h4 {
  color: ${this.theme.text};
  margin-bottom: 0.25rem;
}

.testimonial-author p {
  color: #9ca3af;
  font-size: 0.9rem;
}

/* Minimal Store */
.minimal-store {
  background: #ffffff;
}

.minimal-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-container h1 {
  margin: 0;
  font-size: 1.5rem;
  color: ${this.theme.text};
}

.minimal-hero {
  background: white;
  color: ${this.theme.text};
  padding: 3rem 2rem;
}

.minimal-hero h1 {
  color: ${this.theme.text};
}

.minimal-main {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
}

.minimal-products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.minimal-product-card {
  text-align: center;
}

.minimal-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, ${this.theme.primary}10, ${this.theme.secondary}10);
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.minimal-product-card h3 {
  font-size: 1rem;
  color: ${this.theme.text};
  margin-bottom: 0.25rem;
}

.minimal-category {
  color: #9ca3af;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.minimal-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: ${this.theme.primary};
  margin-bottom: 1rem;
}

.minimal-footer {
  text-align: center;
  padding: 2rem;
  background: ${this.theme.surface};
  color: #6b7280;
  font-size: 0.9rem;
}

.btn-full {
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .navbar-menu {
    display: none;
  }
  
  .search-input {
    min-width: auto;
    flex: 1;
  }
  
  .marketplace-container,
  .amazon-container {
    grid-template-columns: 1fr;
  }
  
  .products-grid,
  .deals-grid,
  .recommendations-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .luxury-title {
    font-size: 2rem;
  }
  
  .luxury-products-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

${layoutCSS}
    `.trim();
  }

  /**
   * Get layout-specific CSS
   * @returns {string} CSS
   */
  getLayoutSpecificCSS() {
    // Additional layout-specific CSS can be added here
    return '';
  }

  /**
   * Generate JavaScript
   * @returns {Promise<string>} JS
   */
  async generateJS() {
    return `
${this.generateBaseJs()}

(function() {
  'use strict';
  
  let cart = JSON.parse(localStorage.getItem('ecommerce-cart') || '[]');
  let cartCount = document.querySelector('.cart-count');
  
  // Update cart count
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (cartCount) cartCount.textContent = count;
  }
  
  // Add to cart
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.product-card, .deal-card, .minimal-product-card, .luxury-product-card');
      if (card) {
        const product = {
          id: Math.random(),
          name: card.querySelector('h3, h4').textContent,
          price: card.querySelector('.price, .minimal-price, .luxury-price, .current-price').textContent,
          qty: 1
        };
        cart.push(product);
        localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
        updateCartCount();
        this.textContent = '✓ Added!';
        setTimeout(() => { this.textContent = 'Add to Cart'; }, 1500);
      }
    });
  });
  
  // Wishlist toggle
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      this.textContent = this.textContent === '♡' ? '♥' : '♡';
    });
  });
  
  // Filter panel
  const filterBtns = document.querySelectorAll('.filter-option input');
  filterBtns.forEach(btn => {
    btn.addEventListener('change', () => {
      console.log('Filter changed');
    });
  });
  
  // Search form
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchForm.querySelector('input').value;
      console.log('Search for:', query);
    });
  }
  
  // Cart button
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      console.log('Cart clicked. Items:', cart);
    });
  }
  
  updateCartCount();
})();
    `.trim();
  }

  /**
   * Generate mock products
   * @param {number} count - Number of products
   * @returns {Array} Products
   */
  generateMockProducts(count = 12) {
    const products = [
      { name: 'Premium Wireless Headphones', category: 'Electronics', price: 199.99, originalPrice: 299.99, rating: 4.8, reviews: 245, image: '🎧', badge: 'Best Seller', discount: 33 },
      { name: 'Luxury Smartwatch', category: 'Accessories', price: 299.99, originalPrice: 399.99, rating: 4.9, reviews: 189, image: '⌚', badge: 'New', discount: 25 },
      { name: 'Designer Sunglasses', category: 'Fashion', price: 149.99, rating: 4.7, reviews: 156, image: '😎', badge: null },
      { name: 'Portable SSD 2TB', category: 'Tech', price: 249.99, rating: 4.9, reviews: 312, image: '💾', badge: 'Popular' },
      { name: 'Premium Camera', category: 'Electronics', price: 1299.99, originalPrice: 1499.99, rating: 4.8, reviews: 428, image: '📷', badge: 'Premium', discount: 13 },
      { name: 'Mechanical Keyboard', category: 'Tech', price: 159.99, rating: 4.8, reviews: 267, image: '⌨️', badge: 'Hot Sale' },
      { name: 'Studio Microphone', category: 'Audio', price: 249.99, rating: 4.9, reviews: 198, image: '🎤', badge: 'Professional' },
      { name: 'VR Headset Pro', category: 'Gaming', price: 799.99, originalPrice: 999.99, rating: 4.6, reviews: 145, image: '🥽', badge: 'Latest', discount: 20 },
      { name: 'Wireless Earbuds', category: 'Audio', price: 99.99, rating: 4.7, reviews: 523, image: '🔌', badge: 'Trending' },
      { name: 'Smart Watch Band', category: 'Accessories', price: 29.99, rating: 4.5, reviews: 89, image: '⌛', badge: null },
      { name: 'Phone Case Pro', category: 'Accessories', price: 19.99, rating: 4.6, reviews: 612, image: '📱', badge: null },
      { name: 'Laptop Stand', category: 'Office', price: 49.99, rating: 4.8, reviews: 234, image: '💻', badge: null }
    ];
    return products.slice(0, count);
  }

  /**
   * Generate mock categories
   * @returns {Array} Categories
   */
  generateMockCategories() {
    return [
      { name: 'Electronics', icon: '📱', count: 1250 },
      { name: 'Fashion', icon: '👗', count: 3420 },
      { name: 'Home & Garden', icon: '🏠', count: 2150 },
      { name: 'Sports & Outdoors', icon: '⛺', count: 1890 },
      { name: 'Toys & Games', icon: '🎮', count: 1340 },
      { name: 'Books & Media', icon: '📚', count: 945 }
    ];
  }

  /**
   * Generate mock filters
   * @returns {Array} Filters
   */
  generateMockFilters() {
    return [
      {
        name: 'Price Range',
        options: ['Under $50', '$50 - $100', '$100 - $250', '$250 - $500', 'Over $500']
      },
      {
        name: 'Rating',
        options: ['⭐⭐⭐⭐⭐ 5 Stars', '⭐⭐⭐⭐ 4+ Stars', '⭐⭐⭐ 3+ Stars']
      },
      {
        name: 'Availability',
        options: ['In Stock', 'Pre-Order', 'Back Order']
      },
      {
        name: 'Brand',
        options: ['Premium Brand', 'Luxury', 'Budget', 'Certified']
      }
    ];
  }

  /**
   * Generate mock featured products
   * @returns {Array} Featured
   */
  generateMockFeatured() {
    return [
      { title: 'Summer Collection', image: '☀️' },
      { title: 'Best Sellers', image: '🏆' },
      { title: 'New Arrivals', image: '✨' }
    ];
  }

  /**
   * Generate mock collections
   * @returns {Array} Collections
   */
  generateMockCollections() {
    return [
      {
        name: 'Signature Collection',
        description: 'Curated selection of premium items',
        image: '👑'
      },
      {
        name: 'Limited Edition',
        description: 'Exclusive pieces for discerning tastes',
        image: '💎'
      },
      {
        name: 'Timeless Classics',
        description: 'Enduring style and elegance',
        image: '⏰'
      }
    ];
  }
}

export default EcommerceGenerator;
