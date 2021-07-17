import Emotions from '../interfaces/Emotions'
import Quote from '../interfaces/Quote'

const findClosestQuote = (quotes: Quote[], emotionState: Emotions) => {
  let minimumDistance = 100
  let minimumQuote = quotes[0]
  for (let i = 0; i < quotes.length; i++) {
    const quote = quotes[i]
    const distance = calculateDistance(emotionState, quote.emotions)
    if (minimumDistance < distance) continue
    minimumQuote = quote
    minimumDistance = distance
  }
  return minimumQuote
}
const calculateDistance = (emotion1: Emotions, emotion2: Emotions) => {
  const A = Math.pow(Math.abs(emotion1.focusLevel - emotion2.focusLevel), 2)
  const B = Math.pow(Math.abs(emotion1.frustration - emotion2.frustration), 2)
  const C = Math.sqrt(A + B)
  return C
}
export default findClosestQuote
