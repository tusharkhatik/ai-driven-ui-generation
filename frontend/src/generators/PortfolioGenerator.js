const BaseWebsiteGenerator = require('./BaseWebsiteGenerator');

/**
 * PortfolioGenerator
 * Generates portfolio and personal branding websites
 */
class PortfolioGenerator extends BaseWebsiteGenerator {
  constructor(config = {}) {
    super({
      appType: 'portfolio-website',
      layout: 'developer-portfolio',
      theme: 'light',
      ...config
    });

    this.portfolioData = config.data || {};
    this.supportedApplications = [
      'Portfolio Website',
      'Personal Branding Website'
    ];
    this.supportedLayouts = [
      'developer-portfolio',
      'designer-portfolio',
      'personal-brand',
      'creative-showcase',
      'minimal-portfolio'
    ];
    this.components = [
      'heroSection',
      'skillsSection',
      'projectGallery',
      'timeline',
      'testimonials',
      'contactForm'
    ];

    this.initializeComponents();
  }

  /**
   * Validate configuration for Portfolio
   */
  validateConfig() {
    super.validateConfig();

    if (!this.supportedApplications.includes(this.config.appType)) {
      throw new Error(
        `Unsupported appType: ${this.config.appType}. Supported: ${this.supportedApplications.join(', ')}`
      );
    }

    if (!this.supportedLayouts.includes(this.config.layout)) {
      throw new Error(
        `Unsupported layout: ${this.config.layout}. Supported: ${this.supportedLayouts.join(', ')}`
      );
    }

    return true;
  }

  /**
   * Initialize all portfolio components
   */
  initializeComponents() {
    this.registerComponent('heroSection', this.buildHeroSection());
    this.registerComponent('skillsSection', this.buildSkillsSection());
    this.registerComponent('projectGallery', this.buildProjectGallery());
    this.registerComponent('timeline', this.buildTimeline());
    this.registerComponent('testimonials', this.buildTestimonials());
    this.registerComponent('contactForm', this.buildContactForm());

    this.registerStyles('base', this.getBaseStyles());
    this.registerStyles('components', this.getComponentStyles());
    this.registerStyles('layouts', this.getLayoutStyles());

    this.registerScripts('core', this.getCoreScripts());
    this.registerScripts('components', this.getComponentScripts());
    this.registerScripts('interactions', this.getInteractionScripts());
  }

  /**
   * Build Hero Section
   */
  buildHeroSection() {
    const { name = 'Your Name', tagline = 'Full Stack Developer', cta = 'View My Work' } =
      this.portfolioData.hero || {};

    return `
    <section id="hero" class="hero">
      <div class="hero-content">
        <h1 class="hero-title">${name}</h1>
        <p class="hero-tagline">${tagline}</p>
        <button class="hero-cta" onclick="scrollToSection('portfolio')">${cta}</button>
      </div>
      <div class="hero-background"></div>
    </section>
    `;
  }

