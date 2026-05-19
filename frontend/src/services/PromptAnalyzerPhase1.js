// frontend/src/services/generators/PromptAnalyzerPhase1.js
// ============================================================================
// ENHANCED PROMPT ANALYZER - Phase 1 Updates
// Added domain detection for: Blog, Portfolio, Social Media, Video, Music
// ============================================================================

export class PromptAnalyzerPhase1 {
  static analyze(prompt) {
    const lower = prompt.toLowerCase();

    return {
      // Domain Detection - EXTENDED for Phase 1
      isDomain: {
        // Original domains
        saas: /dashboard|admin|panel|analytics|tool|platform|app|software/.test(lower),
        ecommerce: /shop|store|product|buy|ecommerce|mall|marketplace|fashion|cart|checkout/.test(lower),
        landing: /landing|homepage|website|product page|startup|portfolio|showcase/.test(lower),
        auth: /login|signup|register|auth|authentication|forgot password|otp|reset/.test(lower),
        datatable: /table|data|list|users|management|database|records|entries/.test(lower),
        food: /restaurant|cafe|food|menu|dining|pizza|burger|bakery/.test(lower),
        health: /health|medical|hospital|clinic|wellness|fitness|gym|yoga/.test(lower),
        education: /course|education|learning|school|bootcamp|training/.test(lower),

        // Phase 1 NEW domains
        blog: /blog|article|post|news|content|magazine|writing|publish|journal/.test(lower),
        portfolio: /portfolio|showcase|projects|work|resume|cv|experience|gallery|folio/.test(lower),
        social: /social|feed|post|tweet|like|follow|profile|message|chat|share/.test(lower),
        video: /video|streaming|netflix|youtube|watch|film|movie|tutorial|live/.test(lower),
        music: /music|spotify|playlist|song|album|artist|track|audio|podcast/.test(lower),
      },

      // Industry Detection
      isIndustry: {
        tech: /tech|ai|code|development|startup|innovation|crypto|software/.test(lower),
        creative: /portfolio|creative|design|art|gallery|studio/.test(lower),
        corporate: /corporate|business|company|enterprise|professional/.test(lower),
        finance: /bank|financial|investment|trading|stock|crypto/.test(lower),
        legal: /lawyer|attorney|law|legal|court/.test(lower),
        realEstate: /real estate|property|house|apartment|mortgage/.test(lower),
        media: /media|news|journalism|content|publication/.test(lower),
        entertainment: /entertainment|music|video|movie|gaming/.test(lower),
      },

      // Style Detection - EXTENDED
      isStyle: {
        dark: /dark|night|black|midnight|noir|neon/.test(lower),
        minimal: /minimal|clean|simple|flat|minimalist|zen/.test(lower),
        colorful: /colorful|vibrant|rainbow|bright|multicolor|playful/.test(lower),
        modern: /modern|contemporary|sleek|trendy|latest|cutting-edge/.test(lower),
        luxury: /luxury|premium|elegant|sophisticated|high-end/.test(lower),
        vintage: /vintage|retro|classic|nostalgic|old-school/.test(lower),
        glassmorphism: /glass|frosted|blur|glassmorphism|transparency/.test(lower),
        neumorphism: /neumorphic|soft|shadows|embossed/.test(lower),
        cyberpunk: /cyber|neon|futuristic|cyberpunk|sci-fi/.test(lower),
      },

      // Feature Detection
      hasFeature: {
        animation: !/static|no animation/.test(lower),
        gradient: !/flat|solid|no gradient/.test(lower),
        darkMode: /dark mode|theme toggle|switch|light dark/.test(lower),
        search: /search|filter|find|query/.test(lower),
        pagination: /pagination|page|pages|scroll/.test(lower),
        sorting: /sort|sorted|order/.test(lower),
        charts: /chart|graph|analytics|stats|visualiz/.test(lower),
        reviews: /review|rating|testimonial|feedback/.test(lower),
        comments: /comment|discussion|feedback|reply/.test(lower),
        sharing: /share|social|distribution/.test(lower),
      },
    };
  }

