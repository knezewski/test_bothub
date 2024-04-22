import pg from 'pg'

const pool = new pg.Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
})

async function connectDB() {
	try {
		await pool.connect()
		console.log('Connected to PostgreSQL database')
	} catch (error) {
		console.error('Error connecting to PostgreSQL database:', error)
	}
}

connectDB()
export default pool
