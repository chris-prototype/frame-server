import OpenAI from 'openai' // grok only has a python api currently
import { Router } from 'express'
const router = Router()

const grokInstance = new OpenAI({
  apiKey: process.env.OPENAI,
  baseURL: 'https://api.x.ai/v1'
})

router.post('/grok', async (req, res) => {
  const { prompt } = req.body
  if (!prompt) return res.status(400).json({ error: 'prompt required' })

  const completion = await grokInstance.chat.completions.create({
    model: 'grok-4.20-reasoning',
    messages: [{ role: 'user', content: prompt }]
  })

  res.json(completion)
})

export { router as grok }
