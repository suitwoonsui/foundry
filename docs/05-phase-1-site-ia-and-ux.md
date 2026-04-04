# Phase 1 — site IA and UX (detail)

Projects hub, categories, filters, search, cards, detail page, tiers, design system, a11y. Previous: [04-ecosystem-roadmap-phases.md](04-ecosystem-roadmap-phases.md).

---

Phase 1 — Project Visibility (site-only, no payments yet)
1) Top-level Info Architecture
Home / Projects (default): grid of project cards + filters + search


Project Detail (route: /p/<slug>): long form page per project


About / How It Works (short explainer of the model; Phase 1 can be a stub)


Roadmap / Weekly Updates (lightweight blog roll; can be hidden until content exists)


2) Categories (filterable "chips")
Think broad, future-proof groups so any idea fits cleanly:
Apps (tools, dashboards, wallets, bots that run on web or mobile)


Games (mini-games, on-chain interactions, collectibles)


Marketing (campaigns, DEX boosts, listings, paid media)


Community Tools (raiding suite, contributor portal, analytics)


Content & Media (video series, docs, art drops)


Partnerships & Listings (CEX/DEX, integrations, collabs)


Events (Spaces series, AMAs, IRL)


Research & Exploration (R&D, feasibility spikes)


Infrastructure (hosting, APIs, indexers)


Treasury & Ops (legal, audits, operational runway)


(You can sub-select which to show at launch; keep the rest disabled.)
3) Filters (besides Category)
Status: Ideation • In Review • Funding Open • Building • Paused • Complete


Reward types: NFT • Reduced Price/Access • Token Rewards • Title/Role • Mixed


Funding goal: under 1k • 1–5k • 5–25k • 25k+ (bands, not exact)


Timeline: Sprint (≤2 weeks) • Short (≤1 mo) • Medium (≤3 mo) • Long (>3 mo)


Impact area: Growth • Revenue • Community • Tech • Brand


Risk/Complexity: Low • Medium • High (simple traffic-light)


Tags: free-form (e.g., "Sui", "onboarding", "DEX", "NFT", "shooter game")


Sort options: Most Recent • Funding % • Funding Left • Highest Impact • Trending (views/watch-list)
4) Search (simple now, smart later)
Scope: name, goal statement, tags, reward text, owner handle, short updates.


Behavior: instant debounce (300ms), highlights term, preserves applied filters.


Future: synonym map (e.g., "listing" ~ "CEX", "DEX boost" ~ "marketing").


5) Project Card (Main grid)
Minimal, scannable, tap-friendly. Each card shows:
Name + Type badge (category)


One-line goal (≤120 chars)


Funding bar: Raised / Target (even if Phase 2 enables real wallets later, mock here)


Reward icon row (tooltips: "NFT", "Reduced Price", "Token Rewards", "Title")


CTA buttons: View • Donate (Donate can anchor to detail page in Phase 1)


Signals (small): Status chip, Impact chip


Wallet label (Phase 2): Sui wallet alias with copy + QR + explorer link


Micro-copy (examples)
Goal: "Launch weekly Spaces boost campaign for 4 weeks."


Status chip: "Funding Open" • "Building"


Reward tooltip: "Donate ≥ 200 SUI → Dynamic Badge NFT + early access"


6) Project Detail Page (for when a card expands or new route)
Sections (stacked, collapsible on mobile):
Hero: name, type, goal, status, chips, share.


Funding module: target, raised, progress bar, "Top donors" (optional), Donate CTA (inactive or "Coming in Phase 2").


Rewards: tier table (amount → perks).


Why this matters: problem, approach, expected outcomes, impact area.


Timeline: milestones with checkmarks.


Team & Leads: core owner + contributors (wallet aliases optional).


Transparency (future): live transactions list (last 5) + link to Sui explorer.


Updates: weekly notes (ties to your Spaces cadence).


FAQs: simple accordions.


Related projects: 3-up grid.


7) Reward tiers (display only in Phase 1; live later)
Tiers link to clear, project-specific perks.


Keep 3–5 tiers max per project for clarity.


Show a global legend for perk types so users know what "Reduced Price" or "Title" means.


8) Minimal design system
Chips for categories/filters (toggleable, multi-select).


Neutral card with soft elevation; progress bar thick enough for mobile tap.


Icons: wallet, NFT, ticket, token, badge.


Empty states: "No projects match your filters. Try fewer filters or search."


9) Accessibility & device notes
Keyboard navigable chip filters, visible focus rings, 44px touch targets.


Alt text for icons, ARIA for progress bar and tooltips.


Truncate long names cleanly; never clip critical numbers.
