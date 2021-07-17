# Master API

## GET /emoji

Returns emoji resembling current mood

## GET /quotes/[type]

Returns a quote of specified type resemblind current mood

## WS /ws

Initialize websocket

# WS messages

## Slave -> Master

```ts
type websocketSlaveMasterMessage: websocketResult | websocketPong

interface websocketResult {
  type: 'result'
  resultTarget: string
  data: string
}

interface websocketPong {
  type: 'ping'
  datetime: string
  zshInstances: number
}
```

## Master -> Slave

```ts
type websocketMasterSlaveMessage: websocketRequest | websocketPing

interface websocketTerminalInput {
  type: 'request'
  requestTarget: string
  requestType: 'input'
  requestData: string // base64 string of whatever gets piped into stdin
}

interface websocketPing { // Run every 10 seconds?
  type: 'ping'
}
```
