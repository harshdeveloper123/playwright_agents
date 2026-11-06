# Login Feature Test Plan

**Source:** `docs/stories/login-feature.md`  
**Configuration:** Root `.env` variables named in the story: `BASE_URL`, `STANDARD_USERNAME`, `STANDARD_PASSWORD`, `LOCKED_USERNAME`, and `LOCKED_PASSWORD`.  
**Related spec:** `tests/e2e/login.spec.ts` is an existing draft, but it uses the previous email-based flow and `LOGIN_*` variables; it is not aligned with this story.  
**Status:** Updated from the SauceDemo story and repository configuration. No browser inspection or test execution was performed.

## Scope

Validate the SauceDemo login flow at the configured `BASE_URL`: successful login as the standard user, invalid-credential rejection, locked-out-user rejection, required-field validation, and password masking. Keep scenarios independent and begin each from the logged-out login page.

## Assumptions and Preconditions

- The root `.env` contains the five variables listed above. Do not copy credential values into this plan, test source, or reports.
- Playwright config loads `.env`, sets `use.baseURL` from `BASE_URL`, and has `testDir: './tests'`, which includes the required `tests/e2e/` location.
- `STANDARD_USERNAME` and `STANDARD_PASSWORD` are valid standard-user credentials; `LOCKED_USERNAME` and `LOCKED_PASSWORD` represent the locked-out account.
- For invalid credentials, start with the standard-user credentials and deliberately make either the username or password invalid; do not hardcode credential strings.
- Use a fresh logged-out state for each scenario. The page's accessible names, exact error messages, and post-login destination should be asserted only if supported by project code or the stated requirements.
- No reusable Page Object was found under `src/pages/` in the inspected project structure. Reuse one if it is added before test generation; do not infer that the existing draft is a Page Object.
- The existing `tests/e2e/login.spec.ts` is based on the superseded email flow and references `LOGIN_URL`, `LOGIN_VALID_EMAIL`, and other `LOGIN_*` variables. Treat it as a migration target, not as evidence of current application behavior.

## Scenarios

### 1. Sign In With the Standard User

**Starting state:** Fresh logged-out browser context at `BASE_URL`. `STANDARD_USERNAME` and `STANDARD_PASSWORD` are configured.

**Steps:**
1. Navigate to `BASE_URL`.
2. Enter `STANDARD_USERNAME` in the username field.
3. Enter `STANDARD_PASSWORD` in the password field.
4. Submit the login form.

**Expected outcome:** The application accepts the standard-user credentials and presents its authenticated state. Confirm the specific authenticated page or marker before writing an assertion.

**Success criteria:** An observable authenticated state is reached and no login error is displayed.

**Failure conditions:** Valid configured credentials are rejected or the authenticated state is not reached, excluding a documented environment/configuration failure.

### 2. Reject Invalid Credentials

**Starting state:** Fresh logged-out browser context at `BASE_URL`. Standard-user credentials are configured.

**Steps:**
1. Enter the standard username and deliberately invalid password, or deliberately invalid username and standard password.
2. Submit the login form.

**Expected outcome:** An appropriate invalid-credentials error is displayed and the user remains logged out. Exact message text is not specified in the story.

**Success criteria:** The login error is visible and no authenticated state is reached.

**Failure conditions:** The invalid credentials are accepted, no appropriate error is displayed, or an authenticated state is reached.

### 3. Reject the Locked-Out User

**Starting state:** Fresh logged-out browser context at `BASE_URL`. `LOCKED_USERNAME` and `LOCKED_PASSWORD` are configured.

**Steps:**
1. Enter `LOCKED_USERNAME` and `LOCKED_PASSWORD` in their corresponding fields.
2. Submit the login form.

**Expected outcome:** The application rejects the locked-out account and displays an appropriate error. Exact message text is not specified in the story.

**Success criteria:** A locked-out error is visible and no authenticated state is reached.

**Failure conditions:** The locked-out account reaches an authenticated state or no appropriate error is displayed.

### 4. Validate Both Required Fields When Empty

**Starting state:** Fresh logged-out browser context at `BASE_URL`, with username and password empty.

**Steps:**
1. Submit the login form without entering a username or password.

**Expected outcome:** Required-field validation prevents sign-in and identifies the missing username and password.

**Success criteria:** No authenticated state is reached and both empty fields are validated.

**Failure conditions:** The form permits sign-in or does not validate one or both required fields.

### 5. Validate an Empty Username

**Starting state:** Fresh logged-out browser context at `BASE_URL`. Password is non-empty; username is empty.

**Steps:**
1. Enter a non-sensitive password value and leave the username empty.
2. Submit the form.

**Expected outcome:** Required-field validation identifies the missing username and prevents sign-in.

**Success criteria:** No authenticated state is reached and the empty username is validated.

**Failure conditions:** The form permits sign-in or does not validate the required username.

### 6. Validate an Empty Password

**Starting state:** Fresh logged-out browser context at `BASE_URL`. Username is non-empty; password is empty.

**Steps:**
1. Enter a non-sensitive username value and leave the password empty.
2. Submit the form.

**Expected outcome:** Required-field validation identifies the missing password and prevents sign-in.

**Success criteria:** No authenticated state is reached and the empty password is validated.

**Failure conditions:** The form permits sign-in or does not validate the required password.

### 7. Confirm Password Input Is Masked

**Starting state:** Fresh logged-out browser context at `BASE_URL`.

**Steps:**
1. Enter a non-sensitive test value into the password field.
2. Confirm the entered characters are concealed rather than displayed as plain text.

**Expected outcome:** The password field masks entered characters.

**Success criteria:** The entered password is not displayed as plain text.

**Failure conditions:** The password is visibly readable in the field.

## Unspecified Cases To Clarify

- Exact validation, invalid-credentials, and locked-out-user error text is not included in the story; do not assert guessed copy.
- Exact accessible names for the fields and submit control, and the observable authenticated destination/state, must be confirmed from project evidence before tests make precise assertions.
- Email-format validation, rate limiting, session persistence, logout, shopping cart, checkout, and payment workflows are outside the stated scope.
