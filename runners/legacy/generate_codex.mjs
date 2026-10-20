// Generate an AI-slop corpus slice with codex (non-Claude model diversity).
// Writes one markdown doc per (topic, subtopic) into ai-generated/<topic>/codex/.
import { execFile } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { promisify } from "node:util";
const exec = promisify(execFile);

const ROOT = "/Users/tartakovsky/Projects/agent-quality-controls/slopless";
const TOPICS = {
  medical: ["managing type 2 diabetes", "the benefits of intermittent fasting", "how to improve gut health", "understanding seasonal allergies", "tips for better sleep", "what to know about chronic migraines", "boosting your immune system naturally", "the truth about cholesterol"],
  legal: ["what to do after a car accident", "how to form an LLC", "understanding tenant rights", "the basics of estate planning", "handling a contract dispute", "what an NDA actually covers", "filing a small claims case", "intellectual property for startups"],
  science: ["how CRISPR gene editing works", "the science of black holes", "why the gut microbiome matters", "how mRNA vaccines work", "the basics of quantum computing", "what causes climate change", "the search for dark matter", "how the brain forms memories"],
  tech: ["getting started with Kubernetes", "why your startup needs a data strategy", "the rise of edge computing", "how to choose a tech stack", "an introduction to vector databases", "the future of remote work tools", "what is a zero-trust architecture", "scaling microservices the right way"],
  motivational: ["building unstoppable morning habits", "how to find your true purpose", "overcoming self-doubt", "the power of a growth mindset", "why consistency beats motivation", "turning failure into fuel", "the discipline of showing up", "designing a life you love"],
  business: ["scaling your startup the right way", "building a customer-obsessed culture", "the art of the perfect pitch", "why company values matter", "leading through uncertainty", "the future of B2B marketing", "building a high-performing team", "the playbook for product-led growth"],
  finance: ["how to start investing in your 20s", "understanding index funds", "crypto for absolute beginners", "how to build an emergency fund", "what is dollar cost averaging", "planning for early retirement", "getting out of credit card debt", "the psychology of money"],
  food: ["the perfect weeknight pasta", "how to meal prep for the week", "the secret to crispy roast potatoes", "a beginner's guide to sourdough", "easy plant-based dinners", "mastering homemade pizza", "the ultimate guide to meal planning", "how to build the perfect salad"],
  travel: ["a weekend guide to Lisbon", "how to travel on a budget", "hidden gems in Japan", "tips for solo travelers", "how to pack like a pro", "the ultimate road trip checklist", "the best digital nomad cities", "how to find cheap flights"],
  education: ["how to study more effectively", "the future of online learning", "why project-based learning works", "building better study habits", "how to learn a language fast", "the benefits of lifelong learning", "making remote classrooms engaging", "the case for microlearning"],
  fitness: ["building a sustainable workout routine", "the truth about protein intake", "how to start running", "why recovery days matter", "strength training for beginners", "the benefits of daily walking", "building core strength at home", "the science of muscle growth"],
  parenting: ["managing screen time for kids", "raising resilient children", "gentle parenting explained", "handling toddler tantrums", "building a bedtime routine", "fostering a love of reading", "navigating the teenage years", "positive discipline that works"],
  news: ["what the latest AI breakthrough means", "the impact of remote work on cities", "understanding the housing crisis", "the global push for clean energy", "what to know about the new privacy law", "the future of electric vehicles", "why supply chains keep breaking", "the rise of the creator economy"],
  realestate: ["how to buy your first home", "staging tips that sell", "understanding mortgage rates", "is now a good time to buy", "how to find the right realtor", "renovations with the best ROI", "the pros and cons of renting", "investing in rental property"],
  reviews: ["a review of the latest flagship phone", "is this productivity app worth it", "the best wireless earbuds this year", "why I switched note-taking tools", "an honest review of a meal kit", "the standing desk that changed my workflow", "the smartwatch I can't live without", "the project tool every team needs"]
};
const FORMATS = [
  (s) => `Write a blog post about ${s}. Around 450 words.`,
  (s) => `Write a beginner's guide to ${s}. Around 450 words.`,
  (s) => `Write a LinkedIn thought-leadership post about ${s}. Around 300 words.`,
  (s) => `Write an article explaining ${s} for a general audience. Around 450 words.`,
  (s) => `Write a listicle titled "7 things you should know about ${s}". Around 450 words.`,
  (s) => `Write an inspirational piece about ${s}. Around 350 words.`
];

const tasks = [];
for (const [topic, subs] of Object.entries(TOPICS)) {
  subs.forEach((sub, i) => {
    tasks.push({ topic, idx: i + 1, prompt: `${FORMATS[i % FORMATS.length](sub)} Output only the article in markdown, no preamble or sign-off.` });
  });
}

const CONC = 3;
let done = 0, written = 0, skipped = 0;
const queue = [...tasks];

async function run(task) {
  const dir = `${ROOT}/datasets/corpus/ai-generated/${task.topic}/codex`;
  mkdirSync(dir, { recursive: true });
  const out = `${dir}/codex-${String(task.idx).padStart(3, "0")}.md`;
  const tmp = `${ROOT}/datasets/experiments/codexgen_${task.topic}_${task.idx}.txt`;
  if (existsSync(out)) { done += 1; skipped += 1; return; }
  try {
    await exec("codex", ["exec", task.prompt, "-o", tmp], { timeout: 240000, maxBuffer: 5e7 });
    const body = existsSync(tmp) ? readFileSync(tmp, "utf8").trim() : "";
    if (body.split(/\s+/).filter(Boolean).length >= 120) {
      writeFileSync(out, `<!-- ai-generated; model=codex; topic=${task.topic}; subtopic-idx=${task.idx} -->\n\n${body}\n`);
      written += 1;
    }
  } catch { /* skip on error/timeout */ }
  done += 1;
  if (done % 8 === 0) console.log(`codex: ${done}/${tasks.length} (${written} written, ${skipped} pre-existing)`);
}

async function worker() { while (queue.length) await run(queue.shift()); }
await Promise.all(Array.from({ length: CONC }, () => worker()));
console.log(`codex generation complete: ${written} written, ${skipped} skipped, ${tasks.length} total`);
