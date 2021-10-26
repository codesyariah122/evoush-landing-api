import dotenv from 'dotenv'
import {Server} from './Server/index.js'

dotenv.config()

const port = process.env.PORT

Server(port)