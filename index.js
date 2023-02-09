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

app.get('/api/valheim', (req, res) => {
    res.status(200).send(data)
})

console.log(data);

app.listen(PORT)
