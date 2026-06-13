// api/solve.js
// Vercel serverless function — runs on the server, keeps OPENROUTER_API_KEY secret.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { problemName, category, leetcodeUrl, userInput, difficulty } = req.body || {};

  if (!problemName) {
    return res.status(400).json({ error: 'problemName is required' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured: missing OPENROUTER_API_KEY' });
  }

  const customInputLine = userInput
    ? `The user provided this custom input to use instead of a default example: ${userInput}. Use THIS input to generate the visualization steps and dry run.`
    : `Pick a small, sensible default example input (e.g. a short array, list, or string of 4-8 elements) appropriate for this problem.`;

  const prompt = `You are a senior DSA visualization engineer. For the LeetCode/GFG problem below, produce a STRICT JSON object (no markdown fences, no commentary, no extra text — JSON ONLY) describing how to visualize and explain it.

Problem name: ${problemName}
Category: ${category || 'Unknown'}
Difficulty: ${difficulty || 'Unknown'}
Reference link: ${leetcodeUrl || 'N/A'}

${customInputLine}

Return JSON matching EXACTLY this schema:

{
  "visualizationType": one of "array" | "grid" | "linked-list" | "tree" | "graph" | "stack" | "string" | "dp-table" | "trie",
  "bruteForce": {
    "explanation": "1-2 sentence explanation specific to THIS problem",
    "time": "Big-O time complexity",
    "space": "Big-O space complexity",
    "code": "Complete, correct, compilable Java solution for the BRUTE FORCE approach to THIS specific problem. Use proper Java syntax, real logic for this exact problem (not generic placeholders)."
  },
  "optimal": {
    "explanation": "1-2 sentence explanation specific to THIS problem",
    "time": "Big-O time complexity",
    "space": "Big-O space complexity",
    "code": "Complete, correct, compilable Java solution for the OPTIMAL approach to THIS specific problem. Must be DIFFERENT from brute force and use the actual optimal technique (e.g. two pointers, hashing, DP, recursion, heap, etc. — whichever truly applies)."
  },
  "pseudocode": "Short pseudocode (5-10 lines) for the optimal approach, specific to this problem",
  "exampleInput": "the example input used for the steps below, as a readable string, e.g. [1,2,3] or 1->2->3->4",
  "steps": [
    {
      "data": <array, 2D array, or list representing the current state of the structure being visualized — must reflect THIS problem's data shape>,
      "pointers": { "<name>": <index or value> },
      "highlights": [<indices to highlight>],
      "description": "1 sentence explaining what happens at this step, specific to this problem and example",
      "codeLine": <line number (1-indexed) in the OPTIMAL code that this step corresponds to>
    }
  ],
  "dryRun": [
    { "step": 1, "action": "short action name", "state": "state of variables/pointers", "output": "result so far" }
  ]
}

Rules:
- Generate between 5 and 12 "steps" that walk through the OPTIMAL algorithm on the exampleInput, step by step, showing the actual data changing.
- "visualizationType" must genuinely match the problem (e.g. linked list problems => "linked-list", tree problems => "tree", grid/matrix => "grid", graphs => "graph", stack/queue => "stack", trie => "trie", DP table problems => "dp-table", everything else (arrays/strings/two-pointer/sliding window/etc) => "array" or "string").
- "codeLine" values must correspond to real line numbers in the "optimal" code string (counting from 1, including blank lines).
- bruteForce and optimal code MUST be different from each other and both must be valid, correct Java for THIS specific problem — no generic templates, no placeholders like "findSolution".
- Respond with ONLY the JSON object. No markdown code fences, no leading/trailing text.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'nousresearch/hermes-3-llama-3.1-405b:free',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({ error: 'OpenRouter API error', detail: errText });
    }

    const data = await response.json();
    let raw = data?.choices?.[0]?.message?.content || '';

    // Strip accidental markdown fences just in case
    raw = raw.trim().replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();

    // Some models add stray text before/after JSON — try to extract the {...} block
    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      raw = raw.slice(firstBrace, lastBrace + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return res.status(502).json({ error: 'Failed to parse AI response as JSON', raw });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}
