/**
 * HealthcareGenerator.js - Generator for Healthcare UIs
 * Supports: Hospital Management System, Fitness Tracker, Clinic Dashboard
 * Layouts: healthcare-dashboard, patient-management, fitness-tracker, analytics-health, minimal-health
 * 
 * @extends BaseDashboardGenerator
 * @version 2.0.0
 */

import BaseDashboardGenerator from './base/BaseDashboardGenerator.js';

class HealthcareGenerator extends BaseDashboardGenerator {
  constructor(config = {}) {
    super(config);
    this.category = 'healthcare';
    this.subcategory = config.subcategory || 'hospitalManagement';
    this.layoutType = config.layout || 'healthcare-dashboard';
  }

  /**
   * Generate Healthcare HTML
   * @returns {Promise<string>} HTML content
   */
  async generateHTML() {
    let content = '';

    switch (this.layoutType) {
      case 'patient-management':
        content = this.generatePatientManagementLayout();
        break;
      case 'fitness-tracker':
        content = this.generateFitnessTrackerLayout();
        break;
      case 'analytics-health':
        content = this.generateAnalyticsHealthLayout();
        break;
      case 'minimal-health':
        content = this.generateMinimalHealthLayout();
        break;
      case 'healthcare-dashboard':
      default:
        content = this.generateHealthcareDashboardLayout();
    }

    return this.wrapDocument(content, await this.generateCSS(), await this.generateJS());
  }

