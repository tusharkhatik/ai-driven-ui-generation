// frontend/src/services/generators/Phase1Generators.js
// ============================================================================
// PHASE 1: Blog, Portfolio, Social Media, Video Streaming, Music Generators
// Enterprise-Grade UI Generation System v2.0
// ============================================================================

import { AdvancedRNG } from './AdvancedRNG';
import { PromptAnalyzer } from './PromptAnalyzer';

// ============================================================================
// BLOG & CMS GENERATOR
// ============================================================================

export class BlogGenerator {
  static generateMockPosts(rng, count = 6) {
    const categories = ['Technology', 'Design', 'Business', 'Lifestyle', 'Tutorial', 'News'];
    const authors = [
      { name: 'Sarah Chen', avatar: 'SC', role: 'Tech Writer' },
      { name: 'Marcus Johnson', avatar: 'MJ', role: 'Designer' },
      { name: 'Emma Wilson', avatar: 'EW', role: 'Developer' },
    ];

    const posts = [];
    for (let i = 0; i < count; i++) {
      posts.push({
        id: i + 1,
        title: `${rng.pick(['Guide to', 'Understanding', 'Deep Dive into', 'Mastering', 'Latest Trends in'])} ${rng.pick(['Web Design', 'React Hooks', 'UI/UX', 'AI/ML', 'Cloud Computing'])}`,
        excerpt: `Explore the latest insights and best practices in modern web development and design...`,
        category: rng.pick(categories),
        author: rng.pick(authors),
        date: `${rng.int(1, 28)} ${rng.pick(['Jan', 'Feb', 'Mar', 'Apr'])} 2025`,
        readTime: rng.int(3, 15),
        views: rng.int(100, 5000),
        likes: rng.int(10, 500),
        image: `🖼️`,
        featured: i < 2,
      });
    }
    return posts;
  }

  static generate(rng, colors, analysis = {}) {
    const posts = this.generateMockPosts(rng, 6);
    const categories = ['All', 'Technology', 'Design', 'Business', 'Lifestyle', 'Tutorial'];

    return `
      <div class="blog-container">
        <header class="blog-header">
          <div class="blog-header-content">
            <div class="blog-logo">📝 TechBlog Pro</div>
            <nav class="blog-nav">
              <a href="#home">Home</a>
              <a href="#blog">Blog</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
            <div class="blog-actions">
              <input type="text" placeholder="🔍 Search posts..." class="blog-search">
              <button class="btn-primary">Subscribe</button>
            </div>
          </div>
        </header>

        <section class="blog-hero">
          <div class="hero-content">
            <h1>Insights & Stories</h1>
            <p>Discover the latest in tech, design, and innovation</p>
          </div>
        </section>

        <section class="blog-content">
          <div class="blog-main">
            <div class="blog-filter">
              <div class="filter-group">
                <label>Categories:</label>
                <div class="category-tags">
                  ${categories.map((cat, i) => `
                    <button class="tag ${i === 0 ? 'active' : ''}">${cat}</button>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="blog-posts">
              ${posts.map((post, i) => `
                <article class="blog-card ${post.featured ? 'featured' : ''}">
                  <div class="post-image">${post.image}</div>
                  <div class="post-content">
                    <div class="post-meta">
                      <span class="category-badge" style="background: ${colors.primary}20; color: ${colors.primary};">${post.category}</span>
                      <span class="post-date">📅 ${post.date}</span>
                      <span class="read-time">⏱️ ${post.readTime} min read</span>
                    </div>
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-footer">
                      <div class="author-info">
                        <span class="author-avatar">${post.author.avatar}</span>
                        <div>
                          <p class="author-name">${post.author.name}</p>
                          <p class="author-role">${post.author.role}</p>
                        </div>
                      </div>
                      <div class="post-stats">
                        <span>❤️ ${post.likes}</span>
                        <span>👁️ ${post.views}</span>
                      </div>
                    </div>
                  </div>
                </article>
              `).join('')}
            </div>
          </div>

          <aside class="blog-sidebar">
            <div class="sidebar-widget newsletter">
              <h3>📧 Newsletter</h3>
              <p>Get the latest posts delivered to your inbox</p>
              <input type="email" placeholder="your@email.com" class="newsletter-input">
              <button class="btn-primary btn-full">Subscribe</button>
            </div>

            <div class="sidebar-widget popular">
              <h3>🔥 Popular</h3>
              <ul class="popular-list">
                <li><a href="#">React Hooks Best Practices</a></li>
                <li><a href="#">Modern CSS Layout Techniques</a></li>
                <li><a href="#">Web Performance Optimization</a></li>
                <li><a href="#">Accessibility Guidelines 2025</a></li>
              </ul>
            </div>

            <div class="sidebar-widget tags">
              <h3>🏷️ Tags</h3>
              <div class="tags-cloud">
                ${['React', 'Web Design', 'JavaScript', 'CSS', 'Performance', 'SEO', 'UX', 'DevOps'].map(tag => `
                  <a href="#" class="tag-item">${tag}</a>
                `).join('')}
              </div>
            </div>
          </aside>
        </section>
      </div>
    `;
  }
}

// ============================================================================
// PORTFOLIO GENERATOR
// ============================================================================

export class PortfolioGenerator {
  static generateMockProjects(rng, count = 6) {
    const projects = [
      { name: 'E-Commerce Platform', desc: 'Full-stack marketplace with payment integration', tech: ['React', 'Node.js', 'MongoDB'], image: '🛍️', year: 2024 },
      { name: 'AI Dashboard', desc: 'Real-time analytics dashboard with ML insights', tech: ['React', 'Python', 'PostgreSQL'], image: '📊', year: 2024 },
      { name: 'Mobile App', desc: 'Cross-platform mobile application', tech: ['React Native', 'Firebase'], image: '📱', year: 2023 },
      { name: 'Design System', desc: 'Comprehensive component library', tech: ['Storybook', 'CSS', 'TypeScript'], image: '🎨', year: 2023 },
      { name: 'API Gateway', desc: 'Microservices orchestration layer', tech: ['Node.js', 'Kubernetes'], image: '🔌', year: 2023 },
      { name: 'CMS Platform', desc: 'Headless CMS for modern workflows', tech: ['Next.js', 'GraphQL'], image: '📝', year: 2022 },
    ];
    return projects.slice(0, count);
  }

  static generate(rng, colors, analysis = {}) {
    const projects = this.generateMockProjects(rng, 6);

    return `
      <div class="portfolio-container">
        <nav class="portfolio-nav">
          <div class="nav-content">
            <div class="portfolio-logo">💼 Portfolio</div>
            <div class="nav-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#work">Work</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </nav>

        <section class="portfolio-hero">
          <div class="hero-wrapper">
            <div class="hero-text">
              <h1>Creative Developer & Designer</h1>
              <p>I create beautiful, functional digital experiences</p>
              <div class="hero-cta">
                <button class="btn-primary">View My Work</button>
                <button class="btn-secondary">Get In Touch</button>
              </div>
            </div>
            <div class="hero-avatar">🚀</div>
          </div>
        </section>

        <section class="portfolio-about">
          <div class="about-grid">
            <div class="about-text">
              <h2>About Me</h2>
              <p>With 5+ years of experience in web development and design, I specialize in creating user-centric digital solutions. I combine technical expertise with creative design thinking.</p>
              <div class="skills-section">
                <h3>Skills</h3>
                <div class="skills-grid">
                  ${['React', 'JavaScript', 'UI/UX Design', 'Node.js', 'TypeScript', 'CSS', 'Web Design', 'DevOps'].map(skill => `
                    <span class="skill-badge" style="background: ${colors.primary}20; color: ${colors.primary};">${skill}</span>
                  `).join('')}
                </div>
              </div>
            </div>
            <div class="about-stats">
              <div class="stat-box">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div class="stat-box">
                <h3>30+</h3>
                <p>Happy Clients</p>
              </div>
              <div class="stat-box">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
              <div class="stat-box">
                <h3>⭐⭐⭐⭐⭐</h3>
                <p>Client Rating</p>
              </div>
            </div>
          </div>
        </section>

        <section class="portfolio-work">
          <h2>Featured Work</h2>
          <div class="projects-grid">
            ${projects.map((proj, i) => `
              <div class="project-card">
                <div class="project-image">${proj.image}</div>
                <div class="project-info">
                  <h3>${proj.name}</h3>
                  <p>${proj.desc}</p>
                  <div class="project-tech">
                    ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                  </div>
                  <div class="project-footer">
                    <span class="project-year">${proj.year}</span>
                    <a href="#" class="view-link">View Project →</a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="portfolio-testimonials">
          <h2>What Clients Say</h2>
          <div class="testimonials-grid">
            ${[
              { name: 'John Smith', role: 'CEO, Tech StartUp', text: 'Amazing work! Delivered beyond expectations.' },
              { name: 'Lisa Chen', role: 'Product Manager, Design Co', text: 'Professional, creative, and highly responsive.' },
              { name: 'Mike Brown', role: 'Founder, Digital Agency', text: 'Transformed our vision into reality perfectly.' },
            ].map(test => `
              <div class="testimonial-card">
                <p class="testimonial-text">"${test.text}"</p>
                <div class="testimonial-author">
                  <span class="author-avatar">👤</span>
                  <div>
                    <p class="author-name">${test.name}</p>
                    <p class="author-role">${test.role}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="portfolio-cta">
          <h2>Let's Work Together</h2>
          <p>Have a project in mind? I'd love to hear from you!</p>
          <button class="btn-primary btn-lg">Start a Conversation</button>
        </section>
      </div>
    `;
  }
}

// ============================================================================
// SOCIAL MEDIA GENERATOR
// ============================================================================

export class SocialMediaGenerator {
  static generateMockPosts(rng, count = 8) {
    const posts = [];
    for (let i = 0; i < count; i++) {
      posts.push({
        id: i + 1,
        author: `User ${String.fromCharCode(65 + (i % 26))}`,
        handle: `@user${i + 1}`,
        avatar: String.fromCharCode(65 + (i % 26)),
        content: `Just launched something awesome! Check it out and let me know what you think 🚀`,
        image: ['📸', '🎨', '🎬', '📱'][i % 4],
        timestamp: `${rng.int(1, 23)}h ago`,
        likes: rng.int(10, 2000),
        comments: rng.int(0, 150),
        shares: rng.int(0, 100),
        liked: rng.bool(0.3),
      });
    }
    return posts;
  }

  static generate(rng, colors, analysis = {}) {
    const posts = this.generateMockPosts(rng, 8);

    return `
      <div class="social-app">
        <div class="social-sidebar">
          <div class="logo">📱 SocialHub</div>
          <nav class="social-nav">
            <a href="#" class="nav-item active">🏠 Home</a>
            <a href="#" class="nav-item">🔍 Explore</a>
            <a href="#" class="nav-item">❤️ Notifications</a>
            <a href="#" class="nav-item">💬 Messages</a>
            <a href="#" class="nav-item">🔖 Bookmarks</a>
            <a href="#" class="nav-item">👤 Profile</a>
          </nav>
          <button class="btn-primary btn-full btn-lg">Post</button>
        </div>

        <main class="social-feed">
          <div class="feed-header">
            <h2>Home Feed</h2>
          </div>

          <div class="post-composer">
            <div class="composer-avatar">👤</div>
            <textarea class="composer-input" placeholder="What's happening!?"></textarea>
          </div>

          <div class="posts-list">
            ${posts.map((post, i) => `
              <article class="post">
                <div class="post-header">
                  <div class="author-info">
                    <span class="author-avatar">${post.avatar}</span>
                    <div>
                      <p class="author-name">${post.author}</p>
                      <p class="author-handle">${post.handle} · ${post.timestamp}</p>
                    </div>
                  </div>
                  <button class="post-menu">⋯</button>
                </div>
                <div class="post-body">
                  <p class="post-text">${post.content}</p>
                  ${post.image ? `<div class="post-image">${post.image}</div>` : ''}
                </div>
                <div class="post-actions">
                  <button class="action-btn">💬 ${post.comments}</button>
                  <button class="action-btn">🔄 ${post.shares}</button>
                  <button class="action-btn ${post.liked ? 'liked' : ''}">❤️ ${post.likes}</button>
                  <button class="action-btn">📤 Share</button>
                </div>
              </article>
            `).join('')}
          </div>
        </main>

        <aside class="social-trending">
          <div class="trending-box">
            <h3>What's happening</h3>
            <div class="trending-items">
              <a href="#" class="trending-item">
                <span class="trend-title">#ReactJS</span>
                <span class="trend-count">1.2M Posts</span>
              </a>
              <a href="#" class="trending-item">
                <span class="trend-title">#WebDevelopment</span>
                <span class="trend-count">856K Posts</span>
              </a>
              <a href="#" class="trending-item">
                <span class="trend-title">#DesignTrends</span>
                <span class="trend-count">543K Posts</span>
              </a>
              <a href="#" class="trending-item">
                <span class="trend-title">#OpenSource</span>
                <span class="trend-count">392K Posts</span>
              </a>
            </div>
          </div>

          <div class="suggestions-box">
            <h3>Who to follow</h3>
            <div class="suggestions-list">
              ${['React Team', 'Web Dev Daily', 'Design Masters'].map(name => `
                <div class="suggestion-item">
                  <span class="sugg-avatar">👤</span>
                  <div>
                    <p class="sugg-name">${name}</p>
                    <p class="sugg-handle">@${name.toLowerCase().replace(' ', '')}</p>
                  </div>
                  <button class="btn-small">Follow</button>
                </div>
              `).join('')}
            </div>
          </div>
        </aside>
      </div>
    `;
  }
}

// ============================================================================
// VIDEO STREAMING GENERATOR
// ============================================================================

export class VideoStreamingGenerator {
  static generateMockVideos(rng, count = 12) {
    const videos = [];
    for (let i = 0; i < count; i++) {
      videos.push({
        id: i + 1,
        title: `${rng.pick(['Beginner', 'Advanced', 'Ultimate'])} Guide to ${rng.pick(['Web Dev', 'React', 'UI/UX', 'DevOps'])}`,
        thumbnail: ['🎬', '📹', '🎥'][i % 3],
        channel: `Channel ${String.fromCharCode(65 + (i % 5))}`,
        views: rng.int(10000, 1000000),
        duration: `${rng.int(5, 180)}:${String(rng.int(0, 59)).padStart(2, '0')}`,
        rating: (rng.float(3.5, 5)).toFixed(1),
        badge: i < 2 ? '🔥 Trending' : '',
      });
    }
    return videos;
  }

  static generate(rng, colors, analysis = {}) {
    const videos = this.generateMockVideos(rng, 12);

    return `
      <div class="video-streaming">
        <header class="video-header">
          <div class="header-content">
            <div class="logo">🎬 StreamMax</div>
            <div class="header-search">
              <input type="text" placeholder="🔍 Search videos...">
            </div>
            <nav class="header-nav">
              <a href="#">🏠 Home</a>
              <a href="#">🔥 Trending</a>
              <a href="#">📚 Categories</a>
              <a href="#">👤 My Library</a>
            </nav>
          </div>
        </header>

        <div class="video-layout">
          <main class="video-main">
            <section class="featured-video">
              <div class="video-player">
                <div class="player-placeholder">▶️ Featured Content</div>
                <div class="player-controls">
                  <button>⏮️</button>
                  <button>⏯️</button>
                  <button>⏭️</button>
                  <input type="range" class="progress-bar">
                  <button>🔊</button>
                  <button>⛶</button>
                </div>
              </div>
              <div class="video-info">
                <h2>Mastering Modern Web Development</h2>
                <div class="video-meta">
                  <span>👤 Tech Academy</span>
                  <span>👁️ 1.2M views</span>
                  <span>⭐ 4.8 rating</span>
                </div>
                <p>Learn the latest techniques and best practices in web development...</p>
                <div class="video-buttons">
                  <button class="btn-primary">▶️ Watch Now</button>
                  <button class="btn-secondary">➕ Add to List</button>
                </div>
              </div>
            </section>

            <section class="trending-section">
              <h3>🔥 Trending Now</h3>
              <div class="videos-grid">
                ${videos.slice(0, 6).map((video, i) => `
                  <div class="video-card">
                    <div class="video-thumbnail">${video.thumbnail}</div>
                    ${video.badge ? `<span class="video-badge">${video.badge}</span>` : ''}
                    <span class="video-duration">${video.duration}</span>
                    <div class="video-details">
                      <h4>${video.title}</h4>
                      <p class="channel-name">${video.channel}</p>
                      <p class="video-stats">👁️ ${(video.views / 1000).toFixed(0)}K • ⭐ ${video.rating}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <section class="recommendations-section">
              <h3>📺 Recommended For You</h3>
              <div class="videos-grid">
                ${videos.slice(6, 12).map((video, i) => `
                  <div class="video-card">
                    <div class="video-thumbnail">${video.thumbnail}</div>
                    <span class="video-duration">${video.duration}</span>
                    <div class="video-details">
                      <h4>${video.title}</h4>
                      <p class="channel-name">${video.channel}</p>
                      <p class="video-stats">👁️ ${(video.views / 1000).toFixed(0)}K • ⭐ ${video.rating}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          </main>

          <aside class="video-sidebar">
            <div class="sidebar-section">
              <h4>Categories</h4>
              <div class="category-list">
                ${['Programming', 'Design', 'Business', 'Music', 'Gaming', 'Sports'].map(cat => `
                  <a href="#" class="category-link">${cat}</a>
                `).join('')}
              </div>
            </div>

            <div class="sidebar-section">
              <h4>Subscriptions</h4>
              <div class="subscription-list">
                ${['ReactJS Channel', 'Web Dev Daily', 'Design Masters'].map(sub => `
                  <div class="subscription-item">
                    <span>🎬 ${sub}</span>
                    <button class="btn-small">Subscribed</button>
                  </div>
                `).join('')}
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;
  }
}

// ============================================================================
// MUSIC APP GENERATOR
// ============================================================================

export class MusicAppGenerator {
  static generateMockPlaylists(rng, count = 6) {
    const playlists = [];
    for (let i = 0; i < count; i++) {
      playlists.push({
        id: i + 1,
        name: `${rng.pick(['Summer', 'Winter', 'Focus', 'Party', 'Chill'])} ${rng.pick(['Vibes', 'Hits', 'Classics', 'Mix'])}`,
        songs: rng.int(20, 100),
        duration: rng.int(1, 12),
        image: ['🎵', '🎶', '🎸', '🎹', '🎤', '🎧'][i % 6],
        updated: `Updated ${rng.int(1, 30)}d ago`,
      });
    }
    return playlists;
  }

  static generate(rng, colors, analysis = {}) {
    const playlists = this.generateMockPlaylists(rng, 6);

    return `
      <div class="music-app">
        <div class="music-sidebar">
          <div class="music-logo">🎵 MusicHub</div>
          <nav class="music-nav">
            <a href="#" class="nav-item active">
              <span>🏠</span> Home
            </a>
            <a href="#" class="nav-item">
              <span>🔍</span> Search
            </a>
            <a href="#" class="nav-item">
              <span>📚</span> Your Library
            </a>
          </nav>
          <div class="music-playlists">
            <h3>Playlists</h3>
            <a href="#" class="playlist-item">❤️ Liked Songs</a>
            <a href="#" class="playlist-item">⭐ Favorites</a>
            <a href="#" class="playlist-item">🎶 Recently Played</a>
            <a href="#" class="playlist-item">➕ Create Playlist</a>
          </div>
        </div>

        <main class="music-main">
          <div class="music-header">
            <input type="text" placeholder="🔍 Search songs, artists, albums..." class="search-bar">
            <button class="btn-primary">🔔 Notifications</button>
          </div>

          <section class="featured-section">
            <h2>Featured Playlists</h2>
            <div class="playlists-grid">
              ${playlists.map((playlist, i) => `
                <div class="playlist-card">
                  <div class="playlist-image">${playlist.image}</div>
                  <div class="playlist-details">
                    <h3>${playlist.name}</h3>
                    <p>${playlist.songs} songs • ${playlist.duration}h</p>
                    <p class="updated">${playlist.updated}</p>
                  </div>
                  <button class="play-btn">▶️ Play</button>
                </div>
              `).join('')}
            </div>
          </section>

          <section class="now-playing">
            <h2>Now Playing</h2>
            <div class="player-section">
              <div class="player-display">
                <div class="album-art">🎵</div>
                <div class="track-info">
                  <h3>Midnight Dreams</h3>
                  <p>Artist Name</p>
                </div>
              </div>
              <div class="player-controls">
                <button class="control-btn">⏮️ Previous</button>
                <button class="control-btn play">⏯️ Play</button>
                <button class="control-btn">⏭️ Next</button>
              </div>
              <div class="progress-section">
                <span class="time">0:00</span>
                <input type="range" class="progress-bar">
                <span class="time">3:45</span>
              </div>
              <div class="volume-control">
                <span>🔊</span>
                <input type="range" class="volume-slider">
              </div>
            </div>
          </section>

          <section class="recommendations">
            <h2>🎧 Recommended</h2>
            <div class="songs-list">
              ${[
                { name: 'Song Title 1', artist: 'Artist A', plays: 1200 },
                { name: 'Song Title 2', artist: 'Artist B', plays: 956 },
                { name: 'Song Title 3', artist: 'Artist C', plays: 834 },
                { name: 'Song Title 4', artist: 'Artist D', plays: 742 },
                { name: 'Song Title 5', artist: 'Artist E', plays: 691 },
              ].map((song, i) => `
                <div class="song-item">
                  <span class="song-number">${i + 1}</span>
                  <div class="song-details">
                    <p class="song-name">${song.name}</p>
                    <p class="artist-name">${song.artist}</p>
                  </div>
                  <span class="song-plays">👁️ ${song.plays}</span>
                  <button class="action-btn">❤️</button>
                  <button class="action-btn">▶️</button>
                </div>
              `).join('')}
            </div>
          </section>
        </main>
      </div>
    `;
  }
}

export default {
  BlogGenerator,
  PortfolioGenerator,
  SocialMediaGenerator,
  VideoStreamingGenerator,
  MusicAppGenerator,
};
