import express from 'express'
import expressWs from 'express-ws'

import { readFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import emojis from '../lib/emojis'
import findClosest from '../lib/findClosest'

import State from '../Classes/State'

const { app } = expressWs(express())

expressWs(app)

let state: State
try {
  state = new State(JSON.parse(readFileSync('./config/state.json').toString()))
} catch (e) {
  state = new State({
    emotions: { focusLevel: 0.5, frustration: 0.5 },
    lifespanEnd: new Date(new Date().getTime() + 2000 * 60 * 60 * 1000).toUTCString(),
  })
}

const saveSate = () => writeFile('./config/state.json', JSON.stringify(state))
setInterval(saveSate, 5 * 60 * 1000)
saveSate()

app.ws('/ws', (ws, req) => {
  console.log(`[isla]: handling request from ${req.ip}`)
  ws.on('message', (msg) => {
    console.log(`[isla]: received message! ${msg}`)
  })
})

app.get('/emoji', (_, res) => {
  res.send(findClosest(emojis, state.emotions).emoji)
})

app.get('/quotes/:type/:message', (req, res) => {
  switch (req.params.type) {
    case 'error':
      state.changeFrustration(-Math.random())
      return res.send(state.errorQuote(req.params.message)).end()
    case 'success':
      state.changeFrustration(+Math.random())
      return res.send(state.successQuote(req.params.message)).end()
    default:
      return res.send('Wakaranai...').end()
  }
})

app.listen(3000, '0.0.0.0', () => console.log('Listening on port 3000'))
