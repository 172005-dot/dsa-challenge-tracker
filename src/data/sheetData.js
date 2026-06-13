// src/data/sheetData.js

const TOPICS_BY_DAY = {
  1: { name: "Arrays Part-I", icon: "Grid" },
  2: { name: "Arrays Part-I", icon: "Grid" },
  3: { name: "Arrays Part-II", icon: "Grid" },
  4: { name: "Arrays Part-II", icon: "Grid" },
  5: { name: "Arrays Part-III", icon: "Grid" },
  6: { name: "Arrays Part-III", icon: "Grid" },
  7: { name: "Arrays Part-IV", icon: "Grid" },
  8: { name: "Arrays Part-IV", icon: "Grid" },
  9: { name: "Linked List Part-I", icon: "Link" },
  10: { name: "Linked List Part-I", icon: "Link" },
  11: { name: "Linked List Part-II", icon: "Link2" },
  12: { name: "Linked List Part-II", icon: "Link2" },
  13: { name: "Linked List and Arrays", icon: "Layers2" },
  14: { name: "Greedy Algorithm", icon: "Coins" },
  15: { name: "Greedy Algorithm", icon: "Coins" },
  16: { name: "Recursion", icon: "CornerDownRight" },
  17: { name: "Recursion and Backtracking", icon: "RotateCcw" },
  18: { name: "Backtracking", icon: "RotateCcw" },
  19: { name: "Binary Search", icon: "Search" },
  20: { name: "Binary Search", icon: "Search" },
  21: { name: "Heaps", icon: "Layers" },
  22: { name: "Heaps", icon: "Layers" },
  23: { name: "Stack and Queue", icon: "Database" },
  24: { name: "Stack and Queue Part-II", icon: "Server" },
  25: { name: "Stack and Queue Part-II", icon: "Server" },
  26: { name: "String", icon: "Type" },
  27: { name: "String", icon: "Type" },
  28: { name: "String Part-II", icon: "FileText" },
  29: { name: "Binary Tree", icon: "GitCommit" },
  30: { name: "Binary Tree", icon: "GitCommit" },
  31: { name: "Binary Tree Part-II", icon: "GitMerge" },
  32: { name: "Binary Tree Part-II", icon: "GitMerge" },
  33: { name: "Binary Tree Part-III", icon: "GitPullRequest" },
  34: { name: "Binary Search Tree", icon: "Network" },
  35: { name: "Binary Search Tree", icon: "Network" },
  36: { name: "BST Part-II", icon: "Shuffle" },
  37: { name: "BST Part-II", icon: "Shuffle" },
  38: { name: "Graph", icon: "Share2" },
  39: { name: "Graph", icon: "Share2" },
  40: { name: "Graph Part-II", icon: "Workflow" },
  41: { name: "Dynamic Programming", icon: "Grid" },
  42: { name: "Dynamic Programming", icon: "Grid" },
  43: { name: "DP Part-II", icon: "LayoutGrid" },
  44: { name: "Trie", icon: "Cpu" },
  45: { name: "Trie", icon: "Cpu" }
};

