/**
 * Format user prompt for better AI understanding
 */
const formatPromptForAI = (userPrompt, options = {}) => {
  const {
    uiType = 'generic',
    designPreference = 'modern',
    colorScheme = 'auto',
    framework = 'vanilla',
    responsiveLevel = 'full' // full, tablet, mobile-first
  } = options;

  const systemContext = buildSystemContext(
    uiType,
    designPreference,
    colorScheme,
    framework,
    responsiveLevel
  );

  return {
    systemPrompt: systemContext,
    userPrompt: userPrompt.trim()
  };
};

/**
 * Build system context based on requirements
 */
const buildSystemContext = (
  uiType,
  designPreference,
  colorScheme,
  framework,
  responsiveLevel
) => {
  const typeGuidelines = getTypeGuidelines(uiType);
  const designGuidelines = getDesignGuidelines(designPreference);
  const colorGuidelines = getColorGuidelines(colorScheme, designPreference);
  const responsiveGuidelines = getResponsiveGuidelines(responsiveLevel);

  return `You are an expert UI/UX designer and frontend developer.

REQUIREMENTS:
${typeGuidelines}
${designGuidelines}
${colorGuidelines}
${responsiveGuidelines}

TECHNICAL REQUIREMENTS:
- Generate valid, semantic HTML5 code
- Use CSS with Flexbox and CSS Grid (no Bootstrap, no Tailwind)
- Use vanilla JavaScript (ES6+)
- Ensure all code is production-ready
- Include accessibility features (ARIA labels, semantic elements)
- Optimize for performance
- No inline styles - use external CSS only
- Include proper error handling and loading states

OUTPUT FORMAT:
Provide code in this exact format:
---HTML_START---
<html code here>
---HTML_END---
---CSS_START---
<css code here>
---CSS_END---
---JS_START---
<javascript code here>
---JS_END---

Never include explanations, only code.`;
};

/**
 * Get type-specific guidelines
 */
const getTypeGuidelines = (uiType) => {
  const guidelines = {
    landing: `TYPE: Landing Page
- Create an engaging homepage with hero section
- Include call-to-action buttons
- Add testimonials/features section if appropriate
- Make it visually appealing and conversion-focused`,

    dashboard: `TYPE: Dashboard
- Create a professional data dashboard
- Include sidebar navigation
- Add charts/statistics if possible
- Include user profile section
- Make it clean and organized`,

    form: `TYPE: Form
- Create a well-structured form
- Include proper validation
- Add helpful error messages
- Include success feedback
- Make fields clearly labeled`,

    portfolio: `TYPE: Portfolio
- Create a professional portfolio website
- Include projects/work showcase
- Add about section
- Include contact information
- Make it visually impressive`,

    ecommerce: `TYPE: E-Commerce Page
- Create a product showcase page
- Include product cards with images
- Add shopping cart functionality
- Include product filters/sorting
- Make it user-friendly for purchases`,

    other: `TYPE: Custom UI
- Follow the user's specific requirements
- Ensure consistency and coherence
- Make it visually appealing`
  };

  return guidelines[uiType] || guidelines.other;
};

/**
 * Get design preference guidelines
 */
const getDesignGuidelines = (preference) => {
  const guidelines = {
    modern: `DESIGN STYLE: Modern
- Use clean, minimalist design
- Smooth animations and transitions
- Contemporary color combinations
- Large, readable typography
- Plenty of whitespace`,

    minimal: `DESIGN STYLE: Minimal
- Ultra-clean interface
- Maximum whitespace
- Limited color palette (2-3 colors)
- Simple shapes and forms
- Focus on typography`,

    creative: `DESIGN STYLE: Creative
- Bold, vibrant colors
- Unique layouts
- Interesting typography
- Creative animations
- Artistic elements`,

    professional: `DESIGN STYLE: Professional
- Corporate aesthetic
- Conservative color scheme
- Structured layout
- Formal typography
- Business-appropriate`,

    casual: `DESIGN STYLE: Casual
- Friendly, approachable design
- Playful elements
- Varied typography
- Warm color palette
- Relaxed layout`
  };

  return guidelines[preference] || guidelines.modern;
};

/**
 * Get color scheme guidelines
 */
const getColorGuidelines = (colorScheme, designPreference) => {
  const schemes = {
    auto: getColorSchemeForDesign(designPreference),
    dark: `COLOR SCHEME: Dark Theme
- Dark background (#0f172a or similar)
- Light text (#f1f5f9 or similar)
- Accent colors on primary (#6366f1)
- Ensure WCAG AA contrast compliance`,

    light: `COLOR SCHEME: Light Theme
- White background (#ffffff)
- Dark text (#111827 or similar)
- Subtle accent colors
- Ensure WCAG AA contrast compliance`,

    vibrant: `COLOR SCHEME: Vibrant
- Bold, saturated colors
- High contrast
- Multiple accent colors
- Energetic appearance`,

    pastel: `COLOR SCHEME: Pastel
- Soft, muted colors
- Calming appearance
- Light background
- Subtle accents`
  };

  return schemes[colorScheme] || schemes.auto;
};

