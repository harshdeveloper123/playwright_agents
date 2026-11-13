---
name: heal-test
description: Diagnose Playwright test failures using actual error output and make the smallest evidence-based correction while preserving the existing Page Object Model and project conventions.
argument-hint: Provide the failing test path and actual error or test output.
disable-model-invocation: true
---

# Diagnose and Heal Playwright Test Failures

Diagnose existing Playwright test failures and make the smallest justified correction using the supplied failure output and available project evidence.

Follow the existing framework architecture, root `AGENTS.md`, and established implementation conventions. Do not introduce unnecessary changes or rewrite working framework components.

## 1. Understand the Failure

Read the following information supplied in the user's request:

- Path of the failing Playwright test specification.
- Actual error message, assertion failure, or test execution output.

If either the failing test path or actual failure information is missing, ask the user to provide it before proceeding.

Do not run tests, modify files, or make speculative corrections when the required information is missing.

## 2. Inspect the Existing Framework

Follow root `AGENTS.md` and inspect the relevant project evidence before diagnosing the failure.

Review:

- The failing test specification.
- Relevant fixtures and test setup.
- Playwright configuration.
- Nearby or related test specifications.
- Relevant Page Objects under `src/pages/`.
- Relevant locator definitions under `src/locators/`.
- Existing reusable action methods and helpers.
- Relevant package scripts and dependencies, if needed.

Understand how the failing scenario interacts with the existing framework.

Do not perform live browser inspection or use MCP.

## 3. Diagnose the Root Cause

Analyze the supplied error or test output and identify the likely root cause before making changes.

Consider possible causes such as:

- Incorrect or incomplete assertions.
- Incorrect test data or test preconditions.
- Authentication or browser-state setup issues.
- Fixture configuration or test isolation problems.
- Timing, waiting, or asynchronous execution issues.
- Incorrect or outdated locators.
- Page Object implementation problems.
- Playwright configuration or project-specific issues.
- Application behaviour that differs from the expected result.

Do not assume every failure is caused by a locator.

Distinguish between the actual failure evidence and any assumptions made during diagnosis.

If the available evidence is insufficient to establish a reliable correction, explain what additional information is required instead of guessing.

## 4. Apply the Smallest Justified Fix

After identifying the likely root cause:

- Make only the smallest correction supported by the available evidence.
- Preserve the existing Page Object Model architecture.
- Reuse existing locator classes and action methods.
- Update reusable Page Objects under `src/pages/` when a Page Object correction is justified.
- Keep test specifications under `tests/e2e/` using the `.spec.ts` suffix.
- Keep reusable selectors in their appropriate locator classes.
- Avoid duplicate methods, selectors, or helper classes.
- Preserve existing test coverage and scenario intent.
- Do not make unrelated refactoring or formatting changes.

Do not change the expected result merely to make a failing test pass unless the supplied requirements or evidence establish that the expectation itself is incorrect.

## 5. File Modification Boundaries

Modify only the files necessary to correct the identified failure.

Do not:

- Rewrite the entire test specification unnecessarily.
- Recreate existing Page Objects or locator classes.
- Modify unrelated tests.
- Change application code.
- Modify Playwright configuration or fixtures unless explicitly authorized by the user.
- Modify the original test plan or user story.
- Introduce a new framework structure.

Follow root `AGENTS.md` and preserve existing project conventions.

## 6. Tool and Execution Restrictions

- Use only native Copilot tools and project files.
- Do not use MCP or connect to MCP servers.
- Do not perform live browser inspection.
- Do not run browser automation for inspection.
- Use Playwright Test CLI execution to validate the correction only when appropriate and permitted.
- Do not claim that a correction is successful without supporting validation output.

If execution is not performed, clearly state that the correction has not been runtime-verified.

## 7. Completion and Diagnostic Report

Before finishing, provide a structured report containing:

### A. Failure Summary

- Failing test file and scenario.
- Actual failure message or relevant error output.
- Identified or likely root cause.

### B. Root Cause Explanation

Explain why the failure occurred using the supplied output and inspected project evidence.

### C. Fix Applied

Describe the smallest correction made and why it addresses the identified issue.

### D. Files Modified

List all files created or modified and briefly explain each change.

### E. Validation Results

Report:

- Static inspection performed.
- TypeScript validation, if performed.
- Playwright CLI command executed, if applicable.
- Actual test execution results, including failures or skipped tests.

### F. Remaining Issues and Assumptions

Report unresolved issues, missing evidence, and assumptions that could affect the reliability of the correction.

Never claim an unverified fix or successful test execution.

The objective is to restore the failing test with the smallest evidence-based change while maintaining the consistency and reliability of the existing Playwright framework.