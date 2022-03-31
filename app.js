const screen = document.querySelector('.screen')
const prescreen = document.querySelector('.prescreen')
const keyboard = document.querySelector('.keyboard')
const keyRow = document.getElementById('keysRow')
const results = document.getElementById('results')
const btnDelete = document.querySelector('.delete')

const keys = [
  'C',
  '()',
  '%',
  '⌫',
  7,
  8,
  9,
  '*',
  4,
  5,
  6,
  '-',
  1,
  2,
  3,
  '+',
  '.',
  0,
  '=',
  '/',
]
let number = ['', '']
let numberIndex = 0
let operator = ''
let count = 1

function init() {
  for (i = 0; i < keys.length; i++) {
    const key = document.createElement('button')
    key.className = 'key'
    key.value = keys[i]
    if (keys[i] === '*') {
      key.innerHTML = '×'
    } else if (keys[i] === '/') {
      key.innerHTML = '÷'
    } else key.innerHTML = keys[i]
    keyRow.appendChild(key)
    // const keyText = document.createTextNode(keys[i])
  }
  screen.innerHTML = 0
  prescreen.innerHTML = 0
}
init()

function changeIndex() {
  numberIndex = numberIndex === 0 ? 1 : 0
  screen.innerHTML = 0
}

function saveResult() {
  let res = screen.innerHTML
  results.innerHTML
    ? (results.innerHTML += ` | ${res}`)
    : (results.innerHTML += `${res}`)
}

keyRow.addEventListener('click', function (e) {
  if (e.target.value === 'C') {
    number = ['', '']
    screen.innerHTML = 0
    prescreen.innerHTML = 0
  } else if (e.target.value === '⌫') {
    number[numberIndex].length != 1 && number[numberIndex].length != 0
      ? (number[numberIndex] = String(number[numberIndex]).slice(0, -1))
      : (number[numberIndex] = '0')
    screen.innerHTML = number[numberIndex]
  } else if (e.target.value === '=') {
    let expression = screen.innerHTML
    number[numberIndex] = eval(expression)
    screen.innerHTML = number[numberIndex]
    saveResult()
  } else if (e.target.value === '()') {
    ;(number[numberIndex].split('(').length +
      number[numberIndex].split(')').length) %
      2 ==
      0 || number[numberIndex] == 0
      ? (number[numberIndex] += '(')
      : (number[numberIndex] += ')')

    screen.innerHTML = number[numberIndex]
  } else if (e.target.value === undefined) {
    return
  } else {
    number[numberIndex] == '0'
      ? (number[numberIndex] = '' + e.target.value)
      : (number[numberIndex] += e.target.value)
    screen.innerHTML = number[numberIndex]
  }
  prescreen.innerHTML = `= ${eval(screen.innerHTML)}`
})
