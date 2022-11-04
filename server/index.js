require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')


const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()