---
description: Review Playwright test scripts for quality, reliability, and framework compliance
argument-hint: Provide the test specification path and optionally its corresponding test plan path
agent: "playwright-test-reviewer"
---

Read and understand the supplied Playwright test specification. If no test specification path is provided, ask the user for it before proceeding.

**## Review Context**

- Read the root `AGENTS.md` and follow the project's established framework rules.
- Read and understand the supplied test specification.
- Inspect the corresponding Page Object and locator files.
- Inspect relevant fixtures, configuration, and existing tests wherever necessary.
- If a corresponding feature test plan is provided or available in `specs/`, use it to verify test scenario and Test ID traceability.
- Evaluate the implementation against the existing project architecture and coding conventions.

**## Test Code Quality Review**

Review the supplied test implementation for the following:

- **POM Compliance:** Verify that reusable page interactions are handled through Page Objects and that test specifications focus on scenario execution and assertions.
- **Locator Quality:** Check whether locators follow the project's preferred accessibility-based locator strategy. Identify brittle CSS selectors, XPath, duplicate locators, and overly broad matching.
- **Assertion Quality:** Verify that assertions validate meaningful application behaviour and expected outcomes. Identify missing, weak, or unnecessary assertions.
- **Test Independence:** Check whether tests can execute independently without relying unnecessarily on execution order or shared mutable state.
- **Synchronization:** Identify unnecessary hard waits, such as `waitForTimeout()`, and potentially unreliable synchronization strategies.
- **Test Data:** Identify hardcoded credentials, duplicated test data, and inappropriate handling of environment variables.
- **Code Duplication:** Identify repeated logic, unnecessary complexity, and opportunities to reuse existing Page Objects, locators, or helpers.
- **Naming and Readability:** Check test names, variable names, structure, and consistency with existing framework conventions.
- **Test ID Traceability:** Verify that Test IDs in the generated test scripts correspond to the approved test plan and that scenarios have not been silently omitted.

**## Review Findings and Severity**

Classify identified findings using the following severity levels:

- **Critical:** A serious issue that makes the test implementation fundamentally unreliable or invalid.
- **High:** A significant issue that can cause incorrect results or frequent test failures.
- **Medium:** A maintainability, coverage, or reliability concern.
- **Low:** A minor style or consistency improvement.

For every finding:

- Identify the affected file and line number wherever possible.
- Explain the issue and provide supporting evidence.
- Describe its potential impact on the test implementation.
- Recommend an appropriate correction.

Distinguish confirmed issues from suggestions and observations. Do not report assumptions as confirmed defects.

**## Review Boundaries**

- Review the existing implementation only. Do not create, modify, or delete project files.
- Do not automatically fix identified issues.
- Do not generate new test scenarios or modify the approved test plan.
- Do not execute Playwright tests.
- Do not use MCP, live browser inspection, or browser automation tools.
- Do not recommend changes that conflict with the existing `AGENTS.md` rules without explaining why.
- If required project context is unavailable, clearly mention the limitation.

**## Review Report Output**

Provide a structured review report containing:

- **Files Reviewed:** List the test specification and relevant project files inspected.
- **Overall Review Status:** Summarize the implementation's quality.
- **Critical Findings:** List any critical issues, if identified.
- **High Findings:** List any high-severity issues, if identified.
- **Medium Findings:** List any medium-severity issues, if identified.
- **Low Findings:** List any low-severity issues, if identified.
- **Positive Observations:** Highlight correctly implemented practices.
- **Recommended Improvements:** Summarize the most useful corrections.
- **Coverage and Traceability:** Report any missing scenarios or Test ID mismatches, when a plan is available.
- **Review Limitations:** Mention missing files or information that prevented a complete review.

If no issues are identified, explicitly state that no issues were found within the reviewed scope.

Do not claim that tests pass or fail because this agent does not execute tests.