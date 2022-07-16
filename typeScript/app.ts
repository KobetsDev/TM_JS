// import express from 'express'
// import morgan from 'morgan'
const app: any = require('express')
const morgan = require('morgan')
// const app = express()


app.use(morgan.morgan('dev'))

app.disable('etag')


// export { app };

module.exports = app