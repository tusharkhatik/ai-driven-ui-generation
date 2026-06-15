// ============================================================================
// BLOG GENERATOR - Blog/Content Platform UI
// ============================================================================

export class BlogGenerator {
  static generate(rng, colors, analysis = {}) {
    const articles = this.generateArticles(rng, 6);
    const categories = ['All', 'Technology', 'Design', 'Business', 'Lifestyle', 'Tutorial'];

    return `
      <div class="blog-wrapper">
        <!-- Header -->
        <header class="blog-header">
          <div class="blog-header-container">
            <div class="blog-logo">📝 TechBlog Pro</div>
            <nav class="blog-nav">
              <a href="#home">Home</a>
              <a href="#blog">Blog</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
            <div class="blog-actions">
              <input type="text" placeholder="🔍 Search articles..." class="blog-search">
              <button class="btn-subscribe">✉️ Subscribe</button>
            </div>
          </div>
        </header>

        <!-- Hero Section -->
        <section class="blog-hero" style="background: ${colors.gradient}">
          <div class="hero-content">
            <h1>Insights & Stories</h1>
            <p>Discover the latest in tech, design, and innovation</p>
            <input type="text" placeholder="🔍 Search articles..." class="hero-search">
          </div>
        </section>

        <!-- Main Content -->
        <div class="blog-container">
          <!-- Sidebar -->
          <aside class="blog-sidebar">
            <div class="sidebar-section">
              <h3>Categories</h3>
              <div class="category-tags">
                ${categories.map((cat, i) => `
                  <button class="tag ${i === 0 ? 'active' : ''}">${cat}</button>
                `).join('')}
              </div>
            </div>

            <div class="sidebar-section">
              <h3>Recent Posts</h3>
              ${articles.slice(0, 3).map(article => `
                <div class="recent-item">
                  <small>${article.date}</small>
                  <h4>${article.title}</h4>
                </div>
              `).join('')}
            </div>

            <div class="sidebar-section">
              <h3>About</h3>
              <p>Welcome to our blog where we share insights about web design, development, and digital trends.</p>
              <button class="btn-follow">Follow Us</button>
            </div>
          </aside>

          <!-- Articles Grid -->
          <main class="blog-content">
            <div class="articles-grid">
              ${articles.map((article, i) => `
                <article class="blog-card ${i === 0 ? 'featured' : ''}">
                  ${i === 0 ? '<div class="featured-badge">Featured</div>' : ''}
                  
                  <div class="article-image" style="background: ${colors.gradient}">
                    ${article.image}
                  </div>

                  <div class="article-content">
                    <div class="article-meta">
                      <span class="category">${article.category}</span>
                      <span class="read-time">${article.readTime} min read</span>
                    </div>

                    <h2>${article.title}</h2>
                    <p class="excerpt">${article.excerpt}</p>

                    <div class="article-footer">
                      <div class="author-info">
                        <div class="author-avatar">${article.author.avatar}</div>
                        <div>
                          <strong>${article.author.name}</strong>
                          <small>${article.date}</small>
                        </div>
                      </div>
                      <div class="article-stats">
                        <span>❤️ ${article.likes}</span>
                        <span>💬 ${article.comments}</span>
                      </div>
                    </div>

                    <button class="btn-read-more">Read More →</button>
                  </div>
                </article>
              `).join('')}
            </div>

            <!-- Pagination -->
            <div class="pagination">
              <button class="pagination-btn">← Previous</button>
              <button class="pagination-btn active">1</button>
              <button class="pagination-btn">2</button>
              <button class="pagination-btn">3</button>
              <button class="pagination-btn">Next →</button>
            </div>
          </main>
        </div>
      </div>
    `;
  }

  static generateArticles(rng, count = 6) {
    const titles = [
      'The Future of Web Design in 2024',
      'Mastering CSS Grid Layout',
      'Deep Dive into React Hooks',
      'User Experience Best Practices',
      'Understanding JavaScript Async/Await',
      'Mobile-First Design Strategy'
    ];

    const excerpts = [
      'Explore the latest trends and technologies shaping the future of web design...',
      'Learn how to create responsive layouts using modern CSS Grid techniques...',
      'Master React Hooks and write cleaner, more efficient React components...',
      'Discover key principles for creating exceptional user experiences...',
      'Understand asynchronous JavaScript patterns and best practices...',
      'Learn how to design for mobile devices first and then scale up...'
    ];

    const categories = ['Technology', 'Design', 'Business', 'Lifestyle', 'Tutorial'];
    const authors = [
      { name: 'Sarah Chen', avatar: '👩‍💻' },
      { name: 'Marcus Johnson', avatar: '👨‍💼' },
      { name: 'Emma Wilson', avatar: '👩‍🎨' }
    ];

    const articles = [];
    for (let i = 0; i < count; i++) {
      articles.push({
        title: titles[i % titles.length],
        excerpt: excerpts[i % excerpts.length],
        category: categories[rng.int(0, categories.length - 1)],
        author: authors[rng.int(0, authors.length - 1)],
        date: `${rng.int(1, 28)} ${['Jan', 'Feb', 'Mar', 'Apr'][rng.int(0, 3)]} 2024`,
        readTime: rng.int(3, 15),
        image: ['📱', '🎨', '💻', '🚀', '✨', '🔥'][i % 6],
        likes: rng.int(50, 500),
        comments: rng.int(5, 50)
      });
    }
    return articles;
  }
}
