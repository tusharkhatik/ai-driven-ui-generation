export const DEVICE_PRESETS = {
  desktop: { width: '100%', height: '100%', label: '🖥️ Desktop' },
  tablet: { width: '768px', height: '1024px', label: '📱 Tablet' },
  mobile: { width: '375px', height: '667px', label: '📲 Mobile' }
};

export const TEMPLATES = [
  {
    id: 'login',
    name: 'Login Form',
    prompt: 'Create a modern login form with email, password fields and a submit button'
  },
  {
    id: 'navbar',
    name: 'Nav Bar',
    prompt: 'Create a responsive navigation bar with logo and menu items'
  },
  {
    id: 'product-card',
    name: 'Product Card',
    prompt: 'Create a product card component with image, title, price and buy button'
  }
];

export const PROMPT_SUGGESTIONS = [
  'Create a modern login form',
  'Design a responsive navbar',
  'Build a product card',
  'Make a contact form',
  'Design a footer section',
  'Create a hero section',
  'Build a testimonials section',
  'Design a pricing table',
  'Create a feature showcase',
  'Make a FAQ section'
];

export const THEMES = {
  light: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#f5f5f5',
    text: '#1a1a1a'
  },
  dark: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#0f172a',
    text: '#ffffff'
  },
  gradient: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    text: '#ffffff'
  }
};

export const MESSAGES = {
  SUCCESS: {
    GENERATED: '✅ UI generated successfully!',
    DOWNLOADED: '📥 Downloaded successfully!',
    COPIED: '📋 Copied to clipboard!',
    ADDED_FAVORITE: '❤️ Added to favorites!',
    REMOVED_FAVORITE: '💔 Removed from favorites!'
  },
  ERROR: {
    EMPTY_PROMPT: 'Please enter a prompt',
    GENERATION_FAILED: 'Failed to generate UI',
    NETWORK_ERROR: 'Network error. Please try again.'
  }
};

export const TIMEOUTS = {
  MESSAGE_DISPLAY: 3000,
  API_TIMEOUT: 30000
};