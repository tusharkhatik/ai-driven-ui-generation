/**
 * FinanceGenerator.js - Generator for Finance UIs
 * Supports: Expense Tracker, Banking Dashboard, Crypto Dashboard, Investment Dashboard
 * 
 * @extends BaseDashboardGenerator
 * @version 2.0.0
 */

import BaseDashboardGenerator from './base/BaseDashboardGenerator.js';

class FinanceGenerator extends BaseDashboardGenerator {
  constructor(config = {}) {
    super(config);
    this.category = 'finance';
    this.subcategory = config.subcategory || 'expenseTracker';
  }

  /**
   * Generate Finance HTML
   * @returns {Promise<string>} HTML content
   */
  async generateHTML() {
    let content = '';

    switch (this.subcategory) {
      case 'expenseTracker':
        content = this.generateExpenseTrackerUI();
        break;
      case 'bankingDashboard':
        content = this.generateBankingUI();
        break;
      case 'cryptoDashboard':
        content = this.generateCryptoUI();
        break;
      case 'investmentDashboard':
        content = this.generateInvestmentUI();
        break;
      default:
        content = this.generateExpenseTrackerUI();
    }

    return this.wrapDocument(content, await this.generateCSS(), await this.generateJS());
  }

  /**
   * Generate Expense Tracker UI
   * @returns {string} HTML
   */
  generateExpenseTrackerUI() {
    const expenses = this.mockData.expenses || this.generateMockExpenses();
    const budget = this.mockData.budget || this.generateMockBudget();

    return `
<div class="dashboard">
  ${this.generateSidebarNav()}
  <main class="dashboard-main">
    ${this.generateDashboardHeader('Expense Tracker')}
    <div class="dashboard-content">
      ${this.generateMetricsGrid()}
      
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header">
            <h3>Budget Overview</h3>
          </div>
          ${budget.categories.map(cat => `
            <div class="budget-item">
              <div class="budget-info">
                <span class="budget-name">${cat.name}</span>
                <span class="budget-amount">$${cat.spent} / $${cat.limit}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${(cat.spent/cat.limit)*100}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>Recent Expenses</h3>
          </div>
          <div class="expense-list">
            ${expenses.slice(0, 5).map(exp => `
              <div class="expense-item">
                <div class="expense-icon">${exp.icon}</div>
                <div class="expense-details">
                  <p class="expense-name">${exp.name}</p>
                  <p class="expense-date">${exp.date}</p>
                </div>
                <p class="expense-amount">-$${exp.amount}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
    `.trim();
  }

  /**
   * Generate Banking Dashboard UI
   * @returns {string} HTML
   */
  generateBankingUI() {
    const accounts = this.mockData.accounts || this.generateMockAccounts();
    const transactions = this.mockData.transactions || this.generateMockTransactions();

    return `
<div class="dashboard">
  ${this.generateSidebarNav()}
  <main class="dashboard-main">
    ${this.generateDashboardHeader('Banking Dashboard')}
    <div class="dashboard-content">
      <div class="accounts-grid">
        ${accounts.map(acc => `
          <div class="account-card">
            <div class="card-chip">💳</div>
            <div class="account-info">
              <p class="account-name">${acc.name}</p>
              <p class="account-number">•••• ${acc.lastFour}</p>
            </div>
            <p class="account-balance">$${acc.balance.toLocaleString()}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header">
            <h3>Recent Transactions</h3>
            <button class="btn btn-secondary btn-small">View All</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.slice(0, 8).map(txn => `
                <tr>
                  <td>${txn.date}</td>
                  <td>${txn.description}</td>
                  <td class="amount ${txn.type}">${txn.type === 'debit' ? '-' : '+'}$${txn.amount}</td>
                  <td><span class="badge badge-${txn.status}">${txn.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</div>
    `.trim();
  }

  /**
   * Generate Crypto Dashboard UI
   * @returns {string} HTML
   */
  generateCryptoUI() {
    const crypto = this.mockData.crypto || this.generateMockCrypto();
    const portfolio = this.mockData.portfolio || this.generateMockPortfolio();

    return `
<div class="dashboard">
  ${this.generateSidebarNav()}
  <main class="dashboard-main">
    ${this.generateDashboardHeader('Crypto Dashboard')}
    <div class="dashboard-content">
      ${this.generateMetricsGrid()}
      
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header">
            <h3>Portfolio Distribution</h3>
          </div>
          <div class="portfolio-grid">
            ${portfolio.assets.map(asset => `
              <div class="portfolio-item">
                <div class="portfolio-icon">${asset.icon}</div>
                <div class="portfolio-info">
                  <p class="asset-symbol">${asset.symbol}</p>
                  <p class="asset-holding">${asset.amount} coins</p>
                </div>
                <p class="asset-value">$${asset.value.toLocaleString()}</p>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>Price Ticker</h3>
          </div>
          <div class="ticker-list">
            ${crypto.prices.map(coin => `
              <div class="ticker-item">
                <div class="ticker-info">
                  <span class="coin-name">${coin.name}</span>
                  <span class="coin-price">$${coin.price.toLocaleString()}</span>
                </div>
                <span class="ticker-change ${coin.change > 0 ? 'positive' : 'negative'}">
                  ${coin.change > 0 ? '▲' : '▼'} ${Math.abs(coin.change)}%
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
    `.trim();
  }

  /**
   * Generate Investment Dashboard UI
   * @returns {string} HTML
   */
  generateInvestmentUI() {
    const investments = this.mockData.investments || this.generateMockInvestments();
    const allocation = this.mockData.allocation || this.generateMockAllocation();

    return `
<div class="dashboard">
  ${this.generateSidebarNav()}
  <main class="dashboard-main">
    ${this.generateDashboardHeader('Investment Portfolio')}
    <div class="dashboard-content">
      ${this.generateMetricsGrid()}
      
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header">
            <h3>Asset Allocation</h3>
          </div>
          <div class="allocation-chart">
            ${allocation.map(alloc => `
              <div class="allocation-item">
                <div class="allocation-bar">
                  <div class="allocation-fill" style="width: ${alloc.percentage}%; background: ${alloc.color};"></div>
                </div>
                <div class="allocation-label">
                  <span>${alloc.type}</span>
                  <span>${alloc.percentage}%</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>Your Investments</h3>
            <button class="btn btn-primary btn-small">+ Add</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Shares</th>
                <th>Value</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              ${investments.map(inv => `
                <tr>
                  <td>${inv.name}</td>
                  <td>${inv.shares}</td>
                  <td>$${inv.value.toLocaleString()}</td>
                  <td class="${inv.return > 0 ? 'positive' : 'negative'}">${inv.return > 0 ? '+' : ''}${inv.return}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</div>
    `.trim();
  }

  /**
   * Generate Dashboard Header
   * @param {string} title - Title
   * @returns {string} Header HTML
   */
  generateDashboardHeader(title) {
    return `
<header class="dashboard-header">
  <div class="header-left">
    <h1>${title}</h1>
    <p class="header-date">Last updated: ${new Date().toLocaleDateString()}</p>
  </div>
  <div class="header-right">
    <input type="text" placeholder="🔍 Search..." class="header-search">
    <button class="icon-btn">🔔</button>
    <button class="icon-btn">⚙️</button>
  </div>
</header>
    `.trim();
  }

  /**
   * Generate CSS
   * @returns {Promise<string>} CSS
   */
  async generateCSS() {
    return `
${this.generateBaseCss()}
${this.generateDashboardCss()}

/* Finance Specific */
.budget-item {
  margin-bottom: 1.5rem;
}

.budget-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.budget-name {
  font-weight: 600;
  color: ${this.theme.text};
}

.budget-amount {
  color: #6b7280;
  font-size: 0.9rem;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: ${this.theme.primary};
  transition: width 0.3s ease;
}

.expense-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.expense-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.expense-icon {
  font-size: 1.5rem;
}

.expense-details {
  flex: 1;
}

.expense-name {
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.expense-date {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.expense-amount {
  color: #ef4444;
  font-weight: 600;
  margin: 0;
}

.accounts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.account-card {
  background: linear-gradient(135deg, ${this.theme.primary}, ${this.theme.secondary});
  color: white;
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
}

.card-chip {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.account-info {
  margin-bottom: 2rem;
}

.account-name {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.account-number {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.account-balance {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.amount.debit {
  color: #ef4444;
}

.amount.credit {
  color: #10b981;
}

.portfolio-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.portfolio-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${this.theme.bg};
  border-radius: 8px;
}

.portfolio-icon {
  font-size: 2rem;
}

.portfolio-info {
  flex: 1;
}

.asset-symbol {
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.asset-holding {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.asset-value {
  font-weight: 600;
  margin: 0;
}

.ticker-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ticker-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.ticker-info {
  flex: 1;
}

.coin-name {
  display: block;
  font-weight: 600;
  color: ${this.theme.text};
}

.coin-price {
  display: block;
  font-size: 0.9rem;
  color: #6b7280;
}

.ticker-change {
  font-weight: 600;
  font-size: 0.9rem;
}

.ticker-change.positive {
  color: #10b981;
}

.ticker-change.negative {
  color: #ef4444;
}

.allocation-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.allocation-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.allocation-bar {
  flex: 1;
  height: 24px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.allocation-label {
  display: flex;
  justify-content: space-between;
  width: 150px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .accounts-grid {
    grid-template-columns: 1fr;
  }
}
    `.trim();
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
  
  // Transaction filtering
  const search = document.querySelector('.header-search');
  if (search) {
    search.addEventListener('input', (e) => {
      console.log('Search:', e.target.value);
    });
  }
  
  // Expense tracking
  const expenseItems = document.querySelectorAll('.expense-item');
  expenseItems.forEach(item => {
    item.addEventListener('click', () => {
      console.log('Expense clicked:', item);
    });
  });
})();
    `.trim();
  }

  /**
   * Get menu items
   * @returns {Array} Menu items
   */
  getMenuItems() {
    return [
      { icon: '💰', label: 'Wallet' },
      { icon: '📊', label: 'Analytics' },
      { icon: '🔄', label: 'Transactions' },
      { icon: '⚙️', label: 'Settings' }
    ];
  }

  /**
   * Generate mock expenses
   * @returns {Array} Expenses
   */
  generateMockExpenses() {
    return [
      { icon: '🍔', name: 'Groceries', amount: 85.50, date: 'Today' },
      { icon: '☕', name: 'Coffee', amount: 5.20, date: 'Today' },
      { icon: '🚗', name: 'Gas', amount: 45.00, date: 'Yesterday' },
      { icon: '🎬', name: 'Entertainment', amount: 15.99, date: '2 days ago' },
      { icon: '🏠', name: 'Rent', amount: 1500.00, date: '3 days ago' }
    ];
  }

  /**
   * Generate mock budget
   * @returns {Object} Budget
   */
  generateMockBudget() {
    return {
      categories: [
        { name: 'Food & Dining', spent: 245, limit: 500 },
        { name: 'Transportation', spent: 120, limit: 200 },
        { name: 'Entertainment', spent: 65, limit: 150 },
        { name: 'Shopping', spent: 300, limit: 400 }
      ]
    };
  }

  /**
   * Generate mock accounts
   * @returns {Array} Accounts
   */
  generateMockAccounts() {
    return [
      { name: 'Checking Account', lastFour: '1234', balance: 5234.50 },
      { name: 'Savings Account', lastFour: '5678', balance: 15234.00 },
      { name: 'Credit Card', lastFour: '9012', balance: -450.25 }
    ];
  }

  /**
   * Generate mock transactions
   * @returns {Array} Transactions
   */
  generateMockTransactions() {
    return [
      { date: 'Today', description: 'Coffee Shop', amount: 5.20, type: 'debit', status: 'completed' },
      { date: 'Today', description: 'Direct Deposit', amount: 2500.00, type: 'credit', status: 'completed' },
      { date: 'Yesterday', description: 'Grocery Store', amount: 85.50, type: 'debit', status: 'completed' },
      { date: 'Yesterday', description: 'Gas Station', amount: 45.00, type: 'debit', status: 'completed' },
      { date: '2 days ago', description: 'Restaurant', amount: 32.75, type: 'debit', status: 'completed' },
      { date: '2 days ago', description: 'Transfer to Savings', amount: 500.00, type: 'debit', status: 'pending' }
    ];
  }

  /**
   * Generate mock crypto
   * @returns {Object} Crypto data
   */
  generateMockCrypto() {
    return {
      prices: [
        { name: 'Bitcoin (BTC)', price: 45230, change: 2.5 },
        { name: 'Ethereum (ETH)', price: 2850, change: -1.2 },
        { name: 'Cardano (ADA)', price: 0.75, change: 3.1 },
        { name: 'Ripple (XRP)', price: 2.10, change: 0.8 }
      ]
    };
  }

  /**
   * Generate mock portfolio
   * @returns {Object} Portfolio data
   */
  generateMockPortfolio() {
    return {
      assets: [
        { icon: '₿', symbol: 'BTC', amount: 0.25, value: 11307.50 },
        { icon: 'Ξ', symbol: 'ETH', amount: 2.5, value: 7125.00 },
        { icon: '◇', symbol: 'ADA', amount: 1000, value: 750.00 }
      ]
    };
  }

  /**
   * Generate mock investments
   * @returns {Array} Investments
   */
  generateMockInvestments() {
    return [
      { name: 'Apple Inc. (AAPL)', shares: 50, value: 8450, return: 12.5 },
      { name: 'Microsoft Corp (MSFT)', shares: 30, value: 10200, return: 8.3 },
      { name: 'S&P 500 Index', shares: 100, value: 45230, return: 5.2 }
    ];
  }

  /**
   * Generate mock allocation
   * @returns {Array} Allocation
   */
  generateMockAllocation() {
    return [
      { type: 'Stocks', percentage: 45, color: this.theme.primary },
      { type: 'Bonds', percentage: 30, color: this.theme.secondary },
      { type: 'Cash', percentage: 15, color: '#10b981' },
      { type: 'Crypto', percentage: 10, color: '#f59e0b' }
    ];
  }
}

export default FinanceGenerator;
