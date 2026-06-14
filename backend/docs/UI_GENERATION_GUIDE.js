/**
 * UI GENERATION CAPABILITIES DOCUMENTATION
 * Shows all types of UIs that can be generated from ANY prompt
 */

const UI_GENERATION_TYPES = {
  // ============================================================================
  // 1. LAYOUT TYPES (Based on prompt analysis)
  // ============================================================================
  
  layouts: {
    multiColumn: {
      description: "Sidebar + Main Content Layout",
      triggers: ["sidebar", "aside", "panel", "column", "layout", "grid", "dashboard"],
      structure: `
        ┌─────────────────────────────────┐
        │  Header (Navigation)             │
        ├──────────┬──────────────────────┤
        │ Sidebar  │   Main Content       │
        │ Menu     │   (Cards/Tables)     │
        ├──────────┤                      │
        │ Settings │                      │
        │ Help     │                      │
        ├──────────┴──────────────────────┤
        │  Footer                          │
        └─────────────────────────────────┘
      `,
      examples: [
        "Create a dashboard",
        "Make an admin panel",
        "Build a management system",
        "Design a workspace layout"
      ]
    },
    
    singleColumn: {
      description: "Simple Focused Layout",
      triggers: ["simple", "minimal", "clean", "focused", "single", "linear"],
      structure: `
        ┌──────────────────────────────┐
        │     Header / Navigation       │
        ├──────────────────────────────┤
        │                              │
        │    Main Content              │
        │    (Full Width)              │
        │                              │
        ├──────────────────────────────┤
        │     Footer                    │
        └──────────────────────────────┘
      `,
      examples: [
        "Create a blog",
        "Make a landing page",
        "Build a portfolio",
        "Design a simple form"
      ]
    }
  },

  // ============================================================================
  // 2. CONTENT COMPONENTS (Dynamically added based on analysis)
  // ============================================================================
  
  components: {
    cards: {
      description: "Grid of Card Components",
      triggers: ["card", "component", "item", "product", "section", "box"],
      generates: [
        "6 responsive cards",
        "With gradient backgrounds",
        "Hover animations",
        "Call-to-action buttons",
        "Shadow effects"
      ],
      example: `
        ┌─────────┐  ┌─────────┐  ┌─────────┐
        │ Card 1  │  │ Card 2  │  │ Card 3  │
        │ ────    │  │ ────    │  │ ────    │
        │ [Image] │  │ [Image] │  │ [Image] │
        │ Title   │  │ Title   │  │ Title   │
        │ Desc... │  │ Desc... │  │ Desc... │
        │ [Button]│  │ [Button]│  │ [Button]│
        └─────────┘  └─────────┘  └─────────┘
      `,
      prompts: [
        "Create product cards",
        "Make a portfolio grid",
        "Design featured items",
        "Build a gallery"
      ]
    },

    tables: {
      description: "Data Table with Sorting",
      triggers: ["table", "data", "list", "record", "entry", "user", "manage"],
      generates: [
        "Professional data table",
        "5 rows of sample data",
        "Column headers",
        "Action buttons",
        "Responsive design"
      ],
      example: `
        ┌──────┬──────┬─────────┬─────────┬────────┐
        │ Name │Status│ Date    │ Email   │ Action │
        ├──────┼──────┼─────────┼─────────┼────────┤
        │Item 1│Active│2024-06-1│...      │ [View] │
        │Item 2│Active│2024-06-2│...      │ [View] │
        │Item 3│Active│2024-06-3│...      │ [View] │
        └──────┴──────┴─────────┴─────────┴────────┘
      `,
      prompts: [
        "Create a user management table",
        "Make an inventory list",
        "Design a data dashboard",
        "Build a records table"
      ]
    },

    forms: {
      description: "Contact/Signup Forms",
      triggers: ["form", "input", "field", "login", "signup", "contact", "subscribe"],
      generates: [
        "Name input field",
        "Email input field",
        "Message textarea",
        "Submit button",
        "Form validation ready"
      ],
      example: `
        ┌─────────────────────────────┐
        │ Contact Form                │
        ├─────────────────────────────┤
        │ Name:                       │
        │ [_______________________]  │
        │                             │
        │ Email:                      │
        │ [_______________________]  │
        │                             │
        │ Message:                    │
        │ [_______________________]  │
        │ [_______________________]  │
        │                             │
        │     [Send Message]          │
        └─────────────────────────────┘
      `,
      prompts: [
        "Create a contact form",
        "Make a signup page",
        "Design a newsletter form",
        "Build a feedback form"
      ]
    },

    heroSection: {
      description: "Large Banner with CTA",
      triggers: ["hero", "banner", "cover", "header", "landing", "splash", "welcome"],
      generates: [
        "Large gradient background",
        "Centered heading (48px)",
        "Subheading text",
        "Primary CTA button",
        "Professional spacing"
      ],
      example: `
        ╔═════════════════════════════════╗
        ║                                 ║
        ║    Create Something Amazing     ║
        ║                                 ║
        ║  Transform your ideas into reality
        ║                                 ║
        ║      [Get Started]              ║
        ║                                 ║
        ╚═════════════════════════════════╝
      `,
      prompts: [
        "Create a hero banner",
        "Make a landing page header",
        "Design a welcome section",
        "Build a splash screen"
      ]
    },

    gallery: {
      description: "Image/Content Gallery",
      triggers: ["gallery", "image", "photo", "portfolio", "work", "showcase", "project"],
      generates: [
        "6 gallery items",
        "Gradient placeholders",
        "Grid layout",
        "Hover zoom effects",
        "Responsive columns"
      ],
      example: `
        ┌────────┐ ┌────────┐ ┌────────┐
        │ [IMG1] │ │ [IMG2] │ │ [IMG3] │
        └────────┘ └────────┘ └────────┘
        ┌────────┐ ┌────────┐ ┌────────┐
        │ [IMG4] │ │ [IMG5] │ │ [IMG6] │
        └────────┘ └────────┘ └────────┘
      `,
      prompts: [
        "Create a portfolio gallery",
        "Make a photo grid",
        "Design a project showcase",
        "Build an image portfolio"
      ]
    }
  },

  // ============================================================================
  // 3. DESIGN STYLES (Applied to all components)
  // ============================================================================
  
  designStyles: {
    colorSchemes: {
      description: "Unique color palettes generated per prompt",
      calculation: "Based on prompt text hash → Deterministic HSL colors",
      includes: [
        "Primary color (70% saturation, 55% lightness)",
        "Secondary color (180° hue rotation)",
        "Accent color (90° hue rotation)",
        "Light background",
        "Dark text",
        "Two gradient combinations"
      ],
      result: "Each prompt = Unique color scheme"
    },

    animations: {
      description: "Smooth transitions and effects",
      includes: [
        "Fade-in animations on load",
        "Slide-in effects for cards",
        "Button hover effects (lift up)",
        "Smooth color transitions",
        "Scale transforms on hover",
        "Box shadow depth effects"
      ]
    },

    typography: {
      description: "Professional font hierarchy",
      includes: [
        "System fonts (-apple-system, Segoe UI, Roboto)",
        "H1: 48px (large headings)",
        "H2: 28px (section titles)",
        "H3: 16px (card titles)",
        "Body: 14px (default text)",
        "Line height: 1.6 (readability)"
      ]
    }
  },

  // ============================================================================
  // 4. EXAMPLE PROMPTS AND THEIR OUTPUTS
  // ============================================================================
  
  examples: [
    {
      prompt: "Create a dashboard with sidebar and metrics",
      generates: [
        "✅ Multi-column layout (sidebar + main)",
        "✅ Header with navigation",
        "✅ Card grid for metrics",
        "✅ Data table with users",
        "✅ Footer section",
        "✅ Responsive design",
        "✅ Unique color scheme from prompt",
        "✅ All animations & hover effects"
      ],
      output: "Professional admin dashboard"
    },

    {
      prompt: "Build a simple landing page for a startup",
      generates: [
        "✅ Single column layout",
        "✅ Header with navigation",
        "✅ Hero banner section",
        "✅ Feature cards grid",
        "✅ Contact form",
        "✅ Footer",
        "✅ Gradient backgrounds",
        "✅ Mobile responsive"
      ],
      output: "Modern startup landing page"
    },

    {
      prompt: "Design an e-commerce product gallery",
      generates: [
        "✅ Header with search bar",
        "✅ Product cards grid",
        "✅ Price and rating display",
        "✅ Add to cart buttons",
        "✅ Hover effects",
        "✅ Gallery images",
        "✅ Responsive columns",
        "✅ Animations on scroll"
      ],
      output: "Beautiful e-commerce store"
    },

    {
      prompt: "Create a portfolio website for a photographer",
      generates: [
        "✅ Clean navigation header",
        "✅ Hero section with tagline",
        "✅ Portfolio gallery",
        "✅ Image grid with effects",
        "✅ Contact form section",
        "✅ Professional footer",
        "✅ Smooth animations",
        "✅ Fully responsive"
      ],
      output: "Professional photography portfolio"
    },

    {
      prompt: "Make a team management system dashboard",
      generates: [
        "✅ Sidebar with menu items",
        "✅ Header with search",
        "✅ Metric cards (Overview)",
        "✅ Team members table",
        "✅ Project cards section",
        "✅ Settings form",
        "✅ Dark theme option",
        "✅ Professional styling"
      ],
      output: "Complete management dashboard"
    }
  ],

  // ============================================================================
  // 5. WHAT THIS GENERATOR WILL NOT DO
  // ============================================================================
  
  limitations: [
    "❌ Does not call external APIs or databases",
    "❌ Does not include heavy JavaScript frameworks",
    "❌ Does not generate complex 3D graphics",
    "❌ Does not work offline (requires Node.js backend)",
    "❌ Does not include video/audio players",
    "❌ Does not integrate payment systems",
    "❌ Does not generate PHP/Python backend code"
  ],

  // ============================================================================
  // 6. WHAT THIS GENERATOR WILL ALWAYS INCLUDE
  // ============================================================================
  
  features: [
    "✅ Semantic HTML5 code",
    "✅ Modern CSS3 with Flexbox/Grid",
    "✅ Vanilla JavaScript (no dependencies)",
    "✅ Mobile responsive (768px, 480px breakpoints)",
    "✅ Accessibility features (labels, semantic tags)",
    "✅ Smooth animations & transitions",
    "✅ Unique color schemes per prompt",
    "✅ Professional typography",
    "✅ Button interactions",
    "✅ Form validation ready",
    "✅ Copy-paste ready code",
    "✅ Works in any HTML viewer"
  ]
};

module.exports = UI_GENERATION_TYPES;
