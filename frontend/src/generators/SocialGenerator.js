/**
 * SocialGenerator.js
 * Extends BaseAppGenerator to generate social media, community, and messaging applications
 * * Supported Applications:
 * - Social Media App
 * - Community Platform
 * - Messaging App
 * * Components:
 * - feed
 * - storyBar
 * - chatPanel
 * - userProfile
 * - notificationCenter
 * - commentSection
 * * Supported Layouts:
 * - social-feed
 * - messaging-layout
 * - creator-platform
 * - community-layout
 * - minimal-social
 */

import BaseAppGenerator from './base/BaseAppGenerator.js';

class SocialGenerator extends BaseAppGenerator {
  constructor(config = {}) {
    super(config);
    this.category = 'social';
    this.appType = config.appType || 'Social Media App';
    this.layout = config.layout || 'social-feed';
    this.components = config.components || ['feed', 'userProfile', 'notificationCenter'];
    this.theme = config.theme || 'light';
    this.primaryColor = config.primaryColor || '#1DA1F2';
    this.secondaryColor = config.secondaryColor || '#17BF63';
    
    this.supportedApps = [
      'Social Media App',
      'Community Platform',
      'Messaging App'
    ];
    
    this.supportedComponents = [
      'feed',
      'storyBar',
      'chatPanel',
      'userProfile',
      'notificationCenter',
      'commentSection'
    ];
    
    this.supportedLayouts = [
      'social-feed',
      'messaging-layout',
      'creator-platform',
      'community-layout',
      'minimal-social'
    ];
  }

  /**
   * Generate complete social application
   */
  generate() {
    this.validate();
    
    return {
      html: this.generateHTML(),
      css: this.generateCSS(),
      js: this.generateJS(),
      metadata: this.generateMetadata()
    };
  }

  /**
   * Validate configuration
   */
  validate() {
    if (!this.supportedApps.includes(this.appType)) {
      throw new Error(`Unsupported app type: ${this.appType}`);
    }
    
    if (!this.supportedLayouts.includes(this.layout)) {
      throw new Error(`Unsupported layout: ${this.layout}`);
    }
    
    const invalidComponents = this.components.filter(
      c => !this.supportedComponents.includes(c)
    );
    if (invalidComponents.length > 0) {
      throw new Error(`Unsupported components: ${invalidComponents.join(', ')}`);
    }
  }

  /**
   * Generate HTML structure
   */
  generateHTML() {
    // Provide a fallback if BaseAppGenerator doesn't define it
    let html = typeof this.getHTMLTemplate === 'function' ? this.getHTMLTemplate() : '';
    
    switch (this.layout) {
      case 'social-feed':
        return this.generateSocialFeedHTML();
      case 'messaging-layout':
        return this.generateMessagingHTML();
      case 'creator-platform':
        return this.generateCreatorPlatformHTML();
      case 'community-layout':
        return this.generateCommunityLayoutHTML();
      case 'minimal-social':
        return this.generateMinimalSocialHTML();
      default:
        return html || this.generateSocialFeedHTML();
    }
  }

  /**
   * Social Feed Layout HTML
   */
  generateSocialFeedHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Social Media Application">
  <title>${this.appType} - Connect & Share</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-container social-feed-layout">
    <header class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="${this.primaryColor}"/>
            <text x="16" y="20" text-anchor="middle" fill="white" font-size="20" font-weight="bold">S</text>
          </svg>
          <span class="app-name">${this.appType}</span>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="Search posts, people, tags..." class="search-input">
          <button class="search-btn">🔍</button>
        </div>
        <nav class="nav-menu">
          <a href="#home" class="nav-item active">Home</a>
          <a href="#explore" class="nav-item">Explore</a>
          <a href="#messages" class="nav-item">Messages</a>
          <a href="#profile" class="nav-item">Profile</a>
        </nav>
        <div class="user-menu">
          <button class="notification-btn">🔔<span class="badge">3</span></button>
          <div class="avatar">👤</div>
        </div>
      </div>
    </header>

    <div class="main-content">
      <aside class="sidebar">
        <div class="sidebar-section">
          <h3>Trending Topics</h3>
          <ul class="trends-list">
            <li class="trend-item">
              <span class="trend-tag">#ReactJS</span>
              <span class="trend-count">125K posts</span>
            </li>
            <li class="trend-item">
              <span class="trend-tag">#WebDevelopment</span>
              <span class="trend-count">89K posts</span>
            </li>
            <li class="trend-item">
              <span class="trend-tag">#JavaScript</span>
              <span class="trend-count">156K posts</span>
            </li>
            <li class="trend-item">
              <span class="trend-tag">#UX Design</span>
              <span class="trend-count">67K posts</span>
            </li>
          </ul>
        </div>
        <div class="sidebar-section recommended">
          <h3>Recommended Users</h3>
          <ul class="users-list">
            <li class="user-card-mini">
              <div class="user-avatar">👨‍💻</div>
              <div class="user-info-mini">
                <p class="user-name">John Developer</p>
                <p class="user-handle">@johndeveloper</p>
              </div>
              <button class="follow-btn">Follow</button>
            </li>
            <li class="user-card-mini">
              <div class="user-avatar">👩‍🎨</div>
              <div class="user-info-mini">
                <p class="user-name">Sarah Designer</p>
                <p class="user-handle">@sarahdesign</p>
              </div>
              <button class="follow-btn">Follow</button>
            </li>
          </ul>
        </div>
      </aside>

      <section class="feed">
        ${this.components.includes('storyBar') ? this.generateStoryBar() : ''}
        
        <div class="compose-area">
          <div class="compose-header">
            <div class="user-avatar-large">👤</div>
            <input type="text" placeholder="What's on your mind?" class="compose-input" id="postInput">
          </div>
          <div class="compose-actions">
            <button class="action-btn">📷 Photo</button>
            <button class="action-btn">😊 Emoji</button>
            <button class="action-btn">📍 Location</button>
            <button class="publish-btn">Post</button>
          </div>
        </div>

