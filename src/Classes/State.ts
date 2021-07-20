import findClosest from '../lib/findClosest'
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
    return findClosest(errorQuotes, this.emotions).text.replace('{}', message)
  }

  public successQuote = (message: string) => {
    return findClosest(successQuotes, this.emotions).text.replace('{}', message)
  }

  public changeFrustration = (amount: number) =>
    (this.emotions.frustration = Math.max(-1, Math.min(1, this.emotions.frustration + amount)))
}
