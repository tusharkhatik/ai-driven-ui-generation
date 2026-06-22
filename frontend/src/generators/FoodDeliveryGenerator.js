const BaseAppGenerator = require('./BaseAppGenerator');

/**
 * FoodDeliveryGenerator
 * Generates food delivery and restaurant ordering applications
 */
class FoodDeliveryGenerator extends BaseAppGenerator {
  constructor(config = {}) {
    super({
      appType: 'food-delivery-app',
      layout: 'modern-food-app',
      theme: 'light',
      currency: 'USD',
      ...config
    });

    this.appData = config.data || {};
    this.supportedApplications = [
      'Food Delivery App',
      'Restaurant Ordering Platform'
    ];
    this.supportedLayouts = [
      'food-marketplace',
      'restaurant-view',
      'delivery-dashboard',
      'modern-food-app',
      'minimal-food'
    ];
    this.components = [
      'searchBar',
      'restaurantCard',
      'menuGrid',
      'cartPanel',
      'orderTracker',
      'deliveryMap'
    ];

    this.initializeComponents();
  }

  /**
   * Validate configuration for Food Delivery
   */
  validateConfig() {
    super.validateConfig();

    if (!this.supportedApplications.includes(this.config.appType)) {
      throw new Error(
        `Unsupported appType: ${this.config.appType}. Supported: ${this.supportedApplications.join(', ')}`
      );
    }

    if (!this.supportedLayouts.includes(this.config.layout)) {
      throw new Error(
        `Unsupported layout: ${this.config.layout}. Supported: ${this.supportedLayouts.join(', ')}`
      );
    }

    return true;
  }

  /**
   * Initialize all food delivery components
   */
  initializeComponents() {
    this.registerComponent('searchBar', this.buildSearchBar());
    this.registerComponent('restaurantCard', this.buildRestaurantCard());
    this.registerComponent('menuGrid', this.buildMenuGrid());
    this.registerComponent('cartPanel', this.buildCartPanel());
    this.registerComponent('orderTracker', this.buildOrderTracker());
    this.registerComponent('deliveryMap', this.buildDeliveryMap());

    this.registerStyles('base', this.getBaseStyles());
    this.registerStyles('components', this.getComponentStyles());
    this.registerStyles('layouts', this.getLayoutStyles());

    this.registerScripts('core', this.getCoreScripts());
    this.registerScripts('state', this.getStateManagementScripts());
    this.registerScripts('components', this.getComponentScripts());
    this.registerScripts('interactions', this.getInteractionScripts());
  }

  /**
   * Build Search Bar
   */
  buildSearchBar() {
    return `
    <div class="search-bar-container">
      <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input 
          type="text" 
          id="search-input" 
          class="search-input" 
          placeholder="Search restaurants or food..."
          onkeyup="handleSearch(this.value)"
        >
        <button class="search-filters" onclick="toggleFilters()">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6h18M3 12h18M3 18h18"></path>
          </svg>
        </button>
      </div>
      <div id="search-filters" class="search-filters-panel" style="display: none;">
        <div class="filter-group">
          <label>Price Range</label>
          <input type="range" min="0" max="100" value="50" class="filter-slider">
        </div>
        <div class="filter-group">
          <label>Rating</label>
          <select class="filter-select">
            <option>All Ratings</option>
            <option>4.5+</option>
            <option>4.0+</option>
            <option>3.5+</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Delivery Time</label>
          <select class="filter-select">
            <option>All Times</option>
            <option>Under 15 min</option>
            <option>Under 30 min</option>
            <option>Under 45 min</option>
          </select>
        </div>
      </div>
    </div>
    `;
  }

