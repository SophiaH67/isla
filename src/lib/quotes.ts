import Quote from '../interfaces/Quote'

export const errorQuotes: Quote[] = [
  { emotions: { focusLevel: 0.2, frustration: 0.8 }, text: 'フムフム。' },
  { emotions: { focusLevel: 0.2, frustration: 0.2 }, text: 'エラーが発生しました。。。たぶん' },
  { emotions: { focusLevel: 0.8, frustration: 0.8 }, text: 'もおおおおおおおおおおおお！ エラーが発生しました。{}' },
  { emotions: { focusLevel: 0.8, frustration: 0.2 }, text: 'すいません。エラーが発生しました。{}' },
]

export const successQuotes: Quote[] = [
  { emotions: { focusLevel: 0.2, frustration: 0.8 }, text: 'フムフム、よし' },
  { emotions: { focusLevel: 0.2, frustration: 0.2 }, text: '多分、うまくいったと思います。' },
  { emotions: { focusLevel: 0.8, frustration: 0.8 }, text: '操作は成功しました。与えられたメッセージは{}です。' },
  { emotions: { focusLevel: 0.8, frustration: 0.2 }, text: 'やたあああああああああああああ！ {}！' },
]