        <div class="posts-container" id="postsContainer">
          ${this.generateFeedPosts()}
        </div>
      </section>

      <aside class="right-sidebar">
        ${this.components.includes('notificationCenter') ? this.generateNotificationCenter() : ''}
      </aside>
    </div>

    ${this.components.includes('chatPanel') ? this.generateChatPanel() : ''}
  </div>

  <script src="app.js"></script>
</body>
</html>`;
  }

  /**
   * Messaging Layout HTML
   */
  generateMessagingHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Messaging Application">
  <title>${this.appType} - Messages</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-container messaging-layout">
    <header class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="${this.primaryColor}"/>
            <text x="16" y="20" text-anchor="middle" fill="white" font-size="20" font-weight="bold">M</text>
          </svg>
          <span class="app-name">Messages</span>
        </div>
        <nav class="nav-menu">
          <a href="#inbox" class="nav-item active">Inbox</a>
          <a href="#communities" class="nav-item">Communities</a>
          <a href="#profile" class="nav-item">Profile</a>
        </nav>
      </div>
    </header>

    <div class="main-content messaging-content">
      <aside class="conversations-sidebar">
        <div class="conversations-header">
          <h2>Messages</h2>
          <button class="new-message-btn">✏️</button>
        </div>
        <input type="text" placeholder="Search conversations..." class="search-conversations">
        <div class="conversations-list" id="conversationsList">
          ${this.generateConversationsList()}
        </div>
      </aside>

      <section class="chat-area">
        <div class="chat-header">
          <div class="chat-user-info">
            <div class="chat-avatar">👥</div>
            <div class="chat-header-text">
              <h3 class="chat-user-name">Select a conversation</h3>
              <p class="chat-status">Click a message to start chatting</p>
            </div>
          </div>
          <div class="chat-actions">
            <button class="icon-btn">📞</button>
            <button class="icon-btn">📹</button>
            <button class="icon-btn">ℹ️</button>
          </div>
        </div>

        <div class="messages-container" id="messagesContainer">
          <div class="empty-state">
            <p>No conversation selected</p>
            <p class="empty-state-hint">Select a conversation from the left panel</p>
          </div>
        </div>

        <div class="message-input-area">
          <input type="text" placeholder="Type a message..." class="message-input" id="messageInput">
          <button class="send-btn">➤</button>
          <button class="emoji-btn">😊</button>
        </div>
      </section>
    </div>

    ${this.components.includes('userProfile') ? this.generateUserProfile() : ''}
  </div>

  <script src="app.js"></script>
</body>
</html>`;
  }

  /**
   * Creator Platform Layout HTML
   */
  generateCreatorPlatformHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Creator Platform">
  <title>${this.appType} - Creator Hub</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-container creator-platform-layout">
    <header class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <span class="app-name">Creator Hub</span>
        </div>
        <nav class="nav-menu">
          <a href="#dashboard" class="nav-item active">Dashboard</a>
          <a href="#create" class="nav-item">Create</a>
          <a href="#analytics" class="nav-item">Analytics</a>
          <a href="#monetization" class="nav-item">Monetization</a>
        </nav>
        <div class="user-menu">
          <button class="notification-btn">🔔</button>
          <div class="avatar">👤</div>
        </div>
      </div>
    </header>

    <div class="main-content creator-content">
      <div class="creator-stats">
        <div class="stat-card">
          <span class="stat-label">Followers</span>
          <span class="stat-value">15.2K</span>
          <span class="stat-change">+12% this month</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total Views</span>
          <span class="stat-value">842K</span>
          <span class="stat-change">+25% this week</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Engagement Rate</span>
          <span class="stat-value">8.4%</span>
          <span class="stat-change">+2% from last month</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Revenue</span>
          <span class="stat-value">$2,450</span>
          <span class="stat-change">+18% this month</span>
        </div>
      </div>

      <section class="create-section">
        <h2>Create New Content</h2>
        <div class="content-types">
          <div class="content-type-card">
            <div class="content-icon">📝</div>
            <h3>Article</h3>
            <p>Write long-form content</p>
            <button class="create-btn">Create Article</button>
          </div>
          <div class="content-type-card">
            <div class="content-icon">📸</div>
            <h3>Photo Series</h3>
            <p>Share your best moments</p>
            <button class="create-btn">Upload Photos</button>
          </div>
          <div class="content-type-card">
            <div class="content-icon">🎥</div>
            <h3>Video</h3>
            <p>Create and upload videos</p>
            <button class="create-btn">Upload Video</button>
          </div>
          <div class="content-type-card">
            <div class="content-icon">🎵</div>
            <h3>Podcast</h3>
            <p>Launch audio content</p>
            <button class="create-btn">Start Podcast</button>
          </div>
        </div>
      </section>

      <section class="recent-content">
        <h2>Your Recent Content</h2>
        <div class="content-grid" id="contentGrid">
          ${this.generateCreatorContent()}
        </div>
      </section>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>`;
  }

  /**
   * Community Layout HTML
   */
  generateCommunityLayoutHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Community Platform">
  <title>${this.appType} - Community</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-container community-layout">
    <header class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <span class="app-name">Community</span>
        </div>
        <nav class="nav-menu">
          <a href="#home" class="nav-item active">Home</a>
          <a href="#communities" class="nav-item">Communities</a>
          <a href="#trending" class="nav-item">Trending</a>
          <a href="#profile" class="nav-item">Profile</a>
        </nav>
        <div class="user-menu">
          <button class="notification-btn">🔔</button>
          <div class="avatar">👤</div>
        </div>
      </div>
    </header>

    <div class="main-content community-content">
      <aside class="communities-sidebar">
        <div class="sidebar-header">
          <h3>Your Communities</h3>
          <button class="create-community-btn">+</button>
        </div>
        <ul class="communities-list" id="communitiesList">
          ${this.generateCommunitiesList()}
        </ul>
      </aside>

      <section class="community-feed">
        <div class="feed-header">
          <h2>Community Feed</h2>
          <div class="feed-filters">
            <button class="filter-btn active">Latest</button>
            <button class="filter-btn">Popular</button>
            <button class="filter-btn">Following</button>
          </div>
        </div>

        <div class="community-posts" id="communityPosts">
          ${this.generateCommunityPosts()}
        </div>
      </section>

      <aside class="community-sidebar">
        <div class="community-info">
          <h3>Community Stats</h3>
          <div class="info-item">
            <span class="info-label">Total Members</span>
            <span class="info-value">2.4M</span>
          </div>
          <div class="info-item">
            <span class="info-label">Active Today</span>
            <span class="info-value">342K</span>
          </div>
          <div class="info-item">
            <span class="info-label">Posts Today</span>
            <span class="info-value">12.5K</span>
          </div>
        </div>
      </aside>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>`;
  }

  /**
   * Minimal Social Layout HTML
   */
  generateMinimalSocialHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Minimal Social App">
  <title>${this.appType} - Connect Minimal</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-container minimal-social-layout">
    <header class="navbar-minimal">
      <div class="navbar-content">
        <div class="logo">
          <span class="app-name">Social</span>
        </div>
        <nav class="nav-menu-minimal">
          <a href="#feed" class="nav-item active">🏠</a>
          <a href="#search" class="nav-item">🔍</a>
          <a href="#messages" class="nav-item">💬</a>
          <a href="#profile" class="nav-item">👤</a>
        </nav>
      </div>
    </header>

    <div class="main-content minimal-content">
      <section class="minimal-feed">
        <div class="compose-area-minimal">
          <input type="text" placeholder="Share something..." class="compose-input-minimal">
          <button class="compose-btn-minimal">Post</button>
        </div>

        <div class="posts-container-minimal" id="minimalPosts">
          ${this.generateMinimalPosts()}
        </div>
      </section>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>`;
  }

  /**
   * Generate story bar component
   */
  generateStoryBar() {
    return `<div class="story-bar">
      <div class="stories-container">
        <div class="story-item add-story">
          <div class="story-preview">+</div>
          <p class="story-name">Your Story</p>
        </div>
        <div class="story-item">
          <div class="story-preview">👨‍💼</div>
          <p class="story-name">Alex</p>
          <span class="story-badge">new</span>
        </div>
        <div class="story-item">
          <div class="story-preview">👩‍🎨</div>
          <p class="story-name">Maria</p>
          <span class="story-badge">new</span>
        </div>
        <div class="story-item">
          <div class="story-preview">👨‍🚀</div>
          <p class="story-name">David</p>
          <span class="story-badge">new</span>
        </div>
      </div>
    </div>`;
  }

  /**
   * Generate feed posts
   */
  generateFeedPosts() {
    const posts = [
      {
        author: 'John Developer',
        handle: '@johndeveloper',
        avatar: '👨‍💻',
        content: 'Just launched my new React project! Check it out and let me know what you think. #ReactJS #WebDevelopment',
        image: '🖼️',
        timestamp: '2 hours ago',
        likes: 342,
        comments: 28,
        shares: 12
      },
      {
        author: 'Sarah Designer',
        handle: '@sarahdesign',
        avatar: '👩‍🎨',
        content: 'Design tip: Always keep your UI simple and intuitive. Users appreciate clean interfaces! 🎨',
        image: null,
        timestamp: '4 hours ago',
        likes: 567,
        comments: 45,
        shares: 89
      },
      {
        author: 'Tech Blog',
        handle: '@techblog',
        avatar: '📰',
        content: 'The future of web development: Exploring Web Components and their role in modern applications',
        image: '📊',
        timestamp: '6 hours ago',
        likes: 1203,
        comments: 156,
        shares: 234
      }
    ];

    return posts.map(post => `
      <article class="post">
        <div class="post-header">
          <div class="post-author-info">
            <div class="post-avatar">${post.avatar}</div>
            <div class="author-details">
              <p class="author-name">${post.author}</p>
              <p class="author-handle">${post.handle} • ${post.timestamp}</p>
            </div>
          </div>
          <button class="post-menu-btn">⋮</button>
        </div>
        <div class="post-content">
          <p>${post.content}</p>
          ${post.image ? `<div class="post-image">${post.image}</div>` : ''}
        </div>
        <div class="post-interactions">
          <div class="interaction-stat">
            <span>${post.likes}</span> Likes
          </div>
          <div class="interaction-stat">
            <span>${post.comments}</span> Comments
          </div>
          <div class="interaction-stat">
            <span>${post.shares}</span> Shares
          </div>
        </div>
        <div class="post-actions">
          <button class="action-btn-post">👍 Like</button>
          <button class="action-btn-post">💬 Comment</button>
          <button class="action-btn-post">↗️ Share</button>
        </div>
      </article>
    `).join('');
  }

  /**
   * Generate notification center
   */
  generateNotificationCenter() {
    return `<div class="notification-center">
      <h3>Notifications</h3>
      <div class="notifications-list">
        <div class="notification-item unread">
          <div class="notification-avatar">👍</div>
          <div class="notification-content">
            <p><strong>Sarah Designer</strong> liked your post</p>
            <span class="notification-time">5 minutes ago</span>
          </div>
        </div>
        <div class="notification-item unread">
          <div class="notification-avatar">💬</div>
          <div class="notification-content">
            <p><strong>John Developer</strong> commented on your post</p>
            <span class="notification-time">12 minutes ago</span>
          </div>
        </div>
        <div class="notification-item">
          <div class="notification-avatar">👥</div>
          <div class="notification-content">
            <p><strong>Alex Turner</strong> started following you</p>
            <span class="notification-time">2 hours ago</span>
          </div>
        </div>
        <div class="notification-item">
          <div class="notification-avatar">⭐</div>
          <div class="notification-content">
            <p>Your post reached 1K likes!</p>
            <span class="notification-time">1 day ago</span>
          </div>
        </div>
      </div>
    </div>`;
  }

  /**
   * Generate chat panel
   */
  generateChatPanel() {
    return `<div class="chat-panel">
      <div class="chat-panel-header">
        <h3>Messages</h3>
        <button class="chat-panel-btn">+</button>
      </div>
      <div class="chat-conversations">
        <div class="chat-conv-item">
          <div class="chat-avatar">👨‍💼</div>
          <div class="chat-conv-info">
            <p class="chat-conv-name">Alex Turner</p>
            <p class="chat-conv-preview">Sounds great! Let's...</p>
          </div>
          <span class="chat-badge">2</span>
        </div>
        <div class="chat-conv-item">
          <div class="chat-avatar">👩‍🎨</div>
          <div class="chat-conv-info">
            <p class="chat-conv-name">Maria Garcia</p>
            <p class="chat-conv-preview">Thanks for sharing!</p>
          </div>
        </div>
        <div class="chat-conv-item">
          <div class="chat-avatar">👥</div>
          <div class="chat-conv-info">
            <p class="chat-conv-name">Design Team</p>
            <p class="chat-conv-preview">You: Great work!</p>
          </div>
        </div>
      </div>
    </div>`;
  }

  /**
   * Generate conversations list for messaging layout
   */
  generateConversationsList() {
    const conversations = [
      { name: 'Alex Turner', preview: 'Sounds great! See you then', time: '2m', avatar: '👨‍💼', unread: 2 },
      { name: 'Maria Garcia', preview: 'Thanks for sharing that resource', time: '1h', avatar: '👩‍🎨', unread: 0 },
      { name: 'John Developer', preview: 'Check out the new PR I just created', time: '3h', avatar: '👨‍💻', unread: 0 },
      { name: 'Sarah Designer', preview: 'Love the new design system!', time: '1d', avatar: '👩‍🎨', unread: 0 }
    ];

    return conversations.map(conv => `
      <div class="conversation-item ${conv.unread > 0 ? 'unread' : ''}">
        <div class="conversation-avatar">${conv.avatar}</div>
        <div class="conversation-info">
          <p class="conversation-name">${conv.name}</p>
          <p class="conversation-preview">${conv.preview}</p>
        </div>
        <div class="conversation-meta">
          <span class="conversation-time">${conv.time}</span>
          ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
        </div>
      </div>
    `).join('');
  }

  /**
   * Generate user profile component
   */
  generateUserProfile() {
    return `<aside class="user-profile">
      <div class="profile-header">
        <div class="profile-banner" style="background: linear-gradient(135deg, ${this.primaryColor}, ${this.secondaryColor})"></div>
        <div class="profile-avatar-large">👤</div>
        <h2 class="profile-name">Your Name</h2>
        <p class="profile-handle">@yourhandle</p>
        <button class="edit-profile-btn">Edit Profile</button>
      </div>
      <div class="profile-stats">
        <div class="profile-stat">
          <span class="stat-num">1,234</span>
          <span class="stat-label">Posts</span>
        </div>
        <div class="profile-stat">
          <span class="stat-num">12.5K</span>
          <span class="stat-label">Followers</span>
        </div>
        <div class="profile-stat">
          <span class="stat-num">845</span>
          <span class="stat-label">Following</span>
        </div>
      </div>
    </aside>`;
  }

  /**
   * Generate creator content
   */
  generateCreatorContent() {
    const contentItems = [
      { type: 'Article', title: 'Advanced React Patterns', views: '12.4K', date: '2 days ago' },
      { type: 'Video', title: 'Web Performance Tips', views: '24.8K', date: '1 week ago' },
      { type: 'Photo', title: 'Conference Highlights', views: '8.3K', date: '2 weeks ago' },
      { type: 'Article', title: 'CSS Grid Mastery', views: '18.9K', date: '1 month ago' }
    ];

    return contentItems.map(item => `
      <div class="content-item">
        <div class="content-thumbnail">📄</div>
        <div class="content-details">
          <h4>${item.title}</h4>
          <p class="content-type">${item.type}</p>
          <p class="content-stats">${item.views} views • ${item.date}</p>
        </div>
      </div>
    `).join('');
  }

  /**
   * Generate communities list
   */
  generateCommunitiesList() {
    const communities = [
      { name: 'Web Development', icon: '🌐', members: '1.2M' },
      { name: 'React Enthusiasts', icon: '⚛️', members: '856K' },
      { name: 'Design Discussion', icon: '🎨', members: '543K' },
      { name: 'JavaScript Tips', icon: '✨', members: '721K' }
    ];

    return communities.map(community => `
      <li class="community-item">
        <span class="community-icon">${community.icon}</span>
        <span class="community-name">${community.name}</span>
        <span class="community-members">${community.members}</span>
      </li>
    `).join('');
  }

  /**
   * Generate community posts
   */
  generateCommunityPosts() {
    const posts = [
      {
        community: 'Web Development',
        author: 'John Developer',
        title: 'Best practices for React hooks',
        views: '2.4K',
        comments: 156,
        upvotes: 892
      },
      {
        community: 'Design Discussion',
        author: 'Sarah Designer',
        title: 'Dark mode implementation guide',
        views: '3.1K',
        comments: 234,
        upvotes: 1203
      },
      {
        community: 'JavaScript Tips',
        author: 'Alex Turner',
        title: 'Understanding async/await',
        views: '1.8K',
        comments: 98,
        upvotes: 634
      }
    ];

    return posts.map(post => `
      <article class="community-post">
        <div class="community-post-header">
          <span class="post-community-tag">${post.community}</span>
          <p class="post-author">by ${post.author}</p>
        </div>
        <h3 class="community-post-title">${post.title}</h3>
        <div class="community-post-stats">
          <span>${post.views} views</span>
          <span>${post.comments} comments</span>
          <span>⬆️ ${post.upvotes}</span>
        </div>
      </article>
    `).join('');
  }

  /**
   * Generate minimal posts
   */
  generateMinimalPosts() {
    const posts = [
      { author: 'Alex', time: '1h', content: 'Just launched something cool!', likes: 234 },
      { author: 'Sarah', time: '3h', content: 'Working on new designs today', likes: 567 },
      { author: 'John', time: '5h', content: 'React performance tips thread 🧵', likes: 892 }
    ];

    return posts.map(post => `
      <div class="minimal-post">
        <div class="minimal-post-header">
          <strong>${post.author}</strong>
          <span class="minimal-time">${post.time} ago</span>
        </div>
        <p class="minimal-post-content">${post.content}</p>
        <div class="minimal-post-actions">
          <button class="minimal-action">❤️ ${post.likes}</button>
          <button class="minimal-action">💬</button>
          <button class="minimal-action">↗️</button>
        </div>
      </div>
    `).join('');
  }

  /**
   * Generate CSS styles
   */
  generateCSS() {
    return `/* ============================================
   Social Generator - Styles
   ============================================ */