  /**
   * Build Restaurant Card
   */
  buildRestaurantCard() {
    const restaurants = this.appData.restaurants || [
      {
        id: 1,
        name: 'Pizza Palace',
        cuisine: 'Italian',
        rating: 4.8,
        reviews: 324,
        deliveryTime: '25-35 min',
        deliveryFee: '$2.99',
        image: '/images/restaurant-1.jpg',
        promo: '15% off'
      },
      {
        id: 2,
        name: 'Sushi Masters',
        cuisine: 'Japanese',
        rating: 4.7,
        reviews: 512,
        deliveryTime: '30-40 min',
        deliveryFee: '$3.99',
        image: '/images/restaurant-2.jpg',
        promo: null
      },
      {
        id: 3,
        name: 'Burger Barn',
        cuisine: 'American',
        rating: 4.6,
        reviews: 289,
        deliveryTime: '20-30 min',
        deliveryFee: '$1.99',
        image: '/images/restaurant-3.jpg',
        promo: 'Free delivery'
      }
    ];

    const cardsHTML = restaurants
      .map(
        (restaurant) => `
      <div class="restaurant-card" data-restaurant-id="${restaurant.id}" onclick="selectRestaurant(${restaurant.id})">
        <div class="restaurant-image">
          <img src="${restaurant.image}" alt="${restaurant.name}">
          ${restaurant.promo ? `<div class="promo-badge">${restaurant.promo}</div>` : ''}
        </div>
        <div class="restaurant-info">
          <div class="restaurant-header">
            <h3>${restaurant.name}</h3>
            <div class="rating">
              <span class="stars">★</span>
              <span class="rating-value">${restaurant.rating}</span>
            </div>
          </div>
          <p class="cuisine">${restaurant.cuisine}</p>
          <div class="restaurant-meta">
            <span class="delivery-time">⏱ ${restaurant.deliveryTime}</span>
            <span class="delivery-fee">${restaurant.deliveryFee}</span>
          </div>
          <p class="reviews">${restaurant.reviews} reviews</p>
        </div>
      </div>
    `
      )
      .join('');

    return `
    <section id="restaurants" class="restaurants-section">
      <div class="container">
        <h2>Popular Restaurants</h2>
        <div class="restaurants-grid">
          ${cardsHTML}
        </div>
      </div>
    </section>
    `;
  }

