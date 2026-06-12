const fs = require('fs');
const path = require('path');

const searchTerms = ['takeuforward', 'sde sheet'];
const results = [];

function searchFile(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf8').toLowerCase();
    searchTerms.forEach(term => {
      if (content.includes(term)) {
        results.append = results.push(`Match '${term}' in ${filepath}`);
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
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.md')) {
      searchFile(filepath);
    }
  });
}

// Check index.html
if (fs.existsSync('index.html')) {
  searchFile('index.html');
}

// Check src
if (fs.existsSync('src')) {
  walkDir('src');
}

fs.writeFileSync('search_results.txt', results.join('\n'), 'utf8');
console.log('Search complete. Results written to search_results.txt.');
