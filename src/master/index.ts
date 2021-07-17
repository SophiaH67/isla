import express from 'express'

import expressWs from 'express-ws'
const { app } = expressWs(express())

expressWs(app)

app.ws('/ws', (ws, req) => {
  console.log(`[isla]: handling request from ${req.ip}`)
  ws.on('message', (msg) => {
    console.log(`[isla]: received message! ${msg}`)
  })
})

app.get('/emoji', (_, res) => {
  res.send('😆')
})

app.get('/quotes/:type', (req, res) => {
  console.log(req.params)
  res.send('Wakaranai...')
})

app.listen(3000)
