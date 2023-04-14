
 

// const express = require('express')
import express from 'express'
import configViewEngine from './configs/ViewEngine'
const app = express()

require('dotenv').config() // muốn lấy port từ .env bắt buộc phải cài dotenv và require dotenv
const port = process.env.PORT || 8080

configViewEngine(app)

app.get('/',(req,res) => {
  res.render('test/index.ejs')
})

app.get('/', (req, res) => {
  res.send('Nham Van Hien')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
