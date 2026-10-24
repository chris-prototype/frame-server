## Error Handling & Resource Management (Generation 5 Standard)

When writing or refactoring asynchronous Node.js code, agents must follow the **Generation 5 Error Detection and Resource Management** standard:

1. **Explicit Resource Management (`await using`):**
   - Always use `await using` (or `using`) for any manual resource acquisition (e.g., `fs.open()`, file handles, database connection pools, streams, sockets).
   - This replaces manual `try...finally` blocks for deterministic cleanup via `Symbol.asyncDispose`.

2. **Error Boundaries & Logging (`try...catch`):**
   - Always wrap resource-acquisition and async execution blocks in `try...catch` to handle errors gracefully.
   - Do **not** rely on raw `console.log(err)` or unhandled rejections. 
   - Log errors using structured loggers (e.g., Pino, Winston) attaching rich context objects (e.g., `logger.error({ err, filePath }, "Operation failed")`).

3. **Operational Error Typing:**
   - Throw custom, operational error classes that inherit from `Error` (e.g., `class AppError extends Error { isOperational = true; ... }`) rather than throwing generic strings or native errors without context. Use `{ cause: err }` to preserve error chains.

### Example Pattern:
```javascript
const fs = require('fs/promises');

async function processSecureFile(filePath) {
  try {
    // 1. Automatic resource cleanup on exit or throw
    await using fileHandle = await fs.open(filePath, 'r');
    const contents = await fileHandle.readFile('utf8');
    return JSON.parse(contents);
  } catch (err) {
    // 2. Structured logging & custom error wrapping
    logger.error({ err, filePath }, "Failed to securely process file");
    throw new AppError("File processing pipeline failed", { cause: err });
  }
}