
import express from 'express'
import nunjucks from 'nunjucks'
import cors from 'cors'
// import os from 'os'
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import mongoose from 'mongoose'
// import passport from 'passport'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// import { requestTime, logger } from './middlewares.js'
// import serverRoutes from "./routes/servers.js";
import errorMiddleware from './middlewares/error.js'

import router from './routes/index.js'
// import authRoutes from './routes/auth.js'
// import categoryRoutes from './routes/category.js'
// import groupsRoutes from './routes/groups.js'
// import groupRoutes from './routes/group.js'
// import mainRoutes from './routes/main.js'
// import facultiesRoutes from './routes/faculties.js'
// import addressRoutes from './routes/address.js'
// import officeRoutes from './routes/office.js'


// import error404 from './utils/error404.js'

const app = express()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log(error))


// шаблонизатор
app.set('view engine', 'html')
nunjucks.configure('templates', {
    autoescape: true,
    express: app
})

// app.use(passport.initialize())
// import midd_passrort from './middlewares/passport.js'
// midd_passrort(passport)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.disable('etag')

app.use('/api', router)


app.use(errorMiddleware)
// app.use('/api/auth', authRoutes)
// app.use('/groups', groupsRoutes)
// app.use('/group', groupRoutes)
// app.use('/', mainRoutes)
// app.use('/api/category', categoryRoutes)
// app.use('/faculties', facultiesRoutes)
// app.use('/address', addressRoutes)
// app.use('/office', officeRoutes)
// app.use(error404)// 404 page
// app.use(requestTime)
// app.use(logger)
// app.use(serverRoutes)


// app.get('/download', (req, res) => {
//     // console.log(req.requestTime)
//     res.download(path.resolve(__dirname, 'static', 'index.html'))
// })

export { app };

