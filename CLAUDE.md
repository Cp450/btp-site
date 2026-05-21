# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`btp-site` is a Node.js (CommonJS) project at an early stage. The repository currently has no build system, test framework, or application code beyond the BMAD framework installation.

## BMAD Framework

BMAD v6.2.2 is installed under `_bmad/`. Key paths:

- `_bmad/_config/` — installation config (`manifest.yaml`, skill/agent manifests, IDE config)
- `_bmad/_config/agents/` — custom agent definitions (currently empty)
- `_bmad/_config/custom/` — custom skill/config overrides (currently empty)
- `_bmad/core/` — core skill implementations (each skill has a `SKILL.md`)
- `_bmad/core/config.yaml` — user config: `user_name: NPJ_CP450`, outputs to `_bmad-output/`

BMAD output artifacts are written to `{project-root}/_bmad-output/` (not yet created).

## Available BMAD Skills

Invoked via `/bmad-<skill-name>` or the Skill tool:

| Skill | Purpose |
|---|---|
| `bmad-init` | Initialize/load project config — run first when other skills need config |
| `bmad-help` | Navigate BMad and recommend next steps |
| `bmad-brainstorming` | Structured ideation sessions |
| `bmad-distillator` | Lossless LLM-optimized document compression |
| `bmad-editorial-review-prose` | Copy-editing for communication clarity |
| `bmad-editorial-review-structure` | Structural editing (cuts, reorganization) |
| `bmad-advanced-elicitation` | Deeper critique (Socratic, first principles, red team) |
| `bmad-review-adversarial-general` | Cynical/critical findings report |
| `bmad-review-edge-case-hunter` | Exhaustive edge-case analysis |
| `bmad-shard-doc` | Split large markdown docs by H2 sections |
| `bmad-index-docs` | Generate/update `index.md` for a folder |
| `bmad-party-mode` | Multi-agent group discussion orchestration |

## Package Scripts

Currently no functional scripts. `npm test` exits with error by default.
