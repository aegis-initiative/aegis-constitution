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
});
