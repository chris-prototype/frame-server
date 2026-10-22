// layered monolith architecture
import './global.js'
import express from 'express'

import { configure } from './mod_00__configure.js'

import { sessionInstance } from './mod_10_session.js'
import { passport } from './mod_10_passport.js'
import { router } from './routes/index.js'
import { detectErrors } from './mod_20_detectErrors.js'
import { startServer } from './mod_20_server.js'
import { startWebsocketServer } from './mod_20_websocket.js'

// configure set 0 - configureShutdown, configureCORS, configureRedirect
//   configure JSON parsing, configure static file serving
const app = express()
configure(app)

// configure set 1 - sessions, passport
//   passport is currently the first use of internal dependency
app.use(sessionInstance)
app.use(passport.initialize())
app.use(passport.session())

// configure set 2 - routes, error detection
app.use(router)
detectErrors(app)

// start - https server, websocket server
const server = startServer(app)
startWebsocketServer(server)
