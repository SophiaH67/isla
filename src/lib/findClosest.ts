import Emotions from '../interfaces/Emotions'
import Emoji from '../interfaces/Emoji'
import Quote from '../interfaces/Quote'

function findClosest(things: Quote[], emotionState: Emotions): Quote
function findClosest(things: Emoji[], emotionState: Emotions): Emoji
function findClosest(things: Quote[] | Emoji[], emotionState: Emotions) {
  let arr = getDistanceArray(things, getDistanceArray(things, emotionState, 100)[0].emotions, 0.3)
  return randomChoice(arr)
}
const randomChoice = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

const getDistanceArray = (things: Quote[] | Emoji[], emotionState: Emotions, maxDistance: number) =>
  things
    .map((thing: Quote | Emoji) => ({
      ...thing,
      distance: calculateDistance(emotionState, thing.emotions),
    }))
    .filter((thing) => thing.distance < maxDistance)
    .sort((a, b) => a.distance - b.distance)

const calculateDistance = (emotion1: Emotions, emotion2: Emotions) => {
  const A = Math.pow(Math.abs(emotion1.focusLevel - emotion2.focusLevel), 2)
  const B = Math.pow(Math.abs(emotion1.frustration - emotion2.frustration), 2)
  const C = Math.sqrt(A + B)
  return C
}
export default findClosest
