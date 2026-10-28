// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Version is read from the committed VERSION file at the repo root.
// The Header component in @aegis-initiative/design-system reads
// `import.meta.env.AEGIS_VERSION`, which is populated here before
// Astro/Vite loads its env files.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const versionPath = path.resolve(__dirname, '..', '..', 'VERSION');
const versionRaw = fs.readFileSync(versionPath, 'utf8').trim();
process.env.AEGIS_VERSION = versionRaw ? JSON.parse(versionRaw).tag : 'dev';

// https://astro.build/config
export default defineConfig({
  site: 'https://aegis-constitution.com',
  integrations: [mdx(), sitemap()],
  vite: {
    // lightningcss (Vite's default CSS minifier as of this Astro/Vite major)
    // drops the standard `backdrop-filter` declaration when it ships
    // alongside `-webkit-backdrop-filter`, treating them as a redundant pair
    // and keeping only the prefixed one -- which several browsers don't
    // honor on its own. esbuild's CSS minifier doesn't make that merge.
    build: {
      cssMinify: 'esbuild',
    },
  },
});
