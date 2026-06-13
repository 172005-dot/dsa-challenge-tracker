const fs = require('fs');
let c = fs.readFileSync('src/data/sheetData.js', 'utf8');
const fixes = [
  ['Rotate Image', 'grid'],
  ['Repeat and Missing Number', 'two-sum'],
  ['Unique Paths', 'dp'],
  ['N meetings in one room', 'stack-queue'],
  ['Minimum Platforms', 'stack-queue'],
  ['Job Sequencing Problem', 'stack-queue'],
  ['Find Minimum Number of Coins', 'stack-queue'],
  ['Activity Selection', 'stack-queue'],
  ['Left View of Binary Tree', 'binary-tree'],
  ['Height of a Binary Tree', 'binary-tree'],
  ['LCA of Binary Tree', 'binary-tree'],
  ['Same Tree', 'binary-tree'],
  ['Populate Next Right Pointers', 'binary-tree'],
  ['Convert Sorted Array to BST', 'binary-tree'],
  ['Predecessor and Successor', 'binary-tree'],
  ['Floor in BST', 'binary-tree'],
  ['Ceil in BST', 'binary-tree'],
  ['Kth Largest Element in BST', 'binary-tree'],
  ['Cycle Detection Undirected Graph', 'graph'],
  ['Longest String with All Prefixes', 'trie'],
  ['Reverse Words in a String', 'two-sum'],
  ['Longest Palindromic Substring', 'two-sum'],
  ['Roman to Integer', 'two-sum'],
  ['Integer to Roman', 'two-sum'],
  ['Implement strStr', 'two-sum'],
  ['String to Integer', 'two-sum'],
  ['Longest Common Prefix', 'two-sum'],
  ['Valid Anagram', 'two-sum'],
  ['Count and Say', 'two-sum'],
  ['K Max Sum Combinations', 'stack-queue'],
  ['K Most Frequent Elements', 'stack-queue'],
  ['Task Scheduler', 'stack-queue'],
  ['Maximum Path Sum in Matrix', 'dp'],
  ['Search in a Binary Search Tree', 'binary-tree'],
  ['Validate Binary Search Tree', 'binary-tree'],
  ['LCA of a Binary Search Tree', 'binary-tree'],
];
let count = 0;
for (const [name, type] of fixes) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp('(name: "' + escaped + '"[^}]+visualizerType: ")[^"]+(")', 'g');
  const before = c;
  c = c.replace(regex, '$1' + type + '$2');
  if (c !== before) count++;
}
fs.writeFileSync('src/data/sheetData.js', c, 'utf8');
console.log('Fixed ' + count + ' problems');