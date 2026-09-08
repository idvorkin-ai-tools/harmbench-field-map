# HarmBench, mapped

A field map of [HarmBench](https://github.com/centerforaisafety/HarmBench) (Mazeika et al.,
[arXiv:2402.04249](https://arxiv.org/abs/2402.04249)) — the standardized evaluation framework
for automated red teaming.

**Live: https://idvorkin-ai-tools.github.io/harmbench-field-map/**

Eighteen pages plus a spine and a behavior index:

- **The harms** — one page per semantic category (`harms/`), so you can browse the benchmark by
  the kind of harm rather than by the paper's section order. Cybercrime, Illegal Activities,
  Copyright, Misinformation, Chemical & Biological, General Harm, Harassment & Bullying.
- **The types** — the four functional categories (`types/`): standard, contextual, copyright,
  multimodal. Three different grading paths hide behind one ASR number.
- **The attacks** — eighteen red teaming methods in three families (`attacks/`), each with an
  `id` anchor so other pages can deep-link a single method.
- **Measuring** — the classifier, the pipeline, the results, the defenses (`measure/`).
- **The data** — `data/behaviors.html`, every one of the 510 behavior IDs with its category,
  functional type and split, filterable, each row linking to its harm page.

## Safety line

No page reproduces a behavior string, a context passage, a jailbreak template, or a working
adversarial suffix. Attack pages explain mechanisms and cite the primary papers; they do not
carry prompts. Behaviors are named by the IDs that are already public in the HarmBench repo and
described at the level of what they ask for.

## Provenance

Counts and tags are parsed from the shipped CSVs in the HarmBench repo at `main` (cloned
2026-09-08), not quoted from the paper. Results tables are from arXiv:2402.04249v2. Where the
repo and the paper disagree — and they do, in three places — the map says so and shows both.

Static site, no build step. `paper.css` is shared by every page; the spine carries its own
`<style>` block.

## Related maps

Part of [the field maps](https://idvorkin-ai-tools.github.io/).