:root {
  --primary-color: ${this.primaryColor};
  --secondary-color: ${this.secondaryColor};
  --bg-primary: ${this.theme === 'dark' ? '#121212' : '#ffffff'};
  --bg-secondary: ${this.theme === 'dark' ? '#1e1e1e' : '#f5f5f5'};
  --text-primary: ${this.theme === 'dark' ? '#ffffff' : '#000000'};
  --text-secondary: ${this.theme === 'dark' ? '#b0b0b0' : '#666666'};
  --border-color: ${this.theme === 'dark' ? '#333333' : '#e0e0e0'};
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  overflow-x: hidden;
}

/* ============================================
   Navigation Bar
   ============================================ */

.navbar {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 8px 12px;
  gap: 8px;
  min-width: 300px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  color: var(--text-primary);
  font-size: 14px;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.nav-menu {
  display: flex;
  gap: 30px;
  flex: 1;
}

.nav-item {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
}

.nav-item:hover,
.nav-item.active {
  color: var(--primary-color);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--primary-color);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.2s;
}

.notification-btn:hover {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
}

/* ============================================
   Main Layout
   ============================================ */

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  flex: 1;
}

.social-feed-layout .main-content {
  grid-template-columns: 280px 1fr 320px;
}

.messaging-layout {
  display: flex;
  flex-direction: column;
}

