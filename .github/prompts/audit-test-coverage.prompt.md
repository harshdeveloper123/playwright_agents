---
description: Audit requirement-to-test traceability across feature stories, test plans, and Playwright test implementations.
argument-hint: Provide the feature name or paths to the story, test plan, and test files.
agent: "playwright-test-coverage-auditor"
---

# Playwright Test Coverage Audit

Perform a static test coverage and traceability audit for the specified feature using the available project files.

## Input

Use the feature name or file paths provided by the user.

Identify and review the relevant:
- Feature story or requirement document.
- Acceptance criteria and requirement IDs.
- Markdown test plan.
- Implemented Playwright test specifications.
- Relevant Page Objects, locator classes, fixtures, and shared utilities when needed to understand test implementation.

If the user provides only a feature name, search the project for the corresponding files.

If any required source is missing, incomplete, or ambiguous, report it as an audit limitation. Do not invent missing requirements or implementation evidence.

## Audit Workflow

### 1. Requirement-to-Test Plan Traceability

Compare each requirement and acceptance criterion in the feature story against the test scenarios in the corresponding test plan.

Verify:
- Whether every requirement has a corresponding test scenario.
- Whether positive, negative, boundary, and validation scenarios are represented where applicable.
- Whether any requirement is partially addressed.
- Whether scenarios are missing, duplicated, or unrelated to the stated requirements.
- Whether requirement IDs and test IDs are preserved and traceable.

Classify each requirement as:
- Covered
- Partially Covered
- Not Covered
- Unable to Verify

### 2. Test Plan-to-Implementation Traceability

Compare every test scenario in the test plan against the implemented Playwright test specifications.

Verify:
- Whether a corresponding automated test exists.
- Whether the implemented test ID matches the planned test ID.
- Whether the test assertions validate the intended expected result.
- Whether the test covers the intended user action and application behavior.
- Whether required preconditions and test data are represented.
- Whether the implementation appears incomplete or differs from the planned scenario.

Classify each scenario as:
- Implemented
- Partially Implemented
- Not Implemented
- Unable to Verify

Do not treat the presence of a test title or test ID alone as proof of complete implementation. Inspect the actual test steps and assertions.

### 3. Test Implementation Review

Review relevant Playwright implementation evidence to identify:
- Missing or insufficient assertions.
- Incorrect or incomplete scenario implementation.
- Missing negative or boundary validation.
- Hardcoded test data or credentials where project conventions prohibit them.
- Violations of existing POM and locator conventions.
- Unnecessary duplication or inconsistent test IDs.

Use AGENTS.md and existing project patterns as the source of framework conventions.

Do not assume that a test passes simply because its implementation exists. Runtime execution is outside the scope of this static audit.

### 4. Identify Coverage Gaps

Consolidate findings into separate categories:

- Requirements missing from the test plan.
- Test-plan scenarios missing from implementation.
- Partially implemented scenarios.
- Test ID and traceability mismatches.
- Implementation quality concerns.
- Unable-to-verify items and missing evidence.

Avoid reporting the same issue repeatedly across sections. Reference the relevant requirement ID, test ID, file path, and scenario wherever available.

## Expected Audit Report

Produce the report using the following structure.

### 1. Audit Summary

Include:
- Feature name.
- Story, test plan, and test specification files reviewed.
- Total requirements identified.
- Total planned scenarios.
- Total implemented scenarios.
- Overall coverage observations.
- Audit limitations.

### 2. Requirement-to-Test Plan Traceability

Use this table:

| Requirement ID | Requirement / Acceptance Criteria | Test ID | Test Scenario | Coverage Status | Remarks |
|---|---|---|---|---|---|

### 3. Test Plan-to-Implementation Traceability

Use this table:

| Test ID | Planned Test Scenario | Implemented Test | File Path | Implementation Status | Remarks |
|---|---|---|---|---|---|

### 4. Coverage Gaps

Separate findings into:
- Missing test scenarios.
- Partially covered scenarios.
- Missing automated implementations.
- Traceability mismatches.
- Implementation quality concerns.

### 5. Recommendations

Provide actionable recommendations for closing the identified gaps.

Prioritize findings based on their impact on requirement coverage and test reliability.

Do not implement the recommendations.

### 6. Final Audit Conclusion

Summarize:
- Requirement coverage observations.
- Automation implementation observations.
- Major uncovered areas.
- Whether the available evidence is sufficient to establish traceability.

Do not provide an unsupported overall coverage percentage. Only calculate percentages when the underlying counts and classification rules are clear.

## Audit Constraints

- Perform a read-only static audit.
- Do not create, edit, delete, or modify project files.
- Do not generate or fix Playwright test scripts.
- Do not execute tests or application code.
- Do not use MCP or live browser inspection.
- Do not invent requirements, test scenarios, test IDs, or implementation evidence.
- Clearly distinguish missing evidence from confirmed missing coverage.
- Use exact file paths and identifiers wherever possible.
- Follow the project's AGENTS.md conventions.
- If the audit cannot be completed due to missing evidence, report what is available and clearly explain the limitations.
