import findClosestQuote from '../lib/closestQuote'
import { errorQuotes, successQuotes } from '../lib/quotes'
import Emotions from '../interfaces/Emotions'

export default class State {
  public emotions: Emotions
  public lifespanEnd: Date

  constructor(options: { emotions: Emotions; lifespanEnd: string }) {
    this.emotions = options.emotions
    this.lifespanEnd = new Date(options.lifespanEnd)
  }

  public errorQuote = (message: string) => {
    return findClosestQuote(errorQuotes, this.emotions).text.replace('{}', message)
  }

  public successQuote = (message: string) => {
    return findClosestQuote(successQuotes, this.emotions).text.replace('{}', message)
  }
}
