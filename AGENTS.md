## Error Handling Standard (Generation 4: Async/Await & Try...Catch)

When writing or refactoring asynchronous Node.js code, agents must follow the **Generation 4 Error Handling** standard:

1. **Modern Asynchronous Syntax:** Always use `async/await`. Avoid legacy error-first callbacks and complex promise chaining (`.then().catch()`).
2. **Standard Error Boundaries (`try...catch`):** Wrap asynchronous operations, file I/O, and database queries in standard `try...catch` blocks to handle errors gracefully.
3. **Clean Error Reporting:** Log errors directly inside catch blocks using standard logging (`console.error`) without over-engineering complex operational error hierarchies or explicit resource disposal syntax.

### Example Pattern:
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