/**
 * AIToolGenerator.js - Generator for AI Tool UIs
 * Supports: AI Chat, Image Generator, Code Assistant, Resume Builder
 * 
 * @extends BaseAppGenerator
 * @version 2.0.0
 */

import BaseAppGenerator from './base/BaseAppGenerator.js';

class AIToolGenerator extends BaseAppGenerator {
  constructor(config = {}) {
    super(config);
    this.category = 'aiTool';
    this.subcategory = config.subcategory || 'chatApplication';
  }

  /**
   * Generate AI Tool HTML
   * @returns {Promise<string>} HTML content
   */
  async generateHTML() {
    let html = '';

    switch (this.subcategory) {
      case 'chatApplication':
        html = this.generateChatUI();
        break;
      case 'imageGenerator':
        html = this.generateImageGeneratorUI();
        break;
      case 'codeAssistant':
        html = this.generateCodeAssistantUI();
        break;
      case 'resumeBuilder':
        html = this.generateResumeBuilderUI();
        break;
      default:
        html = this.generateChatUI();
    }

    return this.wrapDocument(html, await this.generateCSS(), await this.generateJS());
  }

  /**
   * Generate Chat UI
   * @returns {string} Chat HTML
   */
  generateChatUI() {
    const messages = this.mockData.messages || this.generateMockMessages();
    return `
<div class="app">
  ${this.generateAppHeader()}
  
  <main class="app-main chat-container">
    <div class="messages-container">
      ${messages.map(msg => this.generateMessageBubble(msg)).join('')}
    </div>
  </main>
  
  <div class="chat-input-area">
    <form class="chat-form">
      <textarea 
        class="chat-input" 
        placeholder="Ask me anything..."
        rows="3"
      ></textarea>
      <button type="submit" class="btn-send">🖀</button>
    </form>
    <p class="input-hint">Press Shift+Enter for new line, Enter to send</p>
  </div>
  
  ${this.generateBottomNav()}
  ${this.generateFAB()}
</div>
    `.trim();
  }

  /**
   * Generate Image Generator UI
   * @returns {string} Image generator HTML
   */
  generateImageGeneratorUI() {
    const images = this.mockData.images || this.generateMockImages();
    return `
<div class="app">
  ${this.generateAppHeader()}
  
  <main class="app-main image-gen-container">
    <div class="generation-controls">
      <h2>Create Images with AI</h2>
      <form class="generation-form">
        <textarea 
          class="prompt-input" 
          placeholder="Describe the image you want to create..."
          rows="4"
        ></textarea>
        <div class="controls-row">
          <select class="control-select">
            <option>Realistic</option>
            <option>Artistic</option>
            <option>Cartoon</option>
            <option>3D Render</option>
          </select>
          <select class="control-select">
            <option>1024x1024</option>
            <option>1024x768</option>
            <option>768x1024</option>
          </select>
          <button type="submit" class="btn btn-primary">Generate</button>
        </div>
      </form>
    </div>
    
    <div class="generated-images">
      ${images.map((img, idx) => `
        <div class="image-card">
          <div class="image-placeholder">${img.placeholder}</div>
          <p class="image-prompt">${img.prompt}</p>
          <div class="image-actions">
            <button class="icon-btn">📥</button>
            <button class="icon-btn">❤️</button>
            <button class="icon-btn">⚙️</button>
          </div>
        </div>
      `).join('')}
    </div>
  </main>
  
  ${this.generateBottomNav()}
  ${this.generateFAB()}
</div>
    `.trim();
  }

  /**
   * Generate Code Assistant UI
   * @returns {string} Code assistant HTML
   */
  generateCodeAssistantUI() {
    const codeBlocks = this.mockData.codeBlocks || this.generateMockCodeBlocks();
    return `
<div class="app">
  ${this.generateAppHeader()}
  
  <main class="app-main code-assistant-container">
    <div class="code-editor-wrapper">
      <div class="editor-controls">
        <select class="language-select">
          <option>JavaScript</option>
          <option>Python</option>
          <option>Java</option>
          <option>C++</option>
        </select>
        <button class="btn btn-secondary btn-small">Format</button>
      </div>
      <textarea class="code-editor">// Write or paste your code here...</textarea>
    </div>
    
    <div class="suggestions-area">
      <h3>AI Suggestions</h3>
      ${codeBlocks.map(block => `
        <div class="suggestion-card">
          <p class="suggestion-title">${block.title}</p>
          <pre><code class="suggestion-code">${block.code}</code></pre>
          <button class="btn btn-primary btn-small">Apply</button>
        </div>
      `).join('')}
    </div>
  </main>
  
  ${this.generateBottomNav()}
  ${this.generateFAB()}
</div>
    `.trim();
  }

  /**
   * Generate Resume Builder UI
   * @returns {string} Resume builder HTML
   */
  generateResumeBuilderUI() {
    const resume = this.mockData.resume || this.generateMockResume();
    return `
<div class="app">
  ${this.generateAppHeader()}
  
  <main class="app-main resume-builder-container">
    <div class="builder-sidebar">
      <div class="section-list">
        <button class="section-btn active">👤 Personal</button>
        <button class="section-btn">💼 Experience</button>
        <button class="section-btn">🎓 Education</button>
        <button class="section-btn">🛠️ Skills</button>
        <button class="section-btn">📄 Projects</button>
      </div>
    </div>
    
    <div class="builder-content">
      <form class="resume-form">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" value="${resume.name}" placeholder="Full Name">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email</label>
            <input type="email" value="${resume.email}" placeholder="Email">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" value="${resume.phone}" placeholder="Phone">
          </div>
        </div>
        <div class="form-group">
          <label>Professional Summary</label>
          <textarea placeholder="Brief summary...">{{summary}}</textarea>
        </div>
      </form>
    </div>
    
    <div class="resume-preview">
      <div class="preview-header">
        <h2>${resume.name}</h2>
        <p>${resume.email} • ${resume.phone}</p>
      </div>
      <div class="preview-section">
        <h3>Professional Summary</h3>
        <p>Experienced professional with a passion for technology and innovation.</p>
      </div>
    </div>
  </main>
  
  ${this.generateBottomNav()}
</div>
    `.trim();
  }

