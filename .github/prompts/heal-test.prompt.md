---
description: Diagnose a Playwright failure and make the smallest evidence-based fix
argument-hint: Provide the failing test path and actual error or test output
agent: "playwright-test-healer"
---

Read the failing test path and the actual failure message or test output supplied in this request. If either is missing, ask for it; do not run tests or make speculative edits.

Follow the root `AGENTS.md`. Inspect the failing test, relevant fixtures and configuration, nearby tests, and any relevant Page Objects in `src/pages/`. Identify and explain the likely root cause from the supplied output before proposing a correction. Consider assertions, test data, setup, timing, configuration, and locators; do not assume every failure is a locator problem.

Make only the smallest justified correction and preserve the existing Page Object Model, locators, and action methods. Keep test specifications under `tests/e2e/` with the `.spec.ts` suffix and reusable Page Objects under `src/pages/`. Use Playwright Test CLI execution to validate only when appropriate and permitted, and report only what actual output confirms.

Use only native Copilot tools and project files. Do not use MCP, connect to MCP servers, run browser automation for inspection, or perform live browser inspection. State assumptions and missing information; never claim an unverified fix or test result.
