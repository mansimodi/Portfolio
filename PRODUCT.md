# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19, Vite 6, TypeScript, Tailwind CSS 4, Motion (Framer Motion), GSAP + ScrollTrigger, Lenis smooth scroll. Existing codebase; no stack change planned unless a future constraint requires it.

## Users

**Primary:** A mixed professional audience — hiring managers and recruiters evaluating Mansi for senior data science roles, plus potential collaborators and cross-functional partners (PMs, engineers, directors, AVPs).

**Secondary:** Professional network contacts who already know Mansi's work and want a credible, up-to-date reference.

**Situation:** Visitors arrive with limited time, often on desktop or mobile, comparing candidates or deciding whether to initiate a conversation. They need to quickly assess technical depth, business impact, communication style, and whether Mansi is someone they'd want on their team or in a cross-functional project.

## Product Purpose

A personal website that serves dual roles:

1. **Data science portfolio** — demonstrate credibility through measurable impact, project depth, skills, and recognition at AT&T and beyond.
2. **Personal presence** — help professional contacts see Mansi as a whole person, not only a résumé, so outreach feels natural and informed.

Success means a visitor understands who Mansi is, trusts the evidence of her work, feels a human connection, and **emails her directly** as the primary call to action.

## Positioning

Mansi turns operational noise — customer behavior, revenue signals, call/chat transcripts — into clarity that changes what leadership does next. The differentiator is not model sophistication alone; it is the full loop from machine learning and product strategy through storytelling that drives decisions, not just discussions.

## Operating Context

- **Role:** Lead Data Scientist, San Francisco Bay Area.
- **Experience:** Eight years; deep work at AT&T across AI analytics, forecasting, anomaly detection, and strategic routing.
- **Toolkit:** Python, SQL, Snowflake, Power BI, time series modeling, anomaly detection, AI-driven analytics; modern AI tools (Gemini, Claude, ChatGPT, and related platforms listed in site copy).
- **Site sections (current):** Scroll-driven canvas hero, Bio, Impact stats, Contact, Skills, Awards, Projects, Footer.
- **Site sections (planned):** A "Life / Beyond Work" section covering fitness, travel, crochet, painting, and underwater hockey — to be added during redesign.
- **Contact channels on site:** Email (primary CTA), LinkedIn (secondary).

## Capabilities and Constraints

**Confirmed functionality:**
- Canvas-based scrollytelling hero with image sequence preload.
- Scroll progress indicator, smooth scroll (Lenis), text reveal animations, magnetic links, animated impact counters.
- Project cards, skills grid, awards, contact cards.

**Planned changes (user-confirmed):**
- Significant visual redesign away from the current instructor-template aesthetic.
- Non-standard color direction (not generic tech portfolio palettes).
- New personal/hobbies section integrated into site flow.
- Professional polish pass across layout, animation, and consistency.

**Technical constraints:**
- Must remain a performant static/SPA web experience (Vite build).
- Respect `prefers-reduced-motion` for accessibility.
- Do not fabricate metrics, employers, awards, or project outcomes — all work content derives from confirmed AT&T experience in existing site copy.

**Open decisions:**
- Final color world and typography (deferred to new-work / direction round).
- Exact copy, photos, and layout for the Life / Beyond Work section.
- Whether to add resume download, blog, or additional contact methods.

## Brand Commitments

- **Name:** Mansi Modi (display: *Mansi* with italic *Modi* in hero/footer per existing pattern).
- **Title:** Lead Data Scientist.
- **Location:** San Francisco Bay Area.
- **Voice:** Professional, precise, human — analytical without being cold; confident without hype.
- **Primary CTA:** Email at `mansimodi90@gmail.com`.
- **Secondary CTA:** LinkedIn at `linkedin.com/in/mansimodi`.
- **Copyright:** © 2026.

## Evidence on Hand

**Real content in repository:**
- Bio copy, impact metrics (100K+ transcripts, 10% resolve rate, 75% forecast accuracy, $2M savings), five AT&T project case studies, two AT&T awards, skills lists, contact details.
- Canvas image sequence at `/public/sequence/` (120 frames).
- Project placeholder images from Unsplash (not personal photography — replace with real assets when available).

**Absences — do not fabricate:**
- Personal hobby photos or detailed hobby narratives (structure planned; content TBD).
- Testimonials, client logos beyond AT&T, or third-party endorsements.
- Resume PDF or downloadable credentials file (not yet confirmed).
- Blog posts or published writing samples.

## Product Principles

1. **Evidence before adjectives** — lead with measurable impact and specific projects, not generic "passionate about data" language.
2. **Human after credible** — establish professional trust first, then reveal personal interests so outreach feels warm, not performative.
3. **One clear action** — email is the primary conversion; every section should support the path to reaching out.
4. **Distinct, not default** — the redesign should feel intentionally designed for Mansi, not a category-standard AI portfolio template.
5. **Motion with purpose** — animation clarifies hierarchy and arrival; it is not decoration for its own sake.

## Accessibility & Inclusion

- Target WCAG 2.1 AA contrast for all text and interactive controls.
- Honor `prefers-reduced-motion`: disable or simplify grain animation, scroll-driven effects, and non-essential motion when requested.
- Ensure keyboard navigability for links, buttons, and contact cards.
- Provide meaningful alt text for project and hobby images when added.