.messaging-layout .main-content {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 0;
  padding: 0;
  max-width: 100%;
}

/* ============================================
   Sidebar
   ============================================ */

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-section {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
}

.sidebar-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.trends-list {
  list-style: none;
}

.trend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 12px;
  border-radius: var(--radius-sm);
}

.trend-item:last-child {
  border-bottom: none;
}

.trend-item:hover {
  background-color: var(--bg-secondary);
}

.trend-tag {
  font-weight: 600;
  color: var(--primary-color);
}

.trend-count {
  font-size: 12px;
  color: var(--text-secondary);
}

.users-list {
  list-style: none;
}

.user-card-mini {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-md);
  margin-bottom: 8px;
  background-color: var(--bg-secondary);
}

.user-avatar {
  font-size: 32px;
}

.user-info-mini {
  flex: 1;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.user-handle {
  font-size: 12px;
  color: var(--text-secondary);
}

.follow-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.follow-btn:hover {
  opacity: 0.8;
}

/* ============================================
   Feed
   ============================================ */

.feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.story-bar {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
}

.stories-container {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.stories-container::-webkit-scrollbar {
  height: 4px;
}

.stories-container::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

.stories-container::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 2px;
}

.story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  min-width: 80px;
  position: relative;
  transition: transform 0.2s;
}

