
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Diagnostic log to check if Vercel environment has the API key.
// The @genkit-ai/googleai plugin typically uses GOOGLE_API_KEY by default.
const apiKeyEnvVarName = 'GOOGLE_API_KEY'; 
console.log(`[Genkit Init] Checking for ${apiKeyEnvVarName}:`, process.env[apiKeyEnvVarName] ? 'Found' : 'NOT FOUND - This is likely the cause of issues on Vercel if "NOT FOUND".');

export const ai = genkit({
  plugins: [
    googleAI() // This will use GOOGLE_API_KEY from env if not passed explicitly
  ],
  model: 'googleai/gemini-2.0-flash', // Default model for text generation
  // logLevel option is not valid for genkit() in v1.x and has been removed.
});
