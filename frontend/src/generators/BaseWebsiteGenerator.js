/**
 * BaseWebsiteGenerator.js - Base class for website-style UIs
 * Used by: Portfolio, LandingPage, RealEstate, Travel, etc.
 * 
 * @extends BaseGenerator
 * @version 2.0.0
 */

import BaseGenerator from './BaseGenerator.js';

class BaseWebsiteGenerator extends BaseGenerator {
  constructor(config = {}) {
    super(config);
    this.websiteType = config.websiteType || 'landing';
  }

  /**
   * Generate website navigation
   * @returns {string} Navigation HTML
   */
  generateNavigation() {
    const navItems = this.getNavItems();
    return `
<nav class="website-nav">
  <div class="nav-container">
    <div class="nav-logo">${this.getLogoText()}</div>
    <div class="nav-menu">
      ${navItems.map(item => `
        <a href="${item.href}" class="nav-link">${item.label}</a>
      `).join('')}
    </div>
    <div class="nav-actions">
      <button class="btn btn-secondary">Sign In</button>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</nav>
    `.trim();
  }

  /**
   * Generate hero section
   * @returns {string} Hero HTML
   */
  generateHero() {
    return `
<section class="hero">
  <div class="hero-container">
    <h1 class="hero-title">${this.getHeroTitle()}</h1>
    <p class="hero-subtitle">${this.getHeroSubtitle()}</p>
    <div class="hero-buttons">
      <button class="btn btn-primary btn-lg">Get Started</button>
      <button class="btn btn-secondary btn-lg">Learn More</button>
    </div>
    <p class="hero-note">✓ No credit card required • 14-day free trial</p>
  </div>
</section>
    `.trim();
  }