.story-item:hover {
  transform: scale(1.05);
}

.story-item.add-story .story-preview {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  font-size: 32px;
  font-weight: 700;
}

.story-preview {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 3px solid transparent;
  font-size: 32px;
}

.story-item:not(.add-story) .story-preview {
  border-color: var(--primary-color);
}

.story-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: var(--primary-color);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.story-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  text-align: center;
  max-width: 100%;
  word-break: break-word;
}

/* ============================================
   Compose Area
   ============================================ */

.compose-area {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
}

.compose-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.user-avatar-large {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.compose-input {
  flex: 1;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.compose-input:focus {
  border-color: var(--primary-color);
}

.compose-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.action-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 8px 16px;
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: var(--border-color);
}

.publish-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.publish-btn:hover {
  opacity: 0.8;
}

/* ============================================
   Posts
   ============================================ */

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s;
}

.post:hover {
  box-shadow: var(--shadow-md);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.post-author-info {
  display: flex;
  gap: 12px;
}

.post-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.author-handle {
  font-size: 12px;
  color: var(--text-secondary);
}

.post-menu-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.post-menu-btn:hover {
  color: var(--text-primary);
}

.post-content {
  margin-bottom: 12px;
  line-height: 1.5;
}

.post-content p {
  color: var(--text-primary);
  margin-bottom: 12px;
}

.post-image {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  margin-bottom: 12px;
}

.post-interactions {
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: var(--text-secondary);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 12px;
}

.interaction-stat span {
  font-weight: 600;
  color: var(--text-primary);
}

.post-actions {
  display: flex;
  gap: 12px;
}

.action-btn-post {
  flex: 1;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn-post:hover {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
}

/* ============================================
   Right Sidebar / Notifications
   ============================================ */

.right-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notification-center {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  max-height: 600px;
  overflow-y: auto;
}

.notification-center h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-md);
  background-color: var(--bg-secondary);
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: var(--border-color);
}

