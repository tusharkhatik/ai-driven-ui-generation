// ============================================================================
// ENHANCED PROMPT ANALYZER - Multi-Layer Intent Detection
// Detects domain, components, interactions, design hints, and features
// ============================================================================

export class EnhancedPromptAnalyzer {
  static analyze(prompt) {
    const lower = prompt.toLowerCase();

    return {
      // Layer 1: Primary Domain Detection (25+ domains)
      isDomain: {
        saas: /dashboard|admin|panel|analytics|tool|platform|app|software|crm|ehr|hrm|management system|workspace/.test(lower),
        ecommerce: /shop|store|product|buy|ecommerce|mall|marketplace|fashion|cart|checkout|vendor|seller|auction|listing/.test(lower),
        landing: /landing|homepage|website|product page|startup|portfolio|showcase|company site/.test(lower),
        auth: /login|signup|register|auth|authentication|forgot password|otp|reset|two factor/.test(lower),
        datatable: /table|data|list|users|management|database|records|entries|spreadsheet/.test(lower),
        
        // NEW DOMAINS
        socialMedia: /feed|social|profile|followers|friends|post|tweet|share|like|comment|social network|timeline|chat room/.test(lower),
        blog: /blog|article|news|publication|story|medium|substack|writer|content platform|news feed|journal/.test(lower),
        chat: /chat|messaging|messenger|conversation|dm|direct message|real-time|instant message|live chat/.test(lower),
        music: /music|spotify|playlist|album|artist|track|stream|audio|song|radio|player|sound/.test(lower),
        video: /video|youtube|vimeo|streaming|film|movie|tutorial|playback|screen/.test(lower),
        
        health: /health|medical|hospital|clinic|wellness|fitness|gym|yoga|doctor|patient|appointment|prescription/.test(lower),
        education: /course|learning|school|bootcamp|training|tutorial|lesson|classroom|student|teacher|university/.test(lower),
        food: /restaurant|cafe|food|menu|dining|pizza|burger|bakery|delivery|order food|cuisine/.test(lower),
        property: /real estate|property|house|apartment|mortgage|listing|rental|realestate|home|condo/.test(lower),
        job: /job|career|recruitment|hiring|resume|apply|position|employment|company career|talent/.test(lower),
        
        marketplace: /marketplace|platform|vendor|seller|buy|sell|trade|exchange/.test(lower),
        project: /project|task|todo|kanban|sprint|agile|workflow|milestone|timeline|roadmap/.test(lower),
        analytics: /analytics|chart|graph|metrics|report|data visualization|dashboard|stats|performance/.test(lower),
        community: /community|forum|discussion|group|social|network|members|collaborate/.test(lower),
      },

      // Layer 2: Component Detection
      hasComponent: {
        header: /header|navbar|navigation|top bar|menu|navigation bar/.test(lower),
        sidebar: /sidebar|sidebar|left panel|navigation panel|left menu/.test(lower),
        cards: /card|component|item|box|section|grid/.test(lower),
        table: /table|list|data table|spreadsheet/.test(lower),
        form: /form|input|field|contact|subscribe|login|signup/.test(lower),
        gallery: /gallery|image|photo|portfolio|grid|showcase/.test(lower),
        footer: /footer|bottom|copyright/.test(lower),
        search: /search|find|filter|query|discover/.test(lower),
      },

      // Layer 3: Interaction Requirements
      hasFeature: {
        animation: !/static|no animation|no transitions/.test(lower),
        gradient: !/flat|solid|no gradient|plain/.test(lower),
        darkMode: /dark mode|dark theme|night mode|theme toggle|switch theme/.test(lower),
        search: /search|filter|find|discover|query/.test(lower),
        pagination: /pagination|page|pages|paging/.test(lower),
        sorting: /sort|sorted|ascending|descending/.test(lower),
        charts: /chart|graph|analytics|stats|metric/.test(lower),
        reviews: /review|rating|testimonial|feedback|star/.test(lower),
        realtime: /real-time|live|instant|sync|socket|websocket|notifications/.test(lower),
        collaboration: /collaborate|team|share|realtime|live/.test(lower),
      },

      // Layer 4: Design Preferences
      isStyle: {
        dark: /dark|night|black|midnight|noir|dark theme/.test(lower),
        minimal: /minimal|clean|simple|flat|minimalist|zen|modern|sleek/.test(lower),
        colorful: /colorful|vibrant|rainbow|bright|multicolor|vibrant/.test(lower),
        modern: /modern|contemporary|sleek|trendy|latest|current/.test(lower),
        luxury: /luxury|premium|elegant|sophisticated|upscale|high end/.test(lower),
        vintage: /vintage|retro|classic|nostalgic|old school/.test(lower),
        glassmorphism: /glass|frosted|blur|glassmorphism|transparent/.test(lower),
        neumorphism: /neumorphic|soft|shadows|3d|embossed/.test(lower),
        cyberpunk: /cyber|neon|futuristic|cyberpunk|sci-fi/.test(lower),
      },

      // Layer 5: Calculate Confidence Score
      confidence: this.calculateConfidence(prompt, lower),

      // Get primary domain (highest scoring)
      primaryDomain: this.getPrimaryDomain(lower),
    };
  }