  static detectDomain(analysis) {
    const { isDomain } = analysis;
    
    // Priority-based detection
    if (isDomain.blog) return 'blog';
    if (isDomain.portfolio) return 'portfolio';
    if (isDomain.social) return 'social';
    if (isDomain.video) return 'video';
    if (isDomain.music) return 'music';
    if (isDomain.saas) return 'saas';
    if (isDomain.ecommerce) return 'ecommerce';
    if (isDomain.landing) return 'landing';
    if (isDomain.auth) return 'auth';
    if (isDomain.datatable) return 'datatable';
    
    return 'landing'; // default
  }

  static getColorSchemePhase1(analysis, rng) {
    // Luxury Color Scheme
    if (analysis.isStyle.luxury) {
      return {
        primary: '#8b7355',
        secondary: '#d4af37',
        accent: '#c9a876',
        bg: '#f5f1e8',
        surface: '#ffffff',
        text: '#2a2a2a',
        subtext: '#666666',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        gradient: 'linear-gradient(135deg, #8b7355 0%, #d4af37 100%)',
      };
    }

    // Dark Modern - Enhanced
    if (analysis.isStyle.dark) {
      return {
        primary: '#00d4ff',
        secondary: '#c644fc',
        accent: '#ff006e',
        bg: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#ffffff',
        subtext: '#cccccc',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        gradient: 'linear-gradient(135deg, #00d4ff 0%, #c644fc 100%)',
      };
    }

    // Minimal Clean
    if (analysis.isStyle.minimal) {
      return {
        primary: '#000000',
        secondary: '#666666',
        accent: '#333333',
        bg: '#ffffff',
        surface: '#f5f5f5',
        text: '#1a1a1a',
        subtext: '#999999',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        gradient: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      };
    }

    // Colorful Vibrant
    if (analysis.isStyle.colorful) {
      return {
        primary: '#ff006e',
        secondary: '#00d4ff',
        accent: '#3a86ff',
        bg: '#ffffff',
        surface: '#f9fafb',
        text: '#1f2937',
        subtext: '#6b7280',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        gradient: 'linear-gradient(135deg, #ff006e 0%, #00d4ff 100%)',
      };
    }

    // Cyberpunk Neon
    if (analysis.isStyle.cyberpunk) {
      return {
        primary: '#ff00ff',
        secondary: '#00ffff',
        accent: '#ffff00',
        bg: '#0a0e27',
        surface: '#1a1f3a',
        text: '#ffffff',
        subtext: '#a0aec0',
        success: '#39ff14',
        error: '#ff0040',
        warning: '#ffff00',
        info: '#00ffff',
        gradient: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
      };
    }

    // Default Modern
    return {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      bg: '#ffffff',
      surface: '#f9fafb',
      text: '#1f2937',
      subtext: '#6b7280',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    };
  }

  static getTypographyPhase1(analysis) {
    if (analysis.isStyle.luxury) {
      return { 
        font: 'Georgia, serif', 
        heading: 'Georgia, serif',
        code: 'Monaco, monospace',
        fontWeight: { light: 300, normal: 400, bold: 600, heavy: 700 }
      };
    }
    if (analysis.isDomain.datatable || analysis.isDomain.saas) {
      return { 
        font: 'Inter, -apple-system, sans-serif', 
        heading: 'Poppins, sans-serif',
        code: 'Courier New, monospace',
        fontWeight: { light: 300, normal: 400, bold: 600, heavy: 700 }
      };
    }
    return { 
      font: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', 
      heading: 'sans-serif',
      code: 'Monaco, monospace',
      fontWeight: { light: 300, normal: 400, bold: 600, heavy: 700 }
    };
  }
}

export default PromptAnalyzerPhase1;