  /**
   * Generate CSS
   * @returns {Promise<string>} CSS content
   */
  async generateCSS() {
    return `
${this.generateBaseCss()}
${this.generateAppCss()}

/* AI Tool Specific */
.chat-container {
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 80px;
}

.chat-input-area {
  padding: 1rem;
  background: ${this.theme.surface};
  border-top: 1px solid #e5e7eb;
  position: sticky;
  bottom: 0;
}

.chat-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.chat-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
  resize: none;
}

.btn-send {
  padding: 0.75rem 1rem;
  background: ${this.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
}

.input-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

/* Image Generator */
.image-gen-container {
  padding: 1rem;
  overflow-y: auto;
}

.generation-controls {
  margin-bottom: 2rem;
}

.generation-controls h2 {
  margin-bottom: 1rem;
}

.generation-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.prompt-input {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
}

.controls-row {
  display: flex;
  gap: 1rem;
}

.control-select {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.generated-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.image-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: ${this.theme.surface};
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, ${this.theme.primary}, ${this.theme.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
}

.image-prompt {
  padding: 0.75rem;
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.image-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

/* Code Assistant */
.code-assistant-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
}

.code-editor-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${this.theme.surface};
  border-radius: 12px;
  padding: 1rem;
}

.editor-controls {
  display: flex;
  gap: 1rem;
}

.language-select {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.code-editor {
  flex: 1;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  resize: none;
  background: #1e1e1e;
  color: #d4d4d4;
}

.suggestions-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}

.suggestions-area h3 {
  margin: 0;
}

.suggestion-card {
  background: ${this.theme.surface};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
}

.suggestion-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin: 0 0 0.5rem 0;
}

.suggestion-code {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 0.75rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0.5rem 0;
  font-size: 0.85rem;
}

/* Resume Builder */
.resume-builder-container {
  display: grid;
  grid-template-columns: 250px 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  height: 100%;
}

.builder-sidebar {
  background: ${this.theme.surface};
  border-radius: 12px;
  padding: 1rem;
}

.section-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-btn {
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  color: ${this.theme.text};
  transition: all 0.3s ease;
}

.section-btn:hover,
.section-btn.active {
  background: ${this.theme.primary}20;
  color: ${this.theme.primary};
}

.builder-content {
  background: ${this.theme.surface};
  border-radius: 12px;
  padding: 1.5rem;
  overflow-y: auto;
}

.resume-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: ${this.theme.text};
}

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.resume-preview {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.preview-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 1rem;
}

.preview-header h2 {
  margin: 0 0 0.5rem 0;
  color: ${this.theme.text};
}

.preview-header p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.preview-section {
  margin-bottom: 2rem;
}

.preview-section h3 {
  color: ${this.theme.primary};
  margin-bottom: 0.5rem;
}

@media (max-width: 1024px) {
  .code-assistant-container {
    grid-template-columns: 1fr;
  }
  
  .resume-builder-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .generated-images {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .controls-row {
    flex-direction: column;
  }
}
    `.trim();
  }

  /**
   * Generate JavaScript
   * @returns {Promise<string>} JS content
   */
  async generateJS() {
    return `
${this.generateBaseJs()}

// AI Tool specific interactions
(function() {
  'use strict';
  
  const chatForm = document.querySelector('.chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelector('.chat-input');
      console.log('Message sent:', input.value);
      input.value = '';
    });
  }
  
  const generationForm = document.querySelector('.generation-form');
  if (generationForm) {
    generationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Image generation started');
    });
  }
  
  const sectionBtns = document.querySelectorAll('.section-btn');
  sectionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      sectionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();
    `.trim();
  }

  /**
   * Generate mock messages
   * @returns {Array} Messages
   */
  generateMockMessages() {
    return [
      {
        own: false,
        avatar: '🤖',
        text: 'Hello! I\'m your AI assistant. How can I help you today?',
        time: '10:30 AM'
      },
      {
        own: true,
        text: 'Can you help me write a JavaScript function?',
        time: '10:31 AM'
      },
      {
        own: false,
        avatar: '🤖',
        text: 'Of course! I\'d be happy to help. What would you like to do?',
        time: '10:31 AM'
      }
    ];
  }

  /**
   * Generate mock images
   * @returns {Array} Images
   */
  generateMockImages() {
    return [
      {
        placeholder: '🎨',
        prompt: 'A serene landscape with mountains and lakes'
      },
      {
        placeholder: '🏙️',
        prompt: 'Futuristic city skyline at night'
      },
      {
        placeholder: '🌊',
        prompt: 'Ocean waves under sunset'
      }
    ];
  }

  /**
   * Generate mock code blocks
   * @returns {Array} Code blocks
   */
  generateMockCodeBlocks() {
    return [
      {
        title: 'Add error handling',
        code: 'try {\n  // Your code\n} catch (error) {\n  console.error(error);\n}'
      },
      {
        title: 'Use async/await',
        code: 'async function fetchData() {\n  const res = await fetch(url);\n  return res.json();\n}'
      }
    ];
  }

  /**
   * Generate mock resume
   * @returns {Object} Resume data
   */
  generateMockResume() {
    return {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      summary: 'Experienced developer with passion for technology'
    };
  }
}

export default AIToolGenerator;
