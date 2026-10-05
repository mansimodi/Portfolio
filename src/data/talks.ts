export interface TalkTool {
  name: string;
  url: string;
  /** One line on what it's best at — the reason to pick it, not a feature list. */
  bestFor: string;
}

export interface TalkToolCategory {
  category: string;
  tools: TalkTool[];
}

export interface Talk {
  slug: string;
  event: string;
  dates: string;
  format: string;
  minutes: number;
  title: string;
  subtitle: string;
  /** Card copy on the Work page. */
  summary: string;
  takeaways: string[];
  whyDifferent: { title: string; body: string }[];
  agenda: { title: string; body: string }[];
  formula: { letter: string; title: string; body: string; example: string }[];
  toolkit: TalkToolCategory[];
  startHere: string;
  rules: { title: string; body: string }[];
  demoPrompt: string;
  followUps: string[];
}

const PORTFOLIO_PROMPT = `ROLE
You are a senior web designer, front-end developer, and career storyteller. You build personal portfolio websites that make busy recruiters, clients, and collaborators understand who someone is in under 30 seconds — and want to reach out.

CONTEXT
About me:
- Name: [Your name]
- Title / what I do: [e.g. Lead Data Scientist, Product Designer, Freelance Photographer]
- Location: [City, or "Remote"]
- Experience: [years, industries, notable companies]
- One sentence on what makes me different: [e.g. "I turn messy customer data into decisions leadership acts on"]

Who will visit and what I want them to do:
- Visitors: [e.g. hiring managers, potential clients, conference attendees]
- The ONE action I want them to take: [e.g. email me, book a call, download my resume]

My work (3–5 highlights). For each one:
- Name: [project]
- Problem: [what was broken or needed]
- What I did: [your actions and tools]
- Result: [numbers if you have them, e.g. "saved $2M a year", "cut response time 15%"]

Everything else:
- Skills and tools: [list]
- Awards, certifications, talks, publications: [list, or "none yet"]
- Personal side (optional): [hobbies or interests that make me human]
- Links: [email, LinkedIn, GitHub, resume link]
- Look and feel: [3 adjectives, e.g. "calm, confident, modern"]. Colors I like: [ ]. Colors to avoid: [ ]. A site I admire: [link, optional]

TASK
1. Before you build anything, ask me up to 5 questions about anything missing or unclear, then wait for my answers. (If I reply "skip", go straight to step 2 and use clearly marked placeholders.)
2. Propose the plan in a few lines: the section order, a one-line headline for the top of the page, and a design direction (color palette, font pairing, overall mood). Explain each choice in one sentence.
3. Write all the copy. Lead with impact and evidence, not adjectives — no "passionate", "guru", or "results-driven". Write each project as problem → what I did → result. Use ONLY the facts I gave you. Never invent numbers, employers, or awards; if something is missing, write [ADD: what's needed] instead.
4. Build the site with these sections: a hero (name, title, headline, main call-to-action button), About, Impact in numbers (only if I gave you numbers), Projects, Skills, Awards & Talks (if any), and Contact.
5. Make it professional quality:
   - Looks great on phones, tablets, and laptops
   - Accessible: readable color contrast, alt text on images, works with a keyboard
   - Light and dark mode
   - Subtle, purposeful animation that switches off for visitors who prefer reduced motion
   - Loads fast: no heavy libraries
   - A page title, meta description, and social-share preview tags so the link looks good on LinkedIn
6. When you're done, review your own work like a tough recruiter would. List the top 3 improvements you'd make next.

OUTPUT
- A single, self-contained index.html file (HTML, CSS, and JavaScript together; Google Fonts are fine) that I can preview right here.
- After the code, give me:
  a) a 3-line summary of the design choices,
  b) a checklist of every placeholder I still need to fill in,
  c) the simplest free way to put it online, in 3 steps.
- I'll ask for changes by section name (e.g. "Projects: make the cards bigger") — change only what I ask for and keep everything else the same.`;

