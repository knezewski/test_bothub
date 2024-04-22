import axios, { AxiosError, AxiosResponse } from 'axios'
import { z } from 'zod'
import pool from '../config'
import { API_URL } from '../utils/constants'
import { metaDataModelSchema } from '../modules/metadataModel/metadataModel.schema'
import { TMetaDataModel } from '../modules/metadataModel/metadataModel.type'

export const updateDatabase = async (model: TMetaDataModel) => {
	try {
		const validatedBody = metaDataModelSchema.parse(model)
		const { id, name, description, context_length, tokenizer, modality } = validatedBody
		const query = `
        INSERT INTO metadataModel (id, name, description, context_length, tokenizer, modality)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE
        SET name = $2, description = $3, context_length = $4, tokenizer = $5, modality = $6
    `
		return await pool.query(query, [id, name, description, context_length, tokenizer, modality])
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			throw new Error('Validation error: ' + error.message)
		}
		if (error instanceof Error) {
			throw new Error('Error fetching model from database: ' + error.message)
		}
	}
}

export const fetchDataAndUpdateDatabase = async (): Promise<void> => {
	try {
		const response: AxiosResponse<{ data: any[] }> = await axios.get(API_URL)
		const { data: models } = response.data
		for (const model of models) {
			await updateDatabase(model)
		}
		console.log('Data updated successfully')
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const axiosError: AxiosError = err
			throw new Error('Axios error: ' + axiosError.message)
		} else {
			throw new Error('Error: ' + err)
		}
	}
}
