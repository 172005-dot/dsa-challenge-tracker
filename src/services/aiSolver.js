// src/services/aiSolver.js
// Calls the /api/solve serverless function and caches results in localStorage
// so each problem is only generated once (per default input).

const CACHE_PREFIX = 'ai-solve-cache:';

function cacheKey(day, index, userInput) {
  const base = `${CACHE_PREFIX}${day}-${index}`;
  return userInput ? `${base}:custom:${userInput}` : `${base}:default`;
}

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or unavailable — ignore, just won't cache
  }
}

/**
 * Get AI-generated visualization, code, pseudocode, and dry run for a problem.
 *
 * @param {Object} problem - { day, index, name, category, difficulty, leetcode }
 * @param {string} [userInput] - optional custom input string from the user
 * @returns {Promise<Object>} parsed solution object matching the schema in api/solve.js
 */
export async function solveProblem(problem, userInput) {
  const key = cacheKey(problem.day, problem.index, userInput?.trim());

  const cached = readCache(key);
  if (cached) return cached;

  const response = await fetch('/api/solve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problemName: problem.name,
      category: problem.category,
      difficulty: problem.difficulty,
      leetcodeUrl: problem.leetcode,
      userInput: userInput?.trim() || undefined,
    }),
  });

  if (!response.ok) {
    let detail = '';
    try {
      const errBody = await response.json();
      detail = errBody.error || errBody.detail || JSON.stringify(errBody);
    } catch {
      detail = await response.text();
    }
    throw new Error(`AI solve failed: ${detail}`);
  }

  const data = await response.json();
  writeCache(key, data);
  return data;
}

/**
 * Clear cached AI solution for a problem (e.g. if user wants to regenerate).
 */
export function clearSolveCache(problem, userInput) {
  const key = cacheKey(problem.day, problem.index, userInput?.trim());
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
