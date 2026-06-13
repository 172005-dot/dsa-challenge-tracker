const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'data', 'sheetData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Map of problem name keywords to visualizer type
const typeMap = [
  // Arrays
  { keys: ["pascal"], type: "pascal" },
  { keys: ["kadane", "maximum subarray"], type: "kadane" },
  { keys: ["next permutation"], type: "next-permutation" },
  { keys: ["sort colors", "0s 1s", "0's 1's"], type: "sort-colors" },
  { keys: ["two sum"], type: "two-sum" },
  { keys: ["3sum", "three sum", "4sum", "four sum"], type: "two-sum" },
  { keys: ["trapping rain"], type: "kadane" },
  { keys: ["binary search", "search in rotated", "single element in a sorted", "median of two sorted", "allocate", "aggressive cows", "k-th element of two sorted", "search a 2d matrix"], type: "binary-search" },
  { keys: ["merge intervals", "merge sorted", "merge two sorted"], type: "two-sum" },
  { keys: ["rotate image", "set matrix"], type: "binary-search" },
  { keys: ["longest consecutive", "longest substring", "longest palindromic", "longest common prefix", "longest palindrome in"], type: "kadane" },
  { keys: ["majority element", "find the duplicate", "repeat and missing", "inversion of array", "reverse pairs", "unique paths", "grid unique"], type: "binary-search" },
  { keys: ["best time to buy", "stock"], type: "kadane" },
  { keys: ["pow(x", "power"], type: "binary-search" },
  { keys: ["largest subarray", "subarrays with xor", "count subarrays"], type: "kadane" },
  // Linked List
  { keys: ["reverse linked list", "reverse a ll", "reverse ll", "reverse nodes in k"], type: "linked-list" },
  { keys: ["middle of the linked", "find middle"], type: "linked-list" },
  { keys: ["merge two sorted lists"], type: "linked-list" },
  { keys: ["remove nth node"], type: "linked-list" },
  { keys: ["add two numbers"], type: "linked-list" },
  { keys: ["delete node in a linked"], type: "linked-list" },
  { keys: ["intersection of two linked"], type: "linked-list" },
  { keys: ["linked list cycle", "detect a loop", "starting point in ll", "starting point of loop"], type: "linked-list" },
  { keys: ["palindrome linked list"], type: "linked-list" },
  { keys: ["flattening a linked", "flatten a linked"], type: "linked-list" },
  { keys: ["rotate list"], type: "linked-list" },
  { keys: ["copy list with random"], type: "linked-list" },
  // Stack & Queue
  { keys: ["implement stack", "implement queue", "valid parentheses", "balanced paren", "next greater element", "lru cache", "lfu cache", "largest rectangle in histogram", "sliding window maximum", "min stack", "stock span", "celebrity", "rotten oranges", "maximum of minimums", "sort a stack", "next smaller"], type: "stack-queue" },
  // Binary Tree
  { keys: ["inorder", "preorder", "postorder", "morris", "level order", "diameter of binary", "maximum depth", "balanced binary", "lca in bt", "identical", "zig zag", "boundary traversal", "maximum path sum", "construct a bt", "construct a binary", "symmetric binary", "flatten binary tree", "children sum", "vertical order", "print root to leaf", "maximum width", "right/left view", "bottom view", "top view", "pre, post, inorder"], type: "binary-tree" },
  // BST
  { keys: ["search in bst", "construct bst", "check if a tree is a bst", "lca in bst", "inorder successor", "floor in a bst", "ceil in a bst", "k-th smallest element in bst", "kth smallest and largest", "two sum in bst", "bst iterator", "size of the largest bst", "serialize", "populating next right"], type: "binary-tree" },
  // Graph
  { keys: ["clone graph", "dfs", "bfs", "traversal techniques", "detect a cycle", "topological sort", "number of islands", "bipartite", "strongly connected", "dijkstra", "bellman ford", "floyd warshall", "mst using prim", "mst using kruskal", "kruskal"], type: "graph" },
  // DP
  { keys: ["max product subarray", "longest increasing subsequence", "longest common subsequence", "0 and 1 knapsack", "edit distance", "maximum sum increasing", "matrix chain", "minimum sum path in the matrix", "coin change", "subset sum", "rod cutting", "super egg drop", "word break", "palindrome partitioning (mcm", "maximum profit in job"], type: "dp" },
  // Trie
  { keys: ["trie", "longest word with all prefixes", "number of distinct substrings", "power set", "maximum xor"], type: "trie" },
  // Strings
  { keys: ["reverse words in a string", "roman to integer", "integer to roman", "implement strstr", "string to integer", "valid anagram", "count and say", "compare version", "z function", "kmp algorithm", "minimum insertions to make string palindrome", "rabin karp"], type: "kadane" },
  // Recursion/Backtracking
  { keys: ["subset sums", "subsets ii", "combination sum", "palindrome partitioning", "permutation sequence", "n-queens", "sudoku solver", "m-coloring", "rat in a maze", "word break (print", "permutations of a string"], type: "dp" },
  // Greedy
  { keys: ["n meetings", "minimum platforms", "job sequencing", "fractional knapsack", "minimum number of coins", "activity selection", "assign cookies"], type: "kadane" },
  // Heaps
  { keys: ["k max sum", "k-th largest element", "merge k sorted", "find median from data stream", "k most frequent", "task scheduler", "binary tree to doubly", "find median in a stream", "kth largest element in a stream", "distinct numbers in each subarray", "flood-fill"], type: "dp" },
  // Binary Trees Misc
  { keys: ["binary tree to doubly", "find median in a stream", "kth largest element in a stream", "distinct numbers in each subarray", "k-th largest element in an unsorted", "flood-fill algorithm"], type: "binary-tree" },
];

function getVisualizerType(name) {
  const lower = name.toLowerCase();
  for (const { keys, type } of typeMap) {
    if (keys.some(k => lower.includes(k))) return type;
  }
  return 'kadane'; // safe default: array sweep
}

// Find all problem objects and inject visualizerType
let fixed = 0;
content = content.replace(/\{([^}]*name:\s*"([^"]+)"[^}]*)\}/g, (match, inner, name) => {
  // Only process RAW_PROBLEMS entries (they have day:, index:, name:, difficulty:)
  if (!inner.includes('day:') || !inner.includes('difficulty:')) return match;
  if (inner.includes('visualizerType:')) return match; // already has it
  const type = getVisualizerType(name);
  fixed++;
  return match.replace(/,?\s*\}$/, `, visualizerType: "${type}" }`);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ Fixed ${fixed} problems with correct visualizerType`);