/**
 * Get color scheme based on design preference
 */
const getColorSchemeForDesign = (preference) => {
  const schemes = {
    modern: `COLOR SCHEME: Modern (Auto)
- Primary: Indigo/Blue (#6366f1)
- Secondary: Emerald/Green (#10b981)
- Neutrals: Slate tones
- Dark mode friendly`,

    minimal: `COLOR SCHEME: Minimal (Auto)
- Primary: Single accent color (#6366f1)
- Grays: Full grayscale (#000 to #fff)
- Minimal secondary colors`,

    creative: `COLOR SCHEME: Creative (Auto)
- Primary: Bold accent (#ff6b6b or #4ecdc4)
- Multiple complementary colors
- High saturation
- Vibrant combinations`,

    professional: `COLOR SCHEME: Professional (Auto)
- Primary: Navy/Dark Blue (#1e3a8a)
- Secondary: Gray (#64748b)
- Accent: Gold or conservative (#f59e0b)`,

    casual: `COLOR SCHEME: Casual (Auto)
- Primary: Warm color (#ff8a5b or #fbbf24)
- Secondary: Complementary warm tone
- Friendly pastels
- Approachable colors`
  };

  return schemes[preference] || schemes.modern;
};

/**
 * Get responsive design guidelines
 */
const getResponsiveGuidelines = (level) => {
  const guidelines = {
    full: `RESPONSIVE DESIGN:
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Flexible layouts using Flexbox/Grid
- Responsive typography (font-size scales)
- Touch-friendly buttons (min 44px)
- Optimized for all screen sizes`,

    tablet: `RESPONSIVE DESIGN:
- Tablet-optimized (768px minimum)
- Mobile support for smaller screens
- Desktop layouts for larger screens
- Flexible but structured layout`,

    'mobile-first': `RESPONSIVE DESIGN:
- Mobile-first development
- Start with mobile layout
- Enhance for tablets and desktops
- Progressive enhancement approach`
  };

  return guidelines[level] || guidelines.full;
};

/**
 * Enhance prompt with context
 */
const enhancePrompt = (prompt, userHistory = []) => {
  let enhanced = prompt;

  if (userHistory.length > 0) {
    const recentStyles = extractCommonStyles(userHistory);
    if (recentStyles) {
      enhanced += `\n\nBased on user's recent preferences, try to maintain: ${recentStyles}`;
    }
  }

  return enhanced;
};

/**
 * Extract common design styles from user history
 */
const extractCommonStyles = (history) => {
  if (history.length < 2) return null;

  // Simple extraction - can be enhanced
  const styles = [];

  if (history.filter(h => h.includes('dark')).length > history.length / 2) {
    styles.push('dark theme');
  }

  if (history.filter(h => h.includes('minimal')).length > history.length / 2) {
    styles.push('minimal design');
  }

  return styles.length > 0 ? styles.join(', ') : null;
};

/**
 * Validate and format complete prompt context
 */
const buildCompletePrompt = (userPrompt, options = {}) => {
  const formatted = formatPromptForAI(userPrompt, options);
  
  return {
    system: formatted.systemPrompt,
    user: formatted.userPrompt,
    fullPrompt: `${formatted.systemPrompt}\n\nUser Request: ${formatted.userPrompt}`
  };
};

/**
 * Parse code from AI response
 */
const parseAIResponse = (response) => {
  try {
    const htmlMatch = response.match(/---HTML_START---([\s\S]*?)---HTML_END---/);
    const cssMatch = response.match(/---CSS_START---([\s\S]*?)---CSS_END---/);
    const jsMatch = response.match(/---JS_START---([\s\S]*?)---JS_END---/);

    return {
      html: htmlMatch ? htmlMatch[1].trim() : '',
      css: cssMatch ? cssMatch[1].trim() : '',
      js: jsMatch ? jsMatch[1].trim() : '',
      success: !!(htmlMatch && cssMatch && jsMatch)
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return {
      html: '',
      css: '',
      js: '',
      success: false,
      error: 'Failed to parse response'
    };
  }
};

module.exports = {
  formatPromptForAI,
  buildSystemContext,
  getTypeGuidelines,
  getDesignGuidelines,
  getColorGuidelines,
  getResponsiveGuidelines,
  enhancePrompt,
  extractCommonStyles,
  buildCompletePrompt,
  parseAIResponse
};