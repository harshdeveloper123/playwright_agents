---
name: generate-plan
description: "Create a code-only Playwright test plan from a feature requirement or user story, following existing project conventions."
argument-hint: "Provide the feature or story file path."
disable-model-invocation: true
---

# Generate Playwright Test Plan

Read and understand the feature requirement or user story supplied in the request. If no requirement is provided, ask the user for it before proceeding.

## Feature Analysis

- Analyze the user story and requirements first. Use the configured Playwright MCP server to explore the actual application when needed to clarify relevant behavior.
- Use available MCP browser tools to launch or access the application, navigate relevant pages and workflows, interact with UI elements, inspect DOM structure, accessibility information, attributes, labels, and visible content, and capture screenshots when useful. Other available MCP tools may be used when they support requirement analysis.
- Understand the feature's purpose and expected functionality.
- Identify important user workflows and business rules relevant to the feature.
- Inspect relevant existing project files and `AGENTS.md` to understand the feature implementation and available testing context. Consider application observations alongside repository evidence and the provided requirements.
- Verify relevant workflows, business rules, validations, and UI behavior through browser exploration where possible. Identify relevant implemented functionality not explicitly covered by the story.
- Clearly distinguish confirmed application behavior, requirement-based expectations, and unverified assumptions. If observed behavior contradicts a requirement, highlight the discrepancy rather than silently changing the expected result.
- Identify happy paths, negative scenarios, validation cases, boundary conditions, and relevant edge cases supported by the requirements and verified application behavior. Do not create scenarios for unrelated functionality.
- Do not assume or invent functionality or expected results. Clearly note behavior that cannot be verified.

## Test Scenario Creation

Create independent test scenarios based on the requirement details and verified application behavior, covering the identified feature behaviour.

For each scenario, include:

- **Test ID:** Assign a unique, feature-specific ID. Follow a consistent naming convention, such as LOGIN-001 for Login or INV-001 for Inventory.
- **Test Scenario:** A clear description of what is being tested.
- **Priority:** High, Medium, or Low.
- **Preconditions:** Required application state or setup.
- **Test Data:** Required input data, wherever applicable.
- **Test Steps:** Clear, sequential user actions.
- **Expected Result:** The expected behaviour for the scenario.

Ensure Test IDs are unique within the plan and remain unchanged when the test plan is subsequently used by the Generator. These IDs will maintain traceability between the test plan and generated Playwright test scripts.

## Automation Considerations

- Describe user-facing actions that can be translated into Playwright automation.
- Prefer actions that can map to `getByRole()`, `getByLabel()`, `getByText()`, or `getByTestId()` where appropriate.
- Avoid prescribing brittle CSS selectors or XPath.
- If a selector strategy appears necessary, document the reason without inventing selectors.

## Test Plan Output

Create or update the feature's Markdown test plan under `specs/`, following the existing project file naming convention. Include screenshots or references to browser observations only when they provide useful evidence; do not unnecessarily embed screenshots.

Include all relevant scenarios, their Test IDs, preconditions, test data, steps, and expected results.

At the end of the plan, include:

- **Coverage Summary:** Briefly describe the functionality covered.
- **Assumptions:** List any assumptions made during planning.
- **Missing Information:** Identify requirements or details that need clarification before test generation.