  /**
   * Generate Healthcare Dashboard Layout
   * @returns {string} HTML
   */
  generateHealthcareDashboardLayout() {
    const patients = this.mockData.patients || this.generateMockPatients();
    const appointments = this.mockData.appointments || this.generateMockAppointments();
    const metrics = this.mockData.metrics || this.generateHealthMetrics();

    return `
<div class="dashboard">
  ${this.generateSidebarNav()}
  <main class="dashboard-main">
    ${this.generateDashboardHeader('Hospital Management')}
    <div class="dashboard-content">
      ${this.generateMetricsGrid()}
      
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header">
            <h3>Scheduled Appointments</h3>
            <button class="btn btn-primary btn-small">+ New</button>
          </div>
          <div class="appointments-list">
            ${appointments.slice(0, 5).map(apt => this.generateAppointmentItem(apt)).join('')}
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>Vital Signs</h3>
          </div>
          <div class="vitals-grid">
            ${metrics.map(metric => `
              <div class="vital-item">
                <span class="vital-label">${metric.label}</span>
                <p class="vital-value">${metric.value}</p>
                <span class="vital-unit">${metric.unit}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3>Active Patients</h3>
          <button class="btn btn-secondary btn-small">View All</button>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Condition</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${patients.slice(0, 8).map(patient => `
              <tr>
                <td>${patient.id}</td>
                <td>
                  <div class="patient-cell">
                    <span class="patient-avatar">${patient.avatar}</span>
                    <span>${patient.name}</span>
                  </div>
                </td>
                <td>${patient.condition}</td>
                <td>${patient.doctor}</td>
                <td><span class="badge badge-${patient.status.toLowerCase()}">${patient.status}</span></td>
                <td>
                  <button class="icon-btn">📋</button>
                  <button class="icon-btn">📞</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>
    `.trim();
  }

  /**
   * Generate Patient Management Layout
   * @returns {string} HTML
   */
  generatePatientManagementLayout() {
    const patients = this.mockData.patients || this.generateMockPatients(15);
    const filters = this.mockData.filters || this.generatePatientFilters();

    return `
<div class="dashboard">
  ${this.generateSidebarNav()}
  <main class="dashboard-main">
    ${this.generateDashboardHeader('Patient Management')}
    <div class="dashboard-content">
      <div class="patient-management-wrapper">
        <aside class="management-sidebar">
          ${this.generatePatientFiltersPanel(filters)}
        </aside>
        
        <div class="management-main">
          <div class="toolbar">
            <input type="text" placeholder="🔍 Search patients..." class="search-input">
            <button class="btn btn-primary">+ Add Patient</button>
          </div>
          
          <div class="patients-list">
            ${patients.map(patient => this.generatePatientCard(patient)).join('')}
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
    `.trim();
  }

  /**
   * Generate Fitness Tracker Layout
   * @returns {string} HTML
   */
  generateFitnessTrackerLayout() {
    const workouts = this.mockData.workouts || this.generateMockWorkouts();
    const goals = this.mockData.goals || this.generateMockGoals();
    const stats = this.mockData.stats || this.generateMockStats();

    return `
<div class="dashboard">
  ${this.generateSidebarNav()}
  <main class="dashboard-main">
    ${this.generateDashboardHeader('Fitness Tracker')}
    <div class="dashboard-content">
      <div class="fitness-header">
        <div class="todays-stats">
          <h3>Today's Stats</h3>
          <div class="stats-grid">
            ${stats.map(stat => `
              <div class="stat-card">
                <span class="stat-icon">${stat.icon}</span>
                <p class="stat-label">${stat.label}</p>
                <p class="stat-value">${stat.value}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header">
            <h3>Your Goals</h3>
          </div>
          <div class="goals-list">
            ${goals.map(goal => `
              <div class="goal-item">
                <div class="goal-info">
                  <span class="goal-icon">${goal.icon}</span>
                  <div>
                    <p class="goal-name">${goal.name}</p>
                    <p class="goal-progress">${goal.progress}/${goal.target} ${goal.unit}</p>
                  </div>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${(goal.progress/goal.target)*100}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>Recent Workouts</h3>
            <button class="btn btn-primary btn-small">+ Log</button>
          </div>
          <div class="workouts-list">
            ${workouts.map(workout => `
              <div class="workout-item">
                <div class="workout-icon">${workout.icon}</div>
                <div class="workout-info">
                  <p class="workout-type">${workout.type}</p>
                  <p class="workout-time">${workout.date} • ${workout.duration} min</p>
                </div>
                <p class="workout-calories">${workout.calories} cal</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3>Weekly Activity</h3>
        </div>
        <div class="weekly-chart">
          <div class="chart-bars">
            ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => `
              <div class="chart-bar">
                <div class="bar" style="height: ${30 + Math.random() * 70}%;"></div>
                <span class="day-label">${day}</span>
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
   * Generate Analytics Health Layout
   * @returns {string} HTML
   */
  generateAnalyticsHealthLayout() {
    const healthData = this.mockData.healthData || this.generateMockHealthData();
    const trends = this.mockData.trends || this.generateMockTrends();

    return `
<div class="dashboard">
  ${this.generateSidebarNav()}
  <main class="dashboard-main">
    ${this.generateDashboardHeader('Health Analytics')}
    <div class="dashboard-content">
      ${this.generateMetricsGrid()}
      
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header">
            <h3>Health Score Trend</h3>
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
            </svg>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>Vital Trends</h3>
          </div>
          <div class="trends-list">
            ${trends.map(trend => `
              <div class="trend-item">
                <div class="trend-info">
                  <span class="trend-icon">${trend.icon}</span>
                  <span class="trend-name">${trend.name}</span>
                </div>
                <span class="trend-value ${trend.status}">${trend.value} ${trend.status === 'positive' ? '↑' : '↓'}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3>Health Metrics Over Time</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Heart Rate</th>
              <th>Blood Pressure</th>
              <th>Weight</th>
              <th>Sleep</th>
              <th>Steps</th>
            </tr>
          </thead>
          <tbody>
            ${healthData.map(data => `
              <tr>
                <td>${data.date}</td>
                <td>${data.heartRate} bpm</td>
                <td>${data.bloodPressure}</td>
                <td>${data.weight} kg</td>
                <td>${data.sleep}h</td>
                <td>${data.steps.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>
    `.trim();
  }

  /**
   * Generate Minimal Health Layout
   * @returns {string} HTML
   */
  generateMinimalHealthLayout() {
    const appointments = this.mockData.appointments || this.generateMockAppointments();
    const metrics = this.mockData.metrics || this.generateHealthMetrics();

    return `
<div class="dashboard">
  ${this.generateSidebarNav()}
  <main class="dashboard-main">
    ${this.generateDashboardHeader('Health Center')}
    <div class="dashboard-content">
      <div class="minimal-cards">
        ${metrics.map(metric => `
          <div class="minimal-metric">
            <span class="metric-icon">${metric.icon || '📊'}</span>
            <h4>${metric.label}</h4>
            <p class="metric-value">${metric.value}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="minimal-section">
        <h3>Upcoming Appointments</h3>
        <div class="minimal-list">
          ${appointments.map(apt => `
            <div class="minimal-item">
              <div class="minimal-item-info">
                <h4>${apt.doctorName}</h4>
                <p>${apt.date} at ${apt.time}</p>
              </div>
              <button class="btn btn-primary btn-small">Confirm</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </main>
</div>
    `.trim();
  }

  /**
   * Generate Appointment Item
   * @param {Object} appointment - Appointment data
   * @returns {string} HTML
   */
  generateAppointmentItem(appointment) {
    return `
<div class="appointment-item">
  <div class="appointment-time">
    <p class="time">${appointment.time}</p>
    <p class="date">${appointment.date}</p>
  </div>
  <div class="appointment-details">
    <h4>${appointment.patientName}</h4>
    <p>${appointment.doctorName} • ${appointment.type}</p>
  </div>
  <span class="badge badge-${appointment.status.toLowerCase()}">${appointment.status}</span>
</div>
    `.trim();
  }

  /**
   * Generate Patient Card
   * @param {Object} patient - Patient data
   * @returns {string} HTML
   */
  generatePatientCard(patient) {
    return `
<div class="patient-card">
  <div class="patient-header">
    <div class="patient-avatar-large">${patient.avatar}</div>
    <div class="patient-identity">
      <h3>${patient.name}</h3>
      <p class="patient-id">ID: ${patient.id}</p>
      <p class="patient-age">${patient.age} years • ${patient.gender}</p>
    </div>
    <div class="patient-status">
      <span class="badge badge-${patient.status.toLowerCase()}">${patient.status}</span>
    </div>
  </div>
  
  <div class="patient-info-grid">
    <div class="info-item">
      <span class="info-label">Condition</span>
      <span class="info-value">${patient.condition}</span>
    </div>
    <div class="info-item">
      <span class="info-label">Doctor</span>
      <span class="info-value">${patient.doctor}</span>
    </div>
    <div class="info-item">
      <span class="info-label">Last Visit</span>
      <span class="info-value">${patient.lastVisit}</span>
    </div>
    <div class="info-item">
      <span class="info-label">Next Appointment</span>
      <span class="info-value">${patient.nextAppointment}</span>
    </div>
  </div>
  
  <div class="patient-actions">
    <button class="btn btn-primary btn-small">View Records</button>
    <button class="btn btn-secondary btn-small">Schedule Visit</button>
  </div>
</div>
    `.trim();
  }

  /**
   * Generate Patient Filters Panel
   * @param {Array} filters - Filters
   * @returns {string} HTML
   */
  generatePatientFiltersPanel(filters) {
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
   * Get menu items
   * @returns {Array} Menu items
   */
  getMenuItems() {
    return [
      { icon: '🏥', label: 'Dashboard' },
      { icon: '👥', label: 'Patients' },
      { icon: '📅', label: 'Appointments' },
      { icon: '💊', label: 'Prescriptions' }
    ];
  }

  /**
   * Generate CSS
   * @returns {Promise<string>} CSS
   */
  async generateCSS() {
    return `
${this.generateBaseCss()}
${this.generateDashboardCss()}

/* Healthcare Specific */
.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.appointment-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: ${this.theme.bg};
  border-radius: 8px;
  border-left: 4px solid ${this.theme.primary};
}

.appointment-time {
  text-align: center;
}

.time {
  font-weight: 700;
  margin: 0;
  color: ${this.theme.text};
}

.date {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.appointment-details h4 {
  margin: 0 0 0.25rem 0;
  color: ${this.theme.text};
}

.appointment-details p {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

/* Vitals */
.vitals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
}

.vital-item {
  text-align: center;
}

.vital-label {
  display: block;
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.vital-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: ${this.theme.primary};
  margin: 0;
}

.vital-unit {
  display: block;
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Patient Cell */
.patient-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.patient-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${this.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

/* Patient Management */
.patient-management-wrapper {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.management-sidebar {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
}

.management-main {
  flex: 1;
}

.toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.patients-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.patient-card {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.patient-card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.patient-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.patient-avatar-large {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${this.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.patient-identity {
  flex: 1;
}

.patient-identity h3 {
  margin: 0 0 0.25rem 0;
  color: ${this.theme.text};
}

.patient-id {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.patient-age {
  margin: 0;
  font-size: 0.85rem;
  color: #9ca3af;
}

.patient-status {
  display: flex;
  align-items: flex-start;
}

.patient-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.info-value {
  font-weight: 600;
  color: ${this.theme.text};
}

.patient-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-small {
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

/* Fitness Tracker */
.fitness-header {
  margin-bottom: 2rem;
}

.todays-stats h3 {
  margin-bottom: 1.5rem;
  color: ${this.theme.text};
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.stat-icon {
  display: block;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.stat-label {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.stat-value {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${this.theme.primary};
}

.goals-list,
.workouts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.goal-item {
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.goal-item:last-child {
  border-bottom: none;
}

.goal-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  align-items: flex-start;
}

.goal-icon {
  font-size: 1.5rem;
}

.goal-name {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: ${this.theme.text};
}

.goal-progress {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
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

.workout-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.workout-item:last-child {
  border-bottom: none;
}

.workout-icon {
  font-size: 1.8rem;
}

.workout-info {
  flex: 1;
}

.workout-type {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: ${this.theme.text};
}

.workout-time {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.workout-calories {
  margin: 0;
  font-weight: 600;
  color: ${this.theme.primary};
}

/* Weekly Chart */
.weekly-chart {
  padding: 2rem 0;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  gap: 0.5rem;
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 0.5rem;
}

.bar {
  width: 100%;
  max-width: 40px;
  background: ${this.theme.primary};
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}

.bar:hover {
  background: ${this.theme.secondary};
}

.day-label {
  font-size: 0.85rem;
  color: #6b7280;
}

/* Health Analytics */
.trends-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.trend-item:last-child {
  border-bottom: none;
}

.trend-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.trend-icon {
  font-size: 1.5rem;
}

.trend-name {
  font-weight: 600;
  color: ${this.theme.text};
}

.trend-value {
  font-weight: 600;
  font-size: 1rem;
}

.trend-value.positive {
  color: #10b981;
}

.trend-value.negative {
  color: #ef4444;
}

/* Minimal Health */
.minimal-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.minimal-metric {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.metric-icon {
  display: block;
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.minimal-metric h4 {
  margin: 0 0 0.5rem 0;
  color: ${this.theme.text};
}

.minimal-metric .metric-value {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${this.theme.primary};
}

.minimal-section {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.minimal-section h3 {
  margin-top: 0;
  color: ${this.theme.text};
}

.minimal-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.minimal-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${this.theme.bg};
  border-radius: 8px;
}

.minimal-item-info h4 {
  margin: 0 0 0.25rem 0;
  color: ${this.theme.text};
}

.minimal-item-info p {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

/* Badges */
.badge-active {
  background: #10b98120;
  color: #10b981;
}

.badge-inactive {
  background: #9ca3af20;
  color: #6b7280;
}

.badge-pending {
  background: #f59e0b20;
  color: #f59e0b;
}

.badge-completed {
  background: #10b98120;
  color: #10b981;
}

.badge-scheduled {
  background: #3b82f620;
  color: #3b82f6;
}

/* Responsive */
@media (max-width: 768px) {
  .patient-management-wrapper {
    grid-template-columns: 1fr;
  }
  
  .management-sidebar {
    display: none;
  }
  
  .patients-list {
    grid-template-columns: 1fr;
  }
  
  .patient-info-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .vitals-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .minimal-item {
    flex-direction: column;
    gap: 1rem;
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
  
  // Patient search
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      console.log('Search patients:', e.target.value);
    });
  }
  
  // Filter options
  const filterOptions = document.querySelectorAll('.filter-option input');
  filterOptions.forEach(option => {
    option.addEventListener('change', () => {
      console.log('Filter changed');
    });
  });
  
  // Appointment actions
  const appointmentItems = document.querySelectorAll('.appointment-item');
  appointmentItems.forEach(item => {
    item.addEventListener('click', () => {
      console.log('Appointment selected');
    });
  });
  
  // Patient card actions
  const patientCards = document.querySelectorAll('.patient-card');
  patientCards.forEach(card => {
    const buttons = card.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Patient action:', btn.textContent);
      });
    });
  });
  
  // Goal progress tracking
  const goalItems = document.querySelectorAll('.goal-item');
  goalItems.forEach(item => {
    item.addEventListener('click', () => {
      console.log('Goal selected');
    });
  });
  
  // Workout logging
  const workoutItems = document.querySelectorAll('.workout-item');
  workoutItems.forEach(item => {
    item.addEventListener('click', () => {
      console.log('Workout clicked');
    });
  });
})();
    `.trim();
  }

  /**
   * Generate mock patients
   * @param {number} count - Number of patients
   * @returns {Array} Patients
   */
  generateMockPatients(count = 8) {
    const firstNames = ['John', 'Mary', 'James', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const conditions = ['Hypertension', 'Diabetes', 'Asthma', 'COPD', 'Heart Disease', 'Arthritis'];
    const doctors = ['Dr. Sarah', 'Dr. Ahmed', 'Dr. Lisa', 'Dr. Chen', 'Dr. Miguel'];
    const avatars = ['👨‍⚕️', '👩‍⚕️', '👨', '👩', '👨‍🦱', '👩‍🦰'];

    const patients = [];
    for (let i = 0; i < count; i++) {
      patients.push({
        id: 'P' + String(10000 + i + 1).slice(-5),
        name: firstNames[i % firstNames.length] + ' ' + lastNames[i % lastNames.length],
        age: 30 + (i * 5) % 40,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        condition: conditions[i % conditions.length],
        doctor: doctors[i % doctors.length],
        status: ['Active', 'Inactive', 'Recovering'][i % 3],
        lastVisit: `${i + 1} days ago`,
        nextAppointment: `${Math.floor(Math.random() * 7) + 1} days`,
        avatar: avatars[i % avatars.length]
      });
    }
    return patients;
  }

  /**
   * Generate mock appointments
   * @returns {Array} Appointments
   */
  generateMockAppointments() {
    const times = ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '04:45 PM'];
    const types = ['Checkup', 'Follow-up', 'Consultation', 'Lab Test', 'Vaccination'];
    const statuses = ['Scheduled', 'Confirmed', 'In Progress', 'Completed'];

    return times.map((time, idx) => ({
      time,
      date: new Date(Date.now() + idx * 86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      patientName: ['John Smith', 'Mary Johnson', 'James Williams', 'Patricia Brown', 'Robert Jones'][idx],
      doctorName: ['Dr. Sarah', 'Dr. Ahmed', 'Dr. Lisa'][idx % 3],
      type: types[idx % types.length],
      status: statuses[idx % statuses.length]
    }));
  }

  /**
   * Generate health metrics
   * @returns {Array} Metrics
   */
  generateHealthMetrics() {
    return [
      { label: 'Heart Rate', value: '72', unit: 'bpm', icon: '❤️' },
      { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: '🩸' },
      { label: 'Temperature', value: '37°C', unit: 'Celsius', icon: '🌡️' },
      { label: 'Oxygen Level', value: '98%', unit: 'SpO2', icon: '💨' }
    ];
  }

  /**
   * Generate patient filters
   * @returns {Array} Filters
   */
  generatePatientFilters() {
    return [
      {
        name: 'Status',
        options: ['Active', 'Inactive', 'Recovering']
      },
      {
        name: 'Condition',
        options: ['Hypertension', 'Diabetes', 'Asthma', 'COPD']
      },
      {
        name: 'Doctor',
        options: ['Dr. Sarah', 'Dr. Ahmed', 'Dr. Lisa', 'Dr. Chen']
      },
      {
        name: 'Age Group',
        options: ['18-30', '31-50', '51-70', '70+']
      }
    ];
  }

  /**
   * Generate mock workouts
   * @returns {Array} Workouts
   */
  generateMockWorkouts() {
    return [
      { icon: '🏃', type: 'Running', date: 'Today', duration: 45, calories: 520 },
      { icon: '🚴', type: 'Cycling', date: 'Yesterday', duration: 60, calories: 680 },
      { icon: '🏊', type: 'Swimming', date: '2 days ago', duration: 50, calories: 450 },
      { icon: '⛹️', type: 'Basketball', date: '3 days ago', duration: 90, calories: 720 },
      { icon: '🧘', type: 'Yoga', date: '4 days ago', duration: 30, calories: 180 }
    ];
  }

  /**
   * Generate mock goals
   * @returns {Array} Goals
   */
  generateMockGoals() {
    return [
      { icon: '🔥', name: 'Daily Calories', progress: 2150, target: 2500, unit: 'cal' },
      { icon: '👟', name: 'Daily Steps', progress: 8230, target: 10000, unit: 'steps' },
      { icon: '💧', name: 'Water Intake', progress: 6, target: 8, unit: 'cups' },
      { icon: '😴', name: 'Sleep Target', progress: 7, target: 8, unit: 'hours' }
    ];
  }

  /**
   * Generate mock stats
   * @returns {Array} Stats
   */
  generateMockStats() {
    return [
      { icon: '❤️', label: 'Heart Rate', value: '72 bpm' },
      { icon: '👟', label: 'Steps', value: '8,230' },
      { icon: '🔥', label: 'Calories', value: '2,150' },
      { icon: '😴', label: 'Sleep', value: '7h 30m' }
    ];
  }

  /**
   * Generate mock health data
   * @returns {Array} Health data
   */
  generateMockHealthData() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, idx) => ({
      date: day,
      heartRate: 70 + Math.floor(Math.random() * 20),
      bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 10)}`,
      weight: (72 + Math.random()).toFixed(1),
      sleep: 6 + Math.floor(Math.random() * 3),
      steps: 7000 + Math.floor(Math.random() * 4000)
    }));
  }

  /**
   * Generate mock trends
   * @returns {Array} Trends
   */
  generateMockTrends() {
    return [
      { icon: '❤️', name: 'Heart Rate', value: '72', status: 'positive' },
      { icon: '🩸', name: 'Blood Pressure', value: '120/80', status: 'positive' },
      { icon: '⚖️', name: 'Weight', value: '-2 lb', status: 'positive' },
      { icon: '😴', name: 'Sleep Quality', value: '+15%', status: 'positive' },
      { icon: '🚴', name: 'Activity Level', value: '+8%', status: 'positive' }
    ];
  }
}

export default HealthcareGenerator;
