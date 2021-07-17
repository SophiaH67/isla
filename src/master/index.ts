import express from 'express'
import expressWs from 'express-ws'

import { readFileSync } from 'fs'

import State from '../Classes/State'

const { app } = expressWs(express())

expressWs(app)

const state = new State(JSON.parse(readFileSync('./state.json').toString()))

app.ws('/ws', (ws, req) => {
  console.log(`[isla]: handling request from ${req.ip}`)
  ws.on('message', (msg) => {
    console.log(`[isla]: received message! ${msg}`)
  })
})

app.get('/emoji', (_, res) => {
  res.send('😆')
})

app.get('/quotes/:type/:message', (req, res) => {
  switch (req.params.type) {
    case 'error':
      return res.send(state.errorQuote(req.params.message)).end()
    case 'success':
      return res.send(state.successQuote(req.params.message)).end()
    default:
      return res.send('Wakaranai...').end()
  }
})

app.listen(3000)
