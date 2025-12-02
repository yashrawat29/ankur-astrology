import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, path.resolve('.'), '');

    // Priority: 
    // 1. Environment variable from .env file (env.GEMINI_API_KEY)
    // 2. System environment variable (process.env.GEMINI_API_KEY) - Needed for Vercel/Netlify
    const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // We inject the API key into the client code.
        // NOTE: In a production app, be aware that this exposes the key in the client bundle.
        // Restrict the key in Google Cloud Console to your specific domain (e.g., your-app.vercel.app).
        'process.env.API_KEY': JSON.stringify(apiKey),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});