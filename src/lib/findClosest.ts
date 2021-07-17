import Emotions from '../interfaces/Emotions'
import Emoji from '../interfaces/Emoji'
import Quote from '../interfaces/Quote'

function findClosest(things: Quote[], emotionState: Emotions): Quote
function findClosest(things: Emoji[], emotionState: Emotions): Emoji
function findClosest(things: Quote[] | Emoji[], emotionState: Emotions) {
  let minimumDistance = 100
  let minimum = things[0]
  for (let i = 0; i < things.length; i++) {
    const thing = things[i]
    const distance = calculateDistance(emotionState, thing.emotions)
    if (minimumDistance < distance) continue
    minimum = thing
    minimumDistance = distance
  }
  return minimum
}
const calculateDistance = (emotion1: Emotions, emotion2: Emotions) => {
  const A = Math.pow(Math.abs(emotion1.focusLevel - emotion2.focusLevel), 2)
  const B = Math.pow(Math.abs(emotion1.frustration - emotion2.frustration), 2)
  const C = Math.sqrt(A + B)
  return C
}
export default findClosest
