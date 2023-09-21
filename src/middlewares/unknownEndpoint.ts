import { type NextFunction, type Request, type Response } from 'express'
import errorResponse from '../templates/errorResponse'

export default (req: Request, res: Response, next: NextFunction): Response => {
  return res.status(404).json(errorResponse('unknown endpoint'))
}
