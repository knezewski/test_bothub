import { z } from 'zod'

export const metaDataModelSchema = z.object({
	id: z.string().min(1, { message: 'Id is required' }),
	name: z.string().min(1, { message: 'Name is required' }),
	description: z.string(),
	context_length: z.number(),
	tokenizer: z.string().nullable().optional(),
	modality: z.string().nullable().optional(),
})

export const paramsSchema = z.object({
	id: z.string().min(1, { message: 'Id is required' }),
})