  static getPrimaryDomain(lower) {
    const domains = {
      socialMedia: /feed|social|profile|followers|friends|post|tweet|share|like|comment/.test(lower) ? 1 : 0,
      blog: /blog|article|news|publication|story|writer|content/.test(lower) ? 1 : 0,
      chat: /chat|messaging|conversation|dm|real-time|instant/.test(lower) ? 1 : 0,
      music: /music|spotify|playlist|album|stream|audio|player/.test(lower) ? 1 : 0,
      video: /video|youtube|streaming|film|movie/.test(lower) ? 1 : 0,
      health: /health|medical|hospital|clinic|wellness|doctor/.test(lower) ? 1 : 0,
      education: /course|learning|school|bootcamp|training|lesson/.test(lower) ? 1 : 0,
      food: /restaurant|cafe|food|menu|dining|pizza/.test(lower) ? 1 : 0,
      property: /real estate|property|house|apartment|rental/.test(lower) ? 1 : 0,
      job: /job|career|recruitment|hiring|resume/.test(lower) ? 1 : 0,
      saas: /dashboard|admin|panel|analytics|platform|tool/.test(lower) ? 0.8 : 0,
      ecommerce: /shop|store|product|buy|marketplace|vendor/.test(lower) ? 0.8 : 0,
      auth: /login|signup|register|authentication/.test(lower) ? 0.8 : 0,
      datatable: /table|data|list|users|management/.test(lower) ? 0.8 : 0,
      landing: /landing|homepage|website|startup|portfolio/.test(lower) ? 0.5 : 0,
    };

    let maxDomain = 'landing';
    let maxScore = 0;
    for (const [domain, score] of Object.entries(domains)) {
      if (score > maxScore) {
        maxScore = score;
        maxDomain = domain;
      }
    }
    return maxDomain;
  }

  static calculateConfidence(prompt, lower) {
    let score = 0;
    const length = prompt.length;

    if (length < 10) score = 0.2;
    else if (length < 30) score = 0.4;
    else if (length < 100) score = 0.7;
    else score = 0.9;

    // Boost confidence if domain-specific keywords present
    const domainKeywords = [
      'dashboard', 'social', 'blog', 'music', 'chat', 'health',
      'education', 'shop', 'marketplace', 'form', 'table'
    ];
    
    if (domainKeywords.some(kw => lower.includes(kw))) {
      score = Math.min(1, score + 0.2);
    }

    return score;
  }

  static getColorScheme(analysis, rng) {
    // Domain-specific color schemes
    if (analysis.isDomain.socialMedia) {
      return {
        primary: '#1DA1F2',
        secondary: '#E7245D',
        accent: '#1991DA',
        bg: '#ffffff',
        surface: '#f7f9fa',
        text: '#0f1419',
        subtext: '#536471',
        gradient: 'linear-gradient(135deg, #1DA1F2 0%, #E7245D 100%)',
      };
    }

    if (analysis.isDomain.blog) {
      return {
        primary: '#6B7280',
        secondary: '#9333EA',
        accent: '#EC4899',
        bg: '#ffffff',
        surface: '#f3f4f6',
        text: '#1f2937',
        subtext: '#6b7280',
        gradient: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
      };
    }

    if (analysis.isDomain.music) {
      return {
        primary: '#1DB954',
        secondary: '#191414',
        accent: '#1ED760',
        bg: '#121212',
        surface: '#282828',
        text: '#FFFFFF',
        subtext: '#B3B3B3',
        gradient: 'linear-gradient(135deg, #1DB954 0%, #1ED760 100%)',
      };
    }

    if (analysis.isDomain.health) {
      return {
        primary: '#10B981',
        secondary: '#06B6D4',
        accent: '#059669',
        bg: '#ffffff',
        surface: '#f0fdf4',
        text: '#065f46',
        subtext: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
      };
    }

    if (analysis.isDomain.chat) {
      return {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        bg: '#ffffff',
        surface: '#f3f4f6',
        text: '#1f2937',
        subtext: '#6b7280',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      };
    }

    if (analysis.isStyle.luxury) {
      return {
        primary: '#8b7355',
        secondary: '#d4af37',
        accent: '#c9a876',
        bg: '#f5f1e8',
        surface: '#ffffff',
        text: '#2a2a2a',
        subtext: '#666666',
        gradient: 'linear-gradient(135deg, #8b7355 0%, #d4af37 100%)',
      };
    }

    if (analysis.isStyle.dark) {
      return {
        primary: '#00d4ff',
        secondary: '#c644fc',
        accent: '#ff006e',
        bg: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#ffffff',
        subtext: '#cccccc',
        gradient: 'linear-gradient(135deg, #00d4ff 0%, #c644fc 100%)',
      };
    }

    // Default modern
    return {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      bg: '#ffffff',
      surface: '#f9fafb',
      text: '#1f2937',
      subtext: '#6b7280',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    };
  }

  static getTypography(analysis) {
    if (analysis.isStyle.luxury) {
      return {
        font: 'Georgia, serif',
        heading: 'Georgia, serif',
        code: 'Monaco, monospace',
      };
    }
    return {
      font: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      heading: 'sans-serif',
      code: 'Monaco, monospace',
    };
  }
}
