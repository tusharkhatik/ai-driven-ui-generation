/**
 * TravelGenerator.js - AI-driven Travel UI Generator
 * Generates responsive travel and booking interfaces
 * 
 * @extends BaseWebsiteGenerator
 * @version 1.0.0
 */

import BaseWebsiteGenerator from './BaseWebsiteGenerator.js';

class TravelGenerator extends BaseWebsiteGenerator {
  constructor(config = {}) {
    super(config);
    this.category = 'travel';
    this.websiteType = config.websiteType || 'travel';
    this.travelApp = config.travelApp || 'travel-planner'; // hotel-booking, travel-planner, flight-booking
    this.layout = config.layout || 'travel-marketplace'; // booking-platform, travel-marketplace, destination-showcase, luxury-travel, minimal-travel
    this.components = config.components || [
      'hotelCard',
      'destinationGrid',
      'bookingForm',
      'priceComparison',
      'tripTimeline',
      'flightSearch'
    ];
  }

  /**
   * Generate complete travel website
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
    ${this.generateTravelCss()}
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
    ${this.generateTravelJs()}
  </script>
</body>
</html>`;
    return html;
  }

  /**
   * Generate main content based on layout and app type
   * @returns {string} HTML content
   */
  generateMainContent() {
    switch (this.layout) {
      case 'booking-platform':
        return this.generateBookingPlatformLayout();
      case 'travel-marketplace':
        return this.generateTravelMarketplaceLayout();
      case 'destination-showcase':
        return this.generateDestinationShowcaseLayout();
      case 'luxury-travel':
        return this.generateLuxuryTravelLayout();
      case 'minimal-travel':
        return this.generateMinimalTravelLayout();
      default:
        return this.generateTravelMarketplaceLayout();
    }
  }

  /**
   * Booking Platform Layout - Focused on hotel/flight searches
   */
  generateBookingPlatformLayout() {
    return `
<section class="booking-platform">
  <div class="container">
    <h2>Find Your Perfect Trip</h2>
    ${this.generateFlightSearch()}
    ${this.generateBookingForm()}
    <div class="quick-filters">
      <button class="filter-btn active">Hotels</button>
      <button class="filter-btn">Flights</button>
      <button class="filter-btn">Packages</button>
    </div>
    ${this.generatePriceComparison()}
  </div>
</section>
    `.trim();
  }

  /**
   * Travel Marketplace Layout - Multiple destinations and offers
   */
  generateTravelMarketplaceLayout() {
    return `
<section class="travel-marketplace">
  <div class="container">
    <div class="marketplace-header">
      <h2>Explore Amazing Destinations</h2>
      <p>Discover handpicked trips from around the world</p>
    </div>
    ${this.generateDestinationGrid()}
    ${this.generateHotelCards()}
    ${this.generateSpecialOffers()}
  </div>
</section>
    `.trim();
  }

  /**
   * Destination Showcase Layout - Feature destinations
   */
  generateDestinationShowcaseLayout() {
    return `
<section class="destination-showcase">
  <div class="showcase-hero">
    <div class="showcase-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <h2>Top Destinations This Season</h2>
    </div>
  </div>
  <div class="container">
    ${this.generateDestinationGrid()}
    ${this.generateTripTimeline()}
    ${this.generatePriceComparison()}
  </div>
</section>
    `.trim();
  }

  /**
   * Luxury Travel Layout - Premium experience focus
   */
  generateLuxuryTravelLayout() {
    return `
<section class="luxury-travel">
  <div class="container">
    <div class="luxury-header">
      <h2>Luxury Getaways & Exclusive Experiences</h2>
      <p>Curated premium travel experiences for discerning travelers</p>
    </div>
    ${this.generateLuxuryHotels()}
    ${this.generateTripTimeline()}
    <div class="concierge-section">
      <h3>Personal Concierge Service</h3>
      <p>Let our experts plan your perfect journey</p>
      <button class="btn btn-primary btn-lg">Book a Consultation</button>
    </div>
  </div>
</section>
    `.trim();
  }