  /**
   * Build Menu Grid
   */
  buildMenuGrid() {
    const menuItems = this.appData.menuItems || [
      {
        id: 1,
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella and basil',
        price: 12.99,
        image: '/images/pizza-1.jpg',
        rating: 4.7,
        category: 'Pizza'
      },
      {
        id: 2,
        name: 'Caesar Salad',
        description: 'Crispy romaine with parmesan',
        price: 8.99,
        image: '/images/salad-1.jpg',
        rating: 4.5,
        category: 'Salads'
      },
      {
        id: 3,
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta',
        price: 14.99,
        image: '/images/pasta-1.jpg',
        rating: 4.8,
        category: 'Pasta'
      },
      {
        id: 4,
        name: 'Garlic Bread',
        description: 'Toasted with herbs',
        price: 4.99,
        image: '/images/bread-1.jpg',
        rating: 4.6,
        category: 'Sides'
      },
      {
        id: 5,
        name: 'Tiramisu',
        description: 'Traditional Italian dessert',
        price: 6.99,
        image: '/images/dessert-1.jpg',
        rating: 4.9,
        category: 'Desserts'
      },
      {
        id: 6,
        name: 'Iced Lemon Tea',
        description: 'Refreshing cold beverage',
        price: 3.99,
        image: '/images/drink-1.jpg',
        rating: 4.4,
        category: 'Beverages'
      }
    ];

    const menuHTML = menuItems
      .map(
        (item) => `
      <div class="menu-item" data-item-id="${item.id}">
        <div class="menu-item-image">
          <img src="${item.image}" alt="${item.name}">
          <span class="menu-item-category">${item.category}</span>
        </div>
        <div class="menu-item-content">
          <div class="menu-item-header">
            <h4>${item.name}</h4>
            <span class="menu-item-rating">★ ${item.rating}</span>
          </div>
          <p class="menu-item-description">${item.description}</p>
          <div class="menu-item-footer">
            <span class="menu-item-price">${this.config.currency} ${item.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" onclick="addToCart({id: ${item.id}, name: '${item.name}', price: ${item.price}})">+</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    return `
    <section id="menu" class="menu-section" style="display: none;">
      <div class="container">
        <button class="back-btn" onclick="closeMenu()">← Back</button>
        <h2>Menu</h2>
        <div class="menu-grid">
          ${menuHTML}
        </div>
      </div>
    </section>
    `;
  }

  /**
   * Build Cart Panel
   */
  buildCartPanel() {
    return `
    <div id="cart-panel" class="cart-panel">
      <div class="cart-header">
        <h3>Your Cart</h3>
        <button class="close-cart" onclick="toggleCart()">×</button>
      </div>
      <div class="cart-items" id="cart-items-list">
        <p class="empty-cart">Your cart is empty</p>
      </div>
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span id="subtotal">$0.00</span>
        </div>
        <div class="summary-row">
          <span>Delivery Fee:</span>
          <span id="delivery-fee">$2.99</span>
        </div>
        <div class="summary-row">
          <span>Tax:</span>
          <span id="tax">$0.00</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span id="total">$0.00</span>
        </div>
      </div>
      <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
    </div>
    <div class="cart-toggle" onclick="toggleCart()">
      <span class="cart-icon">🛒</span>
      <span class="cart-count" id="cart-count">0</span>
    </div>
    `;
  }

  /**
   * Build Order Tracker
   */
  buildOrderTracker() {
    return `
    <div id="order-tracker" class="order-tracker" style="display: none;">
      <div class="tracker-header">
        <h2>Order Status</h2>
        <button class="close-tracker" onclick="closeTracker()">×</button>
      </div>
      <div class="tracker-content">
        <div class="order-number">
          <p>Order #<span id="order-id">12345</span></p>
          <p class="order-time">Placed at <span id="order-time">2:45 PM</span></p>
        </div>
        
        <div class="tracker-steps">
          <div class="tracker-step completed">
            <div class="step-circle">✓</div>
            <div class="step-content">
              <p class="step-title">Order Confirmed</p>
              <p class="step-time">2:45 PM</p>
            </div>
          </div>
          
          <div class="tracker-step completed">
            <div class="step-circle">✓</div>
            <div class="step-content">
              <p class="step-title">Preparing</p>
              <p class="step-time">2:50 PM</p>
            </div>
          </div>
          
          <div class="tracker-step active" id="delivery-step">
            <div class="step-circle"><span class="spinner"></span></div>
            <div class="step-content">
              <p class="step-title">Out for Delivery</p>
              <p class="step-time">3:15 PM</p>
            </div>
          </div>
          
          <div class="tracker-step">
            <div class="step-circle">4</div>
            <div class="step-content">
              <p class="step-title">Delivered</p>
              <p class="step-time">Est. 3:40 PM</p>
            </div>
          </div>
        </div>
        
        <div class="driver-info" id="driver-info" style="display: none;">
          <h3>Your Driver</h3>
          <div class="driver-card">
            <img src="/images/driver-avatar.jpg" alt="Driver" class="driver-avatar">
            <div class="driver-details">
              <p class="driver-name">John Smith</p>
              <p class="driver-rating">★ 4.9 (342 deliveries)</p>
              <p class="vehicle-info">Honda Civic • ABC 123</p>
            </div>
            <button class="contact-driver-btn">📞 Call</button>
          </div>
        </div>
        
        <div class="estimated-arrival">
          <p>Estimated arrival in <span id="eta">25</span> minutes</p>
        </div>
      </div>
    </div>
    `;
  }

  /**
   * Build Delivery Map
   */
  buildDeliveryMap() {
    return `
    <div id="delivery-map" class="delivery-map" style="display: none;">
      <div class="map-header">
        <h2>Live Tracking</h2>
        <button class="close-map" onclick="closeMap()">×</button>
      </div>
      <div class="map-container">
        <svg class="map-svg" viewBox="0 0 400 300">
          <!-- Road -->
          <path d="M 50 50 L 350 50 L 350 250 L 50 250 Z" fill="#f0f0f0" stroke="#ddd" stroke-width="2"/>
          
          <!-- Roads -->
          <line x1="50" y1="100" x2="350" y2="100" stroke="#ddd" stroke-width="2"/>
          <line x1="50" y1="150" x2="350" y2="150" stroke="#ddd" stroke-width="2"/>
          <line x1="50" y1="200" x2="350" y2="200" stroke="#ddd" stroke-width="2"/>
          
          <!-- Restaurant marker -->
          <circle cx="80" cy="100" r="8" fill="#ff6b6b"/>
          <text x="80" y="130" text-anchor="middle" font-size="12">Restaurant</text>
          
          <!-- Delivery person -->
          <circle cx="200" cy="150" r="10" fill="#667eea" class="delivery-marker"/>
          <text x="200" y="180" text-anchor="middle" font-size="12">Driver</text>
          
          <!-- Destination marker -->
          <circle cx="330" cy="220" r="8" fill="#38ef7d"/>
          <text x="330" y="250" text-anchor="middle" font-size="12">Destination</text>
        </svg>
      </div>
      <div class="map-info">
        <p>Your order is <span id="delivery-distance">2.3 km</span> away</p>
      </div>
    </div>
    `;
  }

  /**
   * Get Base Styles
   */
  getBaseStyles() {
    return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary: #ff6b6b;
      --secondary: #ee5a6f;
      --accent: #ffd93d;
      --success: #38ef7d;
      --dark: #1a202c;
      --light: #f7fafc;
      --border: #e2e8f0;
      --text: #2d3748;
      --transition: all 0.3s ease;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: var(--text);
      background-color: #fff;
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    h1, h2, h3, h4, h5, h6 {
      font-weight: 700;
      line-height: 1.2;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: var(--dark);
    }

    section {
      padding: 2rem 0;
    }

    a {
      color: var(--primary);
      text-decoration: none;
      transition: var(--transition);
    }

    button {
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: var(--transition);
      border-radius: 8px;
    }

    svg {
      width: 100%;
      height: 100%;
    }
    `;
  }

  /**
   * Get Component Styles
   */
  getComponentStyles() {
    return `
    /* Search Bar */
    .search-bar-container {
      padding: 1rem 0;
      background: white;
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid var(--border);
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--light);
      border-radius: 25px;
      padding: 0.75rem 1.5rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .search-icon {
      width: 20px;
      height: 20px;
      color: #999;
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 1rem;
      outline: none;
    }

    .search-filters {
      background: transparent;
      border: none;
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
    }

    .search-filters-panel {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      padding: 1rem;
      background: var(--light);
      border-radius: 10px;
      margin-top: 1rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filter-group label {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .filter-slider,
    .filter-select {
      padding: 0.5rem;
      border: 1px solid var(--border);
      border-radius: 5px;
      font-size: 0.9rem;
    }

    /* Restaurant Cards */
    .restaurants-section {
      padding: 2rem 0;
    }

    .restaurants-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .restaurant-card {
      background: white;
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: var(--transition);
    }

    .restaurant-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .restaurant-image {
      position: relative;
      width: 100%;
      height: 180px;
      overflow: hidden;
      background: var(--border);
    }

    .restaurant-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .restaurant-card:hover .restaurant-image img {
      transform: scale(1.05);
    }

    .promo-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: var(--primary);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .restaurant-info {
      padding: 1rem;
    }

    .restaurant-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 0.5rem;
    }

    .restaurant-header h3 {
      font-size: 1.1rem;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      background: var(--accent);
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    .stars {
      color: #ff9800;
    }

    .cuisine {
      color: #999;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .restaurant-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: #666;
    }

    .reviews {
      font-size: 0.85rem;
      color: #999;
    }

    /* Menu Grid */
    .menu-section {
      position: relative;
      z-index: 50;
    }

    .back-btn {
      background: var(--light);
      border: 1px solid var(--border);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      margin-bottom: 1rem;
      cursor: pointer;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .menu-item {
      background: white;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      transition: var(--transition);
    }

    .menu-item:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transform: translateY(-3px);
    }

    .menu-item-image {
      position: relative;
      width: 100%;
      height: 150px;
      overflow: hidden;
      background: var(--border);
    }

    .menu-item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .menu-item-category {
      position: absolute;
      bottom: 8px;
      left: 8px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .menu-item-content {
      padding: 1rem;
    }

    .menu-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .menu-item-header h4 {
      font-size: 1rem;
    }

    .menu-item-rating {
      background: var(--accent);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    .menu-item-description {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 0.8rem;
    }

    .menu-item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .menu-item-price {
      font-weight: 700;
      color: var(--primary);
      font-size: 1.1rem;
    }

    .add-to-cart-btn {
      background: var(--primary);
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .add-to-cart-btn:hover {
      background: var(--secondary);
      transform: scale(1.1);
    }

    /* Cart Panel */
    .cart-panel {
      position: fixed;
      right: -400px;
      top: 0;
      width: 400px;
      height: 100vh;
      background: white;
      box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
      transition: right 0.3s ease;
      z-index: 200;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    .cart-panel.open {
      right: 0;
    }

    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid var(--border);
      background: var(--primary);
      color: white;
    }

    .close-cart {
      background: transparent;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .cart-items {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .empty-cart {
      text-align: center;
      color: #999;
      padding: 2rem;
    }

    .cart-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid var(--border);
      align-items: center;
    }

    .cart-item-info {
      flex: 1;
    }

    .cart-item-name {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .cart-item-price {
      color: var(--primary);
      font-weight: 700;
    }

    .cart-item-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .cart-item-controls button {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background: var(--light);
      border: 1px solid var(--border);
      cursor: pointer;
      font-weight: bold;
    }

    .cart-summary {
      padding: 1rem;
      border-top: 2px solid var(--border);
      background: var(--light);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .summary-row.total {
      font-weight: 700;
      font-size: 1.1rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--border);
      margin-top: 0.5rem;
    }

    .checkout-btn {
      width: calc(100% - 2rem);
      margin: 1rem;
      padding: 1rem;
      background: var(--primary);
      color: white;
      font-weight: 600;
      font-size: 1rem;
      border-radius: 8px;
    }

    .checkout-btn:hover {
      background: var(--secondary);
      transform: translateY(-2px);
    }

    .cart-toggle {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: var(--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
      z-index: 150;
      font-size: 1.5rem;
    }

    .cart-count {
      position: absolute;
      top: -5px;
      right: -5px;
      background: var(--accent);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
      color: #333;
    }

    /* Order Tracker */
    .order-tracker {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 15px;
      padding: 2rem;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      z-index: 300;
      max-height: 90vh;
      overflow-y: auto;
    }

    .tracker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .close-tracker {
      background: transparent;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .order-number {
      background: var(--light);
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .order-number p {
      margin: 0.25rem 0;
    }

    .order-number span {
      font-weight: 700;
      color: var(--primary);
    }

    .order-time {
      color: #999;
      font-size: 0.9rem;
    }

    .tracker-steps {
      display: flex;
      flex-direction: column;
      position: relative;
      margin-bottom: 1.5rem;
    }

    .tracker-steps::before {
      content: '';
      position: absolute;
      left: 20px;
      top: 30px;
      bottom: 0;
      width: 2px;
      background: var(--border);
    }

    .tracker-step {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      position: relative;
      z-index: 1;
    }

    .step-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--light);
      border: 2px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #999;
      flex-shrink: 0;
    }

    .tracker-step.completed .step-circle {
      background: var(--success);
      border-color: var(--success);
      color: white;
    }

    .tracker-step.active .step-circle {
      background: var(--primary);
      border-color: var(--primary);
      color: white;
    }

    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
    }

    .step-content {
      flex: 1;
    }

    .step-title {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .step-time {
      font-size: 0.85rem;
      color: #999;
    }

    .driver-info {
      background: var(--light);
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }

    .driver-info h3 {
      margin-bottom: 1rem;
    }

    .driver-card {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .driver-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }

    .driver-details {
      flex: 1;
    }

    .driver-name {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .driver-rating {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .vehicle-info {
      font-size: 0.85rem;
      color: #999;
    }

    .contact-driver-btn {
      background: white;
      border: 1px solid var(--border);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
    }

    .estimated-arrival {
      text-align: center;
      font-weight: 600;
      color: var(--primary);
      padding: 1rem;
      background: rgba(255, 107, 107, 0.1);
      border-radius: 8px;
    }

    /* Delivery Map */
    .delivery-map {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60vh;
      background: white;
      border-radius: 15px 15px 0 0;
      box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.1);
      z-index: 250;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .map-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--border);
    }

    .close-map {
      background: transparent;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .map-container {
      flex: 1;
      overflow: hidden;
    }

    .map-svg {
      width: 100%;
      height: 100%;
    }

    .delivery-marker {
      animation: pulse 2s ease-in-out infinite;
    }

    .map-info {
      padding: 1rem;
      text-align: center;
      background: var(--light);
      border-top: 1px solid var(--border);
    }

    /* Animations */
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes pulse {
      0%, 100% {
        r: 10px;
      }
      50% {
        r: 15px;
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .cart-panel {
        width: 100%;
        right: -100%;
      }

      .restaurants-grid {
        grid-template-columns: 1fr;
      }

      .menu-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }

      .order-tracker {
        width: 95%;
      }

      .delivery-map {
        height: 50vh;
      }
    }
    `;
  }

  /**
   * Get Layout-specific Styles
   */
  getLayoutStyles() {
    const layoutStyles = {
      'food-marketplace': `
        body {
          --primary: #ff6b6b;
          --secondary: #ee5a6f;
        }
        .restaurants-grid {
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
      `,
      'restaurant-view': `
        body {
          --primary: #ffa500;
          --secondary: #ff8c00;
        }
        .restaurants-section {
          background: var(--light);
        }
      `,
      'delivery-dashboard': `
        body {
          --primary: #4ecdc4;
          --secondary: #44a08d;
        }
        .tracker-step.active {
          background: rgba(78, 205, 196, 0.1);
        }
      `,
      'modern-food-app': `
        body {
          --primary: #667eea;
          --secondary: #764ba2;
        }
        .restaurant-card {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
      `,
      'minimal-food': `
        body {
          --primary: #2d3748;
          --secondary: #4a5568;
        }
        .restaurant-card {
          border: 1px solid var(--border);
        }
      `
    };

    return layoutStyles[this.config.layout] || layoutStyles['modern-food-app'];
  }

  /**
   * Get Core Scripts
   */
  getCoreScripts() {
    return `
    // Global State
    let appState = {
      cart: [],
      total: 0,
      selectedRestaurant: null,
      currentOrder: null
    };

    // Utility Functions
    function updateCartDisplay() {
      const cartCount = document.getElementById('cart-count');
      const cartItemsList = document.getElementById('cart-items-list');
      
      cartCount.textContent = appState.cart.length;
      
      if (appState.cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateCartTotal();
        return;
      }
      
      cartItemsList.innerHTML = appState.cart.map((item, idx) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">\$${item.price.toFixed(2)}</div>
          </div>
          <div class="cart-item-controls">
            <button onclick="removeFromCart(${idx})">−</button>
            <span style="margin: 0 0.5rem;">${item.quantity || 1}</span>
            <button onclick="addToCart({id: ${item.id}, name: '${item.name}', price: ${item.price}})">+</button>
          </div>
        </div>  `).join('');
      
      updateCartTotal();
    }

