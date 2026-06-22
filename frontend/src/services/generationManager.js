import { buildGeneratorConfig } from './buildGeneratorConfig.js';
import { normalizeGenerator } from '../generators/utils/normalizeGenerator.js';

// 1. Create a static import map for Vite/Webpack to analyze safely.
// Wrapping them in functions ensures they are only downloaded when needed (lazy-loading).
const GENERATOR_IMPORTS = {
  ecommerce: () => import('../generators/EcommerceGenerator.js'),
  aiTool: () => import('../generators/AIToolGenerator.js'),
  travel: () => import('../generators/TravelGenerator.js'),
  portfolio: () => import('../generators/PortfolioGenerator.js'),
  website: () => import('../generators/base/BaseWebsiteGenerator.js'), // Fixed path
  default: () => import('../generators/AIToolGenerator.js')
};

export async function generateUI(prompt, opts = {}) {
  // Try API first
  // const apiResp = await callGenerationApi(prompt, opts);
  // if (apiResp.ok) return apiResp;

  // Build config from prompt
  const generatorConfig = buildGeneratorConfig(prompt);

  // Pick generator import function
  const category = generatorConfig.category;
  const loadGenerator = GENERATOR_IMPORTS[category] || GENERATOR_IMPORTS.default;

  try {
    // 2. Execute the import function to load the module
    const moduleObj = await loadGenerator();
    
    // Extract the class definition (handling ESM default exports)
    const GeneratorClass = moduleObj.default || moduleObj;
    
    // 3. Instantiate the class with the new keyword!
    const generatorInstance = new GeneratorClass(generatorConfig);
    
    // Normalize and execute the instance
    const normalized = await normalizeGenerator(generatorInstance, generatorConfig);
    
    if (normalized?.html?.trim().length > 0) {
      return { 
        ok: true, 
        source: 'generator', 
        generator: GeneratorClass.name, 
        output: normalized 
      };
    }
  } catch (err) {
    console.warn('Local generator failed:', err);
  }

  // Fallback to other generators or return failure
  return { ok: false, source: 'fallback' };
}