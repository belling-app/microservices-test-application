import { type NextFunction, type Request, type Response } from 'express'

export default (req: Request, res: Response, next: NextFunction): Response => {
  return res.status(404).json({ error: 'unknown endpoint' })
}
