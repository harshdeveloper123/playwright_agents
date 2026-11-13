---
name: generate-plan
description: "Create a code-only Playwright test plan from a feature requirement or user story, following existing project conventions."
argument-hint: "Provide the feature or story file path."
disable-model-invocation: true
---

# Generate Playwright Test Plan

Read and understand the feature requirement or user story supplied in the request. If no requirement is provided, ask the user for it before proceeding.

## Feature Analysis

- Understand the feature's purpose and expected functionality.
- Identify important user workflows and business rules relevant to the feature.
- Inspect relevant existing project files and `AGENTS.md` to understand the feature implementation and available testing context.
- Identify happy paths, negative scenarios, validation cases, boundary conditions, and relevant edge cases.
- Do not assume functionality that is not supported by the requirements or repository evidence.

## Test Scenario Creation

Create independent test scenarios covering the identified feature behaviour.

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

Create the feature's Markdown test plan under `specs/`, following the existing project file naming convention.

Include all relevant scenarios, their Test IDs, preconditions, test data, steps, and expected results.

At the end of the plan, include:

- **Coverage Summary:** Briefly describe the functionality covered.
- **Assumptions:** List any assumptions made during planning.
- **Missing Information:** Identify requirements or details that need clarification before test generation.