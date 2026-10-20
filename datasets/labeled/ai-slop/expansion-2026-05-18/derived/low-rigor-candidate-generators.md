# Low-Rigor Candidate Generators

These sources are useful for hypothesis generation, not direct rule adoption.

## aismells

- URL: `https://aismells.com/`
- Useful candidate families:
  - Delve/vocab tics: `delve`, `delve into`, `delve deeper`, `tapestry`, `landscape`, `realm`, `paradigm`, `multifaceted`, `nuanced`.
  - Sentence formulas: `It's not X -- it's Y`, `No X. No Y. Just Z.`, `The result? Devastating.`
  - Tone formulas: `Here's the thing`, `Here's the kicker`, `Let's unpack this`, `Let's break this down`.
  - Formatting formulas: repeated bold labels, repeated emoji bullets, high em-dash density.
- Slopless use: derive density-gated tests and no-hit fixtures.
- Risk: source explicitly prefers perception-oriented detection and false positives over false negatives.

## SynkrLAB

- URLs:
  - `https://synkrlab.com/chatgpts-most-overused-words-and-phrases/`
  - `https://synkrlab.com/how-is-the-use-of-chatgpt-obvious-in-the-workplace/`
- Useful candidate families:
  - Time-based intros: `In today's digital age`, `In the age of`, `In the realm of`, `In the world of`.
  - Formula shells: `It is not just about X, it is also about Y`, `Let us delve into the world of`, `To delve into the`.
  - Corporate words: `seamless`, `robust`, `scalable`, `innovative`, `cutting-edge`, `next-generation`, `mission-critical`, `holistic`.
  - Metaphor tropes: `a tapestry of insights`, `a tapestry of complexity`.
- Slopless use: cross-check against rigorous sources before promoting any term.
- Risk: marketing blog list with broad words and many ordinary business terms.

## SlopDetector Taxonomy

- URL: `https://slopdetector.org/slop-taxonomy`
- Useful categories:
  - Generic slop: vague, templated, no concrete details.
  - Pseudo-insight slop: profound-sounding but content-free.
  - Fake authority slop: confident tone without sources.
  - Wikipedia rehash: basic definitions without analysis.
  - Wellness slop: universal soothing advice.
- Useful candidate phrases:
  - `In today's fast-paced world`
  - `It's more important than ever`
  - `Whether you're a beginner or an expert`
  - `The key to success is`
  - `By leveraging best practices`
  - `The key is to find balance`
  - `Something shifted`
  - `Studies have shown`
  - `X is defined as`
  - `Self-care isn't selfish`
  - `Give yourself grace`
- Slopless use: fixture families for semantic thinness and source-less authority.
- Risk: generated-looking page and opinionated taxonomy. Treat as labels and examples, not evidence.

## Your AI Slop Bores Me

- URL: `https://www.youraislopbores.com/`
- Useful signal:
  - Cultural proof that users can intentionally imitate AI tone.
  - Good future corpus idea: collect consensual, licensed "human pretending to be AI" text if the service ever exposes exportable data.
- Slopless use: no direct phrases. Use as false-positive warning.
- Risk: not a stable corpus; participants intentionally parody AI.

## ChatGPT Cliche Gists

- Captured:
  - `https://gist.github.com/chrisgherbert/c734ec50ae464135be57cd03b84281f9`
- Existing repo captures:
  - `datasets/labeled/ai-slop/llm-slop-lists/community-gists/chrisgherbert-chat-gpt-cliches.md`
  - `datasets/labeled/ai-slop/llm-slop-lists/community-gists/pvgomes-chatgpt-words.md`
  - `datasets/labeled/ai-slop/llm-slop-lists/community-gists/miglen-gpt-instructions.md`
- Useful repeated terms:
  - `delve`, `tapestry`, `vibrant`, `landscape`, `realm`, `embark`, `excels`, `vital`, `comprehensive`, `intricate`, `pivotal`, `moreover`.
- Slopless use: overlap confirmation only.
- Risk: community lists are unsourced and biased toward recognizability.
