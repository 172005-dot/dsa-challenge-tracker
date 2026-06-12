const fs = require('fs');
const path = require('path');

const results = [];

function searchFile(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('11') || line.includes('slice') || line.includes('filter') || line.includes('Day 11')) {
        results.push(`${filepath}:${idx + 1}: ${line.trim()}`);
      }
    });
  } catch (err) {
    results.push(`Error reading ${filepath}: ${err.message}`);
  }
}

function walkDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        walkDir(filepath);
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      searchFile(filepath);
    }
  });
}

if (fs.existsSync('src')) {
  walkDir('src');
}

fs.writeFileSync('scan_results.txt', results.join('\n'), 'utf8');
console.log('Scan complete.');
