/**
 * @fileoverview Defines structural layout patterns for applications.
 */

/**
 * Standardized layout identifiers.
 * @readonly
 * @enum {string}
 */
export const LAYOUT_TYPES = Object.freeze({
  SIDEBAR_DASHBOARD: 'sidebar-dashboard',
  TOP_NAV_STANDARD: 'top-nav-standard',
  SPLIT_SCREEN: 'split-screen',
  SINGLE_COLUMN_FEED: 'single-column-feed',
  GRID_MASONRY: 'grid-masonry',
  MASTER_DETAIL: 'master-detail',
  MULTI_STEP_WIZARD: 'multi-step-wizard',
  HERO_LANDING: 'hero-landing'
});

/**
 * 5 distinct layouts mapped per category, ordered by likelihood/preference.
 * @type {Record<string, string[]>}
 */
const CATEGORY_LAYOUTS = Object.freeze({
  AITool: [LAYOUT_TYPES.SPLIT_SCREEN, LAYOUT_TYPES.SIDEBAR_DASHBOARD, LAYOUT_TYPES.SINGLE_COLUMN_FEED, LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.MASTER_DETAIL],
  Finance: [LAYOUT_TYPES.SIDEBAR_DASHBOARD, LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.MASTER_DETAIL, LAYOUT_TYPES.GRID_MASONRY, LAYOUT_TYPES.MULTI_STEP_WIZARD],
  CRM: [LAYOUT_TYPES.SIDEBAR_DASHBOARD, LAYOUT_TYPES.MASTER_DETAIL, LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.SPLIT_SCREEN, LAYOUT_TYPES.GRID_MASONRY],
  Ecommerce: [LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.GRID_MASONRY, LAYOUT_TYPES.SIDEBAR_DASHBOARD, LAYOUT_TYPES.HERO_LANDING, LAYOUT_TYPES.MULTI_STEP_WIZARD],
  Healthcare: [LAYOUT_TYPES.SIDEBAR_DASHBOARD, LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.MULTI_STEP_WIZARD, LAYOUT_TYPES.MASTER_DETAIL, LAYOUT_TYPES.HERO_LANDING],
  Education: [LAYOUT_TYPES.SIDEBAR_DASHBOARD, LAYOUT_TYPES.GRID_MASONRY, LAYOUT_TYPES.SINGLE_COLUMN_FEED, LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.MASTER_DETAIL],
  Travel: [LAYOUT_TYPES.HERO_LANDING, LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.GRID_MASONRY, LAYOUT_TYPES.SPLIT_SCREEN, LAYOUT_TYPES.MULTI_STEP_WIZARD],
  Social: [LAYOUT_TYPES.SINGLE_COLUMN_FEED, LAYOUT_TYPES.GRID_MASONRY, LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.SIDEBAR_DASHBOARD, LAYOUT_TYPES.SPLIT_SCREEN],
  Portfolio: [LAYOUT_TYPES.HERO_LANDING, LAYOUT_TYPES.GRID_MASONRY, LAYOUT_TYPES.SPLIT_SCREEN, LAYOUT_TYPES.SINGLE_COLUMN_FEED, LAYOUT_TYPES.TOP_NAV_STANDARD],
  RealEstate: [LAYOUT_TYPES.SPLIT_SCREEN, LAYOUT_TYPES.GRID_MASONRY, LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.SIDEBAR_DASHBOARD, LAYOUT_TYPES.MASTER_DETAIL],
  FoodDelivery: [LAYOUT_TYPES.TOP_NAV_STANDARD, LAYOUT_TYPES.GRID_MASONRY, LAYOUT_TYPES.SINGLE_COLUMN_FEED, LAYOUT_TYPES.SIDEBAR_DASHBOARD, LAYOUT_TYPES.MULTI_STEP_WIZARD]
});

/**
 * Returns the recommended layouts for a specific category.
 * * @param {string} category - The app category.
 * @returns {string[]} List of 5 layout identifiers.
 */
export const getLayoutsForCategory = (category) => {
  return CATEGORY_LAYOUTS[category] || [
    LAYOUT_TYPES.TOP_NAV_STANDARD, 
    LAYOUT_TYPES.SIDEBAR_DASHBOARD, 
    LAYOUT_TYPES.HERO_LANDING, 
    LAYOUT_TYPES.GRID_MASONRY, 
    LAYOUT_TYPES.SINGLE_COLUMN_FEED
  ];
};

/**
 * Resolves the primary layout based on category and required complexity.
 * * @param {string} category - App category.
 * @param {string} complexity - 'low', 'medium', or 'high'.
 * @returns {string} The chosen primary layout.
 */
export const resolvePrimaryLayout = (category, complexity) => {
  const layouts = getLayoutsForCategory(category);
  
  if (complexity === 'high' && layouts.includes(LAYOUT_TYPES.SIDEBAR_DASHBOARD)) {
    return LAYOUT_TYPES.SIDEBAR_DASHBOARD;
  }
  if (complexity === 'low' && layouts.includes(LAYOUT_TYPES.HERO_LANDING)) {
    return LAYOUT_TYPES.HERO_LANDING;
  }
  
  // Default to the highest priority layout for that category
  return layouts[0]; 
};