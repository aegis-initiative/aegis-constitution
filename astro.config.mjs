// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * Resolve the site version from the committed VERSION file.
 *
 * VERSION is a JSON file at the repo root, written by the nightly
 * release rollup (scripts/nightly-release.py) every time a 3-part
 * release tag is cut. Shape:
 *
 *   {
 *     "tag": "v26.4.12",
 *     "commit": "17ef278",
 *     "released_at": "2026-04-12T10:29:29Z"
 *   }
 *
 * Why a file and not git tags:
 *   1. Works under shallow clones (Cloudflare Pages, etc.)
 *   2. No shell, no globs, no cross-platform quoting
 *   3. Release notes, version file, and tag are committed together
 *      in the nightly rollup — they never disagree
 *   4. Auditable via `git log VERSION`
 *   5. Usable by other tools (CI, Docker, deploy scripts) that need
 *      to know the current version without invoking git
 *
 * The header component reads `import.meta.env.AEGIS_VERSION`, which
 * is populated here by mutating `process.env` before Astro's Vite
 * loader runs.
 */
function resolveVersion() {
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const raw = readFileSync(resolve(here, 'VERSION'), 'utf8');
    const parsed = JSON.parse(raw);
    return parsed.tag || 'dev';
  } catch {
    // No VERSION file yet (fresh clone on a branch that predates the
    // rollup, or local dev without any release). Show 'dev' rather
    // than failing the build.
    return 'dev';
  }
}

process.env.AEGIS_VERSION = resolveVersion();

// https://astro.build/config
export default defineConfig({
  site: 'https://aegis-constitution.com',
  integrations: [mdx()],
});