export const TALKS: Talk[] = [
  {
    slug: 'ai-in-motion',
    event: 'AI In Motion',
    dates: 'Oct 22–24, 2026',
    format: 'Virtual session',
    minutes: 18,
    title: 'How to Navigate Learning AI in an Ever-Evolving World',
    subtitle: 'Make AI your friend, not your enemy — and use it wisely.',
    summary:
      'A practical tour of the AI tools anyone can use today — for analysis, code, slides, websites, video, and music — plus one prompt formula that works in all of them, how to pick the right tool, and how to keep up without burning out.',
    takeaways: [
      'One prompt formula — Role, Context, Task, Output — that gets better answers from every AI tool, from chatbots to video and music generators.',
      'A short, honest list of the tools I would actually recommend for each job, and a simple test to choose between them.',
      'The rules I learned using AI on sensitive customer data at AT&T, and a 30-day plan to get genuinely good at this.',
    ],
    whyDifferent: [
      {
        title: 'From practice, not hype',
        body: 'Eight years as a data scientist at AT&T, using AI on real customer data where getting it wrong was not an option.',
      },
      {
        title: 'A skill, not a list',
        body: 'Tool lists go stale in a month. The formula you learn here works in whatever launches next.',
      },
      {
        title: 'Shown, not told',
        body: 'Real outputs side by side — including the bad ones — and a live build of this very website.',
      },
      {
        title: 'Yours to keep',
        body: 'Everything on this page, including the full website prompt, is free to copy and reuse.',
      },
    ],
    agenda: [
      {
        title: 'The big three chatbots',
        body: 'Claude, ChatGPT, and Gemini — what each is good at, and the three-model test for choosing.',
      },
      {
        title: 'The prompt formula',
        body: 'Role, Context, Task, Output, with a before-and-after demo and how to iterate without starting over.',
      },
      {
        title: 'Live demo: this website',
        body: 'Building a portfolio site with Claude, using the exact prompt below.',
      },
      {
        title: 'Creating with AI',
        body: 'Video and music generation, plus the toolkit for analysis, slides, websites, and automation.',
      },
      {
        title: 'The real-world part',
        body: 'What analyzing customer chats at AT&T taught me about using AI safely: mask, classify, count, verify.',
      },
      {
        title: 'Keep up without burning out',
        body: 'A 30-day plan to master one tool, and a weekly habit for staying current.',
      },
    ],
    formula: [
      {
        letter: 'R',
        title: 'Role',
        body: 'Tell the AI who it is today.',
        example: '"You are an experienced corporate event planner."',
      },
      {
        letter: 'C',
        title: 'Context',
        body: 'Give it the background a brilliant new hire would need.',
        example: '"40 people, Bay Area, March, $5,000 budget, half the team flies in."',
      },
      {
        letter: 'T',
        title: 'Task',
        body: 'List exactly what you want, numbered — so you can say "redo #3".',
        example: '"(1) Three venues. (2) A one-day agenda. (3) What could go wrong."',
      },
      {
        letter: 'O',
        title: 'Output',
        body: 'Describe the format, length, and tone of the result.',
        example: '"A comparison table, then the agenda as bullet points."',
      },
    ],
    toolkit: [
      {
        category: 'Think & write',
        tools: [
          { name: 'Claude', url: 'https://claude.ai', bestFor: 'Long documents, careful reasoning, writing in your voice' },
          { name: 'ChatGPT', url: 'https://chatgpt.com', bestFor: 'All-rounder with images, voice, and data analysis' },
          { name: 'Gemini', url: 'https://gemini.google.com', bestFor: 'Built into Gmail, Docs, and the rest of Google Workspace' },
          { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', bestFor: 'Word, Outlook, and Teams at Microsoft workplaces' },
        ],
      },
      {
        category: 'Research & learn',
        tools: [
          { name: 'NotebookLM', url: 'https://notebooklm.google.com', bestFor: 'Answers only from your own documents, with citations' },
          { name: 'Perplexity', url: 'https://www.perplexity.ai', bestFor: 'Web search that shows where every answer came from' },
        ],
      },
      {
        category: 'Analyze data',
        tools: [
          { name: 'Claude / ChatGPT', url: 'https://claude.ai', bestFor: 'Upload a spreadsheet, ask for trends, outliers, and charts' },
          { name: 'Copilot in Excel & Power BI', url: 'https://www.microsoft.com/microsoft-365/copilot', bestFor: 'Ask questions of the spreadsheets you already use' },
          { name: 'Databricks Genie', url: 'https://www.databricks.com', bestFor: 'Plain-English questions over company data, with dashboards' },
          { name: 'Snowflake Cortex', url: 'https://www.snowflake.com', bestFor: 'AI analysis built into your Snowflake warehouse' },
        ],
      },
      {
        category: 'Write code',
        tools: [
          { name: 'Claude Code', url: 'https://claude.com/product/claude-code', bestFor: 'An agent that builds and fixes whole projects from a description' },
          { name: 'Google Antigravity', url: 'https://antigravity.google', bestFor: "Google's agent-first coding environment" },
          { name: 'Cursor', url: 'https://cursor.com', bestFor: 'A code editor with AI built into every step' },
        ],
      },
      {
        category: 'Presentations',
        tools: [
          { name: 'Gamma', url: 'https://gamma.app', bestFor: 'An outline to a designed deck in about a minute' },
          { name: 'Canva', url: 'https://www.canva.com', bestFor: 'Friendliest design tool for non-designers' },
          { name: 'Beautiful.ai', url: 'https://www.beautiful.ai', bestFor: 'Slides that stay on-brand and auto-format' },
        ],
      },
      {
        category: 'Websites',
        tools: [
          { name: 'Claude', url: 'https://claude.ai', bestFor: 'A full portfolio site from one prompt — see the demo below' },
          { name: 'Lovable', url: 'https://lovable.dev', bestFor: 'Describe an app or site, then refine it by chatting' },
          { name: 'v0', url: 'https://v0.app', bestFor: 'Polished web interfaces from plain English' },
          { name: 'Framer', url: 'https://www.framer.com', bestFor: 'Design-forward sites without touching code' },
        ],
      },
      {
        category: 'AI video',
        tools: [
          { name: 'HeyGen', url: 'https://www.heygen.com', bestFor: 'A talking avatar of you, from a script' },
          { name: 'Synthesia', url: 'https://www.synthesia.io', bestFor: 'Training and explainer videos for work' },
          { name: 'Google Veo', url: 'https://deepmind.google/models/veo/', bestFor: 'Cinematic clips generated from a prompt' },
          { name: 'Sora', url: 'https://openai.com/sora', bestFor: 'Story-driven clips with sound' },
          { name: 'Runway', url: 'https://runwayml.com', bestFor: 'Creative control over generated video' },
          { name: 'Kling', url: 'https://klingai.com', bestFor: 'Realistic people and motion' },
        ],
      },
      {
        category: 'Edit video',
        tools: [
          { name: 'Descript', url: 'https://www.descript.com', bestFor: 'Edit a video by editing its transcript' },
          { name: 'CapCut', url: 'https://www.capcut.com', bestFor: 'Auto-captions and text templates for social video' },
        ],
      },
      {
        category: 'Music',
        tools: [
          { name: 'Suno', url: 'https://suno.com', bestFor: 'A finished song, vocals included, from a description' },
          { name: 'ElevenLabs Music', url: 'https://elevenlabs.io/music', bestFor: 'Trained on licensed music; cleared for commercial use' },
          { name: 'Udio', url: 'https://www.udio.com', bestFor: 'Instrumentals — check its current terms before you use it' },
        ],
      },
      {
        category: 'Images',
        tools: [
          { name: 'Gemini / ChatGPT images', url: 'https://gemini.google.com', bestFor: 'Quick visuals for slides and posts, right in the chat' },
          { name: 'Adobe Firefly', url: 'https://firefly.adobe.com', bestFor: 'Trained on licensed images; safer for commercial work' },
          { name: 'Midjourney', url: 'https://www.midjourney.com', bestFor: 'Striking, artistic imagery' },
        ],
      },
      {
        category: 'Automate',
        tools: [
          { name: 'Make', url: 'https://www.make.com', bestFor: 'Visual drag-and-drop workflows that connect your apps' },
          { name: 'n8n', url: 'https://n8n.io', bestFor: 'Open-source automations with AI steps; self-host for full control' },
          { name: 'Zapier', url: 'https://zapier.com', bestFor: 'The simplest "when this happens, do that" automations' },
        ],
      },
    ],
    startHere:
      'If you only try three: a chatbot for thinking (Claude, ChatGPT, or Gemini), Canva or Gamma for creating, and NotebookLM for learning.',
    rules: [
      {
        title: 'Protect what is private',
        body: 'Never paste customer data, passwords, or confidential work into public AI tools. Use what your company approves, or strip sensitive details first.',
      },
      {
        title: 'Verify',
        body: 'AI can be confidently wrong. Check the numbers, open the sources, test the code.',
      },
      {
        title: 'Be transparent',
        body: "If AI made it — especially a face, voice, or video of a person — say so. Never create AI content of a real person without their permission.",
      },
      {
        title: 'Own the output',
        body: 'AI writes the first draft. You are the editor, and your name is on the result.',
      },
    ],
    demoPrompt: PORTFOLIO_PROMPT,
    followUps: [
      'Hero: make it bolder and give me three alternative headlines to choose from.',
      'Projects: rewrite #2 so the result comes first.',
      'Check the whole page for accessibility issues and fix them.',
      'Add a "Speaking" section with one talk, and make it clickable to a detail page.',
    ],
  },
];

export function getTalk(slug: string | undefined): Talk | undefined {
  return TALKS.find((talk) => talk.slug === slug);
}
