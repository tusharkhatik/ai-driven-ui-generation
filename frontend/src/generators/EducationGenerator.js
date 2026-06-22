/**
 * EducationGenerator.js - AI-driven Education Dashboard Generator
 * Generates responsive learning management and student portal interfaces
 * 
 * @extends BaseDashboardGenerator
 * @version 1.0.0
 */

import BaseDashboardGenerator from './BaseDashboardGenerator.js';

class EducationGenerator extends BaseDashboardGenerator {
  constructor(config = {}) {
    super(config);
    this.category = 'education';
    this.dashboardType = config.dashboardType || 'learning';
    this.educationApp = config.educationApp || 'learning-management-system'; // learning-management-system, student-portal, course-platform
    this.layout = config.layout || 'learning-dashboard'; // learning-dashboard, student-portal, course-marketplace, analytics-education, minimal-learning
    this.navigationStyle = config.navigationStyle || 'sidebar';
    this.components = config.components || [
      'courseCard',
      'progressTracker',
      'assignmentList',
      'quizWidget',
      'studentTable',
      'certificatePanel'
    ];
  }

  /**
   * Generate complete education dashboard
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
    ${this.generateDashboardCss()}
    ${this.generateEducationCss()}
  </style>
</head>
<body>
  <div class="dashboard">
    ${this.navigationStyle === 'sidebar' ? this.generateSidebarNav() : ''}
    <div class="dashboard-main">
      ${this.navigationStyle === 'topnav' ? this.generateTopNav() : ''}
      <div class="dashboard-header">
        <h1>${this.getPageTitle()}</h1>
        <p class="header-subtitle">Welcome back! Continue your learning journey</p>
      </div>
      <div class="dashboard-content">
        ${this.generateMainContent()}
      </div>
    </div>
  </div>
  <script>
    ${this.generateEducationJs()}
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
      case 'learning-dashboard':
        return this.generateLearningDashboardLayout();
      case 'student-portal':
        return this.generateStudentPortalLayout();
      case 'course-marketplace':
        return this.generateCourseMarketplaceLayout();
      case 'analytics-education':
        return this.generateAnalyticsEducationLayout();
      case 'minimal-learning':
        return this.generateMinimalLearningLayout();
      default:
        return this.generateLearningDashboardLayout();
    }
  }

  /**
   * Learning Dashboard Layout
   */
  generateLearningDashboardLayout() {
    return `
<div class="education-layout">
  ${this.generateMetricsGrid()}
  <div class="dashboard-grid">
    <div class="grid-col-2">
      ${this.generateProgressTracker()}
    </div>
    <div class="grid-col-1">
      ${this.generateEnrolledCourses()}
    </div>
  </div>
  ${this.generateAssignmentList()}
  ${this.generateUpcomingEvents()}
</div>
    `.trim();
  }

  /**
   * Student Portal Layout
   */
  generateStudentPortalLayout() {
    return `
<div class="education-layout">
  ${this.generateStudentMetrics()}
  <div class="dashboard-grid">
    <div class="grid-col-1">
      ${this.generateCourseCards()}
    </div>
    <div class="grid-col-1">
      ${this.generateQuizWidget()}
    </div>
  </div>
  ${this.generateStudentTable()}
  ${this.generateCertificatePanel()}
</div>
    `.trim();
  }

  /**
   * Course Marketplace Layout
   */
  generateCourseMarketplaceLayout() {
    return `
<div class="education-layout">
  <div class="marketplace-header">
    <h2>Discover Courses</h2>
    <div class="search-filters">
      <input type="text" placeholder="Search courses..." class="search-input">
      <select class="filter-select">
        <option>All Categories</option>
        <option>Programming</option>
        <option>Design</option>
        <option>Business</option>
        <option>Languages</option>
      </select>
    </div>
  </div>
  ${this.generateCourseCards()}
  ${this.generateCourseFilters()}
</div>
    `.trim();
  }

