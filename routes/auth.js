import passport from 'passport'
import { Router } from 'express'
const router = Router()

router.get('/google', (req, res, next) => {
  // referer holds the originating URL
  const referer = req.get('referer')
  console.logD('DEBUG: routes: /auth/google: ', 'blue')
  console.logD(referer, 'blue')
  const config = {
    scope: ['email', 'profile'],
    state: referer
  }

  // redirects the browser to google's server ( accounts.google.com ) via 302
  passport.authenticate('google', config)(req, res, next)
})

router.get('/google/callback', getHost, authenticateWrap)
function getHost (req, res, next) {
  console.logD('DEBUG: routes: /auth/google/callback: ', 'blue')
  const referer = req.query.state
  if (!referer) {
    // res.status(400).send('bad request. missing req.query.state')
    console.logD(referer, 'blue')
  } else {
    console.logD(referer, 'blue')
  }
  req.auth_options = { successRedirect: referer, failureRedirect: referer }
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
