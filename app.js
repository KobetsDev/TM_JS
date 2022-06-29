import express from 'express'
// import path from 'path'
import nunjucks from 'nunjucks'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import passport from 'passport'
import bodyParser from 'body-parser'

import keys from './config/keys.js'
// import { requestTime, logger } from './middlewares.js'
// import serverRoutes from "./routes/servers.js";

import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import groupsRoutes from './routes/groups.js'
import groupRoutes from './routes/group.js'
import mainRoutes from './routes/main.js'

const app = express()

mongoose.connect(keys.MongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log(error))


// шаблонизатор
app.set('view engine', 'html')
nunjucks.configure('templates', {
    autoescape: true,
    express: app
})

app.use(passport.initialize())
import midd_passrort from './middlewares/passport.js'
midd_passrort(passport)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.disable('etag')

app.use('/api/auth', authRoutes)
app.use('/groups', groupsRoutes)
app.use('/group', groupRoutes)
app.use('/', mainRoutes)
app.use('/api/category', categoryRoutes)

// app.use(requestTime)
// app.use(logger)
// app.use(serverRoutes)


// app.get('/download', (req, res) => {
//     // console.log(req.requestTime)
//     res.download(path.resolve(__dirname, 'static', 'index.html'))
// })

// app.get('*', function (req, res) {
//     // res.send('what???')
//     res.status(404).redirect('/')
// })


export { app };

