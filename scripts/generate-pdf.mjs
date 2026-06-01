/**
 * generate-pdf.mjs
 *
 * Generates two PDF variants from the /print/ page:
 *   1. AEGIS_Constitution.pdf        — links retained (blue, clickable)
 *   2. AEGIS_Constitution_print.pdf  — links stripped (plain text, no color)
 *
 * Usage:
 *   node scripts/generate-pdf.mjs              — starts its own server from sites/constitution/dist/
 *   node scripts/generate-pdf.mjs --port 4322  — uses an already-running server
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import path from 'path';
import { lookup } from 'mime-types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const siteDir = path.join(rootDir, 'sites', 'constitution');
const distDir = path.join(siteDir, 'dist');
const outputDir = path.join(siteDir, 'public');

// Parse --port flag
const args = process.argv.slice(2);
const portIdx = args.indexOf('--port');
const externalPort = portIdx >= 0 && args[portIdx + 1] ? parseInt(args[portIdx + 1]) : null;

/**
 * Start a minimal static file server for sites/constitution/dist/
 */
function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = path.join(distDir, req.url === '/' ? '/index.html' : req.url);

      // Try adding index.html for directory paths
      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      // Try adding .html extension
      if (!existsSync(filePath) && !path.extname(filePath)) {
        filePath += '.html';
      }

      // Try path/index.html
      if (!existsSync(filePath)) {
        const withIndex = path.join(filePath.replace(/\.html$/, ''), 'index.html');
        if (existsSync(withIndex)) filePath = withIndex;
      }

      if (!existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const mimeType = lookup(filePath) || 'application/octet-stream';
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content);
    });

    server.listen(port, () => {
      resolve(server);
    });
  });
}

async function generatePDF(baseUrl, mode, outputFile) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set viewport — narrower for print to match wider margins
  // Letter = 8.5in. Download: 8.5 - 2*0.75 = 7in content. Print: 8.5 - 2*1.5 = 5.5in content.
  const contentWidthPx = mode === 'print' ? Math.round(5.5 * 96) : Math.round(7 * 96);
  await page.setViewport({ width: contentWidthPx, height: 1056 });

  const url = `${baseUrl}/print/`;
  console.log(`  Loading ${url} (${mode} mode)...`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  // Apply print mode class if needed (strips link colors, wider margins)
  if (mode === 'print') {
    await page.evaluate(() => {
      document.body.classList.add('print-mode');
    });
  }

  // Print gets 1.5in side margins, download gets 0.75in
  const sideMargin = mode === 'print' ? '1.25in' : '0.75in';
  console.log(`  Side margins: ${sideMargin}`);

  // Rewrite internal links to PDF anchors
  await page.evaluate(() => {
    const links = document.querySelectorAll('a[href]');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;

      // Convert /constitution/article-i/ → #constitution-article-i
      const cleaned = href.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-');

      // Check if the target exists in the document
      const target = document.getElementById(cleaned);
      if (target) {
        link.setAttribute('href', '#' + cleaned);
      }
    });
  });

  // Calculate and inject ToC page numbers
  // Page height at Letter size with 1in top+bottom margins = 9in of content
  // At 96 DPI (Puppeteer default) = 864px per page
  await page.evaluate(() => {
    const pageHeight = 864; // 9in * 96dpi
    const tocNums = document.querySelectorAll('.toc-page-num[data-target]');
    tocNums.forEach((span) => {
      const targetId = span.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if (target) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const absoluteTop = rect.top + scrollTop;
        const pageNum = Math.ceil(absoluteTop / pageHeight);
        span.textContent = String(pageNum);
      }
    });
  });

  const outputPath = path.join(outputDir, outputFile);
  console.log(`  Generating ${outputFile}...`);

  await page.pdf({
    path: outputPath,
    format: 'Letter',
    margin: {
      top: '1in',
      right: sideMargin,
      bottom: '1in',
      left: sideMargin,
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-family: 'IBM Plex Sans', system-ui, sans-serif; font-size: 8pt; color: #757575; width: 100%; padding: 0 ${sideMargin}; display: flex; justify-content: space-between;">
        <span>AEGIS\u2122 Constitution</span>
        <span>v0.2.0</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-family: 'IBM Plex Sans', system-ui, sans-serif; font-size: 8pt; color: #757575; width: 100%; padding: 0 ${sideMargin}; text-align: center;">
        <span class="pageNumber"></span>
      </div>
    `,
    preferCSSPageSize: false,
  });

  console.log(`  ✓ ${outputFile}`);
  await browser.close();
}

async function main() {
  console.log('AEGIS™ Constitution — PDF Generator\n');

  let server = null;
  let port = externalPort;
  let baseUrl;

  if (externalPort) {
    // Use external server
    baseUrl = `http://localhost:${externalPort}`;
    console.log(`Using external server at ${baseUrl}\n`);
  } else {
    // Start our own server
    if (!existsSync(distDir)) {
      console.error('Error: sites/constitution/dist/ not found. Run npm run build from sites/constitution first.');
      process.exit(1);
    }
    port = 4444;
    server = await startServer(port);
    baseUrl = `http://localhost:${port}`;
    console.log(`Started server at ${baseUrl}\n`);
  }

  try {
    // Verify the print page is accessible
    const res = await fetch(`${baseUrl}/print/`);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    await generatePDF(baseUrl, 'pdf', 'AEGIS_Constitution.pdf');
    await generatePDF(baseUrl, 'print', 'AEGIS_Constitution_print.pdf');

    console.log('\nDone.');
  } catch (err) {
    console.error('PDF generation failed:', err.message);
    process.exit(1);
  } finally {
    if (server) server.close();
  }
}

main().catch((err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
