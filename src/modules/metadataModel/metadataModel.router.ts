import { Router, Request, Response, NextFunction } from 'express'
import { metadataHandlers } from './metadataModel.handlers'

const metadataModelRouter = Router()

metadataModelRouter.post('/', metadataHandlers.create)
metadataModelRouter.get('/', metadataHandlers.getAll)
metadataModelRouter.get('/:id', metadataHandlers.getOne)
metadataModelRouter.put('/:id', metadataHandlers.put)
metadataModelRouter.delete('/:id', metadataHandlers.deleteOne)

metadataModelRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).json({ error: 'Something went wrong' })
})

export default metadataModelRouter
