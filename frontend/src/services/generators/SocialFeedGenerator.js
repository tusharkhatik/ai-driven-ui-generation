// ============================================================================
// SOCIAL FEED GENERATOR - Facebook-like Social Media UI
// ============================================================================

export class SocialFeedGenerator {
  static generate(rng, colors, analysis = {}) {
    const posts = this.generatePosts(rng, 5);
    const suggestions = this.generateSuggestions(rng, 3);

    return `
      <div class="social-feed-wrapper">
        <!-- Header -->
        <header class="social-header">
          <div class="social-header-container">
            <div class="social-logo">👥 SocialHub</div>
            <div class="social-search-box">
              <input type="text" placeholder="🔍 Search people or posts..." class="search-input">
            </div>
            <div class="social-header-actions">
              <button class="social-icon-btn">🔔 <span class="notification-badge">3</span></button>
              <button class="social-icon-btn">💬</button>
              <button class="social-icon-btn">⚙️</button>
            </div>
          </div>
        </header>

        <div class="social-container">
          <!-- Left Sidebar -->
          <aside class="social-sidebar">
            <div class="sidebar-section">
              <div class="sidebar-user-card">
                <div class="user-cover" style="background: ${colors.gradient}"></div>
                <div class="user-info">
                  <div class="user-avatar">👤</div>
                  <h3>Your Name</h3>
                  <p>@yourhandle</p>
                  <p class="user-stats">1.2K followers • 342 following</p>
                </div>
              </div>
            </div>

            <nav class="sidebar-menu">
              <a href="#" class="menu-item active">
                <span class="menu-icon">🏠</span>
                <span>Home</span>
              </a>
              <a href="#" class="menu-item">
                <span class="menu-icon">👥</span>
                <span>Friends</span>
              </a>
              <a href="#" class="menu-item">
                <span class="menu-icon">📸</span>
                <span>Photos</span>
              </a>
              <a href="#" class="menu-item">
                <span class="menu-icon">💬</span>
                <span>Messages</span>
              </a>
              <a href="#" class="menu-item">
                <span class="menu-icon">❤️</span>
                <span>Saved</span>
              </a>
            </nav>
          </aside>

          <!-- Main Feed -->
          <main class="social-feed">
            <!-- Create Post -->
            <div class="post-composer">
              <div class="composer-header">
                <div class="composer-avatar">👤</div>
                <input type="text" placeholder="What's on your mind?" class="composer-input">
              </div>
              <div class="composer-actions">
                <button class="composer-btn">📸 Photo/Video</button>
                <button class="composer-btn">😊 Feeling/Activity</button>
                <button class="composer-btn">📍 Check In</button>
              </div>
              <button class="composer-post-btn">Post</button>
            </div>

            <!-- Posts Feed -->
            ${posts.map((post, i) => `
              <div class="post-card">
                <div class="post-header">
                  <div class="post-avatar">${post.avatar}</div>
                  <div class="post-author">
                    <h4>${post.author}</h4>
                    <small>${post.time}</small>
                  </div>
                  <button class="post-menu">⋮</button>
                </div>

                <div class="post-content">
                  <p>${post.content}</p>
                </div>

                ${post.image ? `
                  <div class="post-image">${post.image}</div>
                ` : ''}

                <div class="post-stats">
                  <span>❤️ ${rng.int(10, 500)} likes</span>
                  <span>💬 ${rng.int(2, 50)} comments</span>
                  <span>↗️ ${rng.int(1, 20)} shares</span>
                </div>

                <div class="post-actions">
                  <button class="action-btn">👍 Like</button>
                  <button class="action-btn">💬 Comment</button>
                  <button class="action-btn">↗️ Share</button>
                </div>

                <div class="post-comments">
                  <div class="comment">
                    <div class="comment-avatar">👤</div>
                    <div class="comment-content">
                      <strong>John Doe</strong>
                      <p>Great post! Love this.</p>
                    </div>
                  </div>
                  <div class="comment">
                    <div class="comment-avatar">👤</div>
                    <div class="comment-content">
                      <strong>Jane Smith</strong>
                      <p>Amazing! 🔥</p>
                    </div>
                  </div>
                </div>

                <div class="comment-input">
                  <div class="comment-avatar">👤</div>
                  <input type="text" placeholder="Write a comment..." class="comment-field">
                </div>
              </div>
            `).join('')}
          </main>

          <!-- Right Sidebar - Suggestions -->
          <aside class="social-suggestions">
            <div class="suggestions-header">
              <h3>People You May Know</h3>
              <a href="#" class="see-all">See All →</a>
            </div>

            ${suggestions.map((sugg, i) => `
              <div class="suggestion-card">
                <div class="suggestion-avatar">${sugg.avatar}</div>
                <div class="suggestion-info">
                  <h4>${sugg.name}</h4>
                  <small>${sugg.mutual} mutual friends</small>
                </div>
                <button class="suggestion-btn">Add</button>
              </div>
            `).join('')}

            <div class="sidebar-section">
              <h4>Trending Now</h4>
              <div class="trend-item">
                <span class="trend-tag">#WebDesign</span>
                <small>45.2K posts</small>
              </div>
              <div class="trend-item">
                <span class="trend-tag">#Technology</span>
                <small>128K posts</small>
              </div>
              <div class="trend-item">
                <span class="trend-tag">#Programming</span>
                <small>89.3K posts</small>
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  static generatePosts(rng, count = 5) {
    const authors = ['Sarah Chen', 'Marcus Johnson', 'Emma Wilson', 'Alex Kumar', 'Sophia Lee'];
    const contents = [
      'Just launched my new project! Check it out 🚀',
      'Beautiful sunset at the beach today 🌅',
      'Working on something exciting... stay tuned! 👀',
      'Loving this new design trend #WebDesign',
      'Coffee and code - the perfect combination ☕💻'
    ];
    const times = ['5 mins ago', '2 hours ago', '1 day ago', '3 days ago', 'Yesterday'];
    const images = ['🌅', '🎨', '💻', '🎉', '📸'];

    const posts = [];
    for (let i = 0; i < count; i++) {
      posts.push({
        avatar: String.fromCodePoint(0x1F600 + rng.int(0, 70)),
        author: authors[i % authors.length],
        time: times[i % times.length],
        content: contents[i % contents.length],
        image: rng.bool(0.6) ? images[rng.int(0, images.length - 1)] : null,
      });
    }
    return posts;
  }

  static generateSuggestions(rng, count = 3) {
    const names = ['Alice Brown', 'Bob Wilson', 'Carol Smith', 'David Lee', 'Eve Johnson'];
    const suggestions = [];
    for (let i = 0; i < count; i++) {
      suggestions.push({
        avatar: String.fromCodePoint(0x1F600 + rng.int(0, 70)),
        name: names[i % names.length],
        mutual: rng.int(2, 10),
      });
    }
    return suggestions;
  }
}
