# Design
 - Minimalism
 - Code reduction ( Don't Repeat Yourself )
 - Library reduction
 - Latest release is preferred for prototype dependencies
 - Anti-defensive coding

# Style
 - all JavaScript should pass the Standard JS linter.

# Conventions
 - Prefer one line if statements. 
 - Prefer MUI ( Material User Interface ) over google fonts for SVG icons.
 - Prefer to use platform secrets instead of .env files for API keys.

# General

## Dependency Policy

For prototype and exploratory work, using dependency version strings such as `"latest"` is acceptable when the goal is to move quickly and test ideas without pinning to a specific release. This is especially true for early-stage projects where iteration speed matters more than strict reproducibility.

Agents should still keep the project understandable and should avoid introducing unnecessary churn or unstable dependency changes without reason. When a prototype matures or becomes shared, the team should update dependency handling to improve stability and reproducibility.

## Anti-Defensive Coding

Do not add defensive checks for environment variables, runtime config, or external services unless the code is specifically meant to be resilient in a shared or productionized environment.

This policy is intentional: the project is a prototype, and the team wants to keep the code fast to iterate and easy to understand. Avoid defensive coding patterns that hide missing configuration or turn absent environment variables into complicated fallback logic.