.notification-item.unread {
  background-color: ${this.theme === 'dark' ? 'rgba(29, 161, 242, 0.1)' : 'rgba(29, 161, 242, 0.05)'};
  border-left: 3px solid var(--primary-color);
}

.notification-avatar {
  font-size: 24px;
  min-width: 32px;
}

.notification-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notification-content p {
  font-size: 13px;
  color: var(--text-primary);
}

.notification-time {
  font-size: 11px;
  color: var(--text-secondary);
}

/* ============================================
   Chat Panel
   ============================================ */

.chat-panel {
  position: fixed;
  bottom: 0;
  right: 20px;
  width: 320px;
  height: 500px;
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  z-index: 50;
  border: 1px solid var(--border-color);
}

.chat-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.chat-panel-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.chat-panel-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.chat-panel-btn:hover {
  color: var(--text-primary);
}

.chat-conversations {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.chat-conv-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.chat-conv-item:hover {
  background-color: var(--bg-secondary);
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: var(--bg-secondary);
}

.chat-conv-info {
  flex: 1;
  min-width: 0;
}

.chat-conv-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.chat-conv-preview {
  font-size: 12px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: var(--primary-color);
  color: white;
  font-size: 11px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ============================================
   Messaging Layout
   ============================================ */

.conversations-sidebar {
  background-color: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.conversations-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.conversations-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.new-message-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--primary-color);
  transition: transform 0.2s;
}

.new-message-btn:hover {
  transform: scale(1.1);
}

.search-conversations {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 10px 12px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  margin-bottom: 12px;
}

.search-conversations::placeholder {
  color: var(--text-secondary);
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 8px;
  position: relative;
}

.conversation-item:hover {
  background-color: var(--bg-secondary);
}

.conversation-item.unread {
  background-color: ${this.theme === 'dark' ? 'rgba(29, 161, 242, 0.1)' : 'rgba(29, 161, 242, 0.05)'};
  border-left: 3px solid var(--primary-color);
}

.conversation-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: var(--bg-secondary);
  flex-shrink: 0;
}

.conversation-info {
  flex: 1;
  min-width: 0;
}

