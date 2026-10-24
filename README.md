# Frame Server

A lightweight backend prototype for a browser-based product experience, built with Express and supporting authentication, real-time communication, and third-party API integrations.

## What this project does

This server provides the backend foundation for a small web app, including:

- Google OAuth login flows
- session management with MongoDB
- static asset hosting
- WebSocket connectivity for real-time messaging
- API routes for articles, weather, and AI integrations

## Stack

- Node.js
- Express
- Passport.js
- MongoDB / Mongoose
- WebSockets (`ws`)
- External APIs: OpenWeather, OpenAI, Grok

## Project structure

```text
.
├── AGENTS.md
├── index.js
├── global.js
├── mod_00__configure.js
├── mod_10_session.js
├── mod_10_passport.js
├── mod_20_server.js
├── mod_20_websocket.js
├── mongo/
├── passport/
├── routes/
├── websocket/
├── dist/
├── package.json
├── package-lock.json
├── .gitignore
├── .nojekyll
└── README.md
```

## Getting started

### Prerequisites

- Node.js 24.x
- MongoDB instance
- Google OAuth credentials

### Install and run

```bash
npm install
npm run server
```

## Key routes

- `/auth` — login/logout flow
- `/users/get` — fetch current user
- `/articles` — article-related endpoints
- `/openweather` — weather data integration
- `/chatgpt` — ChatGPT integration
- `/grok` — Grok integration
- `/test` — internal testing routes

## Notes

This project is intentionally structured as a fast-moving prototype. It emphasizes clarity and quick iteration over production hardening, making it a strong example of a compact backend architecture for a small product app.

## License

No license is currently declared in the project.