  /**
   * Build Skills Section
   */
  buildSkillsSection() {
    const skills = this.portfolioData.skills || [
      { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js'] },
      { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
      { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'CI/CD'] }
    ];

    const skillsHTML = skills
      .map(
        (skill) => `
      <div class="skill-category">
        <h3>${skill.category}</h3>
        <div class="skill-tags">
          ${skill.items.map((item) => `<span class="skill-tag">${item}</span>`).join('')}
        </div>
      </div>
    `
      )
      .join('');

    return `
    <section id="skills" class="skills-section">
      <div class="container">
        <h2>Skills & Expertise</h2>
        <div class="skills-grid">
          ${skillsHTML}
        </div>
      </div>
    </section>
    `;
  }

  /**
   * Build Project Gallery
   */
  buildProjectGallery() {
    const projects = this.portfolioData.projects || [
      {
        id: 1,
        title: 'Project Alpha',
        description: 'A modern web application built with React',
        image: '/images/project-1.jpg',
        tags: ['React', 'Node.js'],
        link: '#'
      },
      {
        id: 2,
        title: 'Project Beta',
        description: 'Full-stack e-commerce platform',
        image: '/images/project-2.jpg',
        tags: ['Vue.js', 'Python'],
        link: '#'
      },
      {
        id: 3,
        title: 'Project Gamma',
        description: 'Real-time collaboration tool',
        image: '/images/project-3.jpg',
        tags: ['WebSocket', 'MongoDB'],
        link: '#'
      }
    ];

    const projectsHTML = projects
      .map(
        (project) => `
      <div class="project-card" data-project-id="${project.id}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <a href="${project.link}" class="project-link">View Project →</a>
        </div>
      </div>
    `
      )
      .join('');

    return `
    <section id="portfolio" class="project-gallery">
      <div class="container">
        <h2>Featured Projects</h2>
        <div class="projects-grid">
          ${projectsHTML}
        </div>
      </div>
    </section>
    `;
  }

  /**
   * Build Timeline
   */
  buildTimeline() {
    const experiences = this.portfolioData.experiences || [
      {
        year: '2023 - Present',
        title: 'Senior Developer',
        company: 'Tech Company',
        description: 'Led development of core platform features'
      },
      {
        year: '2021 - 2023',
        title: 'Full Stack Developer',
        company: 'Startup Inc',
        description: 'Built scalable web applications'
      },
      {
        year: '2019 - 2021',
        title: 'Junior Developer',
        company: 'Web Agency',
        description: 'Developed client websites and applications'
      }
    ];

    const timelineHTML = experiences
      .map(
        (exp, idx) => `
      <div class="timeline-item" style="--order: ${idx}">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <span class="timeline-year">${exp.year}</span>
          <h3>${exp.title}</h3>
          <p class="timeline-company">${exp.company}</p>
          <p>${exp.description}</p>
        </div>
      </div>
    `
      )
      .join('');

    return `
    <section id="experience" class="timeline-section">
      <div class="container">
        <h2>Experience</h2>
        <div class="timeline">
          ${timelineHTML}
        </div>
      </div>
    </section>
    `;
  }

  /**
   * Build Testimonials
   */
  buildTestimonials() {
    const testimonials = this.portfolioData.testimonials || [
      {
        author: 'John Doe',
        company: 'Tech Corp',
        content: 'Outstanding work and excellent communication throughout the project.'
      },
      {
        author: 'Jane Smith',
        company: 'Creative Agency',
        content: 'Delivered beyond expectations with innovative solutions.'
      },
      {
        author: 'Mike Johnson',
        company: 'StartUp Labs',
        content: 'A true professional who understands business needs and delivers results.'
      }
    ];

    const testimonialsHTML = testimonials
      .map(
        (testimonial, idx) => `
      <div class="testimonial-card" data-testimonial="${idx}">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">"${testimonial.content}"</p>
        <div class="testimonial-author">
          <strong>${testimonial.author}</strong>
          <span>${testimonial.company}</span>
        </div>
      </div>
    `
      )
      .join('');

    return `
    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <h2>Testimonials</h2>
        <div class="testimonials-carousel">
          ${testimonialsHTML}
        </div>
      </div>
    </section>
    `;
  }

  /**
   * Build Contact Form
   */
  buildContactForm() {
    return `
    <section id="contact" class="contact-section">
      <div class="container">
        <h2>Get In Touch</h2>
        <form id="contact-form" class="contact-form" novalidate>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" name="subject" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Send Message</button>
          <div id="form-status" class="form-status"></div>
        </form>
      </div>
    </section>
    `;
  }

  /**
   * Get Base Styles
   */
  getBaseStyles() {
    return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary: #667eea;
      --secondary: #764ba2;
      --accent: #f093fb;
      --dark: #1a202c;
      --light: #f7fafc;
      --border: #e2e8f0;
      --text: #2d3748;
      --transition: all 0.3s ease;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: var(--text);
      background-color: #fff;
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    h1, h2, h3, h4, h5, h6 {
      font-weight: 700;
      line-height: 1.2;
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      text-align: center;
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    section {
      padding: 5rem 0;
    }

    a {
      color: var(--primary);
      text-decoration: none;
      transition: var(--transition);
    }

    a:hover {
      color: var(--secondary);
    }

    button {
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: var(--transition);
    }
    `;
  }

  /**
   * Get Component Styles
   */
  getComponentStyles() {
    return `
    /* Hero Section */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      color: white;
      position: relative;
      overflow: hidden;
    }

    .hero-content {
      text-align: center;
      z-index: 1;
      animation: fadeInUp 1s ease-out;
    }

    .hero-title {
      font-size: 4rem;
      margin-bottom: 1rem;
      font-weight: 800;
    }

    .hero-tagline {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-cta {
      padding: 1rem 2rem;
      font-size: 1rem;
      background: white;
      color: var(--primary);
      border-radius: 50px;
      font-weight: 600;
    }

    .hero-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .hero-background {
      position: absolute;
      width: 500px;
      height: 500px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      bottom: -100px;
      right: -100px;
      animation: float 6s ease-in-out infinite;
    }

    /* Skills Section */
    .skills-section {
      background: var(--light);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 3rem;
    }

    .skill-category h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--primary);
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-tag {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: white;
      border: 2px solid var(--border);
      border-radius: 25px;
      font-size: 0.9rem;
      transition: var(--transition);
    }

    .skill-tag:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    /* Project Gallery */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background: white;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      transition: var(--transition);
      cursor: pointer;
    }

    .project-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .project-image {
      width: 100%;
      height: 250px;
      overflow: hidden;
      background: var(--border);
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .project-card:hover .project-image img {
      transform: scale(1.1);
    }

    .project-content {
      padding: 2rem;
    }

    .project-content h3 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }

    .project-content p {
      color: #666;
      margin-bottom: 1rem;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .tag {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: var(--primary);
      color: white;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .project-link {
      color: var(--primary);
      font-weight: 600;
    }

    /* Timeline */
    .timeline-section {
      background: var(--light);
    }

    .timeline {
      position: relative;
      padding: 2rem 0;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--border);
    }

    .timeline-item {
      margin-bottom: 2rem;
      position: relative;
    }

    .timeline-item:nth-child(odd) .timeline-content {
      margin-left: 0;
      margin-right: 52%;
    }

    .timeline-item:nth-child(even) .timeline-content {
      margin-left: 52%;
      margin-right: 0;
    }

    .timeline-marker {
      position: absolute;
      left: 50%;
      top: 0;
      width: 15px;
      height: 15px;
      background: var(--primary);
      border: 3px solid white;
      border-radius: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 0 3px var(--primary);
    }

    .timeline-content {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .timeline-year {
      color: var(--primary);
      font-weight: 600;
      font-size: 0.9rem;
    }

    .timeline-content h3 {
      font-size: 1.2rem;
      margin: 0.5rem 0;
    }

    .timeline-company {
      color: #666;
      font-size: 0.9rem;
    }

    /* Testimonials */
    .testimonials-carousel {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .testimonial-card {
      background: white;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 2rem;
      transition: var(--transition);
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .testimonial-stars {
      color: #ffc107;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .testimonial-text {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      color: #555;
      font-style: italic;
    }

    .testimonial-author {
      display: flex;
      flex-direction: column;
    }

    .testimonial-author strong {
      color: var(--primary);
    }

    .testimonial-author span {
      color: #999;
      font-size: 0.9rem;
    }

    /* Contact Form */
    .contact-section {
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      color: white;
    }

    .contact-form {
      max-width: 600px;
      margin: 0 auto;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 5px;
      font-family: inherit;
      font-size: 1rem;
    }

    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: white;
      color: var(--primary);
      font-weight: 600;
      font-size: 1rem;
      border-radius: 5px;
    }

    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .form-status {
      margin-top: 1rem;
      text-align: center;
      font-weight: 600;
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(20px);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      h2 {
        font-size: 1.8rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-tagline {
        font-size: 1.2rem;
      }

      .timeline::before {
        left: 20px;
      }

      .timeline-marker {
        left: 20px;
      }

      .timeline-item:nth-child(odd) .timeline-content,
      .timeline-item:nth-child(even) .timeline-content {
        margin-left: 60px;
        margin-right: 0;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
    `;
  }

  /**
   * Get Layout-specific Styles
   */
  getLayoutStyles() {
    const layoutStyles = {
      'developer-portfolio': `
        body {
          --primary: #667eea;
          --secondary: #764ba2;
        }
        .hero {
          font-weight: 600;
        }
      `,
      'designer-portfolio': `
        body {
          --primary: #ff6b6b;
          --secondary: #ee5a6f;
        }
        .projects-grid {
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }
      `,
      'personal-brand': `
        body {
          --primary: #f093fb;
          --secondary: #f5576c;
        }
        .hero {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
      `,
      'creative-showcase': `
        body {
          --primary: #11998e;
          --secondary: #38ef7d;
        }
        .project-card {
          border: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
      `,
      'minimal-portfolio': `
        body {
          --primary: #2d3748;
          --secondary: #4a5568;
        }
        section {
          border-top: 1px solid var(--border);
        }
      `
    };

    return layoutStyles[this.config.layout] || layoutStyles['minimal-portfolio'];
  }

  /**
   * Get Core Scripts
   */
  getCoreScripts() {
    return `
    // Utility Functions
    function scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function addClass(element, className) {
      element.classList.add(className);
    }

    function removeClass(element, className) {
      element.classList.remove(className);
    }

    function toggleClass(element, className) {
      element.classList.toggle(className);
    }

    // Initialize on DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Portfolio loaded successfully');
      initializeScrollAnimations();
    });
    `;
  }

  /**
   * Get Component Scripts
   */
  getComponentScripts() {
    return `
    // Scroll Animation Handler
    function initializeScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.project-card, .testimonial-card, .skill-category').forEach(el => {
        observer.observe(el);
      });
    }

    // Project Gallery Interaction
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
      });
      card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
      });
    });
    `;
  }

  /**
   * Get Interaction Scripts
   */
  getInteractionScripts() {
    return `
    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formStatus = document.getElementById('form-status');

        // Validate form
        if (this.checkValidity() === false) {
          formStatus.textContent = 'Please fill in all fields';
          formStatus.style.color = '#ff6b6b';
          return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.style.color = '#38ef7d';
          this.reset();
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }, 1500);
      });
    }

    // Smooth scroll on navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    `;
  }

  /**
   * Generate complete HTML document
   */
  generateHTML() {
    const components = this.components.map((comp) => this.components[comp]).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.portfolioData.title || 'Portfolio Website'}</title>
    <style>
      ${this.combineStyles()}
    </style>
</head>
<body>
    ${components}

    <script>
      ${this.combineScripts()}
    </script>
</body>
</html>`;
  }

  /**
   * Generate output package
   */
  generate() {
    this.validateConfig();
    const html = this.generateHTML();
    const css = this.combineStyles();
    const js = this.combineScripts();
    const metadata = {
      ...this.generateMetadata(),
      appType: this.config.appType,
      layout: this.config.layout,
      supportedApplications: this.supportedApplications,
      supportedLayouts: this.supportedLayouts,
      components: this.components
    };

    return { html, css, js, metadata };
  }
}

module.exports = PortfolioGenerator;