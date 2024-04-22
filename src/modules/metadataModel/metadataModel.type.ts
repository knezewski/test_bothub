import { z } from 'zod'
import { metaDataModelSchema } from './metadataModel.schema'

export type TMetaDataModel = z.infer<typeof metaDataModelSchema>