.conversation-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.conversation-preview {
  font-size: 12px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.conversation-time {
  font-size: 12px;
  color: var(--text-secondary);
}

.unread-badge {
  background-color: var(--primary-color);
  color: white;
  font-size: 10px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-area {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 16px;
}

.chat-user-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: var(--primary-color);
}

.chat-header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chat-user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.chat-status {
  font-size: 12px;
  color: var(--text-secondary);
}

.chat-actions {
  display: flex;
  gap: 12px;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s;
  padding: 8px;
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.icon-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
}

.empty-state p {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.empty-state-hint {
  font-size: 14px !important;
  margin-bottom: 0 !important;
}

.message-input-area {
  display: flex;
  gap: 12px;
  padding: 16px;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

.message-input {
  flex: 1;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 10px 12px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
}

.message-input::placeholder {
  color: var(--text-secondary);
}

.send-btn,
.emoji-btn {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 10px 16px;
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.send-btn:hover {
  opacity: 0.8;
}

.emoji-btn:hover {
  background-color: var(--bg-secondary);
}

/* ============================================
   Creator Platform
   ============================================ */

.creator-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.creator-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.stat-label {
  display: block;
  font-size: 12px;
  color: var(--text-secondary);
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.stat-change {
  display: block;
  font-size: 12px;
  color: var(--secondary-color);
  font-weight: 500;
}

.create-section {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.create-section h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.content-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.content-type-card {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid var(--border-color);
}

.content-type-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
}

.content-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.content-type-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.content-type-card p {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.create-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  width: 100%;
}

.create-btn:hover {
  opacity: 0.8;
}

.recent-content {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.recent-content h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.content-item {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.content-item:hover {
  transform: translateY(-4px);
}

.content-thumbnail {
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.content-details {
  padding: 12px;
}

.content-item h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.content-type {
  font-size: 11px;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 4px;
}

.content-stats {
  font-size: 10px;
  color: var(--text-secondary);
}

/* ============================================
   Community Layout
   ============================================ */

.community-content {
  display: grid;
  grid-template-columns: 240px 1fr 280px;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
}

.communities-sidebar {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  height: fit-content;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.sidebar-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.create-community-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--primary-color);
  transition: transform 0.2s;
}

.create-community-btn:hover {
  transform: scale(1.2);
}

.communities-list {
  list-style: none;
}

.community-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 8px;
}

.community-item:hover {
  background-color: var(--bg-secondary);
}

.community-icon {
  font-size: 20px;
}

.community-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.community-members {
  font-size: 11px;
  color: var(--text-secondary);
}

.community-feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.feed-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.feed-filters {
  display: flex;
  gap: 8px;
}

.filter-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-primary);
}

.filter-btn:hover,
.filter-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.community-posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.community-post {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.community-post:hover {
  box-shadow: var(--shadow-md);
}

.community-post-header {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.post-community-tag {
  background-color: var(--primary-color);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
}

.post-author {
  font-size: 12px;
  color: var(--text-secondary);
  margin-left: auto;
}

.community-post-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1.4;
}

.community-post-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-secondary);
}

.community-sidebar {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  height: fit-content;
}

.community-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.community-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.info-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
}

/* ============================================
   Minimal Social Layout
   ============================================ */

.navbar-minimal {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.navbar-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-menu-minimal {
  display: flex;
  gap: 30px;
}

.minimal-content {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
}

.minimal-feed {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.compose-area-minimal {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.compose-input-minimal {
  flex: 1;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
}

.compose-input-minimal:focus {
  border-color: var(--primary-color);
}

.compose-btn-minimal {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.compose-btn-minimal:hover {
  opacity: 0.8;
}

.posts-container-minimal {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.minimal-post {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
}

.minimal-post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.minimal-time {
  color: var(--text-secondary);
  font-size: 12px;
}

.minimal-post-content {
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 12px;
}

.minimal-post-actions {
  display: flex;
  gap: 12px;
}

.minimal-action {
  flex: 1;
  background-color: var(--bg-secondary);
  border: none;
  border-radius: var(--radius-md);
  padding: 6px 8px;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.minimal-action:hover {
  background-color: var(--border-color);
  color: var(--primary-color);
}

/* ============================================
   Responsive Design
   ============================================ */

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 240px 1fr 280px;
  }

  .community-content {
    grid-template-columns: 200px 1fr 240px;
  }
}

@media (max-width: 992px) {
  .main-content {
    grid-template-columns: 1fr 280px;
  }

  .sidebar {
    display: none;
  }

  .community-content {
    grid-template-columns: 1fr 240px;
  }

  .communities-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .navbar-content {
    gap: 12px;
  }

  .search-bar {
    min-width: auto;
    flex: 1;
  }

  .nav-menu {
    display: none;
  }

  .main-content {
    grid-template-columns: 1fr;
    padding: 12px;
    gap: 12px;
  }

  .right-sidebar {
    display: none;
  }

  .messaging-layout .main-content {
    grid-template-columns: 1fr;
  }

  .conversations-sidebar {
    display: none;
  }

  .creator-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-types {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .chat-panel {
    width: calc(100% - 40px);
  }
}

@media (max-width: 480px) {
  .navbar-content {
    flex-wrap: wrap;
    gap: 8px;
  }

  .logo {
    min-width: fit-content;
  }

  .search-bar {
    order: 3;
    width: 100%;
  }

  .user-menu {
    order: 2;
  }

  .compose-header {
    flex-wrap: wrap;
  }

  .creator-stats {
    grid-template-columns: 1fr;
  }

  .content-types {
    grid-template-columns: 1fr;
  }

  .content-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .chat-panel {
    width: 100%;
    height: 400px;
    right: 0;
    border-radius: 0;
  }

  .notification-center {
    max-height: 400px;
  }
}

/* ============================================
   Scrollbar Styling
   ============================================ */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}

/* ============================================
   Animations
   ============================================ */

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

.post,
.notification-item,
.community-post {
  animation: slideIn 0.3s ease-out;
}`;
  }

  /**
   * Generate JavaScript functionality
   */
  generateJS() {
    return `/**
 * Social App - JavaScript Functionality
 * Handles interactions, state management, and real-time updates
 */

class SocialApp {
  constructor() {
    this.currentLayout = '${this.layout}';
    this.appType = '${this.appType}';
    this.posts = [];
    this.conversations = [];
    this.notifications = [];
    this.currentUser = {
      id: 'user1',
      name: 'Your Name',
      handle: '@yourhandle',
      avatar: '👤'
    };
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.setupEventListeners();
    this.loadInitialData();
    this.setupLiveUpdates();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Post composition
    const postInput = document.getElementById('postInput');
    if (postInput) {
      postInput.addEventListener('focus', () => this.expandCompose());
      postInput.addEventListener('blur', () => this.collapseCompose());
    }

    // Publish button
    const publishBtn = document.querySelector('.publish-btn');
    if (publishBtn) {
      publishBtn.addEventListener('click', () => this.publishPost());
    }

    // Message input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
      messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    // Send button
    const sendBtn = document.querySelector('.send-btn');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => this.handleNavigation(e));
    });

    // Post actions
    document.addEventListener('click', (e) => {
      if (e.target.closest('.action-btn-post')) {
        this.handlePostAction(e);
      }
    });

    // Notification items
    document.addEventListener('click', (e) => {
      if (e.target.closest('.notification-item')) {
        this.handleNotificationClick(e);
      }
    });

    // Conversation items
    document.addEventListener('click', (e) => {
      if (e.target.closest('.conversation-item')) {
        this.loadConversation(e);
      }
    });
  }

  /**
   * Expand compose area on focus
   */
  expandCompose() {
    const composeArea = document.querySelector('.compose-area');
    if (composeArea) {
      composeArea.style.boxShadow = 'var(--shadow-md)';
      composeArea.style.transform = 'scale(1.01)';
    }
  }

  /**
   * Collapse compose area on blur
   */
  collapseCompose() {
    const composeArea = document.querySelector('.compose-area');
    if (composeArea) {
      composeArea.style.boxShadow = 'var(--shadow-sm)';
      composeArea.style.transform = 'scale(1)';
    }
  }

  /**
   * Publish a new post
   */
  publishPost() {
    const input = document.getElementById('postInput');
    if (!input || !input.value.trim()) {
      alert('Please write something to post');
      return;
    }

    const newPost = {
      id: 'post' + Date.now(),
      author: this.currentUser.name,
      handle: this.currentUser.handle,
      avatar: this.currentUser.avatar,
      content: input.value,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      shares: 0,
      image: null
    };

    this.posts.unshift(newPost);
    input.value = '';
    this.renderFeed();
    this.showNotification('Post published successfully!');
  }

  /**
   * Send a message
   */
  sendMessage() {
    const input = document.getElementById('messageInput');
    if (!input || !input.value.trim()) return;

    console.log('Message sent:', input.value);
    input.value = '';
    this.showNotification('Message sent!');
  }

  /**
   * Handle post interactions (like, comment, share)
   */
  handlePostAction(event) {
    const button = event.target.closest('.action-btn-post');
    const action = button.textContent.trim().split(' ')[0];

    const post = button.closest('.post');
    if (!post) return;

    console.log('Post action:', action);

    // Visual feedback
    button.style.color = 'var(--primary-color)';
    setTimeout(() => {
      button.style.color = '';
    }, 200);
  }

  /**
   * Handle search
   */
  handleSearch(query) {
    console.log('Searching for:', query);
    // Implement search logic
  }

  /**
   * Handle navigation
   */
  handleNavigation(event) {
    const href = event.target.getAttribute('href');
    console.log('Navigating to:', href);
    
    // Update active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    event.target.classList.add('active');
  }

  /**
   * Handle notification click
   */
  handleNotificationClick(event) {
    const notification = event.target.closest('.notification-item');
    notification.classList.remove('unread');
    console.log('Notification clicked');
  }

  /**
   * Load a conversation
   */
  loadConversation(event) {
    const conversation = event.target.closest('.conversation-item');
    
    // Update active state
    document.querySelectorAll('.conversation-item').forEach(item => {
      item.style.backgroundColor = '';
    });
    conversation.style.backgroundColor = 'var(--bg-secondary)';

    const name = conversation.querySelector('.conversation-name').textContent;
    console.log('Loading conversation with:', name);
    
    // Update chat header
    const chatHeader = document.querySelector('.chat-header');
    if (chatHeader) {
      const userNameEl = chatHeader.querySelector('.chat-user-name');
      if (userNameEl) {
        userNameEl.textContent = name;
      }
    }
  }

  /**
   * Load initial data
   */
  loadInitialData() {
    this.renderFeed();
    this.renderNotifications();
    this.renderConversations();
  }

  /**
   * Render feed
   */
  renderFeed() {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    if (this.posts.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No posts yet. Be the first to share!</p>';
      return;
    }

    container.innerHTML = this.posts.map(post => this.createPostHTML(post)).join('');
  }

  /**
   * Create post HTML
   */
  createPostHTML(post) {
    return \`
      <article class="post">
        <div class="post-header">
          <div class="post-author-info">
            <div class="post-avatar">\${post.avatar}</div>
            <div class="author-details">
              <p class="author-name">\${post.author}</p>
              <p class="author-handle">\${post.handle} • \${post.timestamp}</p>
            </div>
          </div>
          <button class="post-menu-btn">⋮</button>
        </div>
        <div class="post-content">
          <p>\${this.escapeHTML(post.content)}</p>
          \${post.image ? '<div class="post-image">' + post.image + '</div>' : ''}
        </div>
        <div class="post-interactions">
          <div class="interaction-stat">
            <span>\${post.likes}</span> Likes
          </div>
          <div class="interaction-stat">
            <span>\${post.comments}</span> Comments
          </div>
          <div class="interaction-stat">
            <span>\${post.shares}</span> Shares
          </div>
        </div>
        <div class="post-actions">
          <button class="action-btn-post">👍 Like</button>
          <button class="action-btn-post">💬 Comment</button>
          <button class="action-btn-post">↗️ Share</button>
        </div>
      </article>
    \`;
  }

  /**
   * Render notifications
   */
  renderNotifications() {
    console.log('Rendering notifications');
  }

  /**
   * Render conversations
   */
  renderConversations() {
    console.log('Rendering conversations');
  }

  /**
   * Show notification toast
   */
  showNotification(message) {
    const toast = document.createElement('div');
    toast.style.cssText = \`
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: var(--primary-color);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    \`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHTML(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  /**
   * Setup live updates (simulated with polling)
   */
  setupLiveUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
      console.log('Checking for updates...');
      // In a real application, this would fetch new data from the server
    }, 30000);
  }

  /**
   * Like a post
   */
  likePost(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
      this.renderFeed();
    }
  }

  /**
   * Add a comment
   */
  addComment(postId, comment) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.comments += 1;
      this.renderFeed();
    }
  }

  /**
   * Share a post
   */
  sharePost(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.shares += 1;
      this.renderFeed();
    }
  }

  /**
   * Get user profile
   */
  getUserProfile() {
    return this.currentUser;
  }

  /**
   * Update user profile
   */
  updateUserProfile(updates) {
    this.currentUser = { ...this.currentUser, ...updates };
    console.log('Profile updated:', this.currentUser);
  }

  /**
   * Follow a user
   */
  followUser(userId) {
    console.log('Following user:', userId);
    this.showNotification('User followed!');
  }

  /**
   * Unfollow a user
   */
  unfollowUser(userId) {
    console.log('Unfollowing user:', userId);
    this.showNotification('User unfollowed!');
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new SocialApp();
  console.log('Social App initialized');
  console.log('Layout:', window.app.currentLayout);
  console.log('App Type:', window.app.appType);
});`;
  }

  /**
   * Generate metadata
   */
  generateMetadata() {
    return {
      name: this.appType,
      version: '1.0.0',
      description: `Generated ${this.appType} using SocialGenerator`,
      layout: this.layout,
      components: this.components,
      theme: this.theme,
      colors: {
        primary: this.primaryColor,
        secondary: this.secondaryColor
      },
      author: 'SocialGenerator',
      created: new Date().toISOString(),
      supportedApps: this.supportedApps,
      supportedComponents: this.supportedComponents,
      supportedLayouts: this.supportedLayouts,
      features: {
        'Social Feed': this.layout === 'social-feed',
        'Messaging': this.layout === 'messaging-layout',
        'Creator Platform': this.layout === 'creator-platform',
        'Community': this.layout === 'community-layout',
        'Minimal UI': this.layout === 'minimal-social'
      },
      enabledComponents: {
        'Feed': this.components.includes('feed'),
        'Stories': this.components.includes('storyBar'),
        'Chat': this.components.includes('chatPanel'),
        'Profile': this.components.includes('userProfile'),
        'Notifications': this.components.includes('notificationCenter'),
        'Comments': this.components.includes('commentSection')
      }
    };
  }
}

export default SocialGenerator;