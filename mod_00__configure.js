import express from 'express'
import { configureCORS } from './mod_00_cors.js'
import { configureRedirect } from './mod_00_redirect.js'

const configure = (app) => {
  // allow other origins to use this server - github static, github dev
  configureCORS(app)

  // enforce https - render uses a proxy server
  configureRedirect(app)

  // convert body json strings to javascript objects
  app.use(express.json())

  // serve static files
  app.use('/', express.static('./dist'))
}

export { configure }
