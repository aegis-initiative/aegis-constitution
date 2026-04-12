// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { execSync } from 'node:child_process';

/**
 * Resolve the CalVer version at build time from the latest release tag.
 *
 * Version scheme:
 *   vYY.M.D.N  (4-part) — development log snapshot, per-push
 *   vYY.M.D    (3-part) — release, created by the nightly rollup
 *
 * The header only displays releases. We filter the tag list to 3-part
 * tags only and return the most recent one by version-sort order.
 *
 * This ensures the header reflects the most recent *released* day, not
 * whatever was just pushed mid-day. A day in progress stays invisible
 * until its nightly rollup cuts the release tag.
 *
 * Local dev can override by setting AEGIS_VERSION in the shell before
 * running `astro dev`. Falls back to 'dev' if no release tags exist.
 */
function resolveVersionFromGit() {
  try {
    // No glob argument — Windows cmd.exe doesn't strip single quotes
    // around 'v*', which makes git match a literal string and return
    // nothing. Filter the full tag list with the regex instead.
    const tags = execSync(
      'git tag --sort=-version:refname',
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim().split('\n');

    // Match only 3-part release tags (vYY.M.D), reject 4-part dev logs
    const releaseTag = tags.find((t) => /^v\d+\.\d+\.\d+$/.test(t.trim()));
    return releaseTag ? releaseTag.trim() : null;
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
