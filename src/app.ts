import express from 'express'
import cron from 'node-cron'
import metadataModelRouter from './modules/metadataModel/metadataModel.router'
import { fetchDataAndUpdateDatabase } from './services/fetchDataAndUpdateDatabase'
import { BASE_URL } from './utils/constants'

const app = express()
const PORT = process.env.PORT || 3000

cron.schedule('0 0 * * *', fetchDataAndUpdateDatabase)

app.use(express.json())
app.use(BASE_URL, metadataModelRouter)

try {
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`)
	})
} catch (error) {
	console.error('Failed to start server:', error)
}
