export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ArticleType =
  | 'opinion'
  | 'tutorial'
  | 'research'
  | 'architecture'
  | 'case-study'
  | 'open-source'
  | 'career'
  | 'learning';
export type Category =
  | 'ai'
  | 'programming'
  | 'backend'
  | 'open-source'
  | 'career'
  | 'research'
  | 'web'
  | 'databases'
  | 'system-design'
  | 'productivity';

export interface Post {
  slug: string;
  file: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  excerpt: string;
  tags: string[];
  category: string;
  articleType: ArticleType;
  difficulty: Difficulty;
  readingMinutes: number;
  wordCount: number;
  featured?: boolean;
  draft?: boolean;
  coverImage?: string;
  canonical?: string;
  series?: {
    name: string;
    part: number;
    total: number;
  };
  github?: string;
  demo?: string;
  project?: string;
  repository?: string;
  language?: string;
  status?: 'draft' | 'published' | 'updated' | 'major-revision';
  license?: string;
  relatedPosts?: string[];
  relatedProjects?: string[];
  body: string;
}

export const posts: Post[] = [
  {
    slug: 'america-vs-china-ai',
    file: 'america-vs-china-ai.md',
    title: 'The Quiet Race: How Chinese AI Models Are Catching Up',
    description:
      'GLM, DeepSeek, Qwen — open-source models out of China are closing the gap on GPT-4 and Claude faster than most people realise.',
    date: '2025-07-10',
    updatedDate: '2025-07-15',
    excerpt:
      'GLM, DeepSeek, Qwen — open-source models out of China are closing the gap on GPT-4 and Claude faster than most people realise. Here is what the benchmarks actually say, and what it means for developers right now.',
    tags: ['ai', 'technology', 'geopolitics', 'open-source', 'deepseek', 'llm'],
    category: 'ai',
    articleType: 'research',
    difficulty: 'intermediate',
    readingMinutes: 11,
    wordCount: 1850,
    featured: true,
    status: 'updated',
    license: 'CC BY-NC 4.0',
    series: {
      name: 'The AI Landscape',
      part: 1,
      total: 3,
    },
    relatedPosts: ['how-people-think-about-ai'],
    relatedProjects: ['quizforge', 'college-sahayak'],
    body: `# The Quiet Race: How Chinese AI Models Are Catching Up

There is a story the Western tech press likes to tell about AI. It goes something like this: OpenAI leads, Anthropic pushes back, Google plays catch-up, and somewhere in the background, Chinese labs are working on inferior imitations gated behind the Great Firewall. The narrative is tidy, patriotic, and increasingly wrong.

Over the past eighteen months, a quiet revolution has been happening. Models coming out of Chinese labs — DeepSeek, Zhipu AI's GLM series, Alibaba's Qwen — are not just competitive. On specific benchmarks and real developer tasks, several of them match or outperform GPT-4 and Claude Sonnet at a fraction of the inference cost. More importantly, they are open-source. That changes everything.

## What is actually happening in the benchmarks

Let me be specific, because vague claims about "catching up" are useless.

**DeepSeek-R1**, released in January 2025, matched GPT-o1's reasoning performance on AIME 2024 (American Invitational Mathematics Examination) and outperformed it on several coding benchmarks, including HumanEval and SWE-bench. It did this with an architecture that was substantially cheaper to train and run. When DeepSeek published their technical report with full methodology, researchers at Stanford, MIT, and several European universities independently reproduced the results. This was not a PR stunt.

**Qwen 2.5 Coder 32B**, from Alibaba's research division, became in late 2024 one of the strongest open-source coding models available, outperforming CodeLlama 70B and matching GPT-4 Turbo on code completion tasks in multiple evaluations. For context: this is a 32-billion parameter model you can run locally on a decent consumer GPU. GPT-4 Turbo is a closed API that costs money per token and lives entirely on OpenAI's servers.

**GLM-4**, from Zhipu AI, has consistently scored within a few percentage points of GPT-4 on MMLU (Massive Multitask Language Understanding), which tests breadth of knowledge across 57 academic subjects. On Chinese-language tasks — which matter a great deal to the 1.4 billion people who speak Mandarin — GLM-4 routinely outperforms every Western model including Claude 3 Opus and GPT-4o.

Now, benchmarks are not the whole picture. They are gameable, narrow, and often poor proxies for real-world usefulness. I have used DeepSeek-R1, Qwen 2.5, and GLM-4 on actual projects — building quiz generation logic for QuizForge, structuring data extraction for College Sahayak, reviewing architecture decisions. My honest assessment: for structured reasoning tasks, DeepSeek-R1 is genuinely competitive with o1. For code generation with clear specs, Qwen 2.5 Coder is as good as GPT-4 Turbo and sometimes better at understanding context across large files. For anything requiring Chinese cultural or linguistic nuance, GLM-4 is in a different league from Western models.

## Why open source is the real story

The benchmark numbers matter, but the open-weight release strategy is what makes this a structural shift, not just a temporary catch-up.

When Meta released Llama 2, and then Llama 3, something important happened: the entire AI ecosystem got a free baseline that everyone could fine-tune, modify, and deploy. Thousands of researchers, startups, and individual developers built on top of it. Capability diffused rapidly and cheaply. This is how the web grew. This is how Linux grew. Open source creates compounding returns that closed systems cannot match in the long run.

Chinese labs have learned this lesson. DeepSeek's R1 is fully open-weight under an MIT-style license. Qwen 2.5 models are Apache 2.0. You can download them, run them locally, fine-tune them on your own data, deploy them on your own infrastructure. You have no API limits, no usage policies that change without notice, no vendor lock-in. For many production applications, this is not just "nice to have" — it is the deciding factor.

Compare this to OpenAI's trajectory. GPT-4's weights have never been released. GPT-4o is slightly cheaper than its predecessor but still closed. OpenAI's response to competitive pressure has generally been to lower prices and add features, not to open up. Anthropic is similarly closed. Both companies have legitimate safety-motivated arguments for keeping weights private. I am not saying those arguments are wrong. But the practical effect is that every developer who builds on their APIs is dependent on a single company's pricing, uptime, and policy decisions.

Open-source models from any lab — Chinese or American — reduce that dependency. They distribute capability more broadly. And right now, Chinese labs are doing more open-weight releasing than their Western counterparts. That matters.

## The geopolitical layer no one talks about clearly

There is an uncomfortable irony in US semiconductor export controls. By restricting NVIDIA GPU exports to China, the policy intended to slow Chinese AI development. The effect has been to force Chinese labs to do more with less — to optimise architectures, to run leaner training runs, to develop inference techniques that require less compute. DeepSeek-R1's training cost a small fraction of what GPT-4 reportedly cost. Part of that is clever architecture. Part of it is that they had to be clever because they could not just throw money and H100s at the problem.

I am not a geopolitics expert, and I will not pretend the chip controls are simply counterproductive. The reality is complicated — controlling cutting-edge compute does create bottlenecks for certain classes of research. But the idea that you can simply deny a country of 1.4 billion people with a centuries-long tradition of mathematics and engineering the ability to build competitive AI systems is, at this point, clearly not how it works.

The more interesting question is what productive co-existence looks like. CERN is the obvious model — a genuinely international scientific collaboration where the work of one institution immediately benefits everyone else, including geopolitical rivals. AI research does not look like that right now. It looks like a race with escalating classification of research and increasing distrust between labs in different countries. That is not good for science, and it is not good for anyone trying to build things using the best available tools.

In the meantime, as a developer: the best model for your task is the best model for your task. If DeepSeek-R1 solves a reasoning problem better than o1 and costs 10x less to run, use DeepSeek-R1. The geopolitical anxieties of your government are not relevant to your pull request.

## What this means for developers right now

Here is the practical synthesis, because this piece should end with something you can actually act on.

**The frontier is plural.** There is no longer one "state of the art" model. GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek-R1, Qwen 2.5 Coder, and GLM-4 are all genuinely capable tools. Each has strengths. Stop reading coverage that evaluates them only against each other and ignores half the field.

**Open-weight models are now production-ready for many tasks.** If you are building something where you care about cost, privacy, or deployment flexibility — running an open model locally or on a provider like Together.ai or Fireworks.ai is worth seriously evaluating. Qwen 2.5 Coder 32B for code review, Llama 3.1 70B for general tasks, DeepSeek-R1 for reasoning-heavy work — these are not research experiments, they are production-grade tools.

**Benchmark literacy matters.** When you see a headline claiming one model "beats" another, go read the actual evaluation. Which tasks? What evaluation set? Who ran it? Is the eval publicly reproducible? Many benchmark comparisons are cherry-picked. LMSYS Chatbot Arena is the most honest leaderboard because it uses human preference votes across millions of blind comparisons — check it.

**The cost gap is real.** Running inference through DeepSeek's API costs roughly 10-20x less per token than GPT-4o for equivalent tasks. For high-volume applications — a bot that answers thousands of queries a day, a document processing pipeline — this is not a minor consideration. It is the difference between a product that is economically viable and one that is not.

## My take

I am a diploma student in Pune, not a Washington policy analyst. I build things. And from where I sit, watching this play out over the past couple of years, what strikes me most is that the "AI race" framing — America vs China, closed vs open, safety vs capability — is too simple to be useful.

The reality is that capability is diffusing, faster than anyone expected. Labs that were nowhere 18 months ago are now shipping models that sit within a few percentage points of the frontier. Open-source releases are accelerating that diffusion. The developers and companies that treat this as a static landscape with two or three dominant providers will get left behind.

Competition is messy and sometimes uncomfortable. It is also how we get better tools faster. The fact that I can today pull a weights file for a model that rivals GPT-4, run it on local hardware, fine-tune it on my own data, and deploy it without paying anyone a per-token fee — that is genuinely extraordinary. That was not true two years ago.

The race is not quiet anymore. Pay attention.`,
  },
  {
    slug: 'how-people-think-about-ai',
    file: 'how-people-think-about-ai.md',
    title: 'Four Ways People Think About AI — And One That Actually Makes Sense',
    description:
      'AI builders, AI deniers, AI fearers, and people who just use it. Here is how I map the landscape in mid-2025.',
    date: '2025-07-14',
    excerpt:
      'AI builders, AI deniers, AI fearers, and people who just use it. Here is how I map the landscape in mid-2025, and why I think the productivity unlock is still massively underestimated — including by the people building the tools.',
    tags: ['ai', 'opinion', 'productivity', 'career', 'learning'],
    category: 'opinion',
    articleType: 'opinion',
    difficulty: 'beginner',
    readingMinutes: 12,
    wordCount: 2400,
    featured: true,
    status: 'published',
    license: 'CC BY-NC 4.0',
    series: {
      name: 'The AI Landscape',
      part: 2,
      total: 3,
    },
    relatedPosts: ['america-vs-china-ai'],
    relatedProjects: ['the-future-you', 'persona'],
    body: `# Four Ways People Think About AI — And One That Actually Makes Sense

I have been building software for about three years. In that time, I have watched the way people talk about AI shift from curious-and-excited to polarised in a way that makes genuine conversation increasingly hard. Everyone seems to have found a camp, and the camps are not always talking to each other honestly.

I want to try to map the landscape as I actually see it — not as a comprehensive academic taxonomy, but as a practical sketch from someone who has been building with these tools, watching them improve, and noticing how different people are relating to them. There are four archetypes I keep running into. Three of them, I think, are getting something importantly wrong.

## The four archetypes

### 1. The Builders — people who are actually inventing AI

This category is smaller than it sounds. I mean people who are working on foundation models: the researchers at OpenAI, Anthropic, DeepMind, Mistral, Zhipu AI, Cohere, and the handful of other labs actually training the models from scratch. The engineers doing RLHF, the mathematicians working on alignment, the infrastructure teams running the clusters.

This is not a large group. It is probably a few thousand people globally who are doing the actual core research and engineering work of building the foundation layer. They are working on genuinely hard problems: how do you make a model that reasons reliably rather than confabulates? How do you align a system's values without overconstrictng its usefulness? How do you make inference cheap enough that the technology can actually scale to everyone?

I follow a few of them on Twitter. Reading what they actually write about — as opposed to what press releases say they write about — is instructive. They are much more uncertain about the trajectory than the hype suggests. They are dealing with hard, unsolved problems. They are often worried. Some of them are building products they genuinely fear, because they believe the alternative — someone else building them without safeguards — is worse. That is a real ethical position and I think it deserves more honest engagement than it usually gets.

What confuses me is how often people conflate "using GPT" with "building AI." If you are using Claude to write emails, you are not building AI. You are using a product. That is fine — I use these products constantly. But the conflation creates a weird situation where people describe themselves as "AI people" because they have a ChatGPT subscription, without understanding anything about how the system works or who built it. The builders are in a completely different category.

### 2. The Deniers — it's just autocomplete and it won't take anyone's job

I still meet people in this camp at the end of 2025, which genuinely surprises me. The argument usually goes one of two ways.

The first version is technical: "It's just predicting the next token, it doesn't understand anything, it's autocomplete at scale." This is technically accurate about the mechanism and almost completely useless as an observation. A calculator "just" does arithmetic. A search engine "just" does link ranking. The question is not the mechanism, it is what the mechanism enables. Modern large language models, when used correctly, demonstrably solve problems that required human expertise a few years ago. Calling it autocomplete is like calling a nuclear reactor "just boiling water." Technically true, practically misleading.

The second version is economic: "These tools are overhyped, they make too many mistakes, they will not replace professionals." There is a grain of truth here — many AI demos overstate reliability, and there are absolutely tasks where current models are not production-ready without significant human oversight. But the trajectory matters as much as the current state. The models from two years ago made more mistakes than the current ones. The current ones will make fewer mistakes than the models in two years. The trend is clear and it is not reversing.

The most important thing about denial is who it costs. In my observation, the people most likely to deny AI's impact are often the most at risk from it. Middle-skill knowledge work — writing reports, summarising documents, doing basic coding, generating marketing copy, answering support tickets — is exactly the domain where current AI tools are most capable. If you do that work, and you are not learning to work with AI tools, you are not safe. You are just unaware.

I am not saying this to alarm anyone. I am saying it because I have watched friends spend energy dismissing tools they have not seriously tried, and I think that energy would be better spent learning to use them.

### 3. The Fearers — Skynet, job apocalypse, humanity's last invention

The fearers have a more sophisticated position than the deniers, and some of the brightest people I respect are in this camp — genuinely worried about the long-term trajectory of increasingly powerful AI systems. I take those concerns seriously.

But the popular version of AI fear — the one you see in breathless newspaper columns and social media threads — usually gets the framing wrong in an important way. The fear is usually expressed as: "AI will take everyone's job." The more accurate framing is: "People who use AI well will take jobs from people who do not." That is a very different claim, with very different implications.

Historical parallels are instructive here. When pocket calculators became widespread in the 1970s, there were genuine fears that accountants and engineers would be made redundant. What actually happened: the pool of people doing quantitative work expanded dramatically because calculations that would have taken days now took minutes. New categories of work emerged. The people who resisted calculators for too long did lose ground, but it was not because machines replaced them — it was because other humans, armed with better tools, outcompeted them.

The same thing happened with the internet. The same thing happened with smartphones. In each case, the feared mass displacement was partial: specific roles did shrink or disappear, but new roles emerged, often more interesting ones. The net effect on employment was positive. The distribution was not smooth — some people and communities lost out badly — and that distributional harm is real and worth taking seriously. But the "total displacement" story has been wrong every time it has been told.

I do think AI is a bigger deal than the calculator or the internet. The breadth of cognitive tasks it can assist with is qualitatively different. I hold open the possibility that this time is genuinely different in important ways. But I think starting from "this is a catastrophe" instead of "this is a major transition that requires adaptation" leads to worse decisions — both individually and as policy.

The practical implication for someone early in their career, as I am: run toward it, not away from it.

### 4. The Pragmatists — just use it

This is the camp I am in, and I think it is the correct one. The pragmatist position is not "AI is magic and will solve everything" and it is not "AI is overhyped noise." It is: these are tools with real capabilities and real limitations, and the intelligent move is to understand both and use them accordingly.

The pragmatist uses Claude to draft documentation and reads it carefully before publishing. They use GitHub Copilot and catch the bugs it introduces, because it does introduce bugs. They run DeepSeek-R1 for hard reasoning tasks because it is good at those. They know which tasks to give AI and which tasks require human judgment, and they are continuously updating that map as the models improve.

The pragmatist is also honest about productivity. I will get to my specific numbers in a moment, but the honest version of the productivity story is not "I do the same work in less time." It is "I do work I could not have done at all, now." That is a different and more interesting claim.

## My POV: the 5x developer is real and I have lived it

I want to be specific here, because vague claims about productivity are as useless as vague claims about AI capability.

I am a diploma student. I do not have years of industry experience. I do not have a team. I have a laptop, a college hostel room, an internet connection, and access to AI tools that did not exist three years ago.

In the last two years, I have shipped: College Sahayak, a WhatsApp bot used daily by 180+ classmates that required building an OCR pipeline, a PostgreSQL schema, and a natural language query layer. QuizForge, a PDF-to-quiz system with retrieval-augmented generation, difficulty calibration, and citation linking. AniCafe, a full PWA with offline support, billing flows, and a Supabase sync layer. The Future You, an AI companion with video processing and longitudinal insight tracking. Persona, a typed AI persona system with versioning. Generation Tools, a 12-tool developer utility suite. GPA LMS, an actual learning management system deployed to two departments.

That is not a portfolio I built slowly, carefully, with a team over years. Most of those projects were built over weeks, often over weekends. Some started as experiments and turned into things people actually use.

I am not a genius. I am not exceptional. I am someone who learned to use AI tools aggressively and honestly — asking them for help with architecture decisions, letting them write boilerplate while I think about what the boilerplate should do, using them to review my own reasoning, using them as a rubber duck when I am stuck.

The honest time savings: for work that fits AI well (writing boilerplate, generating test cases, reviewing code for obvious errors, drafting documentation), I am probably 3-5x faster than I would be without AI tools. For work that does not fit AI well (novel system design, debugging subtle race conditions, understanding unfamiliar codebases, making product decisions), the tools help less, and pretending otherwise leads to bad results.

The more important thing than speed is range. Without AI tools, I could not have built College Sahayak's OCR pipeline alone — I do not have deep expertise in document processing. With them, I could build something functional because the tools helped me understand the problem space quickly, pointed me toward the right libraries, helped me write and debug code in a domain I did not know. My effective capability is wider than my formal training.

That is the real unlock. Not "I do the same things faster." But "I can attempt things I would otherwise not have attempted."

## What this means if you are learning to code right now

This is the part I want to get right, because I talk to a lot of people in roughly my situation — students, self-taught developers, people earlier in their careers who are figuring out how to navigate this moment.

**Do not avoid AI tools.** This is the most important thing. Using AI to help you write code is not cheating, it is not a shortcut that will make you worse, it is not going to make learning obsolete. It is the same as using Stack Overflow was in 2010, or using Google was in 2005. The people who moralised about "looking things up" were wrong then, and the people moralising about AI assistance are wrong now. The skill is never "can you write this from scratch without any help." The skill is "can you solve the problem, verify the solution, and understand what you have built well enough to maintain and extend it."

**Learn what AI is bad at.** AI is confidently wrong sometimes. It invents function signatures. It writes code that looks plausible and fails in subtle ways. It misunderstands your requirements in ways that take hours to debug if you are not reading carefully. The people who use AI well are the ones who have calibrated intuitions for when to trust it and when to check. That calibration comes from experience — from having it fail on you and learning what the failure modes look like.

**Build things and ship them.** The learning is in the doing. Reading about AI capabilities is much less useful than building something that uses them and running into the real limitations. I learned more about what DeepSeek-R1 is good at from using it on College Sahayak than from reading any number of benchmark papers.

**The skill that compounds is taste.** Knowing what to build, knowing whether something is working, knowing when code is good or bad — that is the skill that AI does not replace. It helps you execute. It does not help you decide what to execute. Developing taste for good software — reading code, studying systems, thinking carefully about what makes products useful — that is the long-term investment that matters.

## Where I think this goes

My honest prediction: the number of meaningful things a single developer can build, maintain, and operate will continue to grow. The tools will keep getting better. The capability gap between "individual with good AI tools" and "small team without AI tools" will keep narrowing for certain categories of work.

This means the individual developer — who can move fast, take risks, build things for users they actually know, iterate without committee approval — has a structural advantage that did not exist before. The challenge is developing the judgment to use that leverage well.

I do not think AI replaces developers. I think it raises the floor of what you can do with given effort, which means the ceiling for what ambitious individuals can achieve is much higher than it used to be. The developers who adapt — who learn to think of AI as a collaborator, who develop taste for what the tools do well and honest scepticism about what they do badly — are going to have a genuinely interesting decade.

The ones who do not adapt will not be replaced by AI. They will be outcompeted by people who use AI better. That is a distinction that matters for how you think about the problem.

I am betting on adapting. So far it has worked out.`,
  },
];
