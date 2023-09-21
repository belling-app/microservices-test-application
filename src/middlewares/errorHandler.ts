import { type Request, type Response, type NextFunction, type ErrorRequestHandler } from 'express'
import errorResponse from '../templates/errorResponse'

export default (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): Response => {
  console.error(err)
  return res.status(500).json(errorResponse('Internal error'))
}
