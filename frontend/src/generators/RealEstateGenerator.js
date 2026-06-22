/**
 * RealEstateGenerator.js - AI-driven Real Estate UI Generator
 * Generates responsive property listing and marketplace interfaces
 * 
 * @extends BaseWebsiteGenerator
 * @version 1.0.0
 */

import BaseWebsiteGenerator from './BaseWebsiteGenerator.js';

class RealEstateGenerator extends BaseWebsiteGenerator {
  constructor(config = {}) {
    super(config);
    this.category = 'realEstate';
    this.websiteType = config.websiteType || 'real-estate';
    this.realEstateApp = config.realEstateApp || 'property-listing-platform'; // property-listing-platform, real-estate-marketplace
    this.layout = config.layout || 'marketplace'; // listing-platform, marketplace, luxury-real-estate, map-focused, minimal-real-estate
    this.components = config.components || [
      'propertyCard',
      'mapView',
      'filterPanel',
      'agentCard',
      'mortgageCalculator',
      'featuredProperties'
    ];
  }

  /**
   * Generate complete real estate website
   * @returns {string} Complete HTML structure
   */
  generate() {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.getPageTitle()}</title>
  <style>
    ${this.generateWebsiteCss()}
    ${this.generateRealEstateCss()}
  </style>
</head>
<body>
  <div class="website">
    ${this.generateNavigation()}
    ${this.generateHero()}
    ${this.generateMainContent()}
    ${this.generateTestimonials()}
    ${this.generateCTA()}
    ${this.generateFooter()}
  </div>
  <script>
    ${this.generateRealEstateJs()}
  </script>
</body>
</html>`;
    return html;
  }

  /**
   * Generate main content based on layout
   * @returns {string} HTML content
   */
  generateMainContent() {
    switch (this.layout) {
      case 'listing-platform':
        return this.generateListingPlatformLayout();
      case 'marketplace':
        return this.generateMarketplaceLayout();
      case 'luxury-real-estate':
        return this.generateLuxuryRealEstateLayout();
      case 'map-focused':
        return this.generateMapFocusedLayout();
      case 'minimal-real-estate':
        return this.generateMinimalRealEstateLayout();
      default:
        return this.generateMarketplaceLayout();
    }
  }

  /**
   * Listing Platform Layout - Property search focused
   */
  generateListingPlatformLayout() {
    return `
<section class="listing-platform">
  <div class="container">
    <h2>Find Your Dream Home</h2>
    ${this.generateAdvancedSearchForm()}
    <div class="listing-content">
      <div class="listings-main">
        ${this.generateFeaturedProperties()}
        ${this.generatePropertyListing()}
      </div>
      <aside class="listings-sidebar">
        ${this.generateFilterPanel()}
      </aside>
    </div>
  </div>
</section>
    `.trim();
  }

  /**
   * Marketplace Layout - Mixed property types
   */
  generateMarketplaceLayout() {
    return `
<section class="real-estate-marketplace">
  <div class="container">
    <div class="marketplace-header">
      <h2>Discover Properties</h2>
      <p>Browse thousands of properties from verified sellers</p>
    </div>
    ${this.generateSearchBar()}
    ${this.generateFeaturedProperties()}
    ${this.generatePropertyGrid()}
    ${this.generateAgentShowcase()}
  </div>
</section>
    `.trim();
  }

  /**
   * Luxury Real Estate Layout - Premium focus
   */
  generateLuxuryRealEstateLayout() {
    return `
<section class="luxury-real-estate">
  <div class="container">
    <div class="luxury-header">
      <h2>Luxury Properties & Exclusive Estates</h2>
      <p>Curated high-end residential properties for discerning buyers</p>
    </div>
    ${this.generateLuxuryHeroSearch()}
    ${this.generateLuxuryPropertyCards()}
    ${this.generateLuxuryAgents()}
  </div>
</section>
    `.trim();
  }

  /**
   * Map-Focused Layout - Interactive map prominent
   */
  generateMapFocusedLayout() {
    return `
<section class="map-focused-layout">
  <div class="map-container">
    ${this.generateMapView()}
  </div>
  <div class="map-sidebar">
    ${this.generateSearchBar()}
    ${this.generateFilterPanel()}
    <div class="map-results">
      <h3>Properties Near You</h3>
      ${this.generateCompactPropertyList()}
    </div>
  </div>
</section>
    `.trim();
  }

  /**
   * Minimal Real Estate Layout - Simple and clean
   */
  generateMinimalRealEstateLayout() {
    return `
<section class="minimal-real-estate">
  <div class="container">
    ${this.generateSearchBar()}
    <div class="minimal-content">
      ${this.generatePropertyGrid()}
    </div>
  </div>
</section>
    `.trim();
  }

  /**
   * Property Card Component
   */
  generatePropertyCard(property = null) {
    const defaults = {
      title: 'Modern Downtown Apartment',
      address: '123 Main St, Downtown',
      price: 450000,
      beds: 3,
      baths: 2,
      sqft: 1850,
      type: 'Apartment',
      featured: false,
      image: 'https://via.placeholder.com/300x200?text=Property',
      agent: 'John Smith',
      daysListed: 5
    };
    const data = { ...defaults, ...property };

    return `
<div class="property-card ${data.featured ? 'featured' : ''}">
  <div class="property-image">
    <img src="${data.image}" alt="${data.title}">
    ${data.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
    <span class="property-type">${data.type}</span>
    <span class="days-listed">${data.daysListed}d</span>
  </div>
  <div class="property-content">
    <h3 class="property-title">${data.title}</h3>
    <p class="property-address">📍 ${data.address}</p>
    <div class="property-specs">
      <span class="spec">🛏️ ${data.beds} Beds</span>
      <span class="spec">🚿 ${data.baths} Baths</span>
      <span class="spec">📐 ${data.sqft.toLocaleString()} sqft</span>
    </div>
    <div class="property-footer">
      <p class="property-price">$${data.price.toLocaleString()}</p>
      <button class="btn btn-primary btn-sm">View Details</button>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Generate multiple property cards
   */
  generatePropertyListing() {
    const properties = [
      { title: 'Cozy Suburban Home', address: '456 Oak Ave, Suburbia', price: 350000, beds: 4, baths: 2, sqft: 2200, type: 'House' },
      { title: 'Modern Penthouse', address: '789 Sky Tower, Downtown', price: 750000, beds: 3, baths: 3, sqft: 2500, type: 'Penthouse', featured: true },
      { title: 'Beachfront Villa', address: '321 Ocean Drive, Coastal', price: 1200000, beds: 5, baths: 4, sqft: 3500, type: 'Villa' },
      { title: 'Downtown Studio', address: '654 Center St, Urban', price: 280000, beds: 1, baths: 1, sqft: 600, type: 'Studio' }
    ];

    return `
<div class="properties-listing">
  <h3>Latest Listings</h3>
  <div class="listing-grid">
    ${properties.map(prop => this.generatePropertyCard(prop)).join('')}
  </div>
  <div class="pagination">
    <button class="btn btn-secondary">← Previous</button>
    <span class="page-info">Page 1 of 12</span>
    <button class="btn btn-primary">Next →</button>
  </div>
</div>
    `.trim();
  }

  /**
   * Property Grid Component
   */
  generatePropertyGrid() {
    const properties = [
      { title: 'Luxury Downtown Loft', address: '100 Main St', price: 550000, beds: 2, baths: 2, sqft: 1500, type: 'Loft' },
      { title: 'Family Home', address: '200 Elm St', price: 420000, beds: 4, baths: 2.5, sqft: 2400, type: 'House' },
      { title: 'Investment Property', address: '300 Pine Ave', price: 380000, beds: 2, baths: 1, sqft: 1200, type: 'Duplex' },
      { title: 'Modern Condo', address: '400 Maple Dr', price: 495000, beds: 3, baths: 2, sqft: 1800, type: 'Condo' },
      { title: 'Spacious Ranch', address: '500 Cedar Ln', price: 650000, beds: 5, baths: 3, sqft: 3200, type: 'House', featured: true },
      { title: 'City Apartment', address: '600 Birch St', price: 325000, beds: 1, baths: 1, sqft: 750, type: 'Apartment' },
      { title: 'Waterfront Property', address: '700 Riverside Rd', price: 925000, beds: 4, baths: 3, sqft: 2800, type: 'Villa' },
      { title: 'New Construction', address: '800 Harbor Ave', price: 499000, beds: 3, baths: 2, sqft: 1900, type: 'House' }
    ];

    return `
<div class="property-grid">
  ${properties.map(prop => this.generatePropertyCard(prop)).join('')}
</div>
    `.trim();
  }

  /**
   * Map View Component
   */
  generateMapView() {
    return `
<div class="map-view">
  <svg viewBox="0 0 1200 600" style="width: 100%; height: 100%;">
    <!-- Map background -->
    <rect width="1200" height="600" fill="#e8f4f8"/>
    
    <!-- Grid lines -->
    <line x1="0" y1="300" x2="1200" y2="300" stroke="#d0e8f2" stroke-width="1"/>
    <line x1="600" y1="0" x2="600" y2="600" stroke="#d0e8f2" stroke-width="1"/>
    
    <!-- Property markers -->
    <g class="property-markers">
      <circle cx="150" cy="150" r="20" fill="#667eea" opacity="0.8" class="marker" data-price="450000"/>
      <circle cx="350" cy="200" r="20" fill="#10b981" opacity="0.8" class="marker" data-price="380000"/>
      <circle cx="550" cy="100" r="20" fill="#667eea" opacity="0.8" class="marker" data-price="525000"/>
      <circle cx="800" cy="250" r="20" fill="#f59e0b" opacity="0.8" class="marker" data-price="750000"/>
      <circle cx="950" cy="350" r="20" fill="#10b981" opacity="0.8" class="marker" data-price="420000"/>
      <circle cx="250" cy="450" r="20" fill="#667eea" opacity="0.8" class="marker" data-price="325000"/>
      <circle cx="700" cy="500" r="20" fill="#f59e0b" opacity="0.8" class="marker" data-price="650000"/>
      <circle cx="1050" cy="150" r="20" fill="#10b981" opacity="0.8" class="marker" data-price="495000"/>
    </g>
    
    <!-- Map labels -->
    <text x="100" y="30" font-size="16" font-weight="bold" fill="#333">Downtown</text>
    <text x="900" y="580" font-size="16" font-weight="bold" fill="#333">Suburbs</text>
  </svg>
  <div class="map-overlay">
    <p class="map-hint">Click on markers to view properties</p>
  </div>
</div>
    `.trim();
  }

  /**
   * Filter Panel Component
   */
  generateFilterPanel() {
    return `
<div class="filter-panel">
  <div class="panel-header">
    <h3>Filters</h3>
    <button class="reset-filters">Reset</button>
  </div>
  
  <div class="filter-group">
    <h4>Price Range</h4>
    <div class="price-inputs">
      <input type="number" placeholder="Min" value="200000" min="0">
      <span>-</span>
      <input type="number" placeholder="Max" value="1000000" min="0">
    </div>
    <input type="range" min="200000" max="1000000" value="500000" class="price-slider">
  </div>

  <div class="filter-group">
    <h4>Property Type</h4>
    <label><input type="checkbox" checked> House</label>
    <label><input type="checkbox"> Apartment</label>
    <label><input type="checkbox"> Condo</label>
    <label><input type="checkbox"> Villa</label>
    <label><input type="checkbox"> Townhouse</label>
  </div>

  <div class="filter-group">
    <h4>Bedrooms</h4>
    <div class="bedroom-buttons">
      <button class="bed-btn">Any</button>
      <button class="bed-btn">1</button>
      <button class="bed-btn" data-beds="2">2</button>
      <button class="bed-btn" data-beds="3">3</button>
      <button class="bed-btn" data-beds="4+">4+</button>
    </div>
  </div>

  <div class="filter-group">
    <h4>Bathrooms</h4>
    <div class="bathroom-buttons">
      <button class="bath-btn">Any</button>
      <button class="bath-btn">1</button>
      <button class="bath-btn">2</button>
      <button class="bath-btn">3+</button>
    </div>
  </div>

  <div class="filter-group">
    <h4>Square Footage</h4>
    <div class="sqft-inputs">
      <input type="number" placeholder="Min sqft" value="500">
      <span>-</span>
      <input type="number" placeholder="Max sqft" value="5000">
    </div>
  </div>

  <div class="filter-group">
    <h4>Features</h4>
    <label><input type="checkbox"> Swimming Pool</label>
    <label><input type="checkbox"> Garage</label>
    <label><input type="checkbox"> Garden</label>
    <label><input type="checkbox"> Balcony</label>
    <label><input type="checkbox"> Fireplace</label>
  </div>

  <button class="btn btn-primary btn-full">Apply Filters</button>
</div>
    `.trim();
  }

  /**
   * Agent Card Component
   */
  generateAgentCard(agent = null) {
    const defaults = {
      name: 'Sarah Johnson',
      specialty: 'Luxury Homes',
      photo: 'https://via.placeholder.com/120x120?text=Agent',
      rating: 4.9,
      reviews: 127,
      properties: 24,
      phone: '(555) 123-4567',
      email: 'sarah@realestate.com'
    };
    const data = { ...defaults, ...agent };

    return `
<div class="agent-card">
  <div class="agent-header">
    <img src="${data.photo}" alt="${data.name}" class="agent-photo">
    <div class="agent-info">
      <h3>${data.name}</h3>
      <p class="agent-specialty">${data.specialty}</p>
      <div class="agent-rating">
        <span class="stars">⭐ ${data.rating}</span>
        <span class="reviews">(${data.reviews} reviews)</span>
      </div>
    </div>
  </div>
  <div class="agent-stats">
    <div class="stat">
      <p class="stat-value">${data.properties}</p>
      <p class="stat-label">Properties</p>
    </div>
    <div class="stat">
      <p class="stat-value">${data.rating}</p>
      <p class="stat-label">Rating</p>
    </div>
    <div class="stat">
      <p class="stat-value">${data.reviews}</p>
      <p class="stat-label">Reviews</p>
    </div>
  </div>
  <div class="agent-contact">
    <button class="btn btn-primary btn-sm btn-full">Contact Agent</button>
    <a href="tel:${data.phone}" class="btn btn-secondary btn-sm btn-full">Call: ${data.phone}</a>
  </div>
</div>
    `.trim();
  }

  /**
   * Mortgage Calculator Component
   */
  generateMortgageCalculator() {
    return `
<div class="mortgage-calculator">
  <div class="calc-header">
    <h3>Mortgage Calculator</h3>
  </div>
  <div class="calc-form">
    <div class="form-group">
      <label for="homePrice">Home Price</label>
      <input type="number" id="homePrice" placeholder="$500,000" value="500000" min="0">
    </div>
    <div class="form-group">
      <label for="downPayment">Down Payment (%)</label>
      <input type="number" id="downPayment" placeholder="20" value="20" min="0" max="100">
    </div>
    <div class="form-group">
      <label for="interestRate">Interest Rate (%)</label>
      <input type="number" id="interestRate" placeholder="6.5" value="6.5" min="0" step="0.1">
    </div>
    <div class="form-group">
      <label for="loanTerm">Loan Term (years)</label>
      <select id="loanTerm">
        <option value="15">15 years</option>
        <option value="20">20 years</option>
        <option value="30" selected>30 years</option>
      </select>
    </div>
    <button class="btn btn-primary btn-full">Calculate</button>
  </div>
  <div class="calc-results">
    <div class="result-item">
      <p class="result-label">Monthly Payment</p>
      <p class="result-value" id="monthlyPayment">$3,184</p>
    </div>
    <div class="result-item">
      <p class="result-label">Total Interest</p>
      <p class="result-value" id="totalInterest">$346,410</p>
    </div>
    <div class="result-item">
      <p class="result-label">Total Amount</p>
      <p class="result-value" id="totalAmount">$846,410</p>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Featured Properties Component
   */
  generateFeaturedProperties() {
    return `
<div class="featured-section">
  <h3>Featured Properties</h3>
  <div class="featured-carousel">
    <div class="featured-card">
      <div class="featured-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <span class="featured-price">$1,250,000</span>
      </div>
      <div class="featured-info">
        <h4>Luxury Waterfront Estate</h4>
        <p class="featured-address">📍 Beachfront, Coastal Town</p>
        <p class="featured-details">5 Beds • 4 Baths • 3,200 sqft</p>
        <button class="btn btn-primary btn-sm">View More</button>
      </div>
    </div>
    <div class="featured-card">
      <div class="featured-image" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
        <span class="featured-price">$750,000</span>
      </div>
      <div class="featured-info">
        <h4>Modern Downtown Penthouse</h4>
        <p class="featured-address">📍 Downtown, City Center</p>
        <p class="featured-details">3 Beds • 3 Baths • 2,500 sqft</p>
        <button class="btn btn-primary btn-sm">View More</button>
      </div>
    </div>
    <div class="featured-card">
      <div class="featured-image" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
        <span class="featured-price">$520,000</span>
      </div>
      <div class="featured-info">
        <h4>Contemporary Family Home</h4>
        <p class="featured-address">📍 Suburban, Green Valley</p>
        <p class="featured-details">4 Beds • 2.5 Baths • 2,300 sqft</p>
        <button class="btn btn-primary btn-sm">View More</button>
      </div>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Agent Showcase Component
   */
  generateAgentShowcase() {
    const agents = [
      { name: 'Sarah Johnson', specialty: 'Luxury Homes', rating: 4.9, reviews: 127, properties: 24 },
      { name: 'Michael Chen', specialty: 'First-Time Buyers', rating: 4.8, reviews: 95, properties: 18 },
      { name: 'Emma Wilson', specialty: 'Investment Properties', rating: 4.95, reviews: 156, properties: 32 },
      { name: 'James Martinez', specialty: 'Commercial Real Estate', rating: 4.7, reviews: 83, properties: 15 }
    ];

    return `
<div class="agents-section">
  <h3>Meet Our Top Agents</h3>
  <div class="agents-grid">
    ${agents.map(agent => this.generateAgentCard(agent)).join('')}
  </div>
</div>
    `.trim();
  }

  /**
   * Advanced Search Form Component
   */
  generateAdvancedSearchForm() {
    return `
<div class="advanced-search">
  <form class="search-form" id="advancedSearchForm">
    <div class="search-row">
      <div class="search-group">
        <input type="text" placeholder="Enter location or zip code" required>
      </div>
      <div class="search-group">
        <select required>
          <option>All Property Types</option>
          <option>House</option>
          <option>Apartment</option>
          <option>Condo</option>
          <option>Villa</option>
        </select>
      </div>
      <div class="search-group">
        <input type="number" placeholder="Min Price" min="0">
      </div>
      <div class="search-group">
        <input type="number" placeholder="Max Price" min="0">
      </div>
      <button type="submit" class="btn btn-primary btn-lg">Search</button>
    </div>
  </form>
</div>
    `.trim();
  }

  /**
   * Search Bar Component
   */
  generateSearchBar() {
    return `
<div class="search-bar-section">
  <div class="search-bar">
    <input type="text" placeholder="🔍 Search by location, address, or zip..." class="search-bar-input">
    <button class="btn btn-primary">Search</button>
  </div>
</div>
    `.trim();
  }

  /**
   * Luxury Header Search Component
   */
  generateLuxuryHeroSearch() {
    return `
<div class="luxury-search">
  <h3>Find Your Perfect Property</h3>
  <form class="luxury-search-form" id="luxurySearchForm">
    <div class="search-inputs">
      <input type="text" placeholder="Location" required>
      <select required>
        <option>Buy</option>
        <option>Rent</option>
      </select>
      <input type="number" placeholder="Min Price" min="0">
      <input type="number" placeholder="Max Price" min="0">
      <button type="submit" class="btn btn-primary btn-lg">Search Properties</button>
    </div>
  </form>
</div>
    `.trim();
  }

  /**
   * Luxury Property Cards Component
   */
  generateLuxuryPropertyCards() {
    const luxuryProperties = [
      { title: 'Grand Estate Mansion', address: 'Beverly Hills, CA', price: 4500000, beds: 8, baths: 6, sqft: 5500, featured: true },
      { title: 'Oceanfront Palace', address: 'Malibu, CA', price: 3800000, beds: 7, baths: 5, sqft: 4200, featured: true },
      { title: 'Modern Architectural Masterpiece', address: 'Hollywood Hills, CA', price: 2900000, beds: 6, baths: 4, sqft: 3800 },
      { title: 'Exclusive Gated Compound', address: 'Bel Air, CA', price: 5200000, beds: 9, baths: 7, sqft: 6000 }
    ];

    return `
<div class="luxury-properties">
  <div class="luxury-grid">
    ${luxuryProperties.map(prop => this.generatePropertyCard(prop)).join('')}
  </div>
</div>
    `.trim();
  }

  /**
   * Luxury Agents Component
   */
  generateLuxuryAgents() {
    const luxuryAgents = [
      { name: 'Victoria Sterling', specialty: 'Ultra-Luxury Estates', rating: 5.0, reviews: 234, properties: 45, phone: '(555) 001-0001' },
      { name: 'Alexander Rothschild', specialty: 'Celebrity Homes', rating: 4.98, reviews: 189, properties: 38, phone: '(555) 001-0002' },
      { name: 'Isabella Monaco', specialty: 'International Properties', rating: 4.97, reviews: 167, properties: 52, phone: '(555) 001-0003' }
    ];

    return `
<div class="luxury-agents">
  <h3>Luxury Property Specialists</h3>
  <div class="luxury-agents-grid">
    ${luxuryAgents.map(agent => this.generateAgentCard(agent)).join('')}
  </div>
</div>
    `.trim();
  }

  /**
   * Compact Property List Component
   */
  generateCompactPropertyList() {
    const properties = [
      { title: 'Downtown Loft', price: 450000, beds: 2, baths: 1 },
      { title: 'Family Home', price: 520000, beds: 4, baths: 2 },
      { title: 'Beachfront Villa', price: 950000, beds: 5, baths: 3 },
      { title: 'City Apartment', price: 380000, beds: 2, baths: 1 }
    ];

    return `
<div class="compact-list">
  ${properties.map(prop => `
    <div class="compact-item">
      <div class="item-info">
        <p class="item-title">${prop.title}</p>
        <span class="item-specs">${prop.beds}bd • ${prop.baths}ba</span>
      </div>
      <p class="item-price">$${prop.price.toLocaleString()}</p>
    </div>
  `).join('')}
</div>
    `.trim();
  }

  /**
   * Get navigation items
   */
  getNavItems() {
    return [
      { href: '#buy', label: 'Buy' },
      { href: '#rent', label: 'Rent' },
      { href: '#agents', label: 'Agents' },
      { href: '#about', label: 'About' }
    ];
  }

  /**
   * Get logo text
   */
  getLogoText() {
    return '🏠 RealEstate Pro';
  }

  /**
   * Get hero title
   */
  getHeroTitle() {
    return 'Find Your Perfect Property';
  }

  /**
   * Get hero subtitle
   */
  getHeroSubtitle() {
    return 'Browse thousands of properties and connect with top real estate agents';
  }

  /**
   * Get features specific to real estate
   */
  getFeatures() {
    return [
      { icon: '🏠', title: 'Wide Selection', description: 'Thousands of properties to choose from' },
      { icon: '🗺️', title: 'Interactive Maps', description: 'Explore neighborhoods with detailed maps' },
      { icon: '👥', title: 'Expert Agents', description: 'Connect with verified real estate professionals' },
      { icon: '💰', title: 'Mortgage Tools', description: 'Calculate payments and financing options' },
      { icon: '📱', title: 'Mobile Friendly', description: 'Search properties on any device' },
      { icon: '🔒', title: 'Safe & Secure', description: 'Verified listings and protected transactions' }
    ];
  }

  /**
   * Generate page title
   */
  getPageTitle() {
    const titles = {
      'property-listing-platform': '🏠 Property Listing Platform',
      'real-estate-marketplace': '🏠 Real Estate Marketplace'
    };
    return titles[this.realEstateApp] || '🏠 Real Estate Pro';
  }

  /**
   * Generate real estate-specific CSS
   */
  generateRealEstateCss() {
    return `
/* Real Estate Generator Specific Styles */

/* Listing Platform */
.listing-platform {
  padding: 4rem 2rem;
  background: #f9fafb;
}

.listing-platform h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: ${this.theme.text};
}

.listing-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin-top: 2rem;
}

.listings-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 1024px) {
  .listing-content {
    grid-template-columns: 1fr;
  }
  
  .listings-sidebar {
    order: -1;
  }
}

/* Real Estate Marketplace */
.real-estate-marketplace {
  padding: 4rem 2rem;
}

.marketplace-header {
  text-align: center;
  margin-bottom: 3rem;
}

.marketplace-header h2 {
  font-size: 2.5rem;
  color: ${this.theme.text};
  margin-bottom: 0.5rem;
}

.marketplace-header p {
  font-size: 1.1rem;
  color: #6b7280;
}

/* Luxury Real Estate */
.luxury-real-estate {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea08 0%, #764ba208 100%);
}

.luxury-header {
  text-align: center;
  margin-bottom: 3rem;
}

.luxury-header h2 {
  font-size: 2.5rem;
  color: ${this.theme.text};
  margin-bottom: 0.5rem;
}

.luxury-header p {
  font-size: 1.1rem;
  color: #6b7280;
}

/* Map Focused Layout */
.map-focused-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  height: calc(100vh - 300px);
  gap: 0;
}

.map-container {
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.map-view {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.map-hint {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

.map-sidebar {
  background: ${this.theme.surface};
  border-left: 1px solid #e5e7eb;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.map-results {
  flex: 1;
  overflow-y: auto;
}

.map-results h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: ${this.theme.text};
}

@media (max-width: 1024px) {
  .map-focused-layout {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .map-sidebar {
    border-left: none;
    border-top: 1px solid #e5e7eb;
    max-height: 400px;
  }
}

/* Minimal Real Estate */
.minimal-real-estate {
  padding: 3rem 2rem;
}

.minimal-content {
  max-width: 1200px;
  margin: 2rem auto 0;
}

/* Property Grid */
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* Property Card */
.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.property-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

.property-card.featured {
  border: 2px solid ${this.theme.primary};
}

.property-image {
  height: 200px;
  position: relative;
  background: #e5e7eb;
  overflow: hidden;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.property-card:hover .property-image img {
  transform: scale(1.05);
}

.featured-badge,
.property-type,
.days-listed {
  position: absolute;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 6px;
  background: white;
  color: ${this.theme.text};
}

.featured-badge {
  top: 12px;
  left: 12px;
  background: ${this.theme.primary};
  color: white;
}

.property-type {
  bottom: 12px;
  left: 12px;
  background: #f3f4f6;
}

.days-listed {
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
}

.property-content {
  padding: 1.5rem;
}

.property-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
}

.property-address {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.property-specs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.spec {
  font-size: 0.9rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.35rem 0.65rem;
  border-radius: 4px;
}

.property-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.property-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: ${this.theme.primary};
}

/* Map View */
.map-view svg {
  width: 100%;
  height: 100%;
  background: #e8f4f8;
}

.marker {
  cursor: pointer;
  transition: all 0.2s ease;
}

.marker:hover {
  r: 25;
  opacity: 1;
}

/* Filter Panel */
.filter-panel {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  position: sticky;
  top: 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.panel-header h3 {
  font-size: 1.1rem;
  color: ${this.theme.text};
}

.reset-filters {
  background: none;
  border: none;
  color: ${this.theme.primary};
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.reset-filters:hover {
  text-decoration: underline;
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
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${this.theme.text};
}

.filter-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0;
  cursor: pointer;
  font-size: 0.9rem;
  color: #6b7280;
}

.filter-group input[type="checkbox"],
.filter-group input[type="radio"] {
  cursor: pointer;
}

.price-inputs,
.sqft-inputs {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
}

.price-inputs input,
.sqft-inputs input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
}

.price-slider {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #e5e7eb;
  outline: none;
  -webkit-appearance: none;
}

.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${this.theme.primary};
  cursor: pointer;
}

.price-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${this.theme.primary};
  cursor: pointer;
  border: none;
}

.bedroom-buttons,
.bathroom-buttons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.bed-btn,
.bath-btn {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.bed-btn:hover,
.bath-btn:hover {
  border-color: ${this.theme.primary};
  color: ${this.theme.primary};
}

/* Agent Card */
.agent-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.agent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.agent-header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  text-align: left;
}

.agent-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.agent-info h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${this.theme.text};
}

.agent-specialty {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.agent-rating {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.85rem;
}

.stars {
  font-weight: 600;
  color: ${this.theme.primary};
}

.reviews {
  color: #6b7280;
}

.agent-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: ${this.theme.primary};
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #6b7280;
}

.agent-contact {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Mortgage Calculator */
.mortgage-calculator {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
}

.calc-header {
  margin-bottom: 1.5rem;
}

.calc-header h3 {
  font-size: 1.3rem;
  color: ${this.theme.text};
  margin: 0;
}

.calc-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: ${this.theme.primary};
  box-shadow: 0 0 0 3px ${this.theme.primary}20;
}

.calc-results {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
}

.result-item {
  text-align: center;
}

.result-label {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.result-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: ${this.theme.primary};
}

/* Featured Properties */
.featured-section {
  margin-bottom: 2rem;
}

.featured-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${this.theme.text};
}

.featured-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.featured-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.featured-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}

.featured-image {
  height: 200px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
}

.featured-price {
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${this.theme.primary};
}

.featured-info {
  background: white;
  padding: 1.5rem;
}

.featured-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
}

.featured-address {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.featured-details {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

/* Agents Grid */
.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.luxury-agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Search Bar */
.search-bar-section {
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.search-bar-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
}

/* Advanced Search */
.advanced-search {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: flex-end;
}

.search-group {
  display: flex;
  flex-direction: column;
}

.search-group input,
.search-group select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

/* Luxury Search */
.luxury-search {
  text-align: center;
  margin-bottom: 3rem;
}

.luxury-search h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${this.theme.text};
}

.luxury-search-form {
  display: flex;
  justify-content: center;
}

.search-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 800px;
}

.search-inputs input,
.search-inputs select {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

/* Compact List */
.compact-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.compact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f3f4f6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.compact-item:hover {
  background: #e5e7eb;
}

.item-info {
  flex: 1;
}

.item-title {
  font-weight: 600;
  color: ${this.theme.text};
  margin: 0;
  font-size: 0.95rem;
}

.item-specs {
  font-size: 0.8rem;
  color: #6b7280;
}

.item-price {
  font-weight: 700;
  color: ${this.theme.primary};
  min-width: 100px;
  text-align: right;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.page-info {
  color: #6b7280;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .property-grid {
    grid-template-columns: 1fr;
  }

  .agents-grid {
    grid-template-columns: 1fr;
  }

  .calc-results {
    grid-template-columns: 1fr;
  }

  .search-row {
    grid-template-columns: 1fr;
  }

  .search-bar {
    flex-direction: column;
  }

  .search-inputs {
    grid-template-columns: 1fr;
  }

  .listing-content {
    grid-template-columns: 1fr;
  }

  .agent-header {
    flex-direction: column;
    text-align: center;
  }
}

    `.trim();
  }

  /**
   * Generate real estate-specific JavaScript
   */
  generateRealEstateJs() {
    return `
// Real Estate Generator JavaScript
class RealEstateApp {
  constructor() {
    this.setupEventListeners();
    this.mortgageData = {
      homePrice: 500000,
      downPayment: 20,
      interestRate: 6.5,
      loanTerm: 30
    };
  }

  setupEventListeners() {
    // Property search
    const advancedSearchForm = document.getElementById('advancedSearchForm');
    if (advancedSearchForm) {
      advancedSearchForm.addEventListener('submit', (e) => this.handlePropertySearch(e));
    }

    // Luxury search form
    const luxurySearchForm = document.getElementById('luxurySearchForm');
    if (luxurySearchForm) {
      luxurySearchForm.addEventListener('submit', (e) => this.handleLuxurySearch(e));
    }

    // Property cards
    document.querySelectorAll('.property-card').forEach(card => {
      card.addEventListener('click', (e) => this.handlePropertyCardClick(e));
    });

    // Filter buttons
    document.querySelectorAll('.bed-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleBedroomFilter(e));
    });

    document.querySelectorAll('.bath-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleBathroomFilter(e));
    });

    // Mortgage calculator
    const homePrice = document.getElementById('homePrice');
    const downPayment = document.getElementById('downPayment');
    const interestRate = document.getElementById('interestRate');
    const loanTerm = document.getElementById('loanTerm');

    if (homePrice) {
      homePrice.addEventListener('change', () => this.calculateMortgage());
      downPayment.addEventListener('change', () => this.calculateMortgage());
      interestRate.addEventListener('change', () => this.calculateMortgage());
      loanTerm.addEventListener('change', () => this.calculateMortgage());

      // Initial calculation
      this.calculateMortgage();
    }

    // Map markers
    document.querySelectorAll('.marker').forEach(marker => {
      marker.addEventListener('click', (e) => this.handleMarkerClick(e));
    });

    // Agent contact
    document.querySelectorAll('.agent-card .btn-primary').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleAgentContact(e));
    });

    // Search bar
    const searchBar = document.querySelector('.search-bar-input');
    if (searchBar) {
      searchBar.addEventListener('input', (e) => this.handleSearchInput(e));
    }
  }

  handlePropertySearch(e) {
    e.preventDefault();
    console.log('Property search initiated');
    alert('Searching for properties...');
  }

  handleLuxurySearch(e) {
    e.preventDefault();
    console.log('Luxury property search initiated');
    alert('Searching luxury properties...');
  }

  handlePropertyCardClick(e) {
    const card = e.currentTarget;
    const title = card.querySelector('.property-title').textContent;
    const price = card.querySelector('.property-price').textContent;
    console.log('Selected:', title, price);
    alert(\`Viewing details for: \${title}\`);
  }

  handleBedroomFilter(e) {
    document.querySelectorAll('.bed-btn').forEach(btn => btn.style.background = '');
    e.target.style.background = \`\${this.getPrimaryColor()}20\`;
    console.log('Bedroom filter applied');
  }

  handleBathroomFilter(e) {
    document.querySelectorAll('.bath-btn').forEach(btn => btn.style.background = '');
    e.target.style.background = \`\${this.getPrimaryColor()}20\`;
    console.log('Bathroom filter applied');
  }

  calculateMortgage() {
    const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
    const downPaymentPercent = parseFloat(document.getElementById('downPayment').value) || 0;
    const annualRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const years = parseInt(document.getElementById('loanTerm').value) || 30;

    const principal = homePrice * (1 - downPaymentPercent / 100);
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - principal;

    // Update results
    const monthlyPaymentEl = document.getElementById('monthlyPayment');
    const totalInterestEl = document.getElementById('totalInterest');
    const totalAmountEl = document.getElementById('totalAmount');

    if (monthlyPaymentEl) {
      monthlyPaymentEl.textContent = '$' + monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 });
      totalInterestEl.textContent = '$' + totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 });
      totalAmountEl.textContent = '$' + totalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
  }

  handleMarkerClick(e) {
    const marker = e.target;
    const price = marker.dataset.price;
    console.log('Property price:', price);
    alert(\`Property price: \$\${parseInt(price).toLocaleString()}\`);
  }

  handleAgentContact(e) {
    e.preventDefault();
    const agentName = e.target.closest('.agent-card').querySelector('h3').textContent;
    console.log('Contacting agent:', agentName);
    alert(\`Connecting with \${agentName}...\`);
  }

  handleSearchInput(e) {
    const query = e.target.value.toLowerCase();
    console.log('Searching:', query);
    // Filter properties based on search query
    document.querySelectorAll('.property-card').forEach(card => {
      const title = card.querySelector('.property-title').textContent.toLowerCase();
      const address = card.querySelector('.property-address').textContent.toLowerCase();
      const matches = title.includes(query) || address.includes(query);
      card.style.display = matches ? 'block' : 'none';
    });
  }

  getPrimaryColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#667eea';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RealEstateApp();
});
    `.trim();
  }

  /**
   * Get metadata for the generated UI
   */
  getMetadata() {
    return {
      generator: 'RealEstateGenerator',
      version: '1.0.0',
      category: 'realEstate',
      realEstateApp: this.realEstateApp,
      layout: this.layout,
      components: this.components,
      theme: this.theme,
      responsive: true,
      accessible: true,
      supportedApps: [
        'Property Listing Platform',
        'Real Estate Marketplace'
      ],
      availableComponents: [
        'propertyCard',
        'mapView',
        'filterPanel',
        'agentCard',
        'mortgageCalculator',
        'featuredProperties'
      ],
      supportedLayouts: [
        'listing-platform',
        'marketplace',
        'luxury-real-estate',
        'map-focused',
        'minimal-real-estate'
      ],
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Generate standalone CSS file
   */
  generateStandaloneCss() {
    return \`\${this.generateWebsiteCss()}\n\n\${this.generateRealEstateCss()}\`;
  }

  /**
   * Generate standalone HTML file (complete)
   */
  generateStandaloneHtml() {
    return this.generate();
  }

  /**
   * Generate standalone JS file (complete)
   */
  generateStandaloneJs() {
    return this.generateRealEstateJs();
  }

  /**
   * Generate metadata JSON
   */
  generateMetadataJson() {
    return JSON.stringify(this.getMetadata(), null, 2);
  }
}

export default RealEstateGenerator;
  
