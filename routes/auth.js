import passport from 'passport'
import { Router } from 'express'
const router = Router()

router.get('/google', (req, res, next) => {
  const returnURL = req.query.returnURL 
  console.logD('DEBUG: routes: /auth/google: ', 'blue')
  console.logD(returnURL, 'blue')
  const config = {
    scope: ['email', 'profile'],
    state: returnURL
  }
  // redirects the browser to google's server ( accounts.google.com ) via 302
  passport.authenticate('google', config)(req, res, next)
})

router.get('/google/callback', getHost, authenticateWrap)
function getHost (req, res, next) {
  console.logD('DEBUG: routes: /auth/google/callback: ', 'blue')
  const returnURL = req.query.state
  if (!returnURL) {
    // res.status(400).send('bad request. missing req.query.state - returnURL')
    console.logD(returnURL, 'blue')
  } else {
    console.logD(returnURL, 'blue')
  }
  req.auth_options = { successRedirect: returnURL, failureRedirect: returnURL }
  next()
}
function authenticateWrap (req, res, next) {
  passport.authenticate('google', req.auth_options)(req, res, next)
}

router.get('/logout', (req, res, next) => {
  const redirectTo = req.query.redirect_url || '/'
  req.logout((err) => {
    if (err) return next(err)

    // destroys server session and client cookie
    req.session.destroy((sessionErr) => {
      if (sessionErr) return next(sessionErr)
      res.clearCookie('connect.sid')
      res.redirect(redirectTo)
    })
  })
})

export { router as auth }
