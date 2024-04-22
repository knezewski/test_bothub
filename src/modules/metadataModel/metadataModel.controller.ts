import { z } from 'zod'
import pool from '../../config/index'
import { ParamsDictionary } from 'express-serve-static-core'
import { metaDataModelSchema, paramsSchema } from './metadataModel.schema'
import { TMetaDataModel } from './metadataModel.type'

export const getModels = async (): Promise<TMetaDataModel[]> => {
	const { rows } = await pool.query('SELECT * FROM metadataModel')
	return rows
}

export const getModel = async (params: ParamsDictionary): Promise<TMetaDataModel | null> => {
	const validatedParams = paramsSchema.parse(params)
	const { id } = validatedParams

	try {
		const query = 'SELECT * FROM metadataModel WHERE id = $1'
		const result = await pool.query(query, [id])

		if (result.rows.length > 0) {
			return result.rows[0]
		} else {
			return null
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error('Error fetching model from database: ' + error.message)
		}
		if (error instanceof z.ZodError) {
			throw new Error('Validation error: ' + error.errors)
		}
		return null
	}
}

export const createModel = async (body: TMetaDataModel): Promise<TMetaDataModel | null> => {
	const validatedBody = metaDataModelSchema.parse(body)
	const { id, name, description, context_length, tokenizer, modality } = validatedBody

	try {
		const result = await pool.query(
			'INSERT INTO metadataModel (id, name, description, context_length, tokenizer, modality) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[id, name, description, context_length, tokenizer, modality]
		)

		if (result.rows.length === 0) {
			return null
		} else {
			return result.json(result.rows[0])
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error('Error creating model: ' + error.message)
		}
		if (error instanceof z.ZodError) {
			throw new Error('Validation error: ' + error.errors)
		}
		return null
	}
}
export const updateModel = async (
	body: Omit<TMetaDataModel, 'id'>,
	params: ParamsDictionary
): Promise<TMetaDataModel | null> => {
	const validatedBody = metaDataModelSchema.omit({ id: true }).parse(body)
	const validatedParams = paramsSchema.parse(params)
	const { name, description, context_length, tokenizer, modality } = validatedBody
	const { id } = validatedParams

	try {
		const result = await pool.query(
			'UPDATE metadataModel SET name = $1, description = $2, context_length = $3, tokenizer = $4, modality = $5 WHERE id = $6 RETURNING *',
			[name, description, context_length, tokenizer, modality, id]
		)

		if (result.rows.length === 0) {
			return null
		} else {
			return result.json(result.rows[0])
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error('Error updating model: ' + error.message)
		}
		if (error instanceof z.ZodError) {
			throw new Error('Validation error: ' + error.errors)
		}
		return null
	}
}

export const deleteModel = async (params: ParamsDictionary): Promise<any | null> => {
	const validatedParams = paramsSchema.parse(params)
	const { id } = validatedParams
	try {
		const result = await pool.query('DELETE FROM metadataModel WHERE id = $1 RETURNING *', [id])

		if (result.rows.length === 0) {
			return null
		} else {
			return result.json(result.rows[0])
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error('Error deleting model: ' + error.message)
		}
		if (error instanceof z.ZodError) {
			throw new Error('Validation error: ' + error.errors)
		}
		return null
	}
}
