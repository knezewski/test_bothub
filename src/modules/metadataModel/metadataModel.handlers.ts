import { NextFunction, Request, Response } from 'express'
import { getModel, getModels, createModel, updateModel, deleteModel } from './metadataModel.controller'

export const metadataHandlers = {
	getAll: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await getModels()
			res.send(result)
		} catch (e) {
			return next(e)
		}
	},
	getOne: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await getModel(req.params)
			res.send(result)
		} catch (e) {
			return next(e)
		}
	},
	create: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await createModel(req.body)
			res.send(result)
		} catch (e) {
			return next(e)
		}
	},
	put: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await updateModel(req.body, req.params)
			res.send(result)
		} catch (e) {
			return next(e)
		}
	},
	deleteOne: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await deleteModel(req.params)
			res.send(result)
		} catch (e) {
			return next(e)
		}
	},
}
