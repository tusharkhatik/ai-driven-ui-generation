/**
 * BaseDashboardGenerator.js - Base class for dashboard-style UIs
 * Extends BaseGenerator with dashboard-specific components
 * Used by: CRM, Finance, Healthcare, Education, etc.
 * 
 * @extends BaseGenerator
 * @version 2.0.0
 */

import BaseGenerator from './BaseGenerator.js';

class BaseDashboardGenerator extends BaseGenerator {
  constructor(config = {}) {
    super(config);
    this.dashboardType = config.dashboardType || 'analytics';
    this.navigationStyle = config.navigationStyle || 'sidebar'; // sidebar or topnav
  }

  /**
   * Generate sidebar navigation HTML
   * @returns {string} Sidebar HTML
   */
  generateSidebarNav() {
    const menuItems = this.getMenuItems();
    return `
<aside class="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-logo">${this.getLogoEmoji()} ${this.getCategoryTitle()}</div>
  </div>
  <nav class="sidebar-menu">
    ${menuItems.map((item, idx) => `
      <a href="#" class="menu-item ${idx === 0 ? 'active' : ''}">
        <span class="menu-icon">${item.icon}</span>
        <span class="menu-label">${item.label}</span>
      </a>
    `).join('')}
  </nav>
  <div class="sidebar-footer">
    <button class="btn-logout">🚪 Logout</button>
  </div>
</aside>
    `.trim();
  }

  /**
   * Generate top navigation HTML
   * @returns {string} Top nav HTML
   */
  generateTopNav() {
    return `
<nav class="topnav">
  <div class="topnav-container">
    <div class="topnav-logo">${this.getLogoEmoji()} ${this.getCategoryTitle()}</div>
    <div class="topnav-center">
      <input type="text" placeholder="🔍 Search..." class="search-input">
    </div>
    <div class="topnav-right">
      <button class="icon-btn">🔔</button>
      <button class="icon-btn">👤</button>
    </div>
  </div>
</nav>
    `.trim();
  }

  /**
   * Generate metrics/KPI cards
   * @returns {string} Metrics grid HTML
   */
  generateMetricsGrid() {
    const metrics = this.mockData.metrics || this.generateDefaultMetrics();
    return `
<div class="metrics-grid">
  ${metrics.map(metric => `
    <div class="metric-card" style="border-left-color: ${metric.color || this.theme.primary}">
      <div class="metric-icon">${metric.icon}</div>
      <div class="metric-details">
        <p class="metric-label">${metric.label}</p>
        <h3 class="metric-value">${metric.value}</h3>
        <span class="metric-change" style="color: ${metric.trend > 0 ? '#10b981' : '#ef4444'}">
          ${metric.trend > 0 ? '↑' : '↓'} ${Math.abs(metric.trend)}%
        </span>
      </div>
    </div>
  `).join('')}
</div>
    `.trim();
  }

  /**
   * Generate chart placeholder
   * @returns {string} Chart HTML
   */
  generateChart() {
    return `
<div class="chart-card">
  <div class="card-header">
    <h3>Analytics</h3>
    <select class="time-range">
      <option>Last 7 days</option>
      <option>Last 30 days</option>
      <option>Last 90 days</option>
    </select>
  </div>
  <div class="chart-placeholder">
    <svg viewBox="0 0 400 200" style="width: 100%; height: 200px;">
      <polyline points="0,150 50,120 100,140 150,100 200,110 250,80 300,90 350,60 400,40" 
        fill="none" stroke="${this.theme.primary}" stroke-width="3"/>
      <circle cx="400" cy="40" r="4" fill="${this.theme.primary}"/>
    </svg>
  </div>
</div>
    `.trim();
  }