  /**
   * Minimal Travel Layout - Clean and simple design
   */
  generateMinimalTravelLayout() {
    return `
<section class="minimal-travel">
  <div class="container">
    ${this.generateBookingForm()}
    <div class="minimal-destinations">
      <h3>Popular Destinations</h3>
      ${this.generateDestinationGrid()}
    </div>
  </div>
</section>
    `.trim();
  }

  /**
   * Hotel Card Component
   */
  generateHotelCard() {
    return `
<div class="hotel-card">
  <div class="hotel-image">
    <img src="https://via.placeholder.com/300x200?text=Hotel" alt="Hotel">
    <span class="rating">⭐ 4.8</span>
    <span class="badge">Best Deal</span>
  </div>
  <div class="hotel-content">
    <h4 class="hotel-name">Luxury Beach Resort</h4>
    <p class="hotel-location">📍 Bali, Indonesia</p>
    <div class="hotel-amenities">
      <span class="amenity">🏊 Pool</span>
      <span class="amenity">🍽️ Restaurant</span>
      <span class="amenity">📶 WiFi</span>
    </div>
    <div class="hotel-footer">
      <p class="price"><span class="currency">$</span><span class="amount">120</span><span class="per">/night</span></p>
      <button class="btn btn-primary btn-sm">Book Now</button>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Generate multiple hotel cards
   */
  generateHotelCards() {
    return `
<div class="hotels-section">
  <h3>Featured Hotels</h3>
  <div class="hotels-grid">
    ${Array(4).fill(null).map(() => this.generateHotelCard()).join('')}
  </div>
</div>
    `.trim();
  }

  /**
   * Destination Grid Component
   */
  generateDestinationGrid() {
    const destinations = [
      { name: 'Bali, Indonesia', emoji: '🏝️', image: 'https://via.placeholder.com/250x300?text=Bali' },
      { name: 'Paris, France', emoji: '🗼', image: 'https://via.placeholder.com/250x300?text=Paris' },
      { name: 'Tokyo, Japan', emoji: '🗾', image: 'https://via.placeholder.com/250x300?text=Tokyo' },
      { name: 'New York, USA', emoji: '🗽', image: 'https://via.placeholder.com/250x300?text=NewYork' },
      { name: 'Dubai, UAE', emoji: '🏙️', image: 'https://via.placeholder.com/250x300?text=Dubai' },
      { name: 'Barcelona, Spain', emoji: '🌃', image: 'https://via.placeholder.com/250x300?text=Barcelona' }
    ];

    return `
<div class="destination-grid">
  ${destinations.map(dest => `
    <div class="destination-card">
      <div class="dest-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative;">
        <img src="${dest.image}" alt="${dest.name}" style="opacity: 0.3;">
        <div class="dest-overlay">
          <span class="dest-emoji">${dest.emoji}</span>
          <h3>${dest.name}</h3>
          <button class="btn btn-secondary btn-sm">Explore</button>
        </div>
      </div>
    </div>
  `).join('')}
</div>
    `.trim();
  }

  /**
   * Booking Form Component
   */
  generateBookingForm() {
    return `
<div class="booking-form-wrapper">
  <form class="booking-form" id="travelBookingForm">
    <div class="form-row">
      <div class="form-group">
        <label for="from">From</label>
        <input type="text" id="from" placeholder="Departure city" required>
      </div>
      <div class="form-group">
        <label for="to">To</label>
        <input type="text" id="to" placeholder="Destination city" required>
      </div>
      <div class="form-group">
        <label for="startDate">Start Date</label>
        <input type="date" id="startDate" required>
      </div>
      <div class="form-group">
        <label for="endDate">End Date</label>
        <input type="date" id="endDate" required>
      </div>
      <div class="form-group">
        <label for="travelers">Travelers</label>
        <select id="travelers" required>
          <option>1 Person</option>
          <option>2 People</option>
          <option>3 People</option>
          <option>4+ People</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-lg search-btn">Search</button>
    </div>
  </form>
</div>
    `.trim();
  }

  /**
   * Flight Search Component
   */
  generateFlightSearch() {
    return `
<div class="flight-search-wrapper">
  <div class="flight-search-tabs">
    <button class="tab-btn active" data-tab="roundtrip">Round Trip</button>
    <button class="tab-btn" data-tab="oneway">One Way</button>
    <button class="tab-btn" data-tab="multicity">Multi-City</button>
  </div>
  <form class="flight-search-form" id="flightSearchForm">
    <div class="form-row">
      <div class="form-group">
        <label for="departFrom">Depart From</label>
        <input type="text" id="departFrom" placeholder="Departure city" required>
      </div>
      <div class="form-group">
        <label for="arriveTo">Arrive To</label>
        <input type="text" id="arriveTo" placeholder="Destination city" required>
      </div>
      <div class="form-group">
        <label for="departDate">Depart</label>
        <input type="date" id="departDate" required>
      </div>
      <div class="form-group">
        <label for="returnDate">Return</label>
        <input type="date" id="returnDate" required>
      </div>
      <div class="form-group">
        <label for="passengers">Passengers</label>
        <select id="passengers" required>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5+</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-lg search-btn">Search Flights</button>
    </div>
  </form>
</div>
    `.trim();
  }

  /**
   * Price Comparison Component
   */
  generatePriceComparison() {
    const comparisons = [
      { name: 'Flight + Hotel', savings: '25%', color: '#667eea' },
      { name: 'All-Inclusive Package', savings: '35%', color: '#764ba2' },
      { name: 'Flight Only', savings: '15%', color: '#f093fb' }
    ];

    return `
<div class="price-comparison">
  <h3>Best Deals & Packages</h3>
  <div class="comparison-grid">
    ${comparisons.map(comp => `
      <div class="comparison-card">
        <div class="comp-header" style="background-color: ${comp.color};">
          <h4>${comp.name}</h4>
        </div>
        <div class="comp-body">
          <div class="savings">
            <span class="label">Save up to</span>
            <span class="amount">${comp.savings}</span>
          </div>
          <button class="btn btn-primary btn-full">View Deal</button>
        </div>
      </div>
    `).join('')}
  </div>
</div>
    `.trim();
  }

  /**
   * Trip Timeline Component
   */
  generateTripTimeline() {
    const timeline = [
      { day: 'Day 1', title: 'Arrival & City Tour', icon: '🛬' },
      { day: 'Day 2', title: 'Beach Excursion', icon: '🏖️' },
      { day: 'Day 3', title: 'Cultural Experience', icon: '🏛️' },
      { day: 'Day 4', title: 'Adventure Activities', icon: '🎢' },
      { day: 'Day 5', title: 'Relaxation & Spa', icon: '🧖' },
      { day: 'Day 6', title: 'Departure', icon: '✈️' }
    ];

    return `
<div class="trip-timeline">
  <h3>Your Perfect Itinerary</h3>
  <div class="timeline-container">
    ${timeline.map((item, idx) => `
      <div class="timeline-item ${idx === 0 ? 'active' : ''}">
        <div class="timeline-marker">
          <span class="timeline-icon">${item.icon}</span>
        </div>
        <div class="timeline-content">
          <h4>${item.day}</h4>
          <p>${item.title}</p>
        </div>
      </div>
    `).join('')}
  </div>
</div>
    `.trim();
  }

  /**
   * Luxury Hotels Component
   */
  generateLuxuryHotels() {
    return `
<div class="luxury-hotels-section">
  <div class="luxury-hotels-grid">
    ${Array(3).fill(null).map((_, idx) => `
      <div class="luxury-hotel-card">
        <div class="luxury-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 300px; position: relative;">
          <span class="luxury-badge">⭐ Premium</span>
        </div>
        <div class="luxury-content">
          <h4>Exclusive Luxury Resort ${idx + 1}</h4>
          <p class="rating">★★★★★ 4.9 (847 reviews)</p>
          <p class="description">Experience unparalleled luxury and world-class service in our flagship resort.</p>
          <div class="amenities-list">
            <span>🏊‍♂️ Infinity Pool</span>
            <span>🍽️ Michelin Star Dining</span>
            <span>🧖‍♀️ Spa & Wellness</span>
            <span>🎭 Entertainment</span>
          </div>
          <div class="luxury-price">
            <span class="price-label">From</span>
            <span class="price-value">$${500 + idx * 100}/night</span>
          </div>
          <button class="btn btn-primary btn-full btn-lg">Reserve Now</button>
        </div>
      </div>
    `).join('')}
  </div>
</div>
    `.trim();
  }

  /**
   * Special Offers Component
   */
  generateSpecialOffers() {
    return `
<div class="special-offers-section">
  <h3>Special Offers & Discounts</h3>
  <div class="offers-grid">
    <div class="offer-card hot">
      <span class="offer-badge">🔥 Hot Deal</span>
      <h4>Early Bird Discount</h4>
      <p>Book 30 days in advance</p>
      <span class="discount">Save 20%</span>
    </div>
    <div class="offer-card popular">
      <span class="offer-badge">⭐ Popular</span>
      <h4>Group Packages</h4>
      <p>Perfect for families & friends</p>
      <span class="discount">Save 15%</span>
    </div>
    <div class="offer-card premium">
      <span class="offer-badge">👑 Premium</span>
      <h4>VIP Experience</h4>
      <p>Exclusive perks & upgrades</p>
      <span class="discount">Extra Benefits</span>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Get page title based on app type
   */
  getPageTitle() {
    const titles = {
      'hotel-booking': '✈️ Travels - Hotel Booking Platform',
      'travel-planner': '✈️ Travels - Plan Your Perfect Trip',
      'flight-booking': '✈️ Travels - Flight Booking Service'
    };
    return titles[this.travelApp] || '✈️ Travels - Your Journey Begins Here';
  }

  /**
   * Get hero title
   */
  getHeroTitle() {
    return 'Explore the World with ✈️ Travels';
  }

  /**
   * Get hero subtitle
   */
  getHeroSubtitle() {
    return 'Discover amazing destinations, book flights and hotels at the best prices';
  }

  /**
   * Get features specific to travel
   */
  getFeatures() {
    return [
      { icon: '✈️', title: 'Best Flight Deals', description: 'Compare and book flights from top airlines' },
      { icon: '🏨', title: 'Exclusive Hotels', description: 'Handpicked accommodations worldwide' },
      { icon: '💰', title: 'Price Guarantee', description: 'Lowest prices or we match the difference' },
      { icon: '🛡️', title: '24/7 Support', description: 'Round-the-clock customer assistance' },
      { icon: '🎫', title: 'Package Deals', description: 'Complete trip packages at great value' },
      { icon: '🗺️', title: 'Travel Guides', description: 'Expert tips for every destination' }
    ];
  }

  /**
   * Generate travel-specific CSS
   */
  generateTravelCss() {
    return `
/* Travel Generator Specific Styles */

/* Booking Platform Layout */
.booking-platform {
  padding: 4rem 2rem;
  background: #f9fafb;
}

.booking-platform h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: ${this.theme.text};
}

.quick-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn.active {
  background: ${this.theme.primary};
  color: white;
  border-color: ${this.theme.primary};
}

.filter-btn:hover {
  border-color: ${this.theme.primary};
}

/* Travel Marketplace */
.travel-marketplace {
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

/* Destination Showcase */
.destination-showcase {
  padding: 0;
}

.showcase-hero {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
}

.showcase-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.showcase-image h2 {
  font-size: 2.5rem;
  text-align: center;
}

/* Luxury Travel */
.luxury-travel {
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

.concierge-section {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  margin-top: 3rem;
  border: 2px solid #e5e7eb;
}

.concierge-section h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
}

.concierge-section p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

/* Minimal Travel */
.minimal-travel {
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.minimal-destinations {
  margin-top: 3rem;
}

.minimal-destinations h3 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: ${this.theme.text};
}

/* Hotel Card Component */
.hotels-section {
  margin: 3rem 0;
}

.hotels-section h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: ${this.theme.text};
}

.hotels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.hotel-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.hotel-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

.hotel-image {
  position: relative;
  height: 200px;
  background: #e5e7eb;
  overflow: hidden;
}

.hotel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hotel-image .rating {
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.hotel-image .badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${this.theme.primary};
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
}

.hotel-content {
  padding: 1.5rem;
}

.hotel-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
}

.hotel-location {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.hotel-amenities {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.amenity {
  font-size: 0.85rem;
  background: #f3f4f6;
  padding: 0.35rem 0.65rem;
  border-radius: 4px;
  color: #4b5563;
}

.hotel-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.price {
  font-weight: 600;
  color: ${this.theme.primary};
}

.currency {
  font-size: 0.85rem;
}

.amount {
  font-size: 1.5rem;
}

.per {
  font-size: 0.85rem;
  color: #6b7280;
}

/* Destination Grid Component */
.destination-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.destination-card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.destination-card:hover {
  transform: translateY(-8px);
}

.dest-image {
  height: 250px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.dest-image img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.dest-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.3s ease;
}

.destination-card:hover .dest-overlay {
  background: rgba(0,0,0,0.6);
}

.dest-emoji {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.dest-overlay h3 {
  color: white;
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

/* Booking Form Component */
.booking-form-wrapper,
.flight-search-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.flight-search-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.3s ease;
}

.tab-btn.active {
  color: ${this.theme.primary};
  border-bottom-color: ${this.theme.primary};
}

.booking-form,
.flight-search-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
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

.search-btn {
  align-self: flex-end;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .search-btn {
    align-self: stretch;
  }
}

/* Price Comparison Component */
.price-comparison {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.price-comparison h3 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${this.theme.text};
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.comparison-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.comp-header {
  padding: 1.5rem;
  color: white;
}

.comp-header h4 {
  font-size: 1.1rem;
  margin: 0;
}

.comp-body {
  padding: 1.5rem;
  background: white;
}

.savings {
  margin-bottom: 1.5rem;
  text-align: center;
}

.savings .label {
  display: block;
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.savings .amount {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: ${this.theme.primary};
}

/* Trip Timeline Component */
.trip-timeline {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.trip-timeline h3 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${this.theme.text};
}

.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  display: flex;
  gap: 1.5rem;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.timeline-item.active {
  opacity: 1;
}

.timeline-marker {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  width: 50px;
}

.timeline-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${this.theme.primary}20;
  border: 2px solid ${this.theme.primary};
  border-radius: 50%;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-item.active .timeline-icon {
  background: ${this.theme.primary};
  color: white;
  box-shadow: 0 4px 12px ${this.theme.primary}40;
}

.timeline-content {
  flex: 1;
  padding-top: 0.25rem;
}

.timeline-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: ${this.theme.text};
  margin-bottom: 0.25rem;
}

.timeline-content p {
  color: #6b7280;
  font-size: 0.95rem;
}

/* Luxury Hotels */
.luxury-hotels-section {
  margin-bottom: 3rem;
}

.luxury-hotels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.luxury-hotel-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.luxury-hotel-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}

.luxury-image {
  position: relative;
}

.luxury-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.luxury-content {
  padding: 2rem;
}

.luxury-content h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
}

.luxury-content .rating {
  color: ${this.theme.primary};
  font-weight: 600;
  margin-bottom: 1rem;
}

.luxury-content .description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.amenities-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: ${this.theme.text};
}

.luxury-price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.price-label {
  color: #6b7280;
  font-size: 0.9rem;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: ${this.theme.primary};
}

/* Special Offers */
.special-offers-section {
  margin-bottom: 3rem;
}

.special-offers-section h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: ${this.theme.text};
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.offer-card {
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.offer-card.hot {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e72 100%);
  color: white;
}

.offer-card.popular {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.offer-card.premium {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.offer-card:hover {
  transform: translateY(-4px);
}

.offer-badge {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.offer-card h4 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.offer-card p {
  font-size: 0.95rem;
  opacity: 0.95;
  margin-bottom: 1rem;
}

.discount {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 768px) {
  .hotels-grid {
    grid-template-columns: 1fr;
  }
  
  .destination-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .luxury-hotels-grid {
    grid-template-columns: 1fr;
  }
  
  .offers-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-container {
    gap: 1rem;
  }
  
  .amenities-list {
    grid-template-columns: 1fr;
  }
}
    `.trim();
  }

  /**
   * Generate travel-specific JavaScript
   */
  generateTravelJs() {
    return `
// Travel Generator JavaScript
class TravelApp {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Booking form
    const bookingForm = document.getElementById('travelBookingForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => this.handleBookingSearch(e));
    }

    // Flight search form
    const flightForm = document.getElementById('flightSearchForm');
    if (flightForm) {
      flightForm.addEventListener('submit', (e) => this.handleFlightSearch(e));
    }

    // Flight search tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchFlightTab(e));
    });

    // Destination cards
    document.querySelectorAll('.destination-card').forEach(card => {
      card.addEventListener('click', (e) => this.handleDestinationClick(e));
    });

    // Quick filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilterClick(e));
    });

    // Timeline items
    document.querySelectorAll('.timeline-item').forEach((item, idx) => {
      item.addEventListener('click', () => this.highlightTimelineItem(idx));
    });

    // Hotel cards
    document.querySelectorAll('.hotel-card').forEach(card => {
      card.addEventListener('click', (e) => this.handleHotelClick(e));
    });
  }

  handleBookingSearch(e) {
    e.preventDefault();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const travelers = document.getElementById('travelers').value;

    console.log('Booking Search:', { from, to, startDate, endDate, travelers });
    alert(\`Searching for trips from \${from} to \${to}...\`);
  }

  handleFlightSearch(e) {
    e.preventDefault();
    const from = document.getElementById('departFrom').value;
    const to = document.getElementById('arriveTo').value;
    const departDate = document.getElementById('departDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const passengers = document.getElementById('passengers').value;

    console.log('Flight Search:', { from, to, departDate, returnDate, passengers });
    alert(\`Searching for flights from \${from} to \${to}...\`);
  }

  switchFlightTab(e) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    const tab = e.target.dataset.tab;
    console.log('Switched to tab:', tab);
  }

  handleDestinationClick(e) {
    const card = e.currentTarget;
    const destination = card.querySelector('h3').textContent;
    console.log('Selected destination:', destination);
    alert(\`Exploring \${destination}...\`);
  }

  handleFilterClick(e) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.textContent;
    console.log('Applied filter:', filter);
  }

  highlightTimelineItem(idx) {
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelectorAll('.timeline-item')[idx].classList.add('active');
  }

  handleHotelClick(e) {
    const card = e.currentTarget;
    const hotelName = card.querySelector('.hotel-name').textContent;
    const price = card.querySelector('.amount').textContent;
    console.log('Selected hotel:', hotelName, 'Price:', price);
    alert(\`Booking \${hotelName} - \$\${price}/night\`);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TravelApp();
});
    `.trim();
  }

  /**
   * Get metadata for the generated UI
   */
  getMetadata() {
    return {
      generator: 'TravelGenerator',
      version: '1.0.0',
      category: 'travel',
      travelApp: this.travelApp,
      layout: this.layout,
      components: this.components,
      theme: this.theme,
      responsive: true,
      accessible: true,
      supportedApps: [
        'Hotel Booking App',
        'Travel Planner',
        'Flight Booking'
      ],
      availableComponents: [
        'hotelCard',
        'destinationGrid',
        'bookingForm',
        'priceComparison',
        'tripTimeline',
        'flightSearch'
      ],
      supportedLayouts: [
        'booking-platform',
        'travel-marketplace',
        'destination-showcase',
        'luxury-travel',
        'minimal-travel'
      ],
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Generate standalone CSS file
   */
  generateStandaloneCss() 
    { 
        return `\${this.generateWebsiteCss()}\n\n\${this.generateTravelCss()}\`;
  }
  /**
   * Generate standalone HTML file (complete)
  **/
  generateStandaloneHtml() {
    return this.generate();
  }

  /**
   * Generate standalone JS file (complete)
   */
  generateStandaloneJs() {
    return this.generateTravelJs();
  }

  /**
   * Generate metadata JSON
   */
  generateMetadataJson() {
    return JSON.stringify(this.getMetadata(), null, 2);
  }
}

export default TravelGenerator ; 
  }