    function updateCartTotal() {
      const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      const deliveryFee = 2.99;
      const tax = subtotal * 0.1;
      const total = subtotal + deliveryFee + tax;
      
      document.getElementById('subtotal').textContent = '\$' + subtotal.toFixed(2);
      document.getElementById('tax').textContent = '\$' + tax.toFixed(2);
      document.getElementById('total').textContent = '\$' + total.toFixed(2);
    }

    function toggleCart() {
      const cartPanel = document.getElementById('cart-panel');
      cartPanel.classList.toggle('open');
    }

    function formatPrice(amount) {
      return '\$' + amount.toFixed(2);
    }

    document.addEventListener('DOMContentLoaded', function() {
      console.log('Food Delivery App initialized');
      updateCartDisplay();
    });
    `;
  }

  /**
   * Get State Management Scripts
   */
  getStateManagementScripts() {
    return `
    // Cart Management
    function addToCart(item) {
      const existingItem = appState.cart.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        appState.cart.push({...item, quantity: 1});
      }
      updateCartDisplay();
    }

    function removeFromCart(index) {
      const item = appState.cart[index];
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        appState.cart.splice(index, 1);
      }
      updateCartDisplay();
    }

    function clearCart() {
      appState.cart = [];
      updateCartDisplay();
    }

    // Restaurant Management
    function selectRestaurant(restaurantId) {
      appState.selectedRestaurant = restaurantId;
      document.getElementById('menu').style.display = 'block';
      document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' });
    }

    function closeMenu() {
      document.getElementById('menu').style.display = 'none';
    }
    `;
  }

  /**
   * Get Component Scripts
   */
  getComponentScripts() {
    return `
    // Search and Filter
    function handleSearch(query) {
      const restaurants = document.querySelectorAll('.restaurant-card');
      restaurants.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const cuisine = card.querySelector('.cuisine').textContent.toLowerCase();
        if (name.includes(query.toLowerCase()) || cuisine.includes(query.toLowerCase())) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function toggleFilters() {
      const filters = document.getElementById('search-filters');
      filters.style.display = filters.style.display === 'none' ? 'grid' : 'none';
    }

    // Menu Interactions
    document.querySelectorAll('.restaurant-card').forEach(card => {
      card.addEventListener('click', function() {
        const restaurantId = this.dataset.restaurantId;
        selectRestaurant(restaurantId);
      });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 100);
      });
    });
    `;
  }

  /**
   * Get Interaction Scripts
   */
  getInteractionScripts() {
    return `
    // Checkout Process
    function proceedToCheckout() {
      if (appState.cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      
      const orderId = Math.floor(Math.random() * 100000) + 1;
      appState.currentOrder = {
        id: orderId,
        items: [...appState.cart],
        timestamp: new Date(),
        total: parseFloat(document.getElementById('total').textContent.replace('\$', ''))
      };
      
      document.getElementById('order-id').textContent = orderId;
      document.getElementById('order-time').textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      document.getElementById('order-tracker').style.display = 'block';
      
      clearCart();
      toggleCart();
    }

    function closeTracker() {
      document.getElementById('order-tracker').style.display = 'none';
      document.getElementById('driver-info').style.display = 'none';
    }

    // Map Display
    function showDeliveryMap() {
      document.getElementById('delivery-map').style.display = 'flex';
    }

    function closeMap() {
      document.getElementById('delivery-map').style.display = 'none';
    }

    // Order Status Simulation
    function simulateOrderProgress() {
      const deliveryStep = document.getElementById('delivery-step');
      const driverInfo = document.getElementById('driver-info');
      
      setTimeout(() => {
        if (deliveryStep) {
          deliveryStep.classList.add('active');
          driverInfo.style.display = 'block';
        }
      }, 3000);
    }

    // Event Listeners
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    });
    `;
  }

  /**
   * Generate complete HTML document
   */
  generateHTML() {
    const header = `
    <header class="app-header">
      <div class="container">
        <h1>🍕 FoodHub Delivery</h1>
      </div>
    </header>
    `;

    const components = [
      this.components['searchBar'],
      this.components['restaurantCard'],
      this.components['menuGrid'],
      this.components['cartPanel'],
      this.components['orderTracker'],
      this.components['deliveryMap']
    ].join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.appData.title || 'Food Delivery App'}</title>
    <style>
      ${this.combineStyles()}
    </style>
</head>
<body>
    ${header}
    ${components}

    <script>
      ${this.combineScripts()}
    </script>
</body>
</html>`;
  }

  /**
   * Generate output package
   */
  generate() {
    this.validateConfig();
    const html = this.generateHTML();
    const css = this.combineStyles();
    const js = this.combineScripts();
    const metadata = {
      ...this.generateMetadata(),
      appType: this.config.appType,
      layout: this.config.layout,
      supportedApplications: this.supportedApplications,
      supportedLayouts: this.supportedLayouts,
      components: this.components,
      currency: this.config.currency
    };

    return { html, css, js, metadata };
  }
}

module.exports = FoodDeliveryGenerator;