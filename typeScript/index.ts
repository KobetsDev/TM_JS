
// import { app } from './app.js'
// import express from 'express';
// const express = require('express')
// const app = express();
const app_ = require('./app')
const PORT = process.env.PORT ?? 8000
// app.get('/', (req, res) => {
//     res.send('The sedulous hyena ate the antelope!');
// });
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
})