// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { execSync } from 'node:child_process';

/**
 * Resolve the CalVer version at build time from the latest git tag.
 *
 * The header component reads `import.meta.env.AEGIS_VERSION`. By
 * setting `process.env.AEGIS_VERSION` before Astro/Vite loads its env
 * files, we ensure the authoritative source is always the most recent
 * git tag — not a stale dashboard variable or ambient .env file.
 *
 * Every production build automatically reflects the latest release
 * with no manual sync step. Local dev can still override by setting
 * AEGIS_VERSION in the shell environment before running `astro dev`.
 */
function resolveVersionFromGit() {
  try {
    return execSync('git describe --tags --abbrev=0', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
}

// Force git-derived version as the authoritative source. This
// overrides any .env file or dashboard-configured environment value
// that might otherwise go stale between releases.
const gitVersion = resolveVersionFromGit();
if (gitVersion) {
  process.env.AEGIS_VERSION = gitVersion;
} else if (!process.env.AEGIS_VERSION) {
  process.env.AEGIS_VERSION = 'dev';
}

// https://astro.build/config
export default defineConfig({
  site: 'https://aegis-constitution.com',
  integrations: [mdx()],
});
