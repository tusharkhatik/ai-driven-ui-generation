// src/services/mockApi.js - Enterprise-Grade Multi-Domain Generator v11.0
// Professional UI generator with 100+ variations across SaaS, E-commerce, Landing Pages, Auth, and Data Tables

class AdvancedRNG {
  constructor(seed = Date.now()) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  int(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  float(min, max) {
    return this.next() * (max - min) + min;
  }

  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }

  pickMultiple(arr, count) {
    const shuffled = [...arr];
    for (let i = 0; i < count && i < shuffled.length; i++) {
      const j = i + Math.floor(this.next() * (shuffled.length - i));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  color() {
    const hue = Math.floor(this.next() * 360);
    const saturation = this.int(50, 100);
    const lightness = this.int(40, 60);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  colorHex() {
    return '#' + Math.floor(this.next() * 16777215).toString(16).padStart(6, '0');
  }

  bool(probability = 0.5) {
    return this.next() < probability;
  }
}

// ============================================================================
// ADVANCED PROMPT ANALYZER
// ============================================================================

class PromptAnalyzer {
  static analyze(prompt) {
    const lower = prompt.toLowerCase();

    return {
      // Domain Detection
      isDomain: {
        saas: /dashboard|admin|panel|analytics|tool|platform|app|software/.test(lower),
        ecommerce: /shop|store|product|buy|ecommerce|mall|marketplace|fashion|cart|checkout/.test(lower),
        landing: /landing|homepage|website|product page|startup|portfolio|showcase/.test(lower),
        auth: /login|signup|register|auth|authentication|forgot password|otp|reset/.test(lower),
        datatable: /table|data|list|users|management|database|records|entries/.test(lower),
        food: /restaurant|cafe|food|menu|dining|pizza|burger|bakery/.test(lower),
        health: /health|medical|hospital|clinic|wellness|fitness|gym|yoga/.test(lower),
        education: /course|education|learning|school|bootcamp|training/.test(lower),
      },

      // Industry Detection
      isIndustry: {
        tech: /tech|ai|code|development|startup|innovation|crypto|software/.test(lower),
        creative: /portfolio|creative|design|art|gallery|studio/.test(lower),
        corporate: /corporate|business|company|enterprise|professional/.test(lower),
        finance: /bank|financial|investment|trading|stock|crypto/.test(lower),
        legal: /lawyer|attorney|law|legal|court/.test(lower),
        realEstate: /real estate|property|house|apartment|mortgage/.test(lower),
      },

      // Style Detection
      isStyle: {
        dark: /dark|night|black|midnight|noir/.test(lower),
        minimal: /minimal|clean|simple|flat|minimalist|zen/.test(lower),
        colorful: /colorful|vibrant|rainbow|bright|multicolor/.test(lower),
        modern: /modern|contemporary|sleek|trendy/.test(lower),
        luxury: /luxury|premium|elegant|sophisticated/.test(lower),
        vintage: /vintage|retro|classic|nostalgic/.test(lower),
        glassmorphism: /glass|frosted|blur|glassmorphism/.test(lower),
        neumorphism: /neumorphic|soft|shadows/.test(lower),
        cyberpunk: /cyber|neon|futuristic|cyberpunk/.test(lower),
      },

      // Feature Detection
      hasFeature: {
        animation: !/static|no animation/.test(lower),
        gradient: !/flat|solid|no gradient/.test(lower),
        darkMode: /dark mode|theme toggle|switch/.test(lower),
        search: /search|filter|find/.test(lower),
        pagination: /pagination|page|pages/.test(lower),
        sorting: /sort|sorted/.test(lower),
        charts: /chart|graph|analytics|stats/.test(lower),
        reviews: /review|rating|testimonial/.test(lower),
      },
    };
  }

  static getColorScheme(analysis, rng) {
    // Luxury Color Scheme
    if (analysis.isStyle.luxury) {
      return {
        primary: '#8b7355',
        secondary: '#d4af37',
        accent: '#c9a876',
        bg: '#f5f1e8',
        surface: '#ffffff',
        text: '#2a2a2a',
        subtext: '#666666',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        gradient: 'linear-gradient(135deg, #8b7355 0%, #d4af37 100%)',
      };
    }

    // Dark Modern
    if (analysis.isStyle.dark) {
      return {
        primary: '#00d4ff',
        secondary: '#c644fc',
        accent: '#ff006e',
        bg: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#ffffff',
        subtext: '#cccccc',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        gradient: 'linear-gradient(135deg, #00d4ff 0%, #c644fc 100%)',
      };
    }

    // Minimal Clean
    if (analysis.isStyle.minimal) {
      return {
        primary: '#000000',
        secondary: '#666666',
        accent: '#333333',
        bg: '#ffffff',
        surface: '#f5f5f5',
        text: '#1a1a1a',
        subtext: '#999999',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        gradient: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      };
    }

    // Colorful Vibrant
    if (analysis.isStyle.colorful) {
      return {
        primary: '#ff006e',
        secondary: '#00d4ff',
        accent: '#3a86ff',
        bg: '#ffffff',
        surface: '#f9fafb',
        text: '#1f2937',
        subtext: '#6b7280',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        gradient: 'linear-gradient(135deg, #ff006e 0%, #00d4ff 100%)',
      };
    }

    // Cyberpunk Neon
    if (analysis.isStyle.cyberpunk) {
      return {
        primary: '#ff00ff',
        secondary: '#00ffff',
        accent: '#ffff00',
        bg: '#0a0e27',
        surface: '#1a1f3a',
        text: '#ffffff',
        subtext: '#a0aec0',
        success: '#39ff14',
        error: '#ff0040',
        warning: '#ffff00',
        info: '#00ffff',
        gradient: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
      };
    }

    // Default Modern
    return {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      bg: '#ffffff',
      surface: '#f9fafb',
      text: '#1f2937',
      subtext: '#6b7280',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    };
  }

  static getTypography(analysis) {
    if (analysis.isStyle.luxury) {
      return { 
        font: 'Georgia, serif', 
        heading: 'Georgia, serif',
        code: 'Monaco, monospace',
        fontWeight: { light: 300, normal: 400, bold: 600, heavy: 700 }
      };
    }
    if (analysis.isDomain.datatable || analysis.isDomain.saas) {
      return { 
        font: 'Inter, -apple-system, sans-serif', 
        heading: 'Poppins, sans-serif',
        code: 'Courier New, monospace',
        fontWeight: { light: 300, normal: 400, bold: 600, heavy: 700 }
      };
    }
    return { 
      font: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', 
      heading: 'sans-serif',
      code: 'Monaco, monospace',
      fontWeight: { light: 300, normal: 400, bold: 600, heavy: 700 }
    };
  }
}

// ============================================================================
// SAAS DASHBOARD GENERATOR
// ============================================================================

class SaaSDashboardGenerator {
  static generate(rng, colors, analysis) {
    const metrics = [
      { label: 'Total Users', value: rng.int(1000, 50000), icon: '👥', color: colors.primary },
      { label: 'Revenue', value: '$' + rng.int(10, 100) + 'K', icon: '💰', color: colors.secondary },
      { label: 'Conversion', value: rng.int(2, 8) + '%', icon: '📈', color: colors.success },
      { label: 'Avg. Session', value: rng.int(2, 10) + 'm', icon: '⏱️', color: colors.warning },
    ];

    let html = `
      <div class="dashboard">
        <aside class="sidebar">
          <div class="sidebar-header">
            <div class="logo">🚀 DashHub</div>
          </div>
          <nav class="sidebar-menu">
            <a href="#" class="menu-item active"><span>📊</span> Dashboard</a>
            <a href="#" class="menu-item"><span>👥</span> Users</a>
            <a href="#" class="menu-item"><span>📈</span> Analytics</a>
            <a href="#" class="menu-item"><span>💬</span> Messages</a>
            <a href="#" class="menu-item"><span>⚙️</span> Settings</a>
          </nav>
          <div class="sidebar-footer">
            <button class="sidebar-logout">🚪 Logout</button>
          </div>
        </aside>

        <main class="dashboard-main">
          <header class="dashboard-header">
            <div class="header-left">
              <h1>Dashboard</h1>
              <p class="header-date">Welcome back! Here's your performance overview.</p>
            </div>
            <div class="header-right">
              <input type="text" placeholder="🔍 Search..." class="header-search">
              <button class="header-icon">🔔</button>
              <button class="header-icon">⚙️</button>
            </div>
          </header>

          <section class="dashboard-content">
            <div class="metrics-grid">
              ${metrics.map((m, i) => `
                <div class="metric-card" style="border-left-color: ${m.color};">
                  <div class="metric-icon">${m.icon}</div>
                  <div class="metric-details">
                    <p class="metric-label">${m.label}</p>
                    <h3 class="metric-value">${m.value}</h3>
                  </div>
                  <span class="metric-change">↑ 12%</span>
                </div>
              `).join('')}
            </div>

            <div class="dashboard-grid">
              <div class="chart-card">
                <div class="card-header">
                  <h3>Revenue Trend</h3>
                  <select>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <div class="chart-placeholder">
                  <svg viewBox="0 0 400 200">
                    <polyline points="0,150 50,120 100,140 150,100 200,110 250,80 300,90 350,60 400,40" 
                      fill="none" stroke="${colors.primary}" stroke-width="3"/>
                  </svg>
                </div>
              </div>

              <div class="activity-card">
                <div class="card-header">
                  <h3>Recent Activity</h3>
                </div>
                <div class="activity-list">
                  ${['New user signup', 'Payment received', 'Report generated', 'Settings updated'].map(item => `
                    <div class="activity-item">
                      <div class="activity-dot"></div>
                      <span>${item}</span>
                      <time>2 hours ago</time>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="table-card">
              <div class="card-header">
                <h3>Top Users</h3>
                <button class="btn-small">View All</button>
              </div>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Revenue</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${['Alice', 'Bob', 'Charlie', 'Diana', 'Edward'].map((name, i) => `
                    <tr>
                      <td><span class="user-avatar">${name[0]}</span>${name}</td>
                      <td>${name.toLowerCase()}@example.com</td>
                      <td><span class="badge badge-success">Active</span></td>
                      <td>$${rng.int(100, 1000)}</td>
                      <td><button class="btn-action">⋮</button></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    `;

    return html;
  }
}

// ============================================================================
// E-COMMERCE GENERATOR
// ============================================================================

class EcommerceGenerator {
  static generateProducts(rng, count = 8) {
    const products = [
      { name: 'Premium Wireless Headphones', price: 199, img: '🎧', rating: 4.8 },
      { name: 'Luxury Smartwatch', price: 299, img: '⌚', rating: 4.9 },
      { name: 'Designer Sunglasses', price: 149, img: '😎', rating: 4.7 },
      { name: 'Portable SSD 2TB', price: 249, img: '💾', rating: 4.9 },
      { name: 'Premium Camera', price: 1299, img: '📷', rating: 4.8 },
      { name: 'Mechanical Keyboard', price: 159, img: '⌨️', rating: 4.8 },
      { name: 'Studio Microphone', price: 249, img: '🎤', rating: 4.9 },
      { name: 'VR Headset Pro', price: 799, img: '🥽', rating: 4.6 },
    ];
    return products.slice(0, count);
  }

  static generate(rng, colors) {
    const products = this.generateProducts(rng);

    let html = `
      <div class="ecommerce">
        <nav class="ecom-navbar">
          <div class="navbar-container">
            <div class="navbar-brand">🛍️ ShopHub</div>
            <div class="navbar-menu">
              <a href="#">Home</a>
              <a href="#">Shop</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <div class="navbar-actions">
              <input type="text" placeholder="Search products..." class="search-input">
              <button class="cart-btn">🛒 Cart (0)</button>
            </div>
          </div>
        </nav>

        <section class="ecom-hero">
          <div class="hero-content">
            <h1>Discover Premium Products</h1>
            <p>Shop the finest selection of electronics and accessories</p>
            <button class="btn-primary">Shop Now</button>
          </div>
        </section>

        <section class="ecom-products">
          <div class="container">
            <h2>Featured Products</h2>
            <div class="products-grid">
              ${products.map((p, i) => `
                <div class="product-card">
                  <div class="product-image">${p.img}</div>
                  <div class="product-badge">⭐ ${p.rating}</div>
                  <h3>${p.name}</h3>
                  <p class="product-price">$${p.price}</p>
                  <button class="btn-add-cart">Add to Cart</button>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="ecom-checkout" style="display:none;">
          <div class="container">
            <h2>Shopping Cart</h2>
            <div class="checkout-wrapper">
              <div class="cart-items">
                <div class="empty-cart">Your cart is empty</div>
              </div>
              <div class="checkout-summary">
                <div class="summary-item">
                  <span>Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div class="summary-item">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div class="summary-total">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
                <button class="btn-checkout">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    return html;
  }
}

// ============================================================================
// AUTH PAGES GENERATOR
// ============================================================================

class AuthGenerator {
  static generateLogin(rng, colors) {
    return `
      <div class="auth-container">
        <div class="auth-wrapper">
          <div class="auth-box">
            <div class="auth-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your account</p>
            </div>

            <form class="auth-form">
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" required>
              </div>

              <div class="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" required>
              </div>

              <div class="form-options">
                <label class="checkbox">
                  <input type="checkbox">
                  <span>Remember me</span>
                </label>
                <a href="#forgot">Forgot password?</a>
              </div>

              <button type="submit" class="btn-primary btn-full">Sign In</button>
            </form>

            <div class="auth-divider">or</div>

            <div class="auth-socials">
              <button class="social-btn">📘 Google</button>
              <button class="social-btn">🖤 GitHub</button>
            </div>

            <p class="auth-footer">
              Don't have an account? <a href="#signup">Sign up</a>
            </p>
          </div>

          <div class="auth-side">
            <div class="side-content">
              <h2>Powerful Tools</h2>
              <p>Get instant access to all features</p>
              <ul class="side-features">
                <li>✓ Real-time sync</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Team collaboration</li>
                <li>✓ 24/7 support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static generateSignup(rng, colors) {
    return `
      <div class="auth-container">
        <div class="auth-wrapper">
          <div class="auth-box">
            <div class="auth-header">
              <h1>Create Account</h1>
              <p>Join thousands of happy users</p>
            </div>

            <form class="auth-form">
              <div class="form-row">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="John" required>
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" required>
                </div>
              </div>

              <div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" required>
              </div>

              <div class="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" required>
              </div>

              <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="••••••••" required>
              </div>

              <label class="checkbox">
                <input type="checkbox" required>
                <span>I agree to the <a href="#">Terms & Conditions</a></span>
              </label>

              <button type="submit" class="btn-primary btn-full">Create Account</button>
            </form>

            <p class="auth-footer">
              Already have an account? <a href="#login">Sign in</a>
            </p>
          </div>

          <div class="auth-side">
            <div class="side-content">
              <h2>Get Started Today</h2>
              <p>No credit card required</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// ============================================================================
// DATA TABLE GENERATOR
// ============================================================================

class DataTableGenerator {
  static generateUsers(rng, count = 10) {
    const roles = ['Admin', 'User', 'Editor', 'Viewer'];
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: rng.pick(roles),
        status: rng.bool(0.7) ? 'Active' : 'Inactive',
        joined: `${rng.int(1, 12)} months ago`,
      });
    }
    return users;
  }

  static generate(rng, colors) {
    const users = this.generateUsers(rng, 15);

    let html = `
      <div class="data-table-container">
        <div class="table-header">
          <h2>User Management</h2>
          <div class="table-controls">
            <input type="text" placeholder="🔍 Search users..." class="table-search">
            <select class="table-filter">
              <option>All Roles</option>
              <option>Admin</option>
              <option>User</option>
              <option>Editor</option>
            </select>
            <select class="table-filter">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button class="btn-primary">+ Add User</button>
          </div>
        </div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${users.map((user) => `
                <tr>
                  <td><input type="checkbox"></td>
                  <td>
                    <div class="user-cell">
                      <span class="avatar">${user.name[0]}</span>
                      <span>${user.name}</span>
                    </div>
                  </td>
                  <td>${user.email}</td>
                  <td><span class="badge badge-info">${user.role}</span></td>
                  <td>
                    <span class="badge ${user.status === 'Active' ? 'badge-success' : 'badge-secondary'}">
                      ${user.status}
                    </span>
                  </td>
                  <td>${user.joined}</td>
                  <td>
                    <div class="actions">
                      <button class="btn-icon">✏️</button>
                      <button class="btn-icon">🗑️</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="table-footer">
          <span class="result-count">Showing 1-15 of ${users.length} users</span>
          <div class="pagination">
            <button class="pagination-btn">← Prev</button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn">3</button>
            <button class="pagination-btn">Next →</button>
          </div>
        </div>
      </div>
    `;

    return html;
  }
}

// ============================================================================
// LANDING PAGE GENERATOR
// ============================================================================

class LandingPageGenerator {
  static generate(rng, colors) {
    let html = `
      <div class="landing">
        <nav class="landing-nav">
          <div class="nav-container">
            <div class="logo">✨ SaaS Pro</div>
            <div class="nav-links">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#about">About</a>
            </div>
            <button class="btn-primary">Get Started</button>
          </div>
        </nav>

        <section class="landing-hero">
          <div class="hero-container">
            <h1>Build Faster. Ship Smarter.</h1>
            <p>The modern platform for teams that move fast</p>
            <div class="hero-buttons">
              <button class="btn-primary btn-lg">Start Free Trial</button>
              <button class="btn-secondary btn-lg">Watch Demo</button>
            </div>
            <p class="hero-note">✓ No credit card required • 14-day free trial</p>
          </div>
        </section>

        <section class="landing-features" id="features">
          <div class="container">
            <h2>Powerful Features</h2>
            <div class="features-grid">
              ${['⚡ Lightning Fast', '🔒 Enterprise Security', '📊 Real-time Analytics', '🤝 Team Collaboration', '🔧 Easy Integration', '🚀 Auto Scaling'].map(feature => `
                <div class="feature-box">
                  <div>${feature}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="landing-pricing" id="pricing">
          <div class="container">
            <h2>Simple Pricing</h2>
            <div class="pricing-grid">
              ${['Starter', 'Professional', 'Enterprise'].map((plan, i) => `
                <div class="pricing-box ${i === 1 ? 'featured' : ''}">
                  <h3>${plan}</h3>
                  <p class="price">$${[29, 99, 299][i]}<span>/mo</span></p>
                  <button class="btn-primary btn-full">Get Started</button>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="landing-cta">
          <div class="container">
            <h2>Ready to get started?</h2>
            <p>Join thousands of teams using our platform</p>
            <button class="btn-primary btn-lg">Start Your Free Trial</button>
          </div>
        </section>
      </div>
    `;

    return html;
  }
}

// ============================================================================
// PREMIUM CSS GENERATOR
// ============================================================================

class CSSGenerator {
  static generateBase(colors, analysis = {}) {
    return `
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: ${colors.text};
  background: ${colors.bg};
}

/* BUTTONS */
.btn-primary {
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-primary:hover {
  background: ${colors.secondary};
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
.btn-secondary {
  background: transparent;
  color: ${colors.primary};
  border: 2px solid ${colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-secondary:hover {
  background: ${colors.primary};
  color: white;
}
.btn-full { width: 100%; }
.btn-lg { padding: 1rem 2rem; font-size: 1.1rem; }
.btn-small { padding: 0.5rem 1rem; font-size: 0.85rem; }
.btn-icon {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s;
}
.btn-icon:hover { transform: scale(1.1); }
.btn-action {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

/* FORMS */
input, textarea, select {
  padding: 0.75rem 1rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s;
}
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: ${colors.primary};
  box-shadow: 0 0 0 3px ${colors.primary}20;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${colors.text};
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* BADGES */
.badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}
.badge-success {
  background: #10b98120;
  color: #10b981;
}
.badge-error {
  background: #ef444420;
  color: #ef4444;
}
.badge-warning {
  background: #f59e0b20;
  color: #f59e0b;
}
.badge-info {
  background: ${colors.primary}20;
  color: ${colors.primary};
}
.badge-secondary {
  background: #64748b20;
  color: #64748b;
}

/* TABLES */
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table thead {
  background: ${colors.surface};
  border-bottom: 2px solid #e5e7eb;
}
.data-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 700;
  color: ${colors.text};
}
.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}
.data-table tbody tr:hover {
  background: ${colors.surface};
}
.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

/* CARDS */
.card {
  background: ${colors.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s;
}
.card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* CONTAINER */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
    `;
  }

  static generateSaaSDashboard(colors) {
    return `
/* DASHBOARD */
.dashboard {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}
.sidebar {
  background: ${colors.surface};
  border-right: 1px solid #e5e7eb;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
}
.sidebar-header {
  margin-bottom: 2rem;
}
.logo {
  font-size: 1.5rem;
  font-weight: 900;
  color: ${colors.primary};
}
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: ${colors.text};
  text-decoration: none;
  transition: all 0.3s;
}
.menu-item:hover,
.menu-item.active {
  background: ${colors.primary}20;
  color: ${colors.primary};
}
.sidebar-footer {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}
.sidebar-logout {
  width: 100%;
  padding: 0.75rem;
  background: #ef444415;
  color: #ef4444;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.dashboard-main {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: ${colors.bg};
}
.header-left h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.header-date {
  color: #6b7280;
}
.header-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.header-search {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  min-width: 300px;
}
.header-icon {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.dashboard-content {
  padding: 2rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: ${colors.surface};
  border: 1px solid #e5e7eb;
  border-left: 4px solid ${colors.primary};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.metric-icon {
  font-size: 2.5rem;
}

.metric-details {
  flex: 1;
}

.metric-label {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: ${colors.text};
}

.metric-change {
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card,
.activity-card,
.table-card {
  background: ${colors.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  font-size: 1.1rem;
  color: ${colors.text};
}

.card-header select {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder svg {
  width: 100%;
  height: 100%;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${colors.primary};
}

.activity-item time {
  margin-left: auto;
  color: #6b7280;
  font-size: 0.85rem;
}

.table-card {
  grid-column: 1 / -1;
}

.table-wrapper {
  overflow-x: auto;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.pagination {
  display: flex;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover,
.pagination-btn.active {
  background: ${colors.primary};
  color: white;
  border-color: ${colors.primary};
}

.actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
  .sidebar {
    order: 2;
    border-right: none;
    border-top: 1px solid #e5e7eb;
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .header-search {
    min-width: auto;
  }
  .table-card {
    grid-column: auto;
  }
}
    `;
  }

  static generateEcommerce(colors) {
    return `
/* ECOMMERCE */
.ecom-navbar {
  background: ${colors.surface};
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 900;
  color: ${colors.primary};
  white-space: nowrap;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
}

.navbar-menu a {
  color: ${colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.navbar-menu a:hover {
  color: ${colors.primary};
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

.cart-btn {
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.ecom-hero {
  background: ${colors.gradient};
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.ecom-products {
  padding: 4rem 0;
}

.ecom-products h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: ${colors.text};
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.product-card {
  background: ${colors.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transform: translateY(-5px);
}

.product-image {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${colors.primary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.product-card h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${colors.text};
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 1rem;
}

.btn-add-cart {
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: auto;
}

.btn-add-cart:hover {
  background: ${colors.secondary};
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 1rem;
  }
  .navbar-menu {
    display: none;
  }
  .search-input {
    min-width: auto;
    width: 100%;
  }
}
    `;
  }

  static generateAuth(colors) {
    return `
/* AUTH */
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.gradient};
  padding: 1rem;
}

.auth-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 900px;
  gap: 2rem;
  align-items: center;
}

.auth-box {
  background: ${colors.surface};
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}

.auth-header h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: ${colors.text};
}

.auth-header p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox input {
  width: auto;
}

.auth-divider {
  text-align: center;
  margin: 1.5rem 0;
  color: #6b7280;
  position: relative;
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb;
}

.auth-divider {
  position: relative;
  z-index: 1;
}

.auth-socials {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.social-btn:hover {
  border-color: ${colors.primary};
  background: ${colors.primary}10;
}

.auth-footer {
  text-align: center;
  color: #6b7280;
}

.auth-footer a {
  color: ${colors.primary};
  text-decoration: none;
  font-weight: 600;
}

.auth-side {
  color: white;
}

.side-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.side-features {
  list-style: none;
  margin-top: 2rem;
}

.side-features li {
  padding: 0.75rem 0;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .auth-wrapper {
    grid-template-columns: 1fr;
  }
  .auth-side {
    display: none;
  }
  .auth-box {
    padding: 2rem;
  }
}
    `;
  }

  static generateTable(colors) {
    return `
/* DATA TABLE */
.data-table-container {
  background: ${colors.bg};
  padding: 2rem;
  border-radius: 12px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.table-header h2 {
  color: ${colors.text};
  font-size: 1.5rem;
}

.table-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.table-search {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  min-width: 200px;
}

.table-filter {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: ${colors.surface};
  cursor: pointer;
}

.table-wrapper {
  background: ${colors.surface};
  border-radius: 12px;
  overflow-x: auto;
}

.result-count {
  color: #6b7280;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .table-controls {
    width: 100%;
  }
  .table-search,
  .table-filter {
    flex: 1;
    min-width: 0;
  }
}
    `;
  }

  static generateLanding(colors) {
    return `
/* LANDING */
.landing {
  background: ${colors.bg};
}

.landing-nav {
  background: ${colors.surface};
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

.logo {
  font-size: 1.5rem;
  font-weight: 900;
  color: ${colors.primary};
}

.nav-links {
  display: flex;
  gap: 2rem;
  flex: 1;
}

.nav-links a {
  color: ${colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.nav-links a:hover {
  color: ${colors.primary};
}

.landing-hero {
  background: ${colors.gradient};
  color: white;
  padding: 8rem 2rem;
  text-align: center;
}

.hero-container {
  max-width: 800px;
  margin: 0 auto;
}

.hero-container h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-container > p {
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

.landing-features,
.landing-pricing,
.landing-cta {
  padding: 6rem 2rem;
  text-align: center;
}

.landing-features h2,
.landing-pricing h2,
.landing-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${colors.text};
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-box {
  background: ${colors.surface};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s;
}

.feature-box:hover {
  border-color: ${colors.primary};
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transform: translateY(-5px);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-box {
  background: ${colors.surface};
  padding: 2.5rem;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s;
}

.pricing-box.featured {
  border-color: ${colors.primary};
  box-shadow: 0 20px 50px ${colors.primary}20;
  transform: scale(1.05);
}

.pricing-box h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${colors.text};
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 1.5rem;
}

.price span {
  font-size: 1rem;
  color: #6b7280;
}

.landing-cta {
  background: ${colors.gradient};
  color: white;
}

.landing-cta h2,
.landing-cta p {
  color: white;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
  }
  .nav-links {
    display: none;
  }
  .hero-container h1 {
    font-size: 2rem;
  }
  .hero-buttons {
    flex-direction: column;
  }
  .btn-lg {
    width: 100%;
  }
  .pricing-box.featured {
    transform: scale(1);
  }
}
    `;
  }

  static generate(colors, analysis = {}) {
    let css = this.generateBase(colors, analysis);

    // Add specific CSS based on domain
    if (analysis.isDomain?.saas) {
      css += this.generateSaaSDashboard(colors);
    } else if (analysis.isDomain?.ecommerce) {
      css += this.generateEcommerce(colors);
    } else if (analysis.isDomain?.auth) {
      css += this.generateAuth(colors);
    } else if (analysis.isDomain?.datatable) {
      css += this.generateTable(colors);
    } else if (analysis.isDomain?.landing) {
      css += this.generateLanding(colors);
    }

    return css;
  }
}

// ============================================================================
// JAVASCRIPT GENERATOR
// ============================================================================

class JSGenerator {
  static generate(analysis) {
    return `
(function() {
  'use strict';

  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // Cart Management
  function updateCart() {
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.textContent = '🛒 Cart (' + count + ')';
    }
  }

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.product-card');
      const product = {
        name: card.querySelector('h3')?.textContent || 'Product',
        price: parseFloat(card.querySelector('.product-price')?.textContent || 0)
      };
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
      this.textContent = '✓ Added!';
      setTimeout(() => { this.textContent = 'Add to Cart'; }, 1500);
    });
  });

  // Form Submission
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('✓ Form submitted');
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  updateCart();
  console.log('✅ Page initialized!');
})();
    `;
  }
}

// ============================================================================
// MAIN GENERATORS MAPPING
// ============================================================================

const TEMPLATE_GENERATORS = {
  'saas-dashboard': (rng, colors, analysis) => SaaSDashboardGenerator.generate(rng, colors, analysis),
  'ecommerce': (rng, colors, analysis) => EcommerceGenerator.generate(rng, colors),
  'login': (rng, colors, analysis) => AuthGenerator.generateLogin(rng, colors),
  'signup': (rng, colors, analysis) => AuthGenerator.generateSignup(rng, colors),
  'data-table': (rng, colors, analysis) => DataTableGenerator.generate(rng, colors),
  'landing': (rng, colors, analysis) => LandingPageGenerator.generate(rng, colors),
};

// ============================================================================
// MAIN MOCK API
// ============================================================================

const mockApi = {
  generate: async (prompt, options = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const seed = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * Date.now() % 1000000;
          const rng = new AdvancedRNG(seed);

          const analysis = PromptAnalyzer.analyze(prompt);
          const colors = PromptAnalyzer.getColorScheme(analysis, rng);
          const typography = PromptAnalyzer.getTypography(analysis);

          // Determine template type
          let template = 'landing';
          if (analysis.isDomain.saas) template = 'saas-dashboard';
          else if (analysis.isDomain.ecommerce) template = 'ecommerce';
          else if (analysis.isDomain.auth) template = analysis.isDomain.auth ? (prompt.toLowerCase().includes('signup') ? 'signup' : 'login') : 'login';
          else if (analysis.isDomain.datatable) template = 'data-table';

          // Generate HTML
          const generator = TEMPLATE_GENERATORS[template];
          const generatedHTML = generator ? generator(rng, colors, analysis) : '<p>Template not found</p>';

          const baseHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated UI</title>
  <style>${CSSGenerator.generate(colors, analysis)}</style>
</head>
<body>
  ${generatedHTML}
  <script>${JSGenerator.generate(analysis)}</script>
</body>
</html>
          `;

          resolve({
            success: true,
            data: {
              html: baseHTML,
              css: CSSGenerator.generate(colors, analysis),
              js: JSGenerator.generate(analysis),
              template,
              colors,
              typography,
              analysis,
              metadata: {
                generated: new Date().toISOString(),
                domain: Object.keys(analysis.isDomain).find(key => analysis.isDomain[key]),
              }
            }
          });
        } catch (error) {
          console.error('Generation error:', error);
          resolve({
            success: false,
            error: error.message,
            isMockData: true
          });
        }
      }, 1500);
    });
  }
};

export default mockApi;