  /**
   * Generate features section
   * @returns {string} Features HTML
   */
  generateFeaturesSection() {
    const features = this.getFeatures();
    return `
<section class="features">
  <div class="container">
    <h2>Key Features</h2>
    <div class="features-grid">
      ${features.map(feature => `
        <div class="feature-box">
          <div class="feature-icon">${feature.icon}</div>
          <h3>${feature.title}</h3>
          <p>${feature.description}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
    `.trim();
  }

  /**
   * Generate pricing section
   * @returns {string} Pricing HTML
   */
  generatePricingSection() {
    const plans = this.getPricingPlans();
    return `
<section class="pricing">
  <div class="container">
    <h2>Simple Pricing</h2>
    <div class="pricing-grid">
      ${plans.map((plan, idx) => `
        <div class="pricing-box ${idx === 1 ? 'featured' : ''}">
          <h3>${plan.name}</h3>
          <p class="price">$${plan.price}<span>/mo</span></p>
          <ul class="features-list">
            ${plan.features.map(f => `<li>✓ ${f}</li>`).join('')}
          </ul>
          <button class="btn btn-primary btn-full">Get Started</button>
        </div>
      `).join('')}
    </div>
  </div>
</section>
    `.trim();
  }

  /**
   * Generate testimonials section
   * @returns {string} Testimonials HTML
   */
  generateTestimonials() {
    const testimonials = this.getTestimonials();
    return `
<section class="testimonials">
  <div class="container">
    <h2>What Our Users Say</h2>
    <div class="testimonials-grid">
      ${testimonials.map(testimonial => `
        <div class="testimonial-card">
          <div class="stars">${'⭐'.repeat(testimonial.rating)}</div>
          <p class="testimonial-text">"${testimonial.text}"</p>
          <div class="testimonial-author">
            <div class="author-avatar">${testimonial.avatar}</div>
            <div>
              <h4>${testimonial.author}</h4>
              <p>${testimonial.role}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
    `.trim();
  }

  /**
   * Generate CTA (call to action) section
   * @returns {string} CTA HTML
   */
  generateCTA() {
    return `
<section class="cta">
  <div class="container">
    <h2>Ready to get started?</h2>
    <p>Join thousands of users using our platform</p>
    <button class="btn btn-primary btn-lg">Start Your Free Trial</button>
  </div>
</section>
    `.trim();
  }

  /**
   * Generate footer
   * @returns {string} Footer HTML
   */
  generateFooter() {
    return `
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h4>About</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Team</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Product</h4>
        <ul>
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Legal</h4>
        <ul>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 ${this.getLogoText()}. All rights reserved.</p>
    </div>
  </div>
</footer>
    `.trim();
  }

  /**
   * Get navigation items
   * @returns {Array} Nav items
   */
  getNavItems() {
    return [
      { href: '#features', label: 'Features' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#about', label: 'About' },
      { href: '#contact', label: 'Contact' }
    ];
  }

  /**
   * Get logo text
   * @returns {string} Logo
   */
  getLogoText() {
    const logos = {
      portfolio: '✨ Portfolio',
      travel: '✈️ Travels',
      realEstate: '🏠 RealEstate',
      foodDelivery: '🍕 FoodHub',
      default: '🚀 Brand'
    };
    return logos[this.category] || logos.default;
  }

  /**
   * Get hero title
   * @returns {string} Title
   */
  getHeroTitle() {
    return 'Build Amazing Experiences';
  }

  /**
   * Get hero subtitle
   * @returns {string} Subtitle
   */
  getHeroSubtitle() {
    return 'Create, launch, and grow your business with our platform';
  }

  /**
   * Get features list
   * @returns {Array} Features
   */
  getFeatures() {
    return [
      { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
      { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security built in' },
      { icon: '📊', title: 'Analytics', description: 'Real-time insights and reports' },
      { icon: '🤝', title: 'Support', description: '24/7 customer support' },
      { icon: '🔧', title: 'Easy Integration', description: 'Seamless API integration' },
      { icon: '🚀', title: 'Scalable', description: 'Grow without limits' }
    ];
  }

  /**
   * Get pricing plans
   * @returns {Array} Plans
   */
  getPricingPlans() {
    return [
      {
        name: 'Starter',
        price: 29,
        features: ['Up to 10 projects', 'Basic support', '1GB storage']
      },
      {
        name: 'Professional',
        price: 99,
        features: ['Unlimited projects', 'Priority support', '100GB storage']
      },
      {
        name: 'Enterprise',
        price: 299,
        features: ['Everything', 'Dedicated support', 'Unlimited storage']
      }
    ];
  }

  /**
   * Get testimonials
   * @returns {Array} Testimonials
   */
  getTestimonials() {
    return [
      {
        rating: 5,
        text: 'This product has transformed how we work. Highly recommend!',
        author: 'Sarah Johnson',
        role: 'CEO, Tech Co',
        avatar: '👩‍💼'
      },
      {
        rating: 5,
        text: 'Amazing support and incredible features. Best investment ever.',
        author: 'Mike Chen',
        role: 'Founder, StartUp Inc',
        avatar: '👨‍💼'
      },
      {
        rating: 5,
        text: 'The easiest solution to implement. Saved us months of work.',
        author: 'Emily Davis',
        role: 'Product Manager, Global Co',
        avatar: '👩‍🔬'
      }
    ];
  }

  /**
   * Generate website-specific CSS
   * @returns {string} CSS
   */
  generateWebsiteCss() {
    return `
/* Website Layout */
.website {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Navigation */
.website-nav {
  background: ${this.theme.surface};
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.nav-logo {
  font-size: 1.3rem;
  font-weight: 700;
  color: ${this.theme.primary};
  white-space: nowrap;
}

.nav-menu {
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

.nav-actions {
  display: flex;
  gap: 1rem;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, ${this.theme.primary} 0%, ${this.theme.secondary} 100%);
  color: white;
  padding: 8rem 2rem;
  text-align: center;
}

.hero-container {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.hero-note {
  font-size: 0.95rem;
  opacity: 0.9;
}

/* Sections */
.features,
.pricing,
.testimonials,
.cta {
  padding: 6rem 2rem;
  text-align: center;
}

.features h2,
.pricing h2,
.testimonials h2,
.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${this.theme.text};
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-box {
  background: ${this.theme.surface};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.feature-box:hover {
  border-color: ${this.theme.primary};
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-box h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
}

.feature-box p {
  color: #6b7280;
}

/* Pricing Grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-box {
  background: ${this.theme.surface};
  padding: 2.5rem;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.pricing-box.featured {
  border-color: ${this.theme.primary};
  box-shadow: 0 20px 50px ${this.theme.primary}20;
  transform: scale(1.05);
}

.pricing-box h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${this.theme.text};
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: ${this.theme.primary};
  margin-bottom: 1.5rem;
}

.price span {
  font-size: 1rem;
  color: #6b7280;
}

.features-list {
  list-style: none;
  margin: 2rem 0;
  text-align: left;
}

.features-list li {
  padding: 0.75rem 0;
  color: ${this.theme.text};
}

.btn-full {
  width: 100%;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Testimonials */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background: ${this.theme.surface};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.stars {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.testimonial-text {
  color: ${this.theme.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${this.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.testimonial-author h4 {
  font-size: 1rem;
  color: ${this.theme.text};
  margin-bottom: 0.25rem;
}

.testimonial-author p {
  font-size: 0.85rem;
  color: #6b7280;
}

/* CTA Section */
.cta {
  background: linear-gradient(135deg, ${this.theme.primary} 0%, ${this.theme.secondary} 100%);
  color: white;
}

.cta h2,
.cta p {
  color: white;
}

.cta p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* Footer */
.footer {
  background: ${this.theme.surface};
  border-top: 1px solid #e5e7eb;
  padding: 4rem 2rem 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.footer-section h4 {
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${this.theme.text};
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #6b7280;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-section a:hover {
  color: ${this.theme.primary};
}

.footer-bottom {
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    display: none;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .features,
  .pricing,
  .testimonials,
  .cta {
    padding: 3rem 1.5rem;
  }
  
  .pricing-box.featured {
    transform: scale(1);
  }
}
    `.trim();
  }
}

export default BaseWebsiteGenerator;
