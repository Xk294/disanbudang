import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

// Unescape HTML entities for correct length measurements
function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'");
}

function isArticlePage(relPath) {
  const normalized = relPath.replace(/\\/g, '/').toLowerCase();
  return (
    normalized.includes('heritage/') ||
    normalized.includes('stories/') ||
    normalized.includes('journal/') ||
    normalized.includes('news/') ||
    normalized.includes('study/lesson/') ||
    normalized.includes('explore/post/') ||
    normalized.includes('explore/post-')
  );
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(DIST_DIR, filePath);
  const errors = [];

  // Skip redirect stubs (e.g. refresh meta)
  if (content.includes('http-equiv="refresh"') || relPath === '200.html' || relPath === '404.html') {
    return { relPath, errors, skipped: true };
  }

  // 1. Validate Title
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  let title = '';
  if (!titleMatch) {
    errors.push('Missing <title> tag');
  } else {
    title = decodeHtmlEntities(titleMatch[1].trim());
    const limit = isArticlePage(relPath) ? 80 : 60;
    if (title.length > limit) {
      errors.push(`Title is too long: "${title}" (${title.length} chars, max ${limit})`);
    }
    if (title.includes('—') || title.includes('–')) {
      errors.push(`Title contains invalid em-dash (—) or en-dash (–): "${title}"`);
    }
  }

  // 2. Validate Description
  const descMatch = content.match(/<meta[^>]*?name="description"[^>]*?content="([\s\S]*?)"/i) ||
                    content.match(/<meta[^>]*?content="([\s\S]*?)"[^>]*?name="description"/i);
  if (!descMatch) {
    errors.push('Missing <meta name="description"> tag');
  } else {
    const desc = decodeHtmlEntities(descMatch[1].trim());
    if (desc.length > 155) {
      errors.push(`Description is too long: "${desc}" (${desc.length} chars, max 155)`);
    }
    if (desc.includes('—') || desc.includes('–')) {
      errors.push(`Description contains invalid em-dash (—) or en-dash (–): "${desc}"`);
    }
  }

  // 3. Validate Canonical URL
  const canonicalMatch = content.match(/<link[^>]*?rel="canonical"[^>]*?href="([\s\S]*?)"/i);
  if (!canonicalMatch) {
    errors.push('Missing canonical <link> tag');
  } else {
    const canonical = canonicalMatch[1].trim();
    if (!canonical.endsWith('/')) {
      errors.push(`Canonical URL does not end with a trailing slash: "${canonical}"`);
    }
  }

  // 4. Validate Schema.org elements on Homepage
  if (relPath === 'index.html' || relPath === '') {
    const hasOrganization = content.includes('"@type":"Organization"') || content.includes('"@type": "Organization"');
    const hasWebSite = content.includes('"@type":"WebSite"') || content.includes('"@type": "WebSite"');
    const hasWebPage = content.includes('"@type":"WebPage"') || content.includes('"@type": "WebPage"');

    if (!hasOrganization) errors.push('Homepage is missing Organization schema');
    if (!hasWebSite) errors.push('Homepage is missing WebSite schema');
    if (!hasWebPage) errors.push('Homepage is missing WebPage schema');

    if (hasOrganization) {
      const hasAlternateName = content.includes('"alternateName"');
      const hasSameAs = content.includes('"sameAs"') || content.includes('"knowsAbout"');
      if (!hasAlternateName) errors.push('Homepage Organization schema is missing alternateName');
    }
  }

  return { relPath, errors, skipped: false };
}

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(file));
    } else if (file.endsWith('.html')) {
      results.push(file);
    }
  });
  return results;
}

function main() {
  console.log(`Starting SEO validation in folder: ${DIST_DIR}...`);
  const files = getHtmlFiles(DIST_DIR);
  if (files.length === 0) {
    console.warn('No HTML files found. Did you run "npm run generate" first?');
    process.exit(0);
  }

  let totalErrors = 0;
  let checkedCount = 0;

  files.forEach((file) => {
    const result = validateFile(file);
    if (result.skipped) return;
    checkedCount++;

    if (result.errors.length > 0) {
      console.error(`\n❌ [${result.relPath}]`);
      result.errors.forEach((err) => {
        console.error(`  - ${err}`);
        totalErrors++;
      });
    }
  });

  console.log(`\nValidation complete. Checked ${checkedCount} HTML files.`);
  if (totalErrors > 0) {
    console.error(`\n❌ Found ${totalErrors} SEO errors total.`);
    process.exit(1);
  } else {
    console.log('\n✅ All SEO validation checks passed successfully!');
    process.exit(0);
  }
}

main();
