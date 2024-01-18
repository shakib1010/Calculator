let previousValue = ''
let currentValue = ''
let operator = ''
document.addEventListener('DOMContentLoaded', function () {
  const numbers = document.querySelectorAll('.number')
  const operators = document.querySelectorAll('.operator')
  const delBtn = document.querySelector('#del-btn')
  const resetBtn = document.querySelector('#reset')
  const equalBtn = document.querySelector('#equal')
  const decimalBtn = document.getElementById('decimal')
  const previousScreen = document.getElementById('previous-screen')
  const currentScreen = document.getElementById('current-screen')
  console.log(currentScreen)

  // handling operators
  numbers.forEach((number) => {
    number.addEventListener('click', function (e) {
      if (currentValue.length < 9) {
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue
      }
    })
  })

  // handling operators
  operators.forEach((op) => {
    op.addEventListener('click', function (e) {
      if (currentValue) {
        handleOperators(e.target.textContent)
        previousValue = currentValue
        currentValue = ''
        previousScreen.textContent = previousValue + ' ' + e.target.textContent
        currentScreen.textContent = currentValue
      }
    })
  })

  // handle reset
  resetBtn.addEventListener('click', function () {
    previousValue = ''
    currentValue = ''
    operator = ''
    previousScreen.textContent = previousValue
    currentScreen.textContent = currentValue
  })

  // handle delete btn
  delBtn.addEventListener('click', function () {
    handleDelete()
    currentScreen.textContent = currentValue
  })

  // handle equal btn
  equalBtn.addEventListener('click', function () {
    calculate()
    previousScreen.textContent = previousValue
    currentScreen.textContent = currentValue
  })

  decimalBtn.addEventListener('click', function () {
    if (!currentValue.includes('.')) {
      currentValue += '.'
      currentScreen.textContent = currentValue
    }
  })
})

// functionalities
function handleNumber(num) {
  currentValue += num
}

function handleOperators(op) {
  operator = op
}

function handleDelete() {
  currentValue = currentValue.slice(0, -1)
}

function calculate() {
  currentValue = Number(currentValue)
  previousValue = Number(previousValue)

  switch (operator) {
    case '+':
      currentValue = previousValue + currentValue
      break
    case '-':
      currentValue = previousValue - currentValue
      break
    case 'x':
      currentValue = previousValue * currentValue
      break
    case '/':
      currentValue = previousValue / currentValue
      break
    default:
      console.log('please refresh the browser and click on a valid operator')
      break
  }

  previousValue = ''
  currentValue = roundNumber(currentValue)
  console.log(currentValue)
  currentValue = currentValue.toString()
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000
}
