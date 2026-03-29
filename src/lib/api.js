export async function generateProjectIdeas({
  role,
  difficulty,
  domains,
  stack,
  notes,
}) {
  const prompt = `You are a senior software architect and startup founder with 20 years of experience.

Generate exactly 5 original, compelling software project ideas for a ${role} with ${difficulty} difficulty.
Target domains: ${domains.join(", ")}.
${stack ? `Preferred stack: ${stack}.` : ""}
${notes ? `Extra context: ${notes}` : ""}

Rules:
- Ideas must be specific and actionable, not generic
- Mix portfolio-worthy and startup-viable projects
- Each should solve a real problem
- Be creative — avoid cliché todo apps or weather apps

Return ONLY valid JSON, no markdown fences, no preamble:
[
  {
    "name": "Project Name",
    "tagline": "One punchy sentence that sells the idea",
    "description": "2-3 sentences: what it does, who it's for, why it matters",
    "difficulty": "Beginner" | "Intermediate" | "Advanced",
    "category": "one of: Tool, SaaS, Open Source, Mobile, AI, Game, API, Platform",
    "features": ["Feature description 1", "Feature description 2", "Feature description 3", "Feature description 4"],
    "techStack": ["Tech1", "Tech2", "Tech3", "Tech4"],
    "monetization": "How this could make money (or 'Open Source / Portfolio')",
    "wow": "The single most impressive or surprising aspect of this project"
  }
]`;

  // api.js — keep the proxy, only fix max_tokens
  const response = await fetch("http://localhost:3001/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096, // ← only change needed here
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const raw = data.content.map((b) => b.text || "").join("");
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
