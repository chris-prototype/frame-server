import { Router } from 'express'

import { openweather } from './api_openweather.js'
import { chatgpt } from './api_chatgpt.js'
import { grok } from './api_grok.js'
import { articles } from './articles.js'
import { auth } from './auth.js'
import { test } from './test.js'
import { users } from './users.js'
const router = Router()

router.use('/openweather', openweather)
router.use('/chatgpt', chatgpt)
router.use('/grok', grok)
router.use('/articles', articles)
router.use('/auth', auth)
router.use('/test', test)
router.use('/users', users)

export { router }