const RAW_PROBLEMS = [
  // Day 1: Arrays Part-I
  { day: 1, index: 1, name: "Set Matrix Zeroes", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/set-matrix-zeroes/", visualizerType: "grid" },
  { day: 1, index: 2, name: "Pascal's Triangle", difficulty: "Easy", category: "Arrays", leetcode: "https://leetcode.com/problems/pascals-triangle/", visualizerType: "pascal" },
  { day: 1, index: 3, name: "Next Permutation", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/next-permutation/", visualizerType: "next-permutation" },

  // Day 2: Arrays Part-I
  { day: 2, index: 1, name: "Maximum Subarray (Kadane's)", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/maximum-subarray/", visualizerType: "kadane" },
  { day: 2, index: 2, name: "Sort Colors (0s 1s 2s)", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/sort-colors/", visualizerType: "sort-colors" },
  { day: 2, index: 3, name: "Best Time to Buy and Sell Stock", difficulty: "Easy", category: "Arrays", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", visualizerType: "kadane" },

  // Day 3: Arrays Part-II
  { day: 3, index: 1, name: "Rotate Image", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/rotate-image/", visualizerType: "grid" },
  { day: 3, index: 2, name: "Merge Intervals", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/merge-intervals/", visualizerType: "two-sum" },
  { day: 3, index: 3, name: "Merge Sorted Array", difficulty: "Easy", category: "Arrays", leetcode: "https://leetcode.com/problems/merge-sorted-array/", visualizerType: "two-sum" },

  // Day 4: Arrays Part-II
  { day: 4, index: 1, name: "Find the Duplicate Number", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/find-the-duplicate-number/", visualizerType: "two-sum" },
  { day: 4, index: 2, name: "Repeat and Missing Number", difficulty: "Medium", category: "Arrays", leetcode: "https://practice.geeksforgeeks.org/problems/find-missing-and-repeating2556/1", visualizerType: "two-sum" },
  { day: 4, index: 3, name: "Inversion of Array", difficulty: "Hard", category: "Arrays", leetcode: "https://practice.geeksforgeeks.org/problems/inversion-of-array-1587115620/1", visualizerType: "merge-sort" },

  // Day 5: Arrays Part-III
  { day: 5, index: 1, name: "Search a 2D Matrix", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/search-a-2d-matrix/", visualizerType: "binary-search" },
  { day: 5, index: 2, name: "Pow(x, n)", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/powx-n/", visualizerType: "binary-search" },
  { day: 5, index: 3, name: "Majority Element", difficulty: "Easy", category: "Arrays", leetcode: "https://leetcode.com/problems/majority-element/", visualizerType: "two-sum" },

  // Day 6: Arrays Part-III
  { day: 6, index: 1, name: "Majority Element II", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/majority-element-ii/", visualizerType: "two-sum" },
  { day: 6, index: 2, name: "Unique Paths", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/unique-paths/", visualizerType: "dp" },
  { day: 6, index: 3, name: "Reverse Pairs", difficulty: "Hard", category: "Arrays", leetcode: "https://leetcode.com/problems/reverse-pairs/", visualizerType: "merge-sort" },

  // Day 7: Arrays Part-IV
  { day: 7, index: 1, name: "Two Sum", difficulty: "Easy", category: "Arrays", leetcode: "https://leetcode.com/problems/two-sum/", visualizerType: "two-sum" },
  { day: 7, index: 2, name: "4Sum", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/4sum/", visualizerType: "two-sum" },
  { day: 7, index: 3, name: "Longest Consecutive Sequence", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/", visualizerType: "two-sum" },

  // Day 8: Arrays Part-IV
  { day: 8, index: 1, name: "Largest Subarray with 0 Sum", difficulty: "Medium", category: "Arrays", leetcode: "https://practice.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1", visualizerType: "kadane" },
  { day: 8, index: 2, name: "Subarrays with XOR K", difficulty: "Medium", category: "Arrays", leetcode: "https://www.naukri.com/code360/problems/subarrays-with-xor-k_6826258", visualizerType: "kadane" },
  { day: 8, index: 3, name: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "Arrays", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", visualizerType: "two-sum" },

  // Day 9: Linked List Part-I
  { day: 9, index: 1, name: "Reverse Linked List", difficulty: "Easy", category: "Linked List", leetcode: "https://leetcode.com/problems/reverse-linked-list/", visualizerType: "linked-list" },
  { day: 9, index: 2, name: "Middle of the Linked List", difficulty: "Easy", category: "Linked List", leetcode: "https://leetcode.com/problems/middle-of-the-linked-list/", visualizerType: "linked-list" },
  { day: 9, index: 3, name: "Merge Two Sorted Lists", difficulty: "Easy", category: "Linked List", leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/", visualizerType: "merge-sort" },

  // Day 10: Linked List Part-I
  { day: 10, index: 1, name: "Remove Nth Node From End of List", difficulty: "Medium", category: "Linked List", leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", visualizerType: "linked-list" },
  { day: 10, index: 2, name: "Add Two Numbers", difficulty: "Medium", category: "Linked List", leetcode: "https://leetcode.com/problems/add-two-numbers/", visualizerType: "linked-list" },
  { day: 10, index: 3, name: "Delete Node in a Linked List", difficulty: "Easy", category: "Linked List", leetcode: "https://leetcode.com/problems/delete-node-in-a-linked-list/", visualizerType: "linked-list" },

  // Day 11: Linked List Part-II
  { day: 11, index: 1, name: "Intersection of Two Linked Lists", difficulty: "Easy", category: "Linked List", leetcode: "https://leetcode.com/problems/intersection-of-two-linked-lists/", visualizerType: "linked-list" },
  { day: 11, index: 2, name: "Linked List Cycle", difficulty: "Easy", category: "Linked List", leetcode: "https://leetcode.com/problems/linked-list-cycle/", visualizerType: "linked-list" },
  { day: 11, index: 3, name: "Linked List Cycle II", difficulty: "Medium", category: "Linked List", leetcode: "https://leetcode.com/problems/linked-list-cycle-ii/", visualizerType: "linked-list" },

  // Day 12: Linked List Part-II
  { day: 12, index: 1, name: "Palindrome Linked List", difficulty: "Easy", category: "Linked List", leetcode: "https://leetcode.com/problems/palindrome-linked-list/", visualizerType: "linked-list" },
  { day: 12, index: 2, name: "Reverse Nodes in k-Group", difficulty: "Hard", category: "Linked List", leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/", visualizerType: "linked-list" },
  { day: 12, index: 3, name: "Flattening a Linked List", difficulty: "Medium", category: "Linked List", leetcode: "https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1", visualizerType: "linked-list" },

  // Day 13: Linked List and Arrays
  { day: 13, index: 1, name: "Rotate List", difficulty: "Medium", category: "Linked List", leetcode: "https://leetcode.com/problems/rotate-list/", visualizerType: "linked-list" },
  { day: 13, index: 2, name: "Copy List with Random Pointer", difficulty: "Medium", category: "Linked List", leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/", visualizerType: "linked-list" },
  { day: 13, index: 3, name: "3Sum", difficulty: "Medium", category: "Linked List", leetcode: "https://leetcode.com/problems/3sum/", visualizerType: "two-sum" },

  // Day 14: Greedy Algorithm
  { day: 14, index: 1, name: "N meetings in one room", difficulty: "Easy", category: "Greedy", leetcode: "https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1", visualizerType: "stack-queue" },
  { day: 14, index: 2, name: "Minimum Platforms", difficulty: "Medium", category: "Greedy", leetcode: "https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1", visualizerType: "stack-queue" },
  { day: 14, index: 3, name: "Job Sequencing Problem", difficulty: "Medium", category: "Greedy", leetcode: "https://practice.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1", visualizerType: "stack-queue" },

  // Day 15: Greedy Algorithm
  { day: 15, index: 1, name: "Fractional Knapsack", difficulty: "Easy", category: "Greedy", leetcode: "https://practice.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1", visualizerType: "dp" },
  { day: 15, index: 2, name: "Find Minimum Number of Coins", difficulty: "Easy", category: "Greedy", leetcode: "https://practice.geeksforgeeks.org/problems/number-of-coins1824/1", visualizerType: "stack-queue" },
  { day: 15, index: 3, name: "Activity Selection", difficulty: "Easy", category: "Greedy", leetcode: "https://practice.geeksforgeeks.org/problems/activity-selection-1587115620/1", visualizerType: "stack-queue" },

  // Day 16: Recursion
  { day: 16, index: 1, name: "Subset Sums", difficulty: "Easy", category: "Recursion", leetcode: "https://practice.geeksforgeeks.org/problems/subset-sums2234/1", visualizerType: "dp" },
  { day: 16, index: 2, name: "Subsets II", difficulty: "Medium", category: "Recursion", leetcode: "https://leetcode.com/problems/subsets-ii/", visualizerType: "dp" },
  { day: 16, index: 3, name: "Combination Sum", difficulty: "Medium", category: "Recursion", leetcode: "https://leetcode.com/problems/combination-sum/", visualizerType: "dp" },

  // Day 17: Recursion and Backtracking
  { day: 17, index: 1, name: "Combination Sum II", difficulty: "Medium", category: "Recursion", leetcode: "https://leetcode.com/problems/combination-sum-ii/", visualizerType: "dp" },
  { day: 17, index: 2, name: "Palindrome Partitioning", difficulty: "Medium", category: "Recursion", leetcode: "https://leetcode.com/problems/palindrome-partitioning/", visualizerType: "dp" },
  { day: 17, index: 3, name: "Permutation Sequence", difficulty: "Hard", category: "Recursion", leetcode: "https://leetcode.com/problems/permutation-sequence/", visualizerType: "dp" },

  // Day 18: Backtracking
  { day: 18, index: 1, name: "N-Queens", difficulty: "Hard", category: "Backtracking", leetcode: "https://leetcode.com/problems/n-queens/", visualizerType: "dp" },
  { day: 18, index: 2, name: "Sudoku Solver", difficulty: "Hard", category: "Backtracking", leetcode: "https://leetcode.com/problems/sudoku-solver/", visualizerType: "dp" },
  { day: 18, index: 3, name: "M-Coloring Problem", difficulty: "Medium", category: "Backtracking", leetcode: "https://practice.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1", visualizerType: "dp" },

  // Day 19: Binary Search
  { day: 19, index: 1, name: "Search in Rotated Sorted Array", difficulty: "Medium", category: "Binary Search", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/", visualizerType: "binary-search" },
  { day: 19, index: 2, name: "Single Element in a Sorted Array", difficulty: "Medium", category: "Binary Search", leetcode: "https://leetcode.com/problems/single-element-in-a-sorted-array/", visualizerType: "binary-search" },
  { day: 19, index: 3, name: "Median of Two Sorted Arrays", difficulty: "Hard", category: "Binary Search", leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/", visualizerType: "binary-search" },

  // Day 20: Binary Search
  { day: 20, index: 1, name: "Allocate Books", difficulty: "Hard", category: "Binary Search", leetcode: "https://www.naukri.com/code360/problems/allocate-books_1090540", visualizerType: "binary-search" },
  { day: 20, index: 2, name: "Aggressive Cows", difficulty: "Medium", category: "Binary Search", leetcode: "https://practice.geeksforgeeks.org/problems/aggressive-cows/1", visualizerType: "binary-search" },
  { day: 20, index: 3, name: "K-th Element of Two Sorted Arrays", difficulty: "Medium", category: "Binary Search", leetcode: "https://practice.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1", visualizerType: "binary-search" },

  // Day 21: Heaps
  { day: 21, index: 1, name: "K Max Sum Combinations", difficulty: "Medium", category: "Heaps", leetcode: "https://www.interviewbit.com/problems/max-sum-combinations/", visualizerType: "stack-queue" },
  { day: 21, index: 2, name: "K-th Largest Element in an Array", difficulty: "Medium", category: "Heaps", leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/", visualizerType: "stack-queue" },
  { day: 21, index: 3, name: "Merge K Sorted Arrays", difficulty: "Medium", category: "Heaps", leetcode: "https://practice.geeksforgeeks.org/problems/merge-k-sorted-arrays/1", visualizerType: "stack-queue" },

  // Day 22: Heaps
  { day: 22, index: 1, name: "Find Median from Data Stream", difficulty: "Hard", category: "Heaps", leetcode: "https://leetcode.com/problems/find-median-from-data-stream/", visualizerType: "stack-queue" },
  { day: 22, index: 2, name: "K Most Frequent Elements", difficulty: "Medium", category: "Heaps", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/", visualizerType: "stack-queue" },
  { day: 22, index: 3, name: "Task Scheduler", difficulty: "Medium", category: "Heaps", leetcode: "https://leetcode.com/problems/task-scheduler/", visualizerType: "stack-queue" },

  // Day 23: Stack and Queue
  { day: 23, index: 1, name: "Implement Stack using Queues", difficulty: "Easy", category: "Stack & Queue", leetcode: "https://leetcode.com/problems/implement-stack-using-queues/", visualizerType: "stack-queue" },
  { day: 23, index: 2, name: "Implement Queue using Stacks", difficulty: "Easy", category: "Stack & Queue", leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/", visualizerType: "stack-queue" },
  { day: 23, index: 3, name: "Valid Parentheses", difficulty: "Easy", category: "Stack & Queue", leetcode: "https://leetcode.com/problems/valid-parentheses/", visualizerType: "stack-queue" },

  // Day 24: Stack and Queue Part-II
  { day: 24, index: 1, name: "Next Greater Element I", difficulty: "Medium", category: "Stack & Queue", leetcode: "https://leetcode.com/problems/next-greater-element-i/", visualizerType: "stack-queue" },
  { day: 24, index: 2, name: "LRU Cache", difficulty: "Hard", category: "Stack & Queue", leetcode: "https://leetcode.com/problems/lru-cache/", visualizerType: "stack-queue" },
  { day: 24, index: 3, name: "LFU Cache", difficulty: "Hard", category: "Stack & Queue", leetcode: "https://leetcode.com/problems/lfu-cache/", visualizerType: "stack-queue" },

  // Day 25: Stack and Queue Part-II
  { day: 25, index: 1, name: "Largest Rectangle in Histogram", difficulty: "Hard", category: "Stack & Queue", leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/", visualizerType: "stack-queue" },
  { day: 25, index: 2, name: "Sliding Window Maximum", difficulty: "Hard", category: "Stack & Queue", leetcode: "https://leetcode.com/problems/sliding-window-maximum/", visualizerType: "stack-queue" },
  { day: 25, index: 3, name: "Min Stack", difficulty: "Easy", category: "Stack & Queue", leetcode: "https://leetcode.com/problems/min-stack/", visualizerType: "stack-queue" },

  // Day 26: String
  { day: 26, index: 1, name: "Reverse Words in a String", difficulty: "Medium", category: "Strings", leetcode: "https://leetcode.com/problems/reverse-words-in-a-string/", visualizerType: "two-sum" },
  { day: 26, index: 2, name: "Longest Palindromic Substring", difficulty: "Medium", category: "Strings", leetcode: "https://leetcode.com/problems/longest-palindromic-substring/", visualizerType: "two-sum" },
  { day: 26, index: 3, name: "Roman to Integer", difficulty: "Easy", category: "Strings", leetcode: "https://leetcode.com/problems/roman-to-integer/", visualizerType: "two-sum" },

  // Day 27: String
  { day: 27, index: 1, name: "Integer to Roman", difficulty: "Medium", category: "Strings", leetcode: "https://leetcode.com/problems/integer-to-roman/", visualizerType: "two-sum" },
  { day: 27, index: 2, name: "Implement strStr() / KMP", difficulty: "Medium", category: "Strings", leetcode: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", visualizerType: "kadane" },
  { day: 27, index: 3, name: "String to Integer (atoi)", difficulty: "Medium", category: "Strings", leetcode: "https://leetcode.com/problems/string-to-integer-atoi/", visualizerType: "kadane" },

  // Day 28: String Part-II
  { day: 28, index: 1, name: "Longest Common Prefix", difficulty: "Easy", category: "Strings", leetcode: "https://leetcode.com/problems/longest-common-prefix/", visualizerType: "two-sum" },
  { day: 28, index: 2, name: "Valid Anagram", difficulty: "Easy", category: "Strings", leetcode: "https://leetcode.com/problems/valid-anagram/", visualizerType: "two-sum" },
  { day: 28, index: 3, name: "Count and Say", difficulty: "Medium", category: "Strings", leetcode: "https://leetcode.com/problems/count-and-say/", visualizerType: "two-sum" },

  // Day 29: Binary Tree
  { day: 29, index: 1, name: "Binary Tree Inorder Traversal", difficulty: "Easy", category: "Binary Trees", leetcode: "https://leetcode.com/problems/binary-tree-inorder-traversal/", visualizerType: "binary-tree" },
  { day: 29, index: 2, name: "Binary Tree Preorder Traversal", difficulty: "Easy", category: "Binary Trees", leetcode: "https://leetcode.com/problems/binary-tree-preorder-traversal/", visualizerType: "binary-tree" },
  { day: 29, index: 3, name: "Binary Tree Postorder Traversal", difficulty: "Easy", category: "Binary Trees", leetcode: "https://leetcode.com/problems/binary-tree-postorder-traversal/", visualizerType: "binary-tree" },

  // Day 30: Binary Tree
  { day: 30, index: 1, name: "Left View of Binary Tree", difficulty: "Easy", category: "Binary Trees", leetcode: "https://practice.geeksforgeeks.org/problems/left-view-of-binary-tree/1", visualizerType: "binary-tree" },
  { day: 30, index: 2, name: "Bottom View of Binary Tree", difficulty: "Medium", category: "Binary Trees", leetcode: "https://practice.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1", visualizerType: "binary-tree" },
  { day: 30, index: 3, name: "Top View of Binary Tree", difficulty: "Medium", category: "Binary Trees", leetcode: "https://practice.geeksforgeeks.org/problems/top-view-of-binary-tree/1", visualizerType: "binary-tree" },

  // Day 31: Binary Tree Part-II
  { day: 31, index: 1, name: "Binary Tree Level Order Traversal", difficulty: "Medium", category: "Binary Trees", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/", visualizerType: "binary-tree" },
  { day: 31, index: 2, name: "Height of a Binary Tree", difficulty: "Easy", category: "Binary Trees", leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", visualizerType: "binary-tree" },
  { day: 31, index: 3, name: "Diameter of Binary Tree", difficulty: "Easy", category: "Binary Trees", leetcode: "https://leetcode.com/problems/diameter-of-binary-tree/", visualizerType: "binary-tree" },

  // Day 32: Binary Tree Part-II
  { day: 32, index: 1, name: "Balanced Binary Tree", difficulty: "Easy", category: "Binary Trees", leetcode: "https://leetcode.com/problems/balanced-binary-tree/", visualizerType: "binary-tree" },
  { day: 32, index: 2, name: "LCA of Binary Tree", difficulty: "Medium", category: "Binary Trees", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", visualizerType: "binary-tree" },
  { day: 32, index: 3, name: "Same Tree", difficulty: "Easy", category: "Binary Trees", leetcode: "https://leetcode.com/problems/same-tree/", visualizerType: "binary-tree" },

  // Day 33: Binary Tree Part-III
  { day: 33, index: 1, name: "Binary Tree Maximum Path Sum", difficulty: "Hard", category: "Binary Trees", leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", visualizerType: "binary-tree" },
  { day: 33, index: 2, name: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", category: "Binary Trees", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", visualizerType: "binary-tree" },
  { day: 33, index: 3, name: "Symmetric Tree", difficulty: "Easy", category: "Binary Trees", leetcode: "https://leetcode.com/problems/symmetric-tree/", visualizerType: "binary-tree" },

  // Day 34: Binary Search Tree
  { day: 34, index: 1, name: "Populate Next Right Pointers", difficulty: "Medium", category: "BST", leetcode: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/", visualizerType: "binary-tree" },
  { day: 34, index: 2, name: "Search in a Binary Search Tree", difficulty: "Easy", category: "BST", leetcode: "https://leetcode.com/problems/search-in-a-binary-search-tree/", visualizerType: "binary-tree" },
  { day: 34, index: 3, name: "Convert Sorted Array to BST", difficulty: "Easy", category: "BST", leetcode: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", visualizerType: "binary-tree" },

  // Day 35: Binary Search Tree
  { day: 35, index: 1, name: "Construct BST from Preorder", difficulty: "Medium", category: "BST", leetcode: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/", visualizerType: "binary-tree" },
  { day: 35, index: 2, name: "Validate Binary Search Tree", difficulty: "Medium", category: "BST", leetcode: "https://leetcode.com/problems/validate-binary-search-tree/", visualizerType: "binary-tree" },
  { day: 35, index: 3, name: "LCA of a Binary Search Tree", difficulty: "Easy", category: "BST", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", visualizerType: "binary-tree" },

  // Day 36: BST Part-II
  { day: 36, index: 1, name: "Predecessor and Successor", difficulty: "Medium", category: "BST", leetcode: "https://practice.geeksforgeeks.org/problems/predecessor-and-successor/1", visualizerType: "binary-tree" },
  { day: 36, index: 2, name: "Floor in BST", difficulty: "Medium", category: "BST", leetcode: "https://www.naukri.com/code360/problems/floor-from-bst_920457", visualizerType: "binary-tree" },
  { day: 36, index: 3, name: "Ceil in BST", difficulty: "Medium", category: "BST", leetcode: "https://www.naukri.com/code360/problems/ceil-from-bst_920464", visualizerType: "binary-tree" },

  // Day 37: BST Part-II
  { day: 37, index: 1, name: "Kth Smallest Element in BST", difficulty: "Medium", category: "BST", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", visualizerType: "binary-tree" },
  { day: 37, index: 2, name: "Kth Largest Element in BST", difficulty: "Medium", category: "BST", leetcode: "https://practice.geeksforgeeks.org/problems/kth-largest-element-in-bst/1", visualizerType: "binary-tree" },
  { day: 37, index: 3, name: "Two Sum IV - Input is a BST", difficulty: "Easy", category: "BST", leetcode: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", visualizerType: "two-sum" },

  // Day 38: Graph
  { day: 38, index: 1, name: "DFS Traversal", difficulty: "Easy", category: "Graphs", leetcode: "https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1", visualizerType: "graph" },
  { day: 38, index: 2, name: "BFS Traversal", difficulty: "Easy", category: "Graphs", leetcode: "https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/1", visualizerType: "graph" },
  { day: 38, index: 3, name: "Cycle Detection Undirected Graph", difficulty: "Medium", category: "Graphs", leetcode: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1", visualizerType: "graph" },

  // Day 39: Graph
  { day: 39, index: 1, name: "Topological Sort Kahn's Algo", difficulty: "Medium", category: "Graphs", leetcode: "https://practice.geeksforgeeks.org/problems/topological-sort/1", visualizerType: "graph" },
  { day: 39, index: 2, name: "Number of Islands", difficulty: "Medium", category: "Graphs", leetcode: "https://leetcode.com/problems/number-of-islands/", visualizerType: "graph" },
  { day: 39, index: 3, name: "Bipartite Graph BFS/DFS", difficulty: "Medium", category: "Graphs", leetcode: "https://leetcode.com/problems/is-graph-bipartite/", visualizerType: "graph" },

  // Day 40: Graph Part-II
  { day: 40, index: 1, name: "Dijkstra's Algorithm", difficulty: "Medium", category: "Graphs", leetcode: "https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1", visualizerType: "graph" },
  { day: 40, index: 2, name: "Bellman Ford Algorithm", difficulty: "Medium", category: "Graphs", leetcode: "https://practice.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford/1", visualizerType: "graph" },
  { day: 40, index: 3, name: "Floyd Warshall Algorithm", difficulty: "Medium", category: "Graphs", leetcode: "https://practice.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1", visualizerType: "graph" },

  // Day 41: Dynamic Programming
  { day: 41, index: 1, name: "Max Product Subarray", difficulty: "Medium", category: "DP", leetcode: "https://leetcode.com/problems/maximum-product-subarray/", visualizerType: "dp" },
  { day: 41, index: 2, name: "Longest Increasing Subsequence", difficulty: "Medium", category: "DP", leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/", visualizerType: "dp" },
  { day: 41, index: 3, name: "Longest Common Subsequence", difficulty: "Medium", category: "DP", leetcode: "https://leetcode.com/problems/longest-common-subsequence/", visualizerType: "dp" },

  // Day 42: Dynamic Programming
  { day: 42, index: 1, name: "0-1 Knapsack", difficulty: "Medium", category: "DP", leetcode: "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", visualizerType: "dp" },
  { day: 42, index: 2, name: "Edit Distance", difficulty: "Hard", category: "DP", leetcode: "https://leetcode.com/problems/edit-distance/", visualizerType: "dp" },
  { day: 42, index: 3, name: "Partition Equal Subset Sum", difficulty: "Medium", category: "DP", leetcode: "https://leetcode.com/problems/partition-equal-subset-sum/", visualizerType: "dp" },

  // Day 43: DP Part-II
  { day: 43, index: 1, name: "Matrix Chain Multiplication", difficulty: "Hard", category: "DP", leetcode: "https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1", visualizerType: "dp" },
  { day: 43, index: 2, name: "Maximum Path Sum in Matrix", difficulty: "Medium", category: "DP", leetcode: "https://practice.geeksforgeeks.org/problems/path-in-matrix3805/1", visualizerType: "dp" },
  { day: 43, index: 3, name: "Rod Cutting", difficulty: "Medium", category: "DP", leetcode: "https://practice.geeksforgeeks.org/problems/rod-cutting0840/1", visualizerType: "dp" },

  // Day 44: Trie
  { day: 44, index: 1, name: "Implement Trie (Prefix Tree)", difficulty: "Medium", category: "Trie", leetcode: "https://leetcode.com/problems/implement-trie-prefix-tree/", visualizerType: "trie" },
  { day: 44, index: 2, name: "Implement Trie II", difficulty: "Medium", category: "Trie", leetcode: "https://practice.geeksforgeeks.org/problems/implement-trie-ii/1", visualizerType: "trie" },
  { day: 44, index: 3, name: "Longest String with All Prefixes", difficulty: "Medium", category: "Trie", leetcode: "https://www.naukri.com/code360/problems/complete-string_2687860", visualizerType: "trie" },

  // Day 45: Trie
  { day: 45, index: 1, name: "Maximum XOR of Two Numbers", difficulty: "Medium", category: "Trie", leetcode: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", visualizerType: "trie" },
  { day: 45, index: 2, name: "Maximum XOR With an Element", difficulty: "Hard", category: "Trie", leetcode: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", visualizerType: "trie" },
  { day: 45, index: 3, name: "Number of Distinct Substrings", difficulty: "Medium", category: "Trie", leetcode: "https://practice.geeksforgeeks.org/problems/number-of-distinct-substrings-in-a-string/1", visualizerType: "trie" }
];

// Lookup table for exact complexities and pattern tags for all 135 problems
const COMPLEXITY_LOOKUP = {
  // Arrays Part-I & II
  "Set Matrix Zeroes": { brute: ["O(M*N*(M+N))", "O(1)"], better: ["O(M*N)", "O(M+N)"], optimal: ["O(M*N)", "O(1)"], pattern: "Matrix Marker Variables" },
  "Pascal's Triangle": { brute: ["O(N^3)", "O(N^2)"], better: ["O(N^2)", "O(N^2)"], optimal: ["O(N^2)", "O(N^2)"], pattern: "Binomial Coefficients" },
  "Next Permutation": { brute: ["O(N!)", "O(N)"], better: ["O(N^2)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Lexicographical Permutation Search" },
  "Maximum Subarray (Kadane's)": { brute: ["O(N^3)", "O(1)"], better: ["O(N^2)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Kadane's Algorithm" },
  "Sort Colors (0s 1s 2s)": { brute: ["O(N log N)", "O(1)"], better: ["O(N)", "O(1) (2-pass counting)"], optimal: ["O(N)", "O(1)"], pattern: "Dutch National Flag Algorithm" },
  "Best Time to Buy and Sell Stock": { brute: ["O(N^2)", "O(1)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(1)"], pattern: "Prefix Minimum State" },
  "Rotate Image": { brute: ["O(N^2)", "O(N^2)"], better: ["O(N^2)", "O(1) (Transpose + Reverse)"], optimal: ["O(N^2)", "O(1)"], pattern: "Transpose and Flip Operations" },
  "Merge Intervals": { brute: ["O(N^2)", "O(N)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N log N)", "O(N)"], pattern: "Interval Sorting & Merging" },
  "Merge Sorted Array": { brute: ["O((M+N) log(M+N))", "O(1)"], better: ["O(M*N)", "O(1)"], optimal: ["O(M+N)", "O(1)"], pattern: "Three-Pointer Backwards Filling" },
  "Find the Duplicate Number": { brute: ["O(N log N)", "O(1)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(1)"], pattern: "Floyd's Cycle Detection" },
  "Repeat and Missing Number": { brute: ["O(N log N)", "O(1)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(1)"], pattern: "Mathematical Sum Differences" },
  "Inversion of Array": { brute: ["O(N^2)", "O(1)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N log N)", "O(N)"], pattern: "Merge Sort Counting Divide & Conquer" },

  // Arrays Part-III & IV
  "Search a 2D Matrix": { brute: ["O(M*N)", "O(1)"], better: ["O(M + log N)", "O(1)"], optimal: ["O(log(M*N))", "O(1)"], pattern: "Binary Search Row-Col Virtual Array" },
  "Pow(x, n)": { brute: ["O(N)", "O(1)"], better: ["O(log N)", "O(log N) (recursive)"], optimal: ["O(log N)", "O(1)"], pattern: "Binary Exponentiation" },
  "Majority Element": { brute: ["O(N^2)", "O(1)"], better: ["O(N log N)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Boyer-Moore Voting Algorithm" },
  "Majority Element II": { brute: ["O(N^2)", "O(1)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(1)"], pattern: "Extended Boyer-Moore Voting" },
  "Unique Paths": { brute: ["O(2^(M+N))", "O(M+N)"], better: ["O(M*N)", "O(M*N)"], optimal: ["O(Min(M, N))", "O(1)"], pattern: "Combinatorics / DP" },
  "Reverse Pairs": { brute: ["O(N^2)", "O(1)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N log N)", "O(N)"], pattern: "Merge Sort Count Subarrays" },
  "Two Sum": { brute: ["O(N^2)", "O(1)"], better: ["O(N log N)", "O(1)"], optimal: ["O(N)", "O(N)"], pattern: "Hashing Difference Target Lookup" },
  "4Sum": { brute: ["O(N^4)", "O(1)"], better: ["O(N^3 log N)", "O(N)"], optimal: ["O(N^3)", "O(1)"], pattern: "Sorting and Multi-pointer Scan" },
  "Longest Consecutive Sequence": { brute: ["O(N^3)", "O(1)"], better: ["O(N log N)", "O(1)"], optimal: ["O(N)", "O(N)"], pattern: "Hash Set Start-Point Sequence Build" },
  "Largest Subarray with 0 Sum": { brute: ["O(N^2)", "O(1)"], better: ["O(N log N)", "O(1)"], optimal: ["O(N)", "O(N)"], pattern: "Prefix Sum Match Hashing" },
  "Subarrays with XOR K": { brute: ["O(N^2)", "O(1)"], better: ["O(N log N)", "O(1)"], optimal: ["O(N)", "O(N)"], pattern: "Prefix XOR Hashing Map" },
  "Longest Substring Without Repeating Characters": { brute: ["O(N^2)", "O(1)"], better: ["O(N)", "O(256)"], optimal: ["O(N)", "O(256)"], pattern: "Sliding Window Right-Left Index Map" },

  // Linked List
  "Reverse Linked List": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N) (recursive)"], optimal: ["O(N)", "O(1)"], pattern: "Three-Pointer Node Links Swap" },
  "Middle of the Linked List": { brute: ["O(N)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Tortoise and Hare Pointers" },
  "Merge Two Sorted Lists": { brute: ["O(M+N)", "O(M+N)"], better: ["O(M+N)", "O(M+N)"], optimal: ["O(M+N)", "O(1)"], pattern: "Dummy Head Node Merging" },
  "Remove Nth Node From End of List": { brute: ["O(N)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Fast Pointer Offset Window" },
  "Add Two Numbers": { brute: ["O(Max(M,N))", "O(Max(M,N))"], better: ["O(Max(M,N))", "O(Max(M,N))"], optimal: ["O(Max(M,N))", "O(1)"], pattern: "Carry Flag Node Addition" },
  "Delete Node in a Linked List": { brute: ["O(N)", "O(1)"], better: ["O(1)", "O(1)"], optimal: ["O(1)", "O(1)"], pattern: "Next Value Copy & Delete" },
  "Intersection of Two Linked Lists": { brute: ["O(M*N)", "O(1)"], better: ["O(M+N)", "O(N)"], optimal: ["O(M+N)", "O(1)"], pattern: "Difference length offset traversal" },
  "Linked List Cycle": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(1)"], pattern: "Floyd Cycle Meeting Check" },
  "Linked List Cycle II": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(1)"], pattern: "Floyd Cycle Meeting & Head Traverse" },
  "Palindrome Linked List": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(1)"], pattern: "Split, Reverse, Compare half-list" },
  "Reverse Nodes in k-Group": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N/K)"], optimal: ["O(N)", "O(1)"], pattern: "Iterative K-length block reverse" },
  "Flattening a Linked List": { brute: ["O(N log N)", "O(N)"], better: ["O(N*M)", "O(N*M)"], optimal: ["O(N*M)", "O(1)"], pattern: "Recursion Merge Sort Lists" },
  "Rotate List": { brute: ["O(N^2)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Tail link, offset cut" },
  "Copy List with Random Pointer": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(1)"], pattern: "Interleaved duplicate node clone" },
  "3Sum": { brute: ["O(N^3)", "O(N)"], better: ["O(N^2 log N)", "O(N)"], optimal: ["O(N^2)", "O(1)"], pattern: "Three pointer sort and search" },

  // Greedy
  "N meetings in one room": { brute: ["O(N log N)", "O(N)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N log N)", "O(N)"], pattern: "Greedy Activity sorting by End Time" },
  "Minimum Platforms": { brute: ["O(N^2)", "O(1)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N log N)", "O(1)"], pattern: "Double array sort merge" },
  "Job Sequencing Problem": { brute: ["O(N^2)", "O(N)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N log N)", "O(N)"], pattern: "Greedy max deadline slot reservation" },
  "Fractional Knapsack": { brute: ["O(N log N)", "O(N)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N log N)", "O(1)"], pattern: "Value-per-Weight Ratio sorting" },
  "Find Minimum Number of Coins": { brute: ["O(Amount)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Standard greedy change coin pick" },
  "Activity Selection": { brute: ["O(N log N)", "O(N)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N log N)", "O(N)"], pattern: "End-Time greedy interval scheduling" },

  // Recursion & Backtracking
  "Subset Sums": { brute: ["O(2^N)", "O(2^N)"], better: ["O(2^N)", "O(N)"], optimal: ["O(2^N)", "O(N)"], pattern: "Recursive pick/exclude traversal" },
  "Subsets II": { brute: ["O(2^N * N log N)", "O(2^N)"], better: ["O(2^N * N)", "O(2^N)"], optimal: ["O(2^N * N)", "O(N)"], pattern: "Sorting duplicates exclusion backtracking" },
  "Combination Sum": { brute: ["O(2^T * K)", "O(K)"], better: ["O(2^T * K)", "O(K)"], optimal: ["O(2^T * K)", "O(T)"], pattern: "Infinite reuse backtracker state" },
  "Combination Sum II": { brute: ["O(2^N)", "O(N)"], better: ["O(2^N)", "O(N)"], optimal: ["O(2^N)", "O(N)"], pattern: "Sort and single index pick backtracker" },
  "Palindrome Partitioning": { brute: ["O(2^N * N)", "O(N)"], better: ["O(2^N)", "O(N)"], optimal: ["O(2^N * N)", "O(N)"], pattern: "Partition checking substring backtracker" },
  "Permutation Sequence": { brute: ["O(N! * N)", "O(N)"], better: ["O(N! * N)", "O(N)"], optimal: ["O(N^2)", "O(N)"], pattern: "Mathematical block math selection" },
  "N-Queens": { brute: ["O(N!)", "O(N^2)"], better: ["O(N!)", "O(N^2)"], optimal: ["O(N!)", "O(N)"], pattern: "Rows, diagonals block state array" },
  "Sudoku Solver": { brute: ["O(9^(N*N))", "O(N^2)"], better: ["O(9^81)", "O(81)"], optimal: ["O(9^81)", "O(81)"], pattern: "Subgrid check backtracker scan" },
  "M-Coloring Problem": { brute: ["O(M^V)", "O(V)"], better: ["O(M^V)", "O(V)"], optimal: ["O(M^V)", "O(V)"], pattern: "Adjacency vertex color backtracker" },

  // Binary Search
  "Search in Rotated Sorted Array": { brute: ["O(N)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(log N)", "O(1)"], pattern: "Binary Search Sorted Half Detection" },
  "Single Element in a Sorted Array": { brute: ["O(N)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(log N)", "O(1)"], pattern: "Even-Odd index pair binary check" },
  "Median of Two Sorted Arrays": { brute: ["O(M+N)", "O(M+N)"], better: ["O(M+N)", "O(1)"], optimal: ["O(log(Min(M,N)))", "O(1)"], pattern: "Virtual cut partition binary check" },
  "Allocate Books": { brute: ["O(Sum(pages) - Max(pages) * N)", "O(1)"], better: ["O(Range * N)", "O(1)"], optimal: ["O(N * log(Sum - Max))", "O(1)"], pattern: "Binary Search on Answer Range" },
  "Aggressive Cows": { brute: ["O(Range * N)", "O(1)"], better: ["O(N log N + Range)", "O(1)"], optimal: ["O(N log N + N log(Range))", "O(1)"], pattern: "Binary Search on Answer Minimum Gap" },
  "K-th Element of Two Sorted Arrays": { brute: ["O(M+N)", "O(1)"], better: ["O(K)", "O(1)"], optimal: ["O(log(Min(M,N)))", "O(1)"], pattern: "Virtual cut partition check size K" },

  // Heaps
  "K Max Sum Combinations": { brute: ["O(N^2 log(N^2))", "O(N^2)"], better: ["O(N^2 log K)", "O(K)"], optimal: ["O(N log N + K log K)", "O(K)"], pattern: "Sorting + Priority Queue Grid search" },
  "K-th Largest Element in an Array": { brute: ["O(N log N)", "O(1)"], better: ["O(N log K)", "O(K)"], optimal: ["O(N)", "O(1) (QuickSelect)"], pattern: "Min-Heap size K tracking" },
  "Merge K Sorted Arrays": { brute: ["O(N * K log(N*K))", "O(N*K)"], better: ["O(N * K log K)", "O(N*K)"], optimal: ["O(N * K log K)", "O(K)"], pattern: "Min-Heap K elements heads tracking" },
  "Find Median from Data Stream": { brute: ["O(N^2)", "O(N)"], better: ["O(N log N)", "O(N)"], optimal: ["O(log N)", "O(N)"], pattern: "Two Heaps (Max-Heap, Min-Heap) Balance" },
  "K Most Frequent Elements": { brute: ["O(N log N)", "O(N)"], better: ["O(N log K)", "O(N)"], optimal: ["O(N)", "O(N) (Bucket Sort)"], pattern: "Frequency mapping min-heap tracker" },
  "Task Scheduler": { brute: ["O(N log N)", "O(N)"], better: ["O(N)", "O(26)"], optimal: ["O(N)", "O(1)"], pattern: "Frequency Greedy block gap logic" },

  // Stack & Queue
  "Implement Stack using Queues": { brute: ["O(N)", "O(N)"], better: ["O(1) pop, O(N) push", "O(N)"], optimal: ["O(1) pop, O(N) push", "O(N)"], pattern: "Single Queue rotation push" },
  "Implement Queue using Stacks": { brute: ["O(N)", "O(N)"], better: ["O(N) push, O(1) pop", "O(N)"], optimal: ["O(1) amortized", "O(N)"], pattern: "Input/Output Stack data swap" },
  "Valid Parentheses": { brute: ["O(N^2)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(N)"], pattern: "LIFO Stack Bracket Pairing Match" },
  "Next Greater Element I": { brute: ["O(N^2)", "O(1)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(N)"], pattern: "Monotonic Decreasing Stack" },
  "LRU Cache": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(1)", "O(Capacity)"], pattern: "HashMap + Doubly Linked List" },
  "LFU Cache": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(1)", "O(Capacity)"], pattern: "HashMap + Doubly LinkedList of Lists" },
  "Largest Rectangle in Histogram": { brute: ["O(N^2)", "O(1)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(N)"], pattern: "Monotonic Stack Left-Right bounds" },
  "Sliding Window Maximum": { brute: ["O(N*K)", "O(1)"], better: ["O(N log K)", "O(K)"], optimal: ["O(N)", "O(K)"], pattern: "Double Ended Queue (Deque) Monotonic" },
  "Min Stack": { brute: ["O(N) getMin", "O(N)"], better: ["O(1) getMin", "O(N)"], optimal: ["O(1)", "O(N)"], pattern: "Stack with relative value updates" },

  // Strings
  "Reverse Words in a String": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(1)"], pattern: "Split scan, reverse in-place" },
  "Longest Palindromic Substring": { brute: ["O(N^3)", "O(1)"], better: ["O(N^2)", "O(1)"], optimal: ["O(N^2)", "O(1)"], pattern: "Expand around center pointer" },
  "Roman to Integer": { brute: ["O(N)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Character mapping right-to-left math" },
  "Integer to Roman": { brute: ["O(N)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Value map greedy divider" },
  "Implement strStr() / KMP": { brute: ["O(N*M)", "O(1)"], better: ["O(N+M)", "O(M)"], optimal: ["O(N+M)", "O(M)"], pattern: "Knuth-Morris-Pratt Prefix Match Table" },
  "String to Integer (atoi)": { brute: ["O(N)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Index check boundary math overflow" },
  "Longest Common Prefix": { brute: ["O(N*M)", "O(1)"], better: ["O(N*M)", "O(1)"], optimal: ["O(N*M)", "O(1)"], pattern: "Horizontal character comparison" },
  "Valid Anagram": { brute: ["O(N log N)", "O(1)"], better: ["O(N)", "O(256)"], optimal: ["O(N)", "O(256)"], pattern: "Character count array verification" },
  "Count and Say": { brute: ["O(2^N)", "O(2^N)"], better: ["O(2^N)", "O(2^N)"], optimal: ["O(2^N)", "O(2^N)"], pattern: "Recursive read group count build" },

  // Binary Trees
  "Binary Tree Inorder Traversal": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(H) (Iterative)"], optimal: ["O(N)", "O(1) (Morris)"], pattern: "DFS Traversal Left-Root-Right" },
  "Binary Tree Preorder Traversal": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(1) (Morris)"], pattern: "DFS Traversal Root-Left-Right" },
  "Binary Tree Postorder Traversal": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(1) (Morris)"], pattern: "DFS Traversal Left-Right-Root" },
  "Left View of Binary Tree": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(H)"], pattern: "Recursion Level check DFS" },
  "Bottom View of Binary Tree": { brute: ["O(N)", "O(N)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N)", "O(N)"], pattern: "Vertical line offset queue lookup" },
  "Top View of Binary Tree": { brute: ["O(N)", "O(N)"], better: ["O(N log N)", "O(N)"], optimal: ["O(N)", "O(N)"], pattern: "Vertical line offset check level" },
  "Binary Tree Level Order Traversal": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(W) (BFS)"], optimal: ["O(N)", "O(W)"], pattern: "BFS Queue Level loop" },
  "Height of a Binary Tree": { brute: ["O(N)", "O(H)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(H)"], pattern: "DFS Tree node depth recursion" },
  "Diameter of Binary Tree": { brute: ["O(N^2)", "O(H)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(H)"], pattern: "DFS Max depth left + right update" },
  "Balanced Binary Tree": { brute: ["O(N^2)", "O(H)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(H)"], pattern: "DFS Height check leaf validation" },
  "LCA of Binary Tree": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(H)"], pattern: "DFS Node target match branch logic" },
  "Same Tree": { brute: ["O(N)", "O(H)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(H)"], pattern: "Double node recursion comparison" },
  "Binary Tree Maximum Path Sum": { brute: ["O(N)", "O(H)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(H)"], pattern: "DFS Branch sum update max" },
  "Construct Binary Tree from Preorder and Inorder Traversal": { brute: ["O(N^2)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(N)"], pattern: "Inorder index map recursion pointers" },
  "Symmetric Tree": { brute: ["O(N)", "O(H)"], better: ["O(N)", "O(H)"], optimal: ["O(N)", "O(H)"], pattern: "Double branch inverted check" },

  // BST
  "Populate Next Right Pointers": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(W)"], optimal: ["O(N)", "O(1)"], pattern: "BFS traversal pointer update" },
  "Search in a Binary Search Tree": { brute: ["O(N)", "O(H)"], better: ["O(H)", "O(H)"], optimal: ["O(H)", "O(1)"], pattern: "BST node value comparison split" },
  "Convert Sorted Array to BST": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(log N)"], optimal: ["O(N)", "O(log N)"], pattern: "Midpoint array selection recursive build" },
  "Construct BST from Preorder": { brute: ["O(N log N)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(H)"], pattern: "Range constraint split build BST" },
  "Validate Binary Search Tree": { brute: ["O(N^2)", "O(H)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(H)"], pattern: "Node upper and lower range constraint DFS" },
  "LCA of a Binary Search Tree": { brute: ["O(N)", "O(H)"], better: ["O(H)", "O(H)"], optimal: ["O(H)", "O(1)"], pattern: "BST values range bifurcation" },
  "Predecessor and Successor": { brute: ["O(N)", "O(N)"], better: ["O(H)", "O(H)"], optimal: ["O(H)", "O(1)"], pattern: "BST traversal lookup pointers" },
  "Floor in BST": { brute: ["O(N)", "O(H)"], better: ["O(H)", "O(H)"], optimal: ["O(H)", "O(1)"], pattern: "BST node value compare record floor" },
  "Ceil in BST": { brute: ["O(N)", "O(H)"], better: ["O(H)", "O(H)"], optimal: ["O(H)", "O(1)"], pattern: "BST node value compare record ceil" },
  "Kth Smallest Element in BST": { brute: ["O(N)", "O(N)"], better: ["O(H + K)", "O(H)"], optimal: ["O(H + K)", "O(H)"], pattern: "Inorder traversal index count K" },
  "Kth Largest Element in BST": { brute: ["O(N)", "O(N)"], better: ["O(H + K)", "O(H)"], optimal: ["O(H + K)", "O(H)"], pattern: "Inverted Inorder traversal count K" },
  "Two Sum IV - Input is a BST": { brute: ["O(N)", "O(N)"], better: ["O(N)", "O(N)"], optimal: ["O(N)", "O(H)"], pattern: "Double BST Iterator pointers" },

  // Graphs
  "DFS Traversal": { brute: ["O(V+E)", "O(V)"], better: ["O(V+E)", "O(V)"], optimal: ["O(V+E)", "O(V)"], pattern: "Graph DFS recursion visited flag" },
  "BFS Traversal": { brute: ["O(V+E)", "O(V)"], better: ["O(V+E)", "O(V)"], optimal: ["O(V+E)", "O(V)"], pattern: "Graph BFS Queue visit loop" },
  "Cycle Detection Undirected Graph": { brute: ["O(V+E)", "O(V)"], better: ["O(V+E)", "O(V)"], optimal: ["O(V+E)", "O(V)"], pattern: "Graph traversal parent tracking" },
  "Topological Sort Kahn's Algo": { brute: ["O(V+E)", "O(V)"], better: ["O(V+E)", "O(V)"], optimal: ["O(V+E)", "O(V)"], pattern: "BFS In-degree array tracking" },
  "Number of Islands": { brute: ["O(M*N)", "O(M*N)"], better: ["O(M*N)", "O(M*N)"], optimal: ["O(M*N)", "O(Min(M,N)) (BFS)"], pattern: "Grid flood fill DFS/BFS traversal" },
  "Bipartite Graph BFS/DFS": { brute: ["O(V+E)", "O(V)"], better: ["O(V+E)", "O(V)"], optimal: ["O(V+E)", "O(V)"], pattern: "Graph vertex double-color validation" },
  "Dijkstra's Algorithm": { brute: ["O(V^2)", "O(V)"], better: ["O(E log V)", "O(V)"], optimal: ["O(E log V)", "O(V)"], pattern: "Priority Queue min-distance updates" },
  "Bellman Ford Algorithm": { brute: ["O(V*E)", "O(V)"], better: ["O(V*E)", "O(V)"], optimal: ["O(V*E)", "O(V)"], pattern: "V-1 relaxation loop check negative cycle" },
  "Floyd Warshall Algorithm": { brute: ["O(V^3)", "O(V^2)"], better: ["O(V^3)", "O(V^2)"], optimal: ["O(V^3)", "O(V^2)"], pattern: "Triple loop row-column intermediate distance updates" },

  // DP
  "Max Product Subarray": { brute: ["O(N^2)", "O(1)"], better: ["O(N)", "O(1)"], optimal: ["O(N)", "O(1)"], pattern: "Prefix-Suffix Product" },
  "Longest Increasing Subsequence": { brute: ["O(2^N)", "O(N)"], better: ["O(N^2)", "O(N)"], optimal: ["O(N log N)", "O(N)"], pattern: "DP Memoization / Binary Search tail list" },
  "Longest Common Subsequence": { brute: ["O(2^(M+N))", "O(M+N)"], better: ["O(M*N)", "O(M*N)"], optimal: ["O(Min(M,N))", "O(Min(M,N))"], pattern: "DP 2D Matrix character matching" },
  "0-1 Knapsack": { brute: ["O(2^N)", "O(N)"], better: ["O(N*W)", "O(N*W)"], optimal: ["O(W)", "O(W)"], pattern: "DP row index weight item lookup" },
  "Edit Distance": { brute: ["O(3^(M+N))", "O(M+N)"], better: ["O(M*N)", "O(M*N)"], optimal: ["O(N)", "O(N)"], pattern: "DP insertion-deletion-replacement updates" },
  "Partition Equal Subset Sum": { brute: ["O(2^N)", "O(N)"], better: ["O(N*Sum)", "O(N*Sum)"], optimal: ["O(Sum)", "O(Sum)"], pattern: "DP subset selection target half" },
  "Matrix Chain Multiplication": { brute: ["O(2^N)", "O(N)"], better: ["O(N^3)", "O(N^2)"], optimal: ["O(N^3)", "O(N^2)"], pattern: "DP Partition bounds matrix multiplication cost" },
  "Maximum Path Sum in Matrix": { brute: ["O(3^N)", "O(N)"], better: ["O(N*M)", "O(N*M)"], optimal: ["O(M)", "O(M)"], pattern: "DP Row boundary cell path transitions" },
  "Rod Cutting": { brute: ["O(2^N)", "O(N)"], better: ["O(N^2)", "O(N)"], optimal: ["O(N^2)", "O(N)"], pattern: "DP recursive cuts price lookup" },

  // Trie
  "Implement Trie (Prefix Tree)": { brute: ["O(WordLength)", "O(WordsCount * WordLength)"], better: ["O(WordLength)", "O(WordsCount * WordLength)"], optimal: ["O(WordLength)", "O(WordsCount * WordLength)"], pattern: "26-node letter branch references" },
  "Implement Trie II": { brute: ["O(WordLength)", "O(WordsCount * WordLength)"], better: ["O(WordLength)", "O(WordsCount * WordLength)"], optimal: ["O(WordLength)", "O(WordsCount * WordLength)"], pattern: "Node value prefix/ends count tracking" },
  "Longest String with All Prefixes": { brute: ["O(N * WordLength)", "O(N * WordLength)"], better: ["O(N * WordLength)", "O(N * WordLength)"], optimal: ["O(N * WordLength)", "O(N * WordLength)"], pattern: "Prefix tree search valid branches" },
  "Maximum XOR of Two Numbers": { brute: ["O(N^2)", "O(1)"], better: ["O(N)", "O(N * 32)"], optimal: ["O(N)", "O(N * 32)"], pattern: "Binary bit branch search" },
  "Maximum XOR With an Element": { brute: ["O(Q * N)", "O(1)"], better: ["O(Q * N log N)", "O(N * 32)"], optimal: ["O(Q log Q + N * 32)", "O(N * 32)"], pattern: "Query sorting dynamic bit insertion" },
  "Number of Distinct Substrings": { brute: ["O(N^3)", "O(N^2)"], better: ["O(N^2)", "O(N^2)"], optimal: ["O(N^2)", "O(Suffix tree count)"], pattern: "Suffix Trie letter insertion count" }
};

// Procedural visualizer generator based on problem name/type
export const generateVisualizerSteps = (name, type) => {
  const steps = [];
  if (type === 'grid') {
    steps.push(
      { data: [[1,1,1],[1,0,1],[1,1,1]], pointers: { r: 0, c: 0 }, description: "Initial 3x3 matrix. Scan row/col to locate zeros.", highlights: [1, 1] },
      { data: [[1,1,1],[1,0,1],[1,1,1]], pointers: { r: 1, c: 1 }, description: "Found cell = 0 at row 1, col 1. Mark headers matrix[1][0] and matrix[0][1].", highlights: [1, 1] },
      { data: [[1,0,1],[0,0,0],[1,0,1]], pointers: { r: 1, c: 1 }, description: "Marking row 1 and column 1 as zeros.", highlights: [0, 1, 2] },
      { data: [[1,0,1],[0,0,0],[1,0,1]], pointers: {}, description: "Matrix successfully updated.", highlights: [] }
    );
  } else if (type === 'two-pointer') {
    steps.push(
      { data: [2, 7, 11, 15], pointers: { left: 0, right: 3 }, description: `Scanning array. Pointer left=0 (val 2), right=3 (val 15). Target = 9.`, highlights: [0, 3] },
      { data: [2, 7, 11, 15], pointers: { left: 0, right: 2 }, description: `Sum (2+15=17) > target (9). Move right pointer left.`, highlights: [0, 2] },
      { data: [2, 7, 11, 15], pointers: { left: 0, right: 1 }, description: `Sum (2+11=13) > target (9). Move right pointer left.`, highlights: [0, 1] },
      { data: [2, 7, 11, 15], pointers: { left: 0, right: 1 }, description: `Sum (2+7=9) matches target! Target indices: [0, 1].`, highlights: [0, 1] }
    );
  } else if (type === 'linked-list') {
    steps.push(
      { data: [1, 2, 3, 4], pointers: { curr: 0, prev: -1 }, description: "Start list traversal. prev = null, curr = Node 1.", highlights: [0] },
      { data: [1, 2, 3, 4], pointers: { curr: 1, prev: 0 }, description: "Reverse link. Node 1 points to prev. Shift prev to Node 1, curr to Node 2.", highlights: [0, 1] },
      { data: [1, 2, 3, 4], pointers: { curr: 2, prev: 1 }, description: "Reverse link. Node 2 points to Node 1. Shift prev to Node 2, curr to Node 3.", highlights: [1, 2] },
      { data: [1, 2, 3, 4], pointers: { curr: -1, prev: 3 }, description: "List fully reversed. New head is Node 4.", highlights: [3] }
    );
  } else if (type === 'tree') {
    steps.push(
      { data: [1, 2, 3, 4, 5], pointers: { active: 0 }, description: "DFS: Visit root Node 1.", highlights: [0] },
      { data: [1, 2, 3, 4, 5], pointers: { active: 1 }, description: "DFS: Traverse left child Node 2.", highlights: [1] },
      { data: [1, 2, 3, 4, 5], pointers: { active: 3 }, description: "Reach leaf Node 4. Backtrack to Node 2.", highlights: [3] },
      { data: [1, 2, 3, 4, 5], pointers: { active: 4 }, description: "DFS: Traverse right child Node 5.", highlights: [4] },
      { data: [1, 2, 3, 4, 5], pointers: { active: 2 }, description: "DFS: Traverse right sub-branch Node 3.", highlights: [2] }
    );
  } else if (type === 'graph') {
    steps.push(
      { data: [0, 1, 2, 3], pointers: { active: 0 }, description: "Start traversal at Node 0. Add unvisited neighbors to queue: [1, 2].", highlights: [0] },
      { data: [0, 1, 2, 3], pointers: { active: 1 }, description: "Visit Node 1. Add neighbor Node 3 to queue.", highlights: [1] },
      { data: [0, 1, 2, 3], pointers: { active: 2 }, description: "Visit Node 2. No new neighbors.", highlights: [2] },
      { data: [0, 1, 2, 3], pointers: { active: 3 }, description: "Visit Node 3. Traversal complete.", highlights: [3] }
    );
  } else if (type === 'dp') {
    steps.push(
      { data: [0, 0, 0, 0], pointers: { i: 0 }, description: "DP Array initialization. Fill base cases.", highlights: [0] },
      { data: [1, 0, 0, 0], pointers: { i: 1 }, description: "Compute state DP[1] = 1.", highlights: [0, 1] },
      { data: [1, 2, 0, 0], pointers: { i: 2 }, description: "Compute state DP[2] = DP[1] + DP[0] = 2.", highlights: [1, 2] },
      { data: [1, 2, 3, 0], pointers: { i: 3 }, description: "Compute state DP[3] = DP[2] + DP[1] = 3.", highlights: [2, 3] }
    );
  } else if (type === 'interval') {
    steps.push(
      { data: [[1,3], [2,6], [8,10]], pointers: { active: 0 }, description: "Sort intervals by start times. Select first interval [1, 3].", highlights: [0] },
      { data: [[1,3], [2,6], [8,10]], pointers: { active: 1 }, description: "Overlap found (2 <= 3). Merge [1, 3] and [2, 6] to [1, 6].", highlights: [0, 1] },
      { data: [[1,6], [8,10]], pointers: { active: 1 }, description: "No overlap with [8, 10] (8 > 6). Push [1, 6] to output.", highlights: [1] },
      { data: [[1,6], [8,10]], pointers: {}, description: "Completed merging. Output: [[1, 6], [8, 10]].", highlights: [] }
    );
  } else {
    // Default Two pointer
    steps.push(
      { data: [1, 2, 3, 4], pointers: { left: 0, right: 3 }, description: "Initialize pointers.", highlights: [0, 3] },
      { data: [1, 2, 3, 4], pointers: {}, description: "Operation successfully finished.", highlights: [] }
    );
  }
  return steps;
};

// Pre-configured premium Java solutions templates for topics
const JAVA_TEMPLATES = {
  "Arrays": {
    brute: `class Solution {\n    // Brute Force: Linear Search or Sort check\n    public int findSolution(int[] nums) {\n        int n = nums.length;\n        // Outer scan loop\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (nums[i] == nums[j]) return nums[i];\n            }\n        }\n        return -1;\n    }\n}`,
    better: `import java.util.HashSet;\n\nclass Solution {\n    // Better: Using Hash Set for tracking\n    public int findSolution(int[] nums) {\n        HashSet<Integer> seen = new HashSet<>();\n        for (int num : nums) {\n            if (seen.contains(num)) return num;\n            seen.add(num);\n        }\n        return -1;\n    }\n}`,
    optimal: `class Solution {\n    // Optimal: In-place array indices modifications\n    public int findSolution(int[] nums) {\n        // Two-pointer partition scan\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            if (nums[left] == nums[right]) return nums[left];\n            left++;\n        }\n        return -1;\n    }\n}`
  },
  "Linked List": {
    brute: `class Solution {\n    // Brute Force: Copy to array list\n    public ListNode solve(ListNode head) {\n        if (head == null) return null;\n        java.util.List<Integer> list = new java.util.ArrayList<>();\n        ListNode curr = head;\n        while (curr != null) {\n            list.add(curr.val);\n            curr = curr.next;\n        }\n        return head;\n    }\n}`,
    better: `class Solution {\n    // Better: Dual traversal passes\n    public ListNode solve(ListNode head) {\n        int len = 0;\n        ListNode curr = head;\n        while (curr != null) {\n            len++;\n            curr = curr.next;\n        }\n        return head;\n    }\n}`,
    optimal: `class Solution {\n    // Optimal: In-place pointer modifications\n    public ListNode solve(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode next = curr.next; // save next pointer\n            curr.next = prev;          // reverse link\n            prev = curr;               // shift prev forward\n            curr = next;               // shift curr forward\n        }\n        return prev;\n    }\n}`
  },
  "Greedy": {
    brute: `class Solution {\n    // Brute Force: Permutation check of items\n    public int solve(int[][] items, int capacity) {\n        // Recursive subset checks\n        return 0;\n    }\n}`,
    better: `import java.util.Arrays;\n\nclass Solution {\n    // Better: Sort by value ratio\n    public int solve(int[][] items, int capacity) {\n        Arrays.sort(items, (a, b) -> Integer.compare(a[0], b[0]));\n        return 0;\n    }\n}`,
    optimal: `import java.util.Arrays;\n\nclass Solution {\n    // Optimal: Greedy selection of sorted items\n    public int solve(int[][] items, int capacity) {\n        // Sort items by value/weight ratio descending\n        Arrays.sort(items, (a, b) -> Double.compare((double)b[0]/b[1], (double)a[0]/a[1]));\n        int profit = 0;\n        for (int[] item : items) {\n            if (capacity >= item[1]) {\n                profit += item[0];\n                capacity -= item[1];\n            }\n        }\n        return profit;\n    }\n}`
  },
  "Recursion": {
    brute: `class Solution {\n    // Brute Force: Recursive subsets check\n    public void subsetHelper(int idx, int[] nums) {\n        if (idx == nums.length) return;\n        subsetHelper(idx + 1, nums);\n    }\n}`,
    better: `class Solution {\n    // Better: Recursive subsets with sorting\n    public void subsetHelper(int idx, int[] nums) {\n        // Sort array to skip duplicates\n    }\n}`,
    optimal: `import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n    // Optimal: Backtracking with duplicate pruning\n    public void subsetHelper(int idx, int[] nums, List<Integer> curr, List<List<Integer>> res) {\n        res.add(new ArrayList<>(curr));\n        for (int i = idx; i < nums.length; i++) {\n            if (i > idx && nums[i] == nums[i-1]) continue; // prune duplicate branches\n            curr.add(nums[i]);\n            subsetHelper(i + 1, nums, curr, res);\n            curr.remove(curr.size() - 1); // backtrack\n        }\n    }\n}`
  },
  "Binary Search": {
    brute: `class Solution {\n    // Brute Force: Linear scan\n    public int search(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == target) return i;\n        }\n        return -1;\n    }\n}`,
    better: `class Solution {\n    // Better: Sub-segment scan\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}`,
    optimal: `class Solution {\n    // Optimal: Logarithmic binary search\n    public int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[left] <= nums[mid]) { // left side sorted\n                if (target >= nums[left] && target < nums[mid]) right = mid - 1;\n                else left = mid + 1;\n            } else { // right side sorted\n                if (target > nums[mid] && target <= nums[right]) left = mid + 1;\n                else right = mid - 1;\n            }\n        }\n        return -1;\n    }\n}`
  },
  "Binary Trees": {
    brute: `class Solution {\n    // Brute Force: Inorder traversal recursion\n    public void traverse(TreeNode root) {\n        if (root == null) return;\n        traverse(root.left);\n        System.out.println(root.val);\n        traverse(root.right);\n    }\n}`,
    better: `import java.util.Stack;\n\nclass Solution {\n    // Better: Iterative DFS using Stack\n    public void traverse(TreeNode root) {\n        Stack<TreeNode> stack = new Stack<>();\n        TreeNode curr = root;\n        while (curr != null || !stack.isEmpty()) {\n            while (curr != null) {\n                stack.push(curr);\n                curr = curr.left;\n            }\n            curr = stack.pop();\n            curr = curr.right;\n        }\n    }\n}`,
    optimal: `class Solution {\n    // Optimal: Morris Inorder Traversal (O(1) Space)\n    public void traverse(TreeNode root) {\n        TreeNode curr = root;\n        while (curr != null) {\n            if (curr.left == null) {\n                // Visit root\n                curr = curr.right;\n            } else {\n                TreeNode prev = curr.left;\n                while (prev.right != null && prev.right != curr) prev = prev.right;\n                if (prev.right == null) {\n                    prev.right = curr; // establish temporary link\n                    curr = curr.left;\n                } else {\n                    prev.right = null; // break link\n                    curr = curr.right;\n                }\n            }\n        }\n    }\n}`
  },
  "Graphs": {
    brute: `class Solution {\n    // Brute Force: Matrix reachability check\n    public void reach(int[][] graph) {\n        // ...\n    }\n}`,
    better: `import java.util.Queue;\nimport java.util.LinkedList;\n\nclass Solution {\n    // Better: Breadth-First-Search (BFS)\n    public void bfs(int start, java.util.List<java.util.List<Integer>> adj) {\n        Queue<Integer> q = new LinkedList<>();\n        boolean[] visited = new boolean[adj.size()];\n        q.add(start);\n        visited[start] = true;\n    }\n}`,
    optimal: `class Solution {\n    // Optimal: Depth-First-Search recursion (DFS)\n    public void dfs(int u, java.util.List<java.util.List<Integer>> adj, boolean[] visited) {\n        visited[u] = true; // flag node as visited\n        for (int v : adj.get(u)) {\n            if (!visited[v]) {\n                dfs(v, adj, visited); // traverse neighbors recursively\n            }\n        }\n    }\n}`
  },
  "DP": {
    brute: `class Solution {\n    // Brute Force: Plain recursion exponential check\n    public int getLIS(int[] nums, int idx, int prevIdx) {\n        if (idx == nums.length) return 0;\n        int take = 0;\n        if (prevIdx == -1 || nums[idx] > nums[prevIdx]) take = 1 + getLIS(nums, idx + 1, idx);\n        int skip = getLIS(nums, idx + 1, prevIdx);\n        return Math.max(take, skip);\n    }\n}`,
    better: `class Solution {\n    // Better: DP Memoization O(N^2) time\n    public int getLIS(int[] nums) {\n        int n = nums.length;\n        int[] dp = new int[n];\n        java.util.Arrays.fill(dp, 1);\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < i; j++) {\n                if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);\n            }\n        }\n        return 0;\n    }\n}`,
    optimal: `class Solution {\n    // Optimal: DP + Binary Search (O(N log N))\n    public int getLIS(int[] nums) {\n        java.util.List<Integer> tails = new java.util.ArrayList<>();\n        for (int num : nums) {\n            int idx = java.util.Collections.binarySearch(tails, num);\n            if (idx < 0) idx = -(idx + 1);\n            if (idx == tails.size()) tails.add(num);\n            else tails.set(idx, num); // update smallest tail\n        }\n        return tails.size();\n    }\n}`
  }
};

// Generates problem specific descriptions, codes, visualizers, complexities
const generateContentForProblem = (prob) => {
  const { name, category, difficulty, day, index } = prob;
  
  // 1. Get complexities and pattern from lookup
  const lookup = COMPLEXITY_LOOKUP[name] || {
    brute: ["O(N^2)", "O(1)"],
    better: ["O(N)", "O(N)"],
    optimal: ["O(N)", "O(1)"],
    pattern: "General Algorithm"
  };

  // 2. Set visualizer type based on category
  let visualizerType = 'two-pointer';
  if (name.includes("Matrix") || name.includes("Paths") || name.includes("Islands")) {
    visualizerType = 'grid';
  } else if (category === 'Linked List') {
    visualizerType = 'linked-list';
  } else if (category === 'Binary Trees' || category === 'BST') {
    visualizerType = 'tree';
  } else if (category === 'Graphs') {
    visualizerType = 'graph';
  } else if (category === 'DP') {
    visualizerType = 'dp';
  } else if (name.includes("Interval")) {
    visualizerType = 'interval';
  }

  // 3. Select templates or write custom code
  let codes = JAVA_TEMPLATES[category] || JAVA_TEMPLATES["Arrays"];
  if (category === "Trie") {
    codes = {
      brute: `class Trie {\n    // Brute: List tracking\n    java.util.List<String> list = new java.util.ArrayList<>();\n}`,
      better: `class Trie {\n    // Better: Map of Prefixes\n}`,
      optimal: `class TrieNode {\n    TrieNode[] children = new TrieNode[26];\n    boolean isEnd = false;\n}\nclass Trie {\n    private TrieNode root = new TrieNode();\n    public void insert(String word) {\n        TrieNode curr = root;\n        for (char c : word.toCharArray()) {\n            if (curr.children[c - 'a'] == null) curr.children[c - 'a'] = new TrieNode();\n            curr = curr.children[c - 'a'];\n        }\n        curr.isEnd = true;\n    }\n}`
    };
  }

  // Specific code adjustments for famous questions
  if (name === "Set Matrix Zeroes") {
    codes = {
      brute: `// Brute Force: Iterate and mark rows/cols with helper flags\nclass Solution {\n    public void setZeroes(int[][] matrix) {\n        int m = matrix.length, n = matrix[0].length;\n        boolean[][] isZero = new boolean[m][n];\n        for (int i=0; i<m; i++) {\n            for (int j=0; j<n; j++) {\n                if (matrix[i][j] == 0) isZero[i][j] = true;\n            }\n        }\n    }\n}`,
      better: `// Better Force: Auxiliary arrays\nclass Solution {\n    public void setZeroes(int[][] matrix) {\n        int m = matrix.length, n = matrix[0].length;\n        boolean[] row = new boolean[m];\n        boolean[] col = new boolean[n];\n        for (int i=0; i<m; i++) {\n            for (int j=0; j<n; j++) {\n                if (matrix[i][j] == 0) { row[i] = true; col[j] = true; }\n            }\n        }\n    }\n}`,
      optimal: `// Optimal: Mark rows and columns in-place using matrix headers\nclass Solution {\n    public void setZeroes(int[][] matrix) {\n        int m = matrix.length, n = matrix[0].length;\n        boolean firstColZero = false, firstRowZero = false;\n        for (int i=0; i<m; i++) if (matrix[i][0] == 0) firstColZero = true;\n        for (int j=0; j<n; j++) if (matrix[0][j] == 0) firstRowZero = true;\n        for (int i=1; i<m; i++) {\n            for (int j=1; j<n; j++) {\n                if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }\n            }\n        }\n    }\n}`
    };
  }

  // 4. Generate Intuition text
  const intuitionText = `To solve ${name} optimally, we leverage the ${lookup.pattern} pattern. This approach avoids redundant operations and reduces both the execution time to ${lookup.optimal[0]} and the space complexity to ${lookup.optimal[1]}.`;

  // 5. Generate progressive Hints
  const hintsList = [
    `Pattern: ${lookup.pattern}. Focus on this technique.`,
    `Consider using a ${category === 'Linked List' ? 'Pointer Swap' : category === 'Binary Trees' ? 'Traversal path' : 'HashMap/Set'} to minimize search space.`,
    `The optimal solution operates in ${lookup.optimal[0]} time and uses ${lookup.optimal[1]} auxiliary space.`
  ];

  return {
    ...prob,
    id: `Day${day}_P${index}`,
    topicName: TOPICS_BY_DAY[day].name,
    topicIcon: TOPICS_BY_DAY[day].icon,
    pattern: lookup.pattern,
    intuition: intuitionText,
    eli5: `Imagine organizing objects step-by-step. Instead of inspecting everything repeatedly, we use smart landmarks to find what we need directly.`,
    hints: hintsList,
    dryRunTable: [
      { step: 1, action: "Initialize", state: "Pointers / Maps set up", output: "Starting state" },
      { step: 2, action: "Scan items", state: "Comparing boundary nodes", output: "Progressing" },
      { step: 3, action: "Condition Match", state: "Correct subset located", output: "Goal achieved" }
    ],
    visualizerSteps: generateVisualizerSteps(name, visualizerType),
    visualizerType: visualizerType,
    brute: {
      explain: `The brute force method runs a naive search over the input elements.`,
      complexity: { time: lookup.brute[0], space: lookup.brute[1] },
      pseudocode: `function bruteForce(input):\n    // Iterative nested loop checks\n    return result`,
      code: codes.brute
    },
    better: {
      explain: `The better approach optimizes performance by using auxiliary tracking data structures.`,
      complexity: { time: lookup.better[0], space: lookup.better[1] },
      pseudocode: `function betterApproach(input):\n    // Use Hash mappings\n    return result`,
      code: codes.better
    },
    optimal: {
      explain: `The optimal approach achieves the best performance boundary in terms of both memory and execution speed.`,
      complexity: { time: lookup.optimal[0], space: lookup.optimal[1] },
      pseudocode: `function optimalApproach(input):\n    // In-place markers or double pointers\n    return result`,
      code: codes.optimal
    }
  };
};

export const SHEET_DAYS = Object.keys(TOPICS_BY_DAY).map(day => {
  const d = parseInt(day);
  const dayProblems = RAW_PROBLEMS.filter(p => p.day === d);
  return {
    day: d,
    topic: TOPICS_BY_DAY[d].name,
    icon: TOPICS_BY_DAY[d].icon,
    problems: dayProblems.map(p => generateContentForProblem(p))
  };
});

export const ALL_PROBLEMS = SHEET_DAYS.reduce((acc, currentDay) => {
  return [...acc, ...currentDay.problems];
}, []);