  /**
   * Analytics Education Layout
   */
  generateAnalyticsEducationLayout() {
    return `
<div class="education-layout">
  ${this.generateMetricsGrid()}
  <div class="dashboard-grid">
    <div class="grid-col-2">
      ${this.generateChart()}
    </div>
    <div class="grid-col-1">
      ${this.generateProgressTracker()}
    </div>
  </div>
  ${this.generateDataTable()}
</div>
    `.trim();
  }

  /**
   * Minimal Learning Layout
   */
  generateMinimalLearningLayout() {
    return `
<div class="education-layout minimal">
  ${this.generateCourseCards()}
  <div class="minimal-section">
    <h3>My Progress</h3>
    ${this.generateProgressTracker()}
  </div>
  ${this.generateAssignmentList()}
</div>
    `.trim();
  }

  /**
   * Course Card Component
   */
  generateCourseCard(course = null) {
    const defaults = {
      title: 'Web Development Fundamentals',
      instructor: 'John Doe',
      category: 'Programming',
      progress: 65,
      students: 1234,
      rating: 4.8,
      price: 49.99,
      image: 'https://via.placeholder.com/250x150?text=Course'
    };
    const data = { ...defaults, ...course };

    return `
<div class="course-card">
  <div class="course-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <img src="${data.image}" alt="${data.title}">
    <span class="course-category">${data.category}</span>
  </div>
  <div class="course-content">
    <h3 class="course-title">${data.title}</h3>
    <p class="course-instructor">by ${data.instructor}</p>
    <div class="course-meta">
      <span class="meta-item">👥 ${data.students}</span>
      <span class="meta-item">⭐ ${data.rating}</span>
    </div>
    <div class="course-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${data.progress}%"></div>
      </div>
      <span class="progress-text">${data.progress}% Complete</span>
    </div>
    <div class="course-footer">
      <span class="course-price">$${data.price}</span>
      <button class="btn btn-primary btn-sm">Enroll</button>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Generate multiple course cards
   */
  generateCourseCards() {
    const courses = [
      { title: 'React.js Mastery', instructor: 'Sarah Chen', category: 'Programming', progress: 75, students: 2500, rating: 4.9, price: 79.99 },
      { title: 'UI/UX Design Principles', instructor: 'Mike Johnson', category: 'Design', progress: 45, students: 1800, rating: 4.7, price: 59.99 },
      { title: 'Python for Data Science', instructor: 'Dr. Alex Kumar', category: 'Programming', progress: 30, students: 3200, rating: 4.8, price: 89.99 },
      { title: 'Business Strategy', instructor: 'Emma Wilson', category: 'Business', progress: 60, students: 950, rating: 4.6, price: 69.99 }
    ];

    return `
<div class="courses-grid">
  <h2>Featured Courses</h2>
  <div class="courses-container">
    ${courses.map((course, idx) => this.generateCourseCard(course)).join('')}
  </div>
</div>
    `.trim();
  }

  /**
   * Progress Tracker Component
   */
  generateProgressTracker() {
    return `
<div class="progress-tracker">
  <div class="tracker-header">
    <h3>Learning Progress</h3>
    <span class="tracker-badge">82% Overall</span>
  </div>
  <div class="progress-items">
    <div class="progress-item">
      <div class="item-header">
        <span class="item-label">Module 1: Basics</span>
        <span class="item-percent">100%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 100%; background-color: #10b981;"></div>
      </div>
    </div>
    <div class="progress-item">
      <div class="item-header">
        <span class="item-label">Module 2: Advanced</span>
        <span class="item-percent">75%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 75%; background-color: #3b82f6;"></div>
      </div>
    </div>
    <div class="progress-item">
      <div class="item-header">
        <span class="item-label">Module 3: Projects</span>
        <span class="item-percent">45%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 45%; background-color: #f59e0b;"></div>
      </div>
    </div>
    <div class="progress-item">
      <div class="item-header">
        <span class="item-label">Module 4: Capstone</span>
        <span class="item-percent">0%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 0%;"></div>
      </div>
    </div>
  </div>
  <div class="tracker-footer">
    <p class="achievement-text">🏆 You are on track! Keep up the great work!</p>
  </div>
</div>
    `.trim();
  }

  /**
   * Assignment List Component
   */
  generateAssignmentList() {
    return `
<div class="assignments-section">
  <div class="section-header">
    <h2>Assignments & Tasks</h2>
    <a href="#" class="view-all">View All →</a>
  </div>
  <div class="assignments-list">
    <div class="assignment-card pending">
      <div class="assignment-header">
        <h4>Assignment 1: Build a Todo App</h4>
        <span class="status-badge pending">Pending</span>
      </div>
      <p class="assignment-desc">Create a responsive todo application with React</p>
      <div class="assignment-meta">
        <span class="due-date">📅 Due: Dec 20, 2024</span>
        <span class="points">100 points</span>
      </div>
      <button class="btn btn-primary btn-sm">Submit Assignment</button>
    </div>
    <div class="assignment-card submitted">
      <div class="assignment-header">
        <h4>Assignment 2: API Integration</h4>
        <span class="status-badge submitted">Submitted</span>
      </div>
      <p class="assignment-desc">Integrate REST API with your React application</p>
      <div class="assignment-meta">
        <span class="due-date">📅 Due: Dec 15, 2024</span>
        <span class="points">100 points</span>
      </div>
      <div class="grade-info">✅ Grade: 95/100</div>
    </div>
    <div class="assignment-card overdue">
      <div class="assignment-header">
        <h4>Assignment 3: Database Design</h4>
        <span class="status-badge overdue">Overdue</span>
      </div>
      <p class="assignment-desc">Design a database schema for an e-commerce platform</p>
      <div class="assignment-meta">
        <span class="due-date">📅 Was Due: Dec 10, 2024</span>
        <span class="points">100 points</span>
      </div>
      <button class="btn btn-danger btn-sm">Submit Late</button>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Quiz Widget Component
   */
  generateQuizWidget() {
    return `
<div class="quiz-widget">
  <div class="widget-header">
    <h3>Quick Quiz</h3>
    <span class="streak">🔥 Streak: 5 days</span>
  </div>
  <div class="quiz-content">
    <div class="question-box">
      <p class="question-text">What is the capital of France?</p>
      <div class="options">
        <label class="option">
          <input type="radio" name="answer" value="a">
          <span>London</span>
        </label>
        <label class="option">
          <input type="radio" name="answer" value="b">
          <span>Paris</span>
        </label>
        <label class="option">
          <input type="radio" name="answer" value="c">
          <span>Berlin</span>
        </label>
        <label class="option">
          <input type="radio" name="answer" value="d">
          <span>Rome</span>
        </label>
      </div>
    </div>
    <div class="quiz-footer">
      <span class="progress">Question 1 of 5</span>
      <button class="btn btn-primary btn-sm">Next Question</button>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Student Table Component
   */
  generateStudentTable() {
    return `
<div class="table-card">
  <div class="card-header">
    <h3>Class Roster</h3>
    <button class="btn btn-primary btn-small">+ Add Student</button>
  </div>
  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Email</th>
          <th>Progress</th>
          <th>Grade</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="student-name">📚 Alice Johnson</span></td>
          <td>alice.johnson@school.edu</td>
          <td><div class="progress-mini"><div class="fill" style="width: 85%;"></div></div></td>
          <td><span class="grade-badge excellent">A+</span></td>
          <td><span class="status-badge active">Active</span></td>
          <td><button class="icon-btn">✏️</button><button class="icon-btn">👁️</button></td>
        </tr>
        <tr>
          <td><span class="student-name">📚 Bob Smith</span></td>
          <td>bob.smith@school.edu</td>
          <td><div class="progress-mini"><div class="fill" style="width: 72%;"></div></div></td>
          <td><span class="grade-badge good">B+</span></td>
          <td><span class="status-badge active">Active</span></td>
          <td><button class="icon-btn">✏️</button><button class="icon-btn">👁️</button></td>
        </tr>
        <tr>
          <td><span class="student-name">📚 Charlie Brown</span></td>
          <td>charlie.brown@school.edu</td>
          <td><div class="progress-mini"><div class="fill" style="width: 60%;"></div></div></td>
          <td><span class="grade-badge average">C</span></td>
          <td><span class="status-badge inactive">Inactive</span></td>
          <td><button class="icon-btn">✏️</button><button class="icon-btn">👁️</button></td>
        </tr>
        <tr>
          <td><span class="student-name">📚 Diana Prince</span></td>
          <td>diana.prince@school.edu</td>
          <td><div class="progress-mini"><div class="fill" style="width: 92%;"></div></div></td>
          <td><span class="grade-badge excellent">A</span></td>
          <td><span class="status-badge active">Active</span></td>
          <td><button class="icon-btn">✏️</button><button class="icon-btn">👁️</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
    `.trim();
  }

  /**
   * Certificate Panel Component
   */
  generateCertificatePanel() {
    return `
<div class="certificate-panel">
  <div class="panel-header">
    <h3>Certificates & Achievements</h3>
  </div>
  <div class="certificates-grid">
    <div class="certificate-card">
      <div class="cert-icon">🎓</div>
      <h4>React Master</h4>
      <p class="cert-date">Completed Dec 15, 2024</p>
      <button class="btn btn-secondary btn-sm">Download</button>
    </div>
    <div class="certificate-card">
      <div class="cert-icon">⭐</div>
      <h4>Perfect Attendance</h4>
      <p class="cert-date">Earned Dec 10, 2024</p>
      <button class="btn btn-secondary btn-sm">Download</button>
    </div>
    <div class="certificate-card">
      <div class="cert-icon">🏆</div>
      <h4>Top Performer</h4>
      <p class="cert-date">Earned Dec 5, 2024</p>
      <button class="btn btn-secondary btn-sm">Download</button>
    </div>
    <div class="certificate-card locked">
      <div class="cert-icon">🔒</div>
      <h4>Advanced JavaScript</h4>
      <p class="cert-date">Requirements: 90% Score</p>
      <button class="btn btn-secondary btn-sm" disabled>Locked</button>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Enrolled Courses Component
   */
  generateEnrolledCourses() {
    return `
<div class="enrolled-courses">
  <h3>My Courses</h3>
  <div class="course-list">
    <div class="course-item">
      <div class="course-item-icon">💻</div>
      <div class="course-item-info">
        <h4>React Development</h4>
        <p class="course-item-instructor">with Sarah Chen</p>
      </div>
      <div class="course-item-progress">
        <div class="mini-progress"><div class="fill" style="width: 75%;"></div></div>
        <span class="percent">75%</span>
      </div>
    </div>
    <div class="course-item">
      <div class="course-item-icon">🎨</div>
      <div class="course-item-info">
        <h4>UI Design Fundamentals</h4>
        <p class="course-item-instructor">with Mike Johnson</p>
      </div>
      <div class="course-item-progress">
        <div class="mini-progress"><div class="fill" style="width: 45%;"></div></div>
        <span class="percent">45%</span>
      </div>
    </div>
    <div class="course-item">
      <div class="course-item-icon">📊</div>
      <div class="course-item-info">
        <h4>Data Science Basics</h4>
        <p class="course-item-instructor">with Dr. Alex Kumar</p>
      </div>
      <div class="course-item-progress">
        <div class="mini-progress"><div class="fill" style="width: 30%;"></div></div>
        <span class="percent">30%</span>
      </div>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Upcoming Events Component
   */
  generateUpcomingEvents() {
    return `
<div class="upcoming-events">
  <h3>Upcoming Events & Deadlines</h3>
  <div class="events-list">
    <div class="event-item upcoming">
      <span class="event-date">Dec 18</span>
      <div class="event-info">
        <h4>Live Class: Advanced React</h4>
        <p>2:00 PM - 3:30 PM</p>
      </div>
      <span class="event-type">Class</span>
    </div>
    <div class="event-item assignment">
      <span class="event-date">Dec 20</span>
      <div class="event-info">
        <h4>Assignment 1: Todo App</h4>
        <p>Due by 11:59 PM</p>
      </div>
      <span class="event-type">Assignment</span>
    </div>
    <div class="event-item quiz">
      <span class="event-date">Dec 22</span>
      <div class="event-info">
        <h4>Module 2 Quiz</h4>
        <p>Available all day</p>
      </div>
      <span class="event-type">Quiz</span>
    </div>
    <div class="event-item exam">
      <span class="event-date">Dec 28</span>
      <div class="event-info">
        <h4>Final Exam</h4>
        <p>10:00 AM - 12:00 PM</p>
      </div>
      <span class="event-type">Exam</span>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Student Metrics Component
   */
  generateStudentMetrics() {
    return `
<div class="metrics-grid">
  <div class="metric-card">
    <div class="metric-icon">📚</div>
    <div class="metric-details">
      <p class="metric-label">Courses Enrolled</p>
      <h3 class="metric-value">8</h3>
      <span class="metric-change" style="color: #10b981;">↑ 2 new</span>
    </div>
  </div>
  <div class="metric-card">
    <div class="metric-icon">⭐</div>
    <div class="metric-details">
      <p class="metric-label">Average Grade</p>
      <h3 class="metric-value">A-</h3>
      <span class="metric-change" style="color: #10b981;">↑ 0.5 pts</span>
    </div>
  </div>
  <div class="metric-card">
    <div class="metric-icon">🏆</div>
    <div class="metric-details">
      <p class="metric-label">Certificates</p>
      <h3 class="metric-value">5</h3>
      <span class="metric-change" style="color: #10b981;">↑ 1 new</span>
    </div>
  </div>
  <div class="metric-card">
    <div class="metric-icon">⏱️</div>
    <div class="metric-details">
      <p class="metric-label">Study Streak</p>
      <h3 class="metric-value">12</h3>
      <span class="metric-change" style="color: #10b981;">Days</span>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Course Filters Component
   */
  generateCourseFilters() {
    return `
<div class="course-filters">
  <div class="filters-sidebar">
    <h3>Filters</h3>
    <div class="filter-group">
      <h4>Category</h4>
      <label><input type="checkbox" checked> Programming (24)</label>
      <label><input type="checkbox"> Design (15)</label>
      <label><input type="checkbox"> Business (12)</label>
      <label><input type="checkbox"> Languages (8)</label>
    </div>
    <div class="filter-group">
      <h4>Level</h4>
      <label><input type="checkbox"> Beginner</label>
      <label><input type="checkbox" checked> Intermediate</label>
      <label><input type="checkbox"> Advanced</label>
    </div>
    <div class="filter-group">
      <h4>Price</h4>
      <label><input type="checkbox"> Free</label>
      <label><input type="checkbox"> \$0 - \$50</label>
      <label><input type="checkbox" checked> \$50 - \$100</label>
      <label><input type="checkbox"> \$100+</label>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Get menu items specific to education
   */
  getMenuItems() {
    return [
      { icon: '📊', label: 'Dashboard' },
      { icon: '📚', label: 'My Courses' },
      { icon: '✏️', label: 'Assignments' },
      { icon: '🎯', label: 'Progress' },
      { icon: '🏆', label: 'Certificates' },
      { icon: '👥', label: 'Students' },
      { icon: '⚙️', label: 'Settings' }
    ];
  }

  /**
   * Get table columns specific to education
   */
  getTableColumns() {
    return ['Student Name', 'Email', 'Progress', 'Grade', 'Status'];
  }

  /**
   * Get page title
   */
  getPageTitle() {
    const titles = {
      'learning-management-system': '🎓 Learning Management System',
      'student-portal': '📚 Student Portal',
      'course-platform': '🎯 Course Platform'
    };
    return titles[this.educationApp] || '🎓 Education Dashboard';
  }

  /**
   * Generate education-specific CSS
   */
  generateEducationCss() {
    return `
/* Education Generator Specific Styles */

.education-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.education-layout.minimal {
  max-width: 1000px;
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.grid-col-1 {
  flex: 1;
}

.grid-col-2 {
  flex: 2;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

/* Courses Grid */
.courses-grid {
  margin-bottom: 2rem;
}

.courses-grid h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${this.theme.text};
}

.courses-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* Course Card */
.course-card {
  background: ${this.theme.surface};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

.course-image {
  height: 150px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}

.course-category {
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  padding: 0.35rem 0.65rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.course-content {
  padding: 1.5rem;
}

.course-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${this.theme.text};
}

.course-instructor {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.course-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-item {
  font-size: 0.9rem;
  color: #6b7280;
}

.course-progress {
  margin-bottom: 1rem;
}

.progress-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, ${this.theme.primary}, ${this.theme.secondary});
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.85rem;
  color: #6b7280;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.course-price {
  font-weight: 600;
  color: ${this.theme.primary};
}

/* Progress Tracker */
.progress-tracker {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.tracker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.tracker-header h3 {
  font-size: 1.1rem;
  color: ${this.theme.text};
}

.tracker-badge {
  background: ${this.theme.primary}20;
  color: ${this.theme.primary};
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.progress-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: ${this.theme.text};
}

.item-percent {
  font-size: 0.85rem;
  font-weight: 600;
  color: ${this.theme.primary};
}

.tracker-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.achievement-text {
  color: #10b981;
  font-size: 0.95rem;
  font-weight: 500;
}

/* Assignments Section */
.assignments-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  color: ${this.theme.text};
}

.view-all {
  color: ${this.theme.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.view-all:hover {
  text-decoration: underline;
}

.assignments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.assignment-card {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-left: 4px solid #d1d5db;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.assignment-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.assignment-card.pending {
  border-left-color: #f59e0b;
}

.assignment-card.submitted {
  border-left-color: #10b981;
}

.assignment-card.overdue {
  border-left-color: #ef4444;
}

.assignment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.assignment-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: ${this.theme.text};
}

.status-badge {
  font-size: 0.75rem;
  padding: 0.35rem 0.65rem;
  border-radius: 20px;
  font-weight: 600;
}

.status-badge.pending {
  background: #f59e0b20;
  color: #d97706;
}

.status-badge.submitted {
  background: #10b98120;
  color: #059669;
}

.status-badge.overdue {
  background: #ef444420;
  color: #dc2626;
}

.assignment-desc {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.assignment-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.grade-info {
  padding: 0.75rem;
  background: #10b98120;
  border-radius: 6px;
  color: #059669;
  font-weight: 500;
  margin-bottom: 1rem;
}

/* Quiz Widget */
.quiz-widget {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.widget-header h3 {
  font-size: 1.1rem;
  color: ${this.theme.text};
}

.streak {
  font-size: 0.9rem;
  color: #dc2626;
  font-weight: 600;
}

.quiz-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.question-text {
  font-size: 1.05rem;
  font-weight: 600;
  color: ${this.theme.text};
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option:hover {
  border-color: ${this.theme.primary};
  background: ${this.theme.primary}10;
}

.option input[type="radio"] {
  cursor: pointer;
}

.quiz-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.progress {
  font-size: 0.9rem;
  color: #6b7280;
}

/* Student Table */
.student-name {
  font-weight: 500;
  color: ${this.theme.text};
}

.progress-mini {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  width: 80px;
}

.progress-mini .fill {
  height: 100%;
  background: linear-gradient(90deg, ${this.theme.primary}, ${this.theme.secondary});
}

.grade-badge {
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.grade-badge.excellent {
  background: #10b98120;
  color: #059669;
}

.grade-badge.good {
  background: #3b82f620;
  color: #1d4ed8;
}

.grade-badge.average {
  background: #f59e0b20;
  color: #d97706;
}

.status-badge.active {
  background: #10b98120;
  color: #059669;
}

.status-badge.inactive {
  background: #ef444420;
  color: #dc2626;
}

/* Certificate Panel */
.certificate-panel {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
}

.panel-header {
  margin-bottom: 2rem;
}

.panel-header h3 {
  font-size: 1.3rem;
  color: ${this.theme.text};
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.certificate-card {
  background: linear-gradient(135deg, ${this.theme.primary}10 0%, ${this.theme.secondary}10 100%);
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.certificate-card:hover:not(.locked) {
  transform: translateY(-4px);
  border-color: ${this.theme.primary};
  box-shadow: 0 8px 16px ${this.theme.primary}20;
}

.certificate-card.locked {
  opacity: 0.6;
}

.cert-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.certificate-card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: ${this.theme.text};
  margin-bottom: 0.5rem;
}

.cert-date {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

/* Enrolled Courses */
.enrolled-courses {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.enrolled-courses h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${this.theme.text};
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.course-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.course-item:hover {
  background: ${this.theme.primary}10;
}

.course-item-icon {
  font-size: 1.5rem;
}

.course-item-info {
  flex: 1;
}

.course-item-info h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: ${this.theme.text};
  margin-bottom: 0.25rem;
}

.course-item-instructor {
  font-size: 0.85rem;
  color: #6b7280;
}

.course-item-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mini-progress {
  width: 60px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.mini-progress .fill {
  height: 100%;
  background: linear-gradient(90deg, ${this.theme.primary}, ${this.theme.secondary});
}

.percent {
  font-size: 0.85rem;
  font-weight: 600;
  color: ${this.theme.primary};
  min-width: 45px;
  text-align: right;
}

/* Upcoming Events */
.upcoming-events {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.upcoming-events h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${this.theme.text};
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  border-left: 4px solid #d1d5db;
  border-radius: 6px;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.event-item.upcoming {
  border-left-color: #3b82f6;
}

.event-item.assignment {
  border-left-color: #f59e0b;
}

.event-item.quiz {
  border-left-color: #8b5cf6;
}

.event-item.exam {
  border-left-color: #ef4444;
}

.event-date {
  background: ${this.theme.primary};
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 45px;
  text-align: center;
}

.event-info {
  flex: 1;
}

.event-info h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: ${this.theme.text};
  margin-bottom: 0.25rem;
}

.event-info p {
  font-size: 0.85rem;
  color: #6b7280;
}

.event-type {
  font-size: 0.75rem;
  font-weight: 600;
  background: ${this.theme.primary}20;
  color: ${this.theme.primary};
  padding: 0.35rem 0.65rem;
  border-radius: 20px;
  white-space: nowrap;
}

/* Marketplace Header */
.marketplace-header {
  margin-bottom: 2rem;
}

.marketplace-header h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${this.theme.text};
}

.search-filters {
  display: flex;
  gap: 1rem;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

/* Course Filters */
.course-filters {
  margin-top: 2rem;
}

.filters-sidebar {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  width: 250px;
}

.filters-sidebar h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${this.theme.text};
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
  transition: all 0.3s ease;
}

.filter-group label:hover {
  color: ${this.theme.primary};
}

.filter-group input[type="checkbox"] {
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .courses-container {
    grid-template-columns: 1fr;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .certificates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .search-filters {
    flex-direction: column;
  }
  
  .event-item {
    gap: 0.75rem;
  }
}

    `.trim();
  }

  /**
   * Generate education-specific JavaScript
   */
  generateEducationJs() {
    return `
// Education Generator JavaScript
class EducationApp {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Assignment submission
    document.querySelectorAll('.assignment-card button').forEach((btn, idx) => {
      btn.addEventListener('click', (e) => this.handleAssignmentAction(e, idx));
    });

    // Quiz navigation
    document.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', (e) => this.handleQuizAnswer(e));
    });

    // Course enrollment
    document.querySelectorAll('.course-card .btn-primary').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleCourseEnroll(e));
    });

    // Certificate download
    document.querySelectorAll('.certificate-card .btn-secondary').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleCertificateDownload(e));
    });

    // Menu items
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', (e) => this.handleMenuClick(e));
    });

    // Timeline items
    document.querySelectorAll('.progress-item').forEach((item, idx) => {
      item.addEventListener('click', () => this.highlightProgress(idx));
    });

    // Search and filters
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e));
    }
  }

  handleAssignmentAction(e, idx) {
    e.preventDefault();
    const button = e.target;
    const assignmentTitle = button.closest('.assignment-card').querySelector('h4').textContent;
    console.log('Assignment action for:', assignmentTitle);
    alert(\`Action for: \${assignmentTitle}\`);
  }

  handleQuizAnswer(e) {
    const selectedOption = e.target.closest('.option');
    if (selectedOption) {
      document.querySelectorAll('.option').forEach(opt => opt.style.background = '');
      selectedOption.style.background = \`\${this.getPrimaryColor()}20\`;
      console.log('Answer selected');
    }
  }

  handleCourseEnroll(e) {
    e.preventDefault();
    const courseTitle = e.target.closest('.course-card').querySelector('.course-title').textContent;
    console.log('Enrolling in:', courseTitle);
    alert(\`Enrolled in: \${courseTitle}\`);
  }

  handleCertificateDownload(e) {
    e.preventDefault();
    const certTitle = e.target.closest('.certificate-card').querySelector('h4').textContent;
    console.log('Downloading certificate:', certTitle);
    alert(\`Downloading: \${certTitle} Certificate\`);
  }

  handleMenuClick(e) {
    e.preventDefault();
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    e.target.closest('.menu-item').classList.add('active');
    const menuLabel = e.target.closest('.menu-item').querySelector('.menu-label').textContent;
    console.log('Navigating to:', menuLabel);
  }

  highlightProgress(idx) {
    document.querySelectorAll('.progress-item').forEach(item => {
      item.style.opacity = '0.6';
    });
    document.querySelectorAll('.progress-item')[idx].style.opacity = '1';
  }

  handleSearch(e) {
    const query = e.target.value.toLowerCase();
    console.log('Searching for:', query);
    // Filter courses based on search query
    document.querySelectorAll('.course-card').forEach(card => {
      const title = card.querySelector('.course-title').textContent.toLowerCase();
      const instructor = card.querySelector('.course-instructor').textContent.toLowerCase();
      const matches = title.includes(query) || instructor.includes(query);
      card.style.display = matches ? 'block' : 'none';
    });
  }

  getPrimaryColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#667eea';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new EducationApp();
});
    `.trim();
  }

  /**
   * Get metadata for the generated UI
   */
  getMetadata() {
    return {
      generator: 'EducationGenerator',
      version: '1.0.0',
      category: 'education',
      educationApp: this.educationApp,
      layout: this.layout,
      components: this.components,
      theme: this.theme,
      responsive: true,
      accessible: true,
      supportedApps: [
        'Learning Management System',
        'Student Portal',
        'Course Platform'
      ],
      availableComponents: [
        'courseCard',
        'progressTracker',
        'assignmentList',
        'quizWidget',
        'studentTable',
        'certificatePanel'
      ],
      supportedLayouts: [
        'learning-dashboard',
        'student-portal',
        'course-marketplace',
        'analytics-education',
        'minimal-learning'
      ],
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Generate standalone CSS file
   */
  generateStandaloneCss() 
    { return `\${this.generateDashboardCss()}\n\n\${this.generateEducationCss()}\`;
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
    return this.generateEducationJs();
  }

  /**
   * Generate metadata JSON
   */
  generateMetadataJson() {
    return JSON.stringify(this.getMetadata(), null, 2);
  }
}

export default EducationGenerator;
