## Error Handling Standard (Generation 4: Async/Await & Try...Catch)

When writing or refactoring asynchronous Node.js code, agents must follow the **Generation 4 Error Handling** standard:

1. **Modern Asynchronous Syntax:** Always use `async/await`. Avoid legacy error-first callbacks and complex promise chaining (`.then().catch()`).
2. **Standard Error Boundaries (`try...catch`):** Wrap asynchronous operations, file I/O, and database queries in standard `try...catch` blocks to handle errors gracefully.
3. **Clean Error Reporting:** Log errors directly inside catch blocks using standard logging (`console.error`) without over-engineering complex operational error hierarchies or explicit resource disposal mechanisms unless needed.
4. **Graceful Failure Patterns:** If a step fails, resolve it in place with clear fallback behavior or a clear error response so the process does not silently continue in a broken state.

### Prototype Dependency Policy

For prototype and exploratory work, using dependency version strings such as `"latest"` is acceptable when the goal is to move quickly and test ideas without pinning to a specific release. This is a conscious prototype choice and should not be treated as a production-grade dependency policy.

Agents should still keep the project understandable and should avoid introducing unnecessary churn or unstable dependency changes without reason. When a prototype matures or becomes shared, the team should revisit versions and lock them to a known-good set.

### Error Handling Example Pattern:
```javascript
const fs = require('fs/promises')
const DBM = require('./mongoose')
const FILE = 'articles.json'

async function processArticles () {
  try {
    const contents = await fs.readFile(FILE, 'utf8')
    const data = JSON.parse(contents)
    for (let i = data.length - 1; i >= 0; i--) {
      try {
        await DBM.saveArticle(data[i])
        console.log('article saved', i)
      } catch (err) {
        console.error(err)
      }
    }
  } catch (err) {
    console.error(err)
  }
}
