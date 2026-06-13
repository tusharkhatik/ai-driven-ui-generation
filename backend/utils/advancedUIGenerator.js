/**
 * Advanced UI Generator - Produces amazing, unique outputs for various application styles
 * Supports: Social Media (Facebook, Instagram, WhatsApp), Productivity, E-commerce, Streaming, etc.
 */

const UIStyleTemplates = {
  // ============================================================================
  // SOCIAL MEDIA INTERFACES
  // ============================================================================
  socialFeed: {
    name: 'Social Media Feed',
    keywords: ['social', 'feed', 'posts', 'timeline', 'stream', 'network'],
    generateHTML: (colors, rng) => `
      <div class="social-container">
        <div class="social-header">
          <div class="header-content">
            <h1>Feed</h1>
            <div class="header-icons">
              <span class="icon-btn">🔍</span>
              <span class="icon-btn">💬</span>
              <span class="icon-btn">🔔</span>
            </div>
          </div>
        </div>
        
        <div class="social-main">
          <aside class="social-sidebar">
            <div class="sidebar-section">
              <div class="sidebar-item active">🏠 Home</div>
              <div class="sidebar-item">🔍 Explore</div>
              <div class="sidebar-item">💬 Messages</div>
              <div class="sidebar-item">🔖 Bookmarks</div>
              <div class="sidebar-item">👥 Friends</div>
              <div class="sidebar-item">⚙️ Settings</div>
            </div>
          </aside>

          <div class="feed-container">
            <!-- Story Section -->
            <div class="stories-strip">
              ${['Your Story', 'Alex', 'Sarah', 'John', 'Emma'].map((name, i) => `
                <div class="story-bubble" style="background: linear-gradient(135deg, hsl(${i * 72}, 70%, 60%), hsl(${i * 72 + 30}, 70%, 50%));">
                  <span class="story-label">${name}</span>
                </div>
              `).join('')}
            </div>

            <!-- Post Creator -->
            <div class="post-creator">
              <div class="creator-avatar"></div>
              <input type="text" placeholder="What's on your mind?" class="creator-input">
              <div class="creator-toolbar">
                <button class="tool-btn">📷</button>
                <button class="tool-btn">😊</button>
                <button class="tool-btn">📍</button>
              </div>
            </div>

            <!-- Feed Posts -->
            <div class="posts-feed">
              ${[1, 2, 3].map(i => `
                <div class="feed-post">
                  <div class="post-header">
                    <div class="author-avatar"></div>
                    <div class="author-info">
                      <div class="author-name">User ${i}</div>
                      <div class="post-time">2 hours ago</div>
                    </div>
                    <span class="post-menu">⋮</span>
                  </div>
                  <div class="post-content">
                    <p>Just shared an amazing moment! Check this out 🎉</p>
                  </div>
                  <div class="post-media" style="background: linear-gradient(135deg, hsl(${i * 120}, 70%, 60%), hsl(${i * 120 + 30}, 70%, 50%));"></div>
                  <div class="post-actions">
                    <span class="action">👍 Like</span>
                    <span class="action">💬 Comment</span>
                    <span class="action">↗️ Share</span>
                  </div>
                  <div class="post-stats">
                    <span>${100 * i} Likes</span>
                    <span>${20 * i} Comments</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <aside class="social-right-panel">
            <div class="panel-section">
              <h3>Trending</h3>
              ${['#Technology', '#Programming', '#WebDevelopment', '#AI', '#Innovation'].map((tag, i) => `
                <div class="trending-item">
                  <div>${tag}</div>
                  <div class="trend-count">${1000 * (i + 1)}K posts</div>
                </div>
              `).join('')}
            </div>
          </aside>
        </div>
      </div>
    `,
    generateCSS: (colors) => `
      .social-container {
        min-height: 100vh;
        background: ${colors.bg};
      }

      .social-header {
        background: ${colors.surface};
        border-bottom: 1px solid #e5e7eb;
        padding: 12px 20px;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .header-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-icons {
        display: flex;
        gap: 16px;
      }

      .icon-btn {
        font-size: 20px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .icon-btn:hover {
        opacity: 0.7;
        transform: scale(1.1);
      }

      .social-main {
        display: grid;
        grid-template-columns: 240px 1fr 300px;
        max-width: 1400px;
        margin: 0 auto;
        gap: 20px;
        padding: 20px;
      }

      .social-sidebar, .social-right-panel {
        position: sticky;
        top: 60px;
        height: fit-content;
        background: ${colors.surface};
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }

      .sidebar-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .sidebar-item {
        padding: 10px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 500;
      }

      .sidebar-item:hover, .sidebar-item.active {
        background: ${colors.primary}15;
        color: ${colors.primary};
      }

      .feed-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .stories-strip {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        padding: 12px;
        background: ${colors.surface};
        border-radius: 12px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }

      .story-bubble {
        width: 100px;
        height: 150px;
        border-radius: 12px;
        flex-shrink: 0;
        cursor: pointer;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        transition: all 0.3s;
        border: 3px solid transparent;
      }

      .story-bubble:hover {
        border-color: ${colors.primary};
        transform: scale(1.05);
      }

      .story-label {
        color: white;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 8px;
        text-align: center;
      }

      .post-creator {
        background: ${colors.surface};
        border-radius: 12px;
        padding: 16px;
        display: flex;
        gap: 12px;
        align-items: flex-start;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }

      .creator-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${colors.primary}30;
        flex-shrink: 0;
      }

      .creator-input {
        flex: 1;
        background: #f3f4f6;
        border: none;
        padding: 10px 16px;
        border-radius: 20px;
        outline: none;
      }

      .creator-toolbar {
        display: flex;
        gap: 8px;
      }

      .tool-btn {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .tool-btn:hover {
        transform: scale(1.2);
      }

      .posts-feed {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .feed-post {
        background: ${colors.surface};
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }

      .post-header {
        display: flex;
        gap: 12px;
        padding: 12px 16px;
        align-items: center;
      }

      .author-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
      }

      .author-info {
        flex: 1;
      }

      .author-name {
        font-weight: 600;
        font-size: 14px;
      }

      .post-time {
        font-size: 12px;
        color: #6b7280;
      }

      .post-menu {
        cursor: pointer;
        font-size: 14px;
      }

      .post-content {
        padding: 0 16px 12px;
        line-height: 1.5;
      }

      .post-media {
        width: 100%;
        height: 300px;
      }

      .post-actions {
        display: flex;
        justify-content: space-around;
        padding: 8px 0;
        border-top: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
        font-size: 14px;
        font-weight: 500;
      }

      .action {
        cursor: pointer;
        padding: 8px;
        transition: all 0.2s;
      }

      .action:hover {
        color: ${colors.primary};
        transform: scale(1.05);
      }

      .post-stats {
        display: flex;
        gap: 16px;
        padding: 8px 16px;
        font-size: 13px;
        color: #6b7280;
      }

      .panel-section {
        background: ${colors.surface};
        padding: 16px;
        border-radius: 12px;
      }

      .panel-section h3 {
        margin-bottom: 12px;
        font-size: 14px;
      }

      .trending-item {
        padding: 8px 0;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .trending-item:hover {
        padding-left: 8px;
        color: ${colors.primary};
      }

      .trend-count {
        font-size: 12px;
        color: #6b7280;
        margin-top: 2px;
      }

      @media (max-width: 1024px) {
        .social-main {
          grid-template-columns: 1fr;
        }
        .social-sidebar, .social-right-panel {
          display: none;
        }
      }
    `
  },

  // ============================================================================
  // MESSAGING INTERFACE
  // ============================================================================
  messagingApp: {
    name: 'Messaging Application',
    keywords: ['chat', 'message', 'messaging', 'messenger', 'conversation', 'talk'],
    generateHTML: (colors, rng) => `
      <div class="messaging-app">
        <div class="chat-layout">
          <!-- Conversations Sidebar -->
          <aside class="conversations-panel">
            <div class="panel-header">
              <h2>Chats</h2>
              <div class="header-actions">
                <button class="action-icon">📱</button>
                <button class="action-icon">⚙️</button>
              </div>
            </div>

            <div class="search-box">
              <input type="text" placeholder="Search conversations...">
            </div>

            <div class="conversations-list">
              ${[1, 2, 3, 4, 5].map(i => `
                <div class="conversation-item ${i === 1 ? 'active' : ''}">
                  <div class="conv-avatar" style="background: linear-gradient(135deg, hsl(${i * 72}, 70%, 60%), hsl(${i * 72 + 30}, 70%, 50%));"></div>
                  <div class="conv-info">
                    <div class="conv-name">Person ${i}</div>
                    <div class="conv-preview">Last message preview...</div>
                  </div>
                  <div class="conv-time">12:30</div>
                </div>
              `).join('')}
            </div>
          </aside>

          <!-- Chat Window -->
          <div class="chat-window">
            <!-- Chat Header -->
            <div class="chat-header">
              <div class="header-left">
                <div class="chat-avatar"></div>
                <div class="chat-info">
                  <h3>Person 1</h3>
                  <p>Online</p>
                </div>
              </div>
              <div class="header-right">
                <button class="icon-btn">📞</button>
                <button class="icon-btn">📹</button>
                <button class="icon-btn">ℹ️</button>
              </div>
            </div>

            <!-- Messages -->
            <div class="messages-container">
              ${[
                { sent: false, text: 'Hey! How are you?' },
                { sent: true, text: 'I\'m doing great! Just finished a project' },
                { sent: false, text: 'That\'s awesome! 🎉' },
                { sent: true, text: 'Thanks! Want to grab coffee?' },
                { sent: false, text: 'Sure! When?' }
              ].map((msg, i) => `
                <div class="message ${msg.sent ? 'sent' : 'received'}">
                  <div class="message-content">${msg.text}</div>
                  <div class="message-time">12:${20 + i}0</div>
                </div>
              `).join('')}
            </div>

            <!-- Input Area -->
            <div class="input-area">
              <button class="input-icon">😊</button>
              <button class="input-icon">📎</button>
              <input type="text" placeholder="Type a message...">
              <button class="input-icon">🎤</button>
            </div>
          </div>

          <!-- Right Panel -->
          <aside class="chat-details">
            <h3>Chat Details</h3>
            <div class="detail-section">
              <p>Members: 1</p>
              <p>Created: 2 weeks ago</p>
              <p>Notifications: On</p>
            </div>
          </aside>
        </div>
      </div>
    `,
    generateCSS: (colors) => `
      .messaging-app {
        height: 100vh;
        background: ${colors.bg};
        display: flex;
      }

      .chat-layout {
        display: grid;
        grid-template-columns: 280px 1fr 300px;
        height: 100%;
        background: ${colors.bg};
      }

      .conversations-panel {
        background: ${colors.surface};
        border-right: 1px solid #e5e7eb;
        display: flex;
        flex-direction: column;
        padding: 12px;
      }

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding: 12px 0;
      }

      .panel-header h2 {
        font-size: 24px;
        font-weight: 800;
      }

      .header-actions {
        display: flex;
        gap: 8px;
      }

      .action-icon {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .action-icon:hover {
        background: #f3f4f6;
      }

      .search-box {
        margin-bottom: 12px;
      }

      .search-box input {
        width: 100%;
        background: #f3f4f6;
        border: none;
        padding: 10px 12px;
        border-radius: 20px;
        outline: none;
      }

      .conversations-list {
        flex: 1;
        overflow-y: auto;
      }

      .conversation-item {
        display: flex;
        gap: 12px;
        padding: 8px;
        margin: 4px 0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        align-items: center;
      }

      .conversation-item:hover, .conversation-item.active {
        background: ${colors.primary}15;
      }

      .conv-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .conv-info {
        flex: 1;
        min-width: 0;
      }

      .conv-name {
        font-weight: 600;
        font-size: 13px;
        margin-bottom: 4px;
      }

      .conv-preview {
        font-size: 12px;
        color: #6b7280;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .conv-time {
        font-size: 12px;
        color: #6b7280;
        flex-shrink: 0;
      }

      .chat-window {
        display: flex;
        flex-direction: column;
        background: ${colors.bg};
        border-right: 1px solid #e5e7eb;
      }

      .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 20px;
        border-bottom: 1px solid #e5e7eb;
        background: ${colors.surface};
      }

      .header-left {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .chat-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${colors.primary}30;
      }

      .chat-info h3 {
        margin: 0;
        font-size: 14px;
      }

      .chat-info p {
        margin: 2px 0 0;
        font-size: 12px;
        color: #6b7280;
      }

      .header-right {
        display: flex;
        gap: 12px;
      }

      .icon-btn {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
      }

      .messages-container {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .message {
        display: flex;
        flex-direction: column;
        max-width: 60%;
        animation: slideIn 0.3s ease-out;
      }

      .message.sent {
        align-self: flex-end;
      }

      .message-content {
        background: ${colors.primary};
        color: white;
        padding: 10px 14px;
        border-radius: 12px;
        word-wrap: break-word;
      }

      .message.received .message-content {
        background: #e5e7eb;
        color: #1f2937;
      }

      .message-time {
        font-size: 11px;
        color: #6b7280;
        margin-top: 4px;
        padding: 0 4px;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .input-area {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 12px 20px;
        border-top: 1px solid #e5e7eb;
        background: ${colors.surface};
      }

      .input-icon {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .input-icon:hover {
        transform: scale(1.2);
      }

      .input-area input {
        flex: 1;
        background: #f3f4f6;
        border: none;
        padding: 10px 12px;
        border-radius: 20px;
        outline: none;
      }

      .chat-details {
        background: ${colors.surface};
        border-left: 1px solid #e5e7eb;
        padding: 20px;
        display: flex;
        flex-direction: column;
      }

      .chat-details h3 {
        margin-bottom: 16px;
        font-size: 14px;
      }

      .detail-section {
        font-size: 13px;
      }

      .detail-section p {
        margin: 8px 0;
        color: #6b7280;
      }

      @media (max-width: 1024px) {
        .chat-layout {
          grid-template-columns: 1fr;
        }
        .conversations-panel, .chat-details {
          display: none;
        }
        .message {
          max-width: 85%;
        }
      }
    `
  },

  // ============================================================================
  // E-COMMERCE STOREFRONT
  // ============================================================================
  ecommercePremium: {
    name: 'Premium E-Commerce Store',
    keywords: ['shop', 'store', 'ecommerce', 'product', 'buy', 'sale', 'marketplace'],
    generateHTML: (colors, rng) => `
      <div class="ecom-store">
        <!-- Navigation -->
        <nav class="store-nav">
          <div class="nav-container">
            <div class="logo">🛍️ ShopHub</div>
            <div class="nav-menu">
              <a href="#">Home</a>
              <a href="#">Categories</a>
              <a href="#">Deals</a>
              <a href="#">Contact</a>
            </div>
            <div class="nav-right">
              <input type="text" placeholder="Search products...">
              <button class="cart-btn">🛒 Cart (0)</button>
              <button class="account-btn">👤</button>
            </div>
          </div>
        </nav>

        <!-- Hero Banner -->
        <section class="hero-banner" style="background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});">
          <div class="banner-content">
            <h1>Summer Collection</h1>
            <p>Discover the latest trends with exclusive offers</p>
            <button class="btn-primary">Shop Now</button>
          </div>
        </section>

        <!-- Categories -->
        <section class="categories-section">
          <div class="container">
            <h2>Shop by Category</h2>
            <div class="categories-grid">
              ${['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Toys'].map((cat, i) => `
                <div class="category-card" style="background: linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%));">
                  <span>${cat}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Featured Products -->
        <section class="featured-products">
          <div class="container">
            <div class="section-header">
              <h2>Featured Products</h2>
              <a href="#" class="view-all">View All →</a>
            </div>
            <div class="products-grid">
              ${[1, 2, 3, 4, 5, 6, 7, 8].map(i => `
                <div class="product-card">
                  <div class="product-image" style="background: linear-gradient(135deg, hsl(${i * 45}, 70%, 60%), hsl(${i * 45 + 30}, 70%, 50%));"></div>
                  <div class="product-badge">-${10 + i}%</div>
                  <div class="product-info">
                    <h3>Premium Product ${i}</h3>
                    <div class="rating">⭐ 4.${5 + i % 5} (${100 * i} reviews)</div>
                    <div class="price-section">
                      <span class="price">$${99 + i * 10}</span>
                      <span class="original-price">$${129 + i * 10}</span>
                    </div>
                  </div>
                  <button class="btn-add-to-cart">Add to Cart</button>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Newsletter -->
        <section class="newsletter-section" style="background: ${colors.primary};">
          <div class="container">
            <h3>Subscribe to our Newsletter</h3>
            <p>Get exclusive deals and updates delivered to your inbox</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Enter your email">
              <button class="btn-subscribe">Subscribe</button>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="store-footer">
          <div class="footer-content">
            <div class="footer-section">
              <h4>About Us</h4>
              <p>Your trusted online shopping destination</p>
            </div>
            <div class="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Follow Us</h4>
              <div class="social-links">
                <a href="#">📘</a>
                <a href="#">🐦</a>
                <a href="#">📷</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    `,
    generateCSS: (colors) => `
      .ecom-store {
        background: ${colors.bg};
      }

      .store-nav {
        background: ${colors.surface};
        border-bottom: 1px solid #e5e7eb;
        position: sticky;
        top: 0;
        z-index: 100;
        padding: 12px 0;
      }

      .nav-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
      }

      .logo {
        font-size: 20px;
        font-weight: 900;
        color: ${colors.primary};
        white-space: nowrap;
      }

      .nav-menu {
        display: flex;
        gap: 30px;
        flex: 1;
      }

      .nav-menu a {
        color: #1f2937;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s;
      }

      .nav-menu a:hover {
        color: ${colors.primary};
      }

      .nav-right {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .nav-right input {
        padding: 8px 12px;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        outline: none;
      }

      .cart-btn, .account-btn {
        background: ${colors.primary};
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
      }

      .cart-btn:hover, .account-btn:hover {
        background: ${colors.secondary};
      }

      .hero-banner {
        padding: 80px 20px;
        text-align: center;
        color: white;
      }

      .banner-content h1 {
        font-size: 48px;
        margin-bottom: 12px;
        font-weight: 900;
      }

      .banner-content p {
        font-size: 18px;
        margin-bottom: 24px;
        opacity: 0.95;
      }

      .categories-section {
        padding: 60px 20px;
        background: ${colors.surface};
      }

      .container {
        max-width: 1400px;
        margin: 0 auto;
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      .section-header h2 {
        font-size: 32px;
        font-weight: 900;
        color: ${colors.text};
      }

      .view-all {
        color: ${colors.primary};
        text-decoration: none;
        font-weight: 600;
      }

      .categories-section h2 {
        margin-bottom: 32px;
        font-size: 28px;
      }

      .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
      }

      .category-card {
        padding: 40px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .category-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }

      .featured-products {
        padding: 60px 20px;
      }

      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 24px;
      }

      .product-card {
        background: ${colors.surface};
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
      }

      .product-card:hover {
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        transform: translateY(-8px);
      }

      .product-image {
        width: 100%;
        height: 200px;
        position: relative;
      }

      .product-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background: #ef4444;
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 12px;
      }

      .product-info {
        padding: 16px;
        flex: 1;
      }

      .product-info h3 {
        font-size: 14px;
        margin-bottom: 8px;
      }

      .rating {
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 12px;
      }

      .price-section {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }

      .price {
        font-size: 18px;
        font-weight: 700;
        color: ${colors.primary};
      }

      .original-price {
        font-size: 14px;
        color: #9ca3af;
        text-decoration: line-through;
      }

      .btn-add-to-cart {
        background: ${colors.primary};
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
      }

      .btn-add-to-cart:hover {
        background: ${colors.secondary};
      }

      .newsletter-section {
        padding: 60px 20px;
        text-align: center;
        color: white;
      }

      .newsletter-section h3 {
        font-size: 28px;
        margin-bottom: 12px;
      }

      .newsletter-section p {
        margin-bottom: 24px;
        opacity: 0.95;
      }

      .newsletter-form {
        display: flex;
        max-width: 400px;
        margin: 0 auto;
        gap: 8px;
      }

      .newsletter-form input {
        flex: 1;
        padding: 12px 16px;
        border: none;
        border-radius: 6px;
      }

      .btn-subscribe {
        background: white;
        color: ${colors.primary};
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-weight: 700;
        cursor: pointer;
      }

      .store-footer {
        background: #1f2937;
        color: white;
        padding: 40px 20px 20px;
      }

      .footer-content {
        max-width: 1400px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 40px;
        margin-bottom: 40px;
      }

      .footer-section h4 {
        margin-bottom: 16px;
      }

      .footer-section p {
        color: #d1d5db;
        font-size: 14px;
      }

      .footer-section ul {
        list-style: none;
      }

      .footer-section a {
        color: #d1d5db;
        text-decoration: none;
        transition: all 0.2s;
      }

      .footer-section a:hover {
        color: white;
      }

      .social-links {
        display: flex;
        gap: 12px;
        font-size: 20px;
      }

      .footer-bottom {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid #374151;
        color: #9ca3af;
      }

      @media (max-width: 768px) {
        .nav-container {
          flex-wrap: wrap;
        }
        .nav-menu {
          display: none;
        }
        .hero-banner {
          padding: 40px 20px;
        }
        .banner-content h1 {
          font-size: 32px;
        }
        .categories-grid {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        }
      }
    `
  }
};

module.exports = UIStyleTemplates;
