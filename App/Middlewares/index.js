import cors from 'cors'
import bodyParser from 'body-parser'
import {ApiRouter, WebRouter} from '../Routers/index.js'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import ExpHbs from 'express-handlebars'
import hbsHelper from '../helpers/hbsHelper.js'

export const Middlewares = (app, express) => {
	let allowedOrigins = [
					'http://localhost:3000',
                    process.env.DEV_ORIGIN, 'https://evoush.com'
    ];
	const __dirname = dirname(fileURLToPath(import.meta.url))

	let corsOptions = {
		origin: '*'
	}


	app.engine('hbs', ExpHbs({
		defaultLayout: 'main',
		extname: 'hbs',
		helpers: hbsHelper
	}))
	app.set('view engine', 'hbs')

	app.use(cors(corsOptions))
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(express.static('public'))

	app.use('/api/data', ApiRouter)
	app.use('/', WebRouter)

	app.set('views', path.join(__dirname, 'views'))
}