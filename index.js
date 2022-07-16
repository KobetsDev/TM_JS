
import os from 'os'
import dotenv from 'dotenv'
dotenv.config()
import cluster from 'cluster'
import { app } from './app.js'

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
})