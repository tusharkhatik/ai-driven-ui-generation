// ============================================================================
// CHAT APP GENERATOR - Real-Time Messaging/Chat UI
// ============================================================================

export class ChatAppGenerator {
  static generate(rng, colors, analysis = {}) {
    const conversations = this.generateConversations(rng, 8);
    const messages = this.generateMessages(rng, 10);

    return `
      <div class="chat-wrapper">
        <!-- Header -->
        <header class="chat-header">
          <div class="chat-logo">💬 ChatHub</div>
          <div class="chat-header-actions">
            <button class="chat-btn">➕ New Chat</button>
            <button class="chat-btn">⚙️</button>
          </div>
        </header>

        <div class="chat-container">
          <!-- Conversations Sidebar -->
          <aside class="conversations-sidebar">
            <div class="sidebar-search">
              <input type="text" placeholder="🔍 Search conversations..." class="search-input">
            </div>

            <div class="conversations-list">
              ${conversations.map((conv, i) => `
                <div class="conversation-item ${i === 0 ? 'active' : ''}">
                  <div class="conversation-avatar">
                    ${conv.avatar}
                    <span class="online-indicator ${conv.online ? 'online' : 'offline'}"></span>
                  </div>
                  <div class="conversation-info">
                    <h4>${conv.name}</h4>
                    <p>${conv.lastMessage}</p>
                  </div>
                  <div class="conversation-meta">
                    <small>${conv.time}</small>
                    ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </aside>

          <!-- Chat Main Area -->
          <main class="chat-main">
            <!-- Chat Header -->
            <div class="chat-main-header">
              <div class="chat-user-info">
                <div class="user-avatar">👤</div>
                <div>
                  <h3>Sarah Chen</h3>
                  <small>Active now</small>
                </div>
              </div>
              <div class="chat-actions">
                <button class="chat-icon-btn">📞</button>
                <button class="chat-icon-btn">📹</button>
                <button class="chat-icon-btn">ℹ️</button>
              </div>
            </div>

            <!-- Messages -->
            <div class="messages-container">
              ${messages.map((msg, i) => `
                <div class="message-group ${msg.sender ? 'sent' : 'received'}">
                  <div class="message-avatar">${msg.avatar}</div>
                  <div class="message-content">
                    <div class="message ${msg.sender ? 'message-sent' : 'message-received'}">
                      ${msg.text}
                    </div>
                    <small class="message-time">${msg.time}</small>
                  </div>
                </div>
              `).join('')}

              <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <small>Sarah is typing...</small>
              </div>
            </div>

            <!-- Message Input -->
            <div class="message-input-area">
              <div class="input-actions">
                <button class="input-btn">➕</button>
                <button class="input-btn">📎</button>
                <button class="input-btn">😊</button>
              </div>
              <input type="text" placeholder="Type a message..." class="message-input">
              <button class="send-btn">📤</button>
            </div>
          </main>

          <!-- Chat Info Sidebar -->
          <aside class="chat-info-sidebar">
            <div class="info-section">
              <h4>About</h4>
              <div class="user-card">
                <div class="user-avatar-large">👤</div>
                <h3>Sarah Chen</h3>
                <p>@sarahchen</p>
                <p class="bio">Web Designer & Photographer</p>
              </div>
            </div>

            <div class="info-section">
              <h4>Media</h4>
              <div class="media-grid">
                <div class="media-item">📸</div>
                <div class="media-item">🎥</div>
                <div class="media-item">📄</div>
                <div class="media-item">🎵</div>
              </div>
            </div>

            <div class="info-section">
              <h4>Common Groups</h4>
              <div class="group-item">
                <span>👥 Web Designers</span>
              </div>
              <div class="group-item">
                <span>👥 Tech Team</span>
              </div>
            </div>

            <button class="block-btn">🚫 Block User</button>
          </aside>
        </div>
      </div>
    `;
  }

  static generateConversations(rng, count = 8) {
    const names = ['Sarah Chen', 'Marcus Johnson', 'Emma Wilson', 'Alex Kumar', 'Sophia Lee', 'James Brown', 'Olivia Garcia', 'David Smith'];
    const messages = [
      'Hey! How are you?',
      'Did you see the latest design?',
      'Let\'s catch up soon!',
      'Thanks for the update',
      'Looking forward to it',
      'Perfect, see you then',
      'Great work on the project!',
      'Let me know when you\'re free'
    ];

    const conversations = [];
    for (let i = 0; i < count; i++) {
      conversations.push({
        avatar: String.fromCodePoint(0x1F600 + rng.int(0, 70)),
        name: names[i],
        lastMessage: messages[i],
        time: rng.bool(0.5) ? `${rng.int(1, 24)}h` : `${rng.int(1, 30)}d`,
        online: rng.bool(0.6),
        unread: rng.bool(0.4) ? rng.int(1, 5) : 0
      });
    }
    return conversations;
  }

  static generateMessages(rng, count = 10) {
    const messages = [
      'Hey, how are you doing?',
      'I\'m doing great! How about you?',
      'Just finished the project',
      'Awesome! Can\'t wait to see it',
      'Here are the files',
      'Perfect, let me review them',
      'The design looks amazing!',
      'Thanks! What do you think about the colors?',
      'They\'re perfect for the brand',
      'Great! Let\'s meet up to discuss more'
    ];

    const result = [];
    for (let i = 0; i < count; i++) {
      result.push({
        avatar: i % 2 === 0 ? '👤' : '👨‍💼',
        text: messages[i % messages.length],
        sender: i % 2 === 0,
        time: `${rng.int(1, 59)}m`
      });
    }
    return result;
  }
}
