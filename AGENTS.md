## Error Handling Standard (Generation 4: Async/Await & Try...Catch)

When writing or refactoring asynchronous Node.js code, agents must follow the **Generation 4 Error Handling** standard:

1. **Modern Asynchronous Syntax:** Always use `async/await`. Avoid legacy error-first callbacks and complex promise chaining (`.then().catch()`).
2. **Standard Error Boundaries (`try...catch`):** Wrap asynchronous operations, file I/O, and database queries in standard `try...catch` blocks to handle errors gracefully.
3. **Clean Error Reporting:** Log errors directly inside catch blocks using standard logging (`console.error`) without over-engineering complex operational error hierarchies or explicit resource disposal patterns.
4. **Graceful Failure Patterns:** If a step fails, resolve it in place with clear fallback behavior or a clear error response so the process does not silently continue in a broken state.

### Prototype Dependency Policy

For prototype and exploratory work, using dependency version strings such as `"latest"` is acceptable when the goal is to move quickly and test ideas without pinning to a specific release. This is especially true for early-stage projects where iteration speed matters more than strict reproducibility.

Agents should still keep the project understandable and should avoid introducing unnecessary churn or unstable dependency changes without reason. When a prototype matures or becomes shared, the team should update dependency handling to improve stability and reproducibility.

### Anti-Defensive Coding Policy

Do not add defensive checks for environment variables, runtime config, or external services unless the code is specifically meant to be resilient in a shared or productionized environment.

For this project, the default rule is:

- If the server expects an environment variable, assume it is present.
- Do not guard with `if (!process.env.X)` fallbacks unless the code is intentionally handling a missing variable as a valid fallback case.
- Do not add noisy startup validation that slows prototype iteration or distracts from the core feature work.
- Prefer direct usage and immediate failure over speculative safety checks.

This policy is intentional: the project is a prototype, and the team wants to keep the code fast to iterate and easy to understand. Avoid defensive coding patterns that hide missing configuration or turn absent environment variables into complicated fallback logic.
