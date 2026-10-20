import cors from 'cors'

export const configureCORS = (app) => {
  console.logD('DEBUG: Module: cors: ')
  const corsOptions = {
    origin: [
      'https://chris-prototype.github.io',
      'https://caaker.github.io',
      /^https:\/\/.*\.github\.dev(:[0-9]+)?$/
    ],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
  app.use(cors(corsOptions))
}
