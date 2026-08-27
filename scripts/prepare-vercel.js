const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, '..', 'dist', 'BhagvadGita', 'browser');
const indexPath = path.join(browserDir, 'index.html');
const originalPath = path.join(browserDir, 'index.original.html');

if (!fs.existsSync(indexPath)) {
  throw new Error('Missing dist/BhagvadGita/browser/index.html. Run the browser build first.');
}

if (fs.existsSync(originalPath)) {
  fs.unlinkSync(originalPath);
}

fs.renameSync(indexPath, originalPath);
console.log('Moved index.html to index.original.html so Vercel does not serve a stale homepage.');