  /**
   * Generate data table
   * @returns {string} Table HTML
   */
  generateDataTable() {
    const columns = this.getTableColumns();
    const rows = this.mockData.tableRows || this.generateDefaultTableRows();
    
    return `
<div class="table-card">
  <div class="card-header">
    <h3>${this.getTableTitle()}</h3>
    <button class="btn btn-primary btn-small">+ Add</button>
  </div>
  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th><input type="checkbox"></th>
          ${columns.map(col => `<th>${col}</th>`).join('')}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row, idx) => `
          <tr>
            <td><input type="checkbox"></td>
            ${Object.values(row).map(val => `<td>${val}</td>`).join('')}
            <td>
              <button class="icon-btn">✏️</button>
              <button class="icon-btn">🗑️</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>
    `.trim();
  }

  /**
   * Get dashboard-specific menu items
   * Override in subclasses
   * @returns {Array} Menu items
   */
  getMenuItems() {
    return [
      { icon: '📊', label: 'Dashboard' },
      { icon: '👥', label: 'Users' },
      { icon: '📈', label: 'Analytics' },
      { icon: '⚙️', label: 'Settings' }
    ];
  }

  /**
   * Get table columns
   * Override in subclasses
   * @returns {Array} Column names
   */
  getTableColumns() {
    return ['Name', 'Email', 'Status', 'Date'];
  }

  /**
   * Get table title
   * @returns {string} Title
   */
  getTableTitle() {
    return `${this.getCategoryTitle()} List`;
  }

  /**
   * Generate default metrics
   * @returns {Array} Metrics data
   */
  generateDefaultMetrics() {
    return [
      {
        label: 'Total',
        value: this.rng.int(1000, 50000),
        icon: '📊',
        color: this.theme.primary,
        trend: this.rng.int(-15, 30)
      },
      {
        label: 'Revenue',
        value: '$' + this.rng.int(10, 100) + 'K',
        icon: '💰',
        color: this.theme.secondary,
        trend: this.rng.int(-10, 25)
      },
      {
        label: 'Growth',
        value: this.rng.int(2, 8) + '%',
        icon: '📈',
        color: '#10b981',
        trend: this.rng.int(5, 20)
      },
      {
        label: 'Users',
        value: this.rng.int(100, 5000),
        icon: '👥',
        color: '#f59e0b',
        trend: this.rng.int(-5, 30)
      }
    ];
  }

  /**
   * Generate default table rows
   * @returns {Array} Table row data
   */
  generateDefaultTableRows() {
    const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Edward Norton'];
    return names.map(name => ({
      'Name': name,
      'Email': name.toLowerCase().replace(' ', '.') + '@example.com',
      'Status': this.rng.bool(0.7) ? 'Active' : 'Inactive',
      'Date': new Date(Date.now() - this.rng.int(0, 90) * 86400000).toLocaleDateString()
    }));
  }

  /**
   * Get category title
   * @returns {string} Title
   */
  getCategoryTitle() {
    const titles = {
      crm: 'CRM System',
      finance: 'Finance Dashboard',
      healthcare: 'Healthcare',
      education: 'Education Platform',
      default: 'Dashboard'
    };
    return titles[this.category] || titles.default;
  }

  /**
   * Get category logo emoji
   * @returns {string} Emoji
   */
  getLogoEmoji() {
    const emojis = {
      crm: '🤝',
      finance: '💰',
      healthcare: '🏥',
      education: '🎓',
      default: '📊'
    };
    return emojis[this.category] || emojis.default;
  }

  /**
   * Generate dashboard-specific CSS
   * @returns {string} CSS
   */
  generateDashboardCss() {
    return `
/* Dashboard Layout */
.dashboard {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  background: ${this.theme.bg};
}

/* Sidebar */
.sidebar {
  background: ${this.theme.surface};
  border-right: 1px solid #e5e7eb;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.sidebar-header {
  margin-bottom: 2rem;
}

.sidebar-logo {
  font-size: 1.3rem;
  font-weight: 700;
  color: ${this.theme.primary};
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
  color: ${this.theme.text};
  text-decoration: none;
  transition: all 0.3s ease;
}

.menu-item:hover,
.menu-item.active {
  background: ${this.theme.primary}20;
  color: ${this.theme.primary};
}

.sidebar-footer {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

/* Top Navigation */
.topnav {
  background: ${this.theme.surface};
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.topnav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.topnav-logo {
  font-size: 1.3rem;
  font-weight: 700;
  color: ${this.theme.primary};
  white-space: nowrap;
}

.topnav-center {
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
}

.topnav-right {
  display: flex;
  gap: 1rem;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}

/* Main Content */
.dashboard-main {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.dashboard-header {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: ${this.theme.bg};
}

.dashboard-content {
  padding: 2rem;
  flex: 1;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-left: 4px solid ${this.theme.primary};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
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
  color: ${this.theme.text};
  margin-bottom: 0.5rem;
}

.metric-change {
  font-weight: 600;
  font-size: 0.9rem;
}

/* Cards */
.chart-card,
.table-card {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  font-size: 1.1rem;
  color: ${this.theme.text};
}

.time-range {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

/* Chart */
.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: ${this.theme.bg};
  border-bottom: 2px solid #e5e7eb;
}

.data-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 700;
  color: ${this.theme.text};
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.data-table tbody tr:hover {
  background: ${this.theme.bg};
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.btn-logout {
  width: 100%;
  padding: 0.75rem;
  background: #ef444415;
  color: #ef4444;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background: #ef444430;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    flex-direction: row;
    order: 2;
    border-right: none;
    border-top: 1px solid #e5e7eb;
    padding: 1rem;
  }
  
  .sidebar-menu {
    flex-direction: row;
    flex: 1;
  }
  
  .topnav-container {
    flex-wrap: wrap;
  }
  
  .topnav-center {
    order: 3;
    width: 100%;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .metric-card {
    padding: 1rem;
    gap: 1rem;
  }
  
  .metric-icon {
    font-size: 2rem;
  }
}
    `.trim();
  }
}

export default BaseDashboardGenerator;
