import { database } from '../mongo/mongoose.js'
import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

router.route('/get').get(async (_req, res) => {
  const results = await database.getAllArticles()
  res.status(200).json(results)
})
router.route('/add').post(requireAuth, async (req, res) => {
  const results = await database.saveArticle(req.body)
  res.status(200).json(results)
})
router.route('/put/:_id').put(requireAuth, async (req, res) => {
  const results = await database.updateArticle(req.params._id, req.body)
  res.status(200).json(results)
})
router.route('/delete/:_id').delete(requireAuth, async (req, res) => {
  const val = await database.deleteArticle(req.params._id)
  res.status(200).json(val)
})

export { router as articles }
