import cors from 'cors'
import express from 'express'
import { readFile } from 'fs/promises'
import * as dotenv from 'dotenv'
dotenv.config()

const data = JSON.parse(await readFile('./data.json'))

const app = express()
const PORT = process.env.PORT || 5000

const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

app.get('/api/boss', (req, res) => {
	const names = data.map(element => {
		return { name: element.name, drops: element.drops }
	})

	res.status(200).send(names)
})

app.get('/api/boss/:name', (req, res) => {
	const boss = req.params.name
	const query = data.find(element => {
		return element.name === boss
	})
	res.status(200).send(query)
	return
})

app.listen(PORT)