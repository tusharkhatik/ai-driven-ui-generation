/**
 * BaseAppGenerator.js - Base class for app-style UIs
 * Used by: AITool, Social, Messaging, etc.
 * 
 * @extends BaseGenerator
 * @version 2.0.0
 */

import BaseGenerator from './BaseGenerator.js';

class BaseAppGenerator extends BaseGenerator {
  constructor(config = {}) {
    super(config);
    this.appType = config.appType || 'standard';
  }

  /**
   * Generate app header
   * @returns {string} Header HTML
   */
  generateAppHeader() {
    return `
<header class="app-header">
  <div class="header-left">
    <button class="menu-toggle">☰</button>
    <h1 class="app-title">${this.getAppTitle()}</h1>
  </div>
  <div class="header-right">
    <button class="icon-btn">🔔</button>
    <button class="icon-btn">👤</button>
  </div>
</header>
    `.trim();
  }

  /**
   * Generate floating action button
   * @returns {string} FAB HTML
   */
  generateFAB() {
    return `
<button class="fab" title="${this.getFABLabel()}">
  ${this.getFABIcon()}
</button>
    `.trim();
  }

  /**
   * Generate bottom navigation (mobile style)
   * @returns {string} Bottom nav HTML
   */
  generateBottomNav() {
    const items = this.getBottomNavItems();
    return `
<nav class="bottom-nav">
  ${items.map((item, idx) => `
    <a href="#" class="nav-item ${idx === 0 ? 'active' : ''}">
      <span class="nav-icon">${item.icon}</span>
      <span class="nav-label">${item.label}</span>
    </a>
  `).join('')}
</nav>
    `.trim();
  }

  /**
   * Generate message/chat bubble
   * @param {Object} message - Message data
   * @returns {string} Message HTML
   */
  generateMessageBubble(message) {
    const isOwn = message.own || false;
    return `
<div class="message-bubble ${isOwn ? 'own' : 'other'}">
  ${!isOwn ? `<div class="avatar">${message.avatar}</div>` : ''}
  <div class="bubble-content">
    <p class="message-text">${message.text}</p>
    <span class="message-time">${message.time}</span>
  </div>
</div>
    `.trim();
  }

  /**
   * Generate user list item
   * @param {Object} user - User data
   * @returns {string} User item HTML
   */
  generateUserItem(user) {
    const status = user.online ? '🟢' : '⚪';
    return `
<div class="user-item">
  <div class="user-avatar">${user.avatar}</div>
  <div class="user-info">
    <h4 class="user-name">${user.name}</h4>
    <p class="user-status">${status} ${user.status}</p>
  </div>
  ${user.unread ? `<span class="badge">${user.unread}</span>` : ''}
</div>
    `.trim();
  }

  /**
   * Get app title
   * @returns {string} Title
   */
  getAppTitle() {
    const titles = {
      aiTool: '🤖 AI Assistant',
      social: '📱 Social Network',
      messaging: '💬 Messaging',
      default: 'App'
    };
    return titles[this.category] || titles.default;
  }

  /**
   * Get bottom navigation items
   * @returns {Array} Nav items
   */
  getBottomNavItems() {
    return [
      { icon: '🏠', label: 'Home' },
      { icon: '🔍', label: 'Explore' },
      { icon: '🎯', label: 'Saved' },
      { icon: '📧', label: 'Messages' }
    ];
  }

  /**
   * Get FAB (floating action button) label
   * @returns {string} Label
   */
  getFABLabel() {
    return 'New';
  }

  /**
   * Get FAB icon
   * @returns {string} Icon emoji
   */
  getFABIcon() {
    return '✍️';
  }

  /**
   * Generate app-specific CSS
   * @returns {string} CSS
   */
  generateAppCss() {
    return `
/* App Layout */
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${this.theme.bg};
}

/* Header */
.app-header {
  background: ${this.theme.surface};
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  sticky top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
}

.app-title {
  font-size: 1.3rem;
  color: ${this.theme.text};
}

.header-right {
  display: flex;
  gap: 1rem;
}

/* Main Content */
.app-main {
  flex: 1;
  overflow-y: auto;
}

/* Bottom Navigation */
.bottom-nav {
  background: ${this.theme.surface};
  border-top: 1px solid #e5e7eb;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-around;
  position: sticky;
  bottom: 0;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: ${this.theme.text};
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-item:hover,
.nav-item.active {
  color: ${this.theme.primary};
}

.nav-icon {
  font-size: 1.3rem;
}

.nav-label {
  font-size: 0.75rem;
  font-weight: 600;
}

/* FAB - Floating Action Button */
.fab {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${this.theme.primary};
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
  z-index: 99;
}

.fab:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

/* Messages */
.messages-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  padding-bottom: 80px;
}

.message-bubble {
  display: flex;
  gap: 0.75rem;
  animation: fadeIn 0.3s ease;
}

.message-bubble.own {
  justify-content: flex-end;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${this.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.2rem;
}

.bubble-content {
  max-width: 70%;
}

.message-text {
  background: ${this.message_bubble_bg || '#f0f0f0'};
  padding: 0.75rem 1rem;
  border-radius: 12px;
  word-wrap: break-word;
  color: ${this.theme.text};
}

.message-bubble.own .message-text {
  background: ${this.theme.primary};
  color: white;
}

.message-time {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
  display: block;
  padding: 0 1rem;
}

/* User List */
.user-list {
  display: flex;
  flex-direction: column;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-item:hover {
  background: ${this.theme.bg};
}

.user-avatar {
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

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: ${this.theme.text};
  margin-bottom: 0.25rem;
}

.user-status {
  font-size: 0.85rem;
  color: #6b7280;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .fab {
    bottom: 70px;
  }
  
  .message-bubble {
    max-width: 90%;
  }
  
  .bubble-content {
    max-width: 100%;
  }
}
    `.trim();
  }
}

export default BaseAppGenerator;
