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
- **The data** — `data/behaviors.html`, every one of the 510 behaviors in full: the text, its
  category, functional type, split and (folded) context passage, filterable, each row a
  permalink and a link to its own line in the source CSV.

## What is here, and what is not

**The dataset is here.** All 510 behaviors and their context strings are reproduced on
`data/behaviors.html` from the MIT-licensed repository where they are published, each row linked
to its own line in the source CSV, and every harm page shows its representative examples
verbatim. They are requests, not instructions, and their authors state they reviewed and trimmed
them before release.

**The attack tooling is not.** No jailbreak template, no persuasion script, no model completion,
and no adversarial suffix optimised against any current model. The LLM-optimizer and template
attack families are described by mechanism only. One marked exception: `attacks/gradient.html`
shows two 2023 GCG suffixes, published by their own authors as part of a disclosure, optimised
against Vicuna and Llama 2 7B Chat, as specimens of what the optimiser emits — they no longer
transfer.

## Provenance

Counts and tags are parsed from the shipped CSVs in the HarmBench repo at `main` (cloned
2026-09-08), not quoted from the paper. Results tables are from arXiv:2402.04249v2. Where the
repo and the paper disagree — and they do, in four places — the map says so and shows both.

Static site, no build step. `paper.css` is shared by every page; the spine carries its own
`<style>` block.

## Related maps

Part of [the field maps](https://idvorkin-ai-tools.github.io/).
