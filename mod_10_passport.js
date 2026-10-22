import passport from 'passport'
import { Strategy as GoogleAuth } from 'passport-google-oauth20'
import { getOrSaveUser, serialize, deserialize } from './passport/passport-db.js'

let connectionString
if (process.env.PASSPORT) {
  connectionString = JSON.parse(process.env.PASSPORT).Google
}
if (connectionString) {
  const GAObject = new GoogleAuth(connectionString, getOrSaveUser)
  passport.use('google', GAObject)
  passport.serializeUser(serialize)
  passport.deserializeUser(deserialize)
}
export { passport }
