;(() => {
	const buttons = document.querySelectorAll('#buttons > div')
	const expressionDiv = document.querySelector('#display > p:nth-child(1)')
	const currentNumberDiv = document.querySelector('#display > p:nth-child(2)')

	let expression = ''
	let currentNumber = ''

	function updateDisplay() {
		currentNumberDiv.textContent = currentNumber
		expressionDiv.textContent = expression
	}

	function handleNumberInput(value) {
		if ((value >= '0' && value <= '9') || value == '.') {
			currentNumber += value
			updateDisplay()
		}
	}

	function handleOperatorInput(value) {
		if (currentNumber !== '') {
			expression += currentNumber + ' ' + value + ' '
			currentNumber = ''
			updateDisplay()
		}
	}

	function handleClearAll() {
		currentNumber = ''
		expression = ''
		updateDisplay()
	}

	function handleClear() {
		currentNumber = ''
		updateDisplay()
	}

	function handleEquals() {
		if (currentNumber !== '') {
			expression += currentNumber
			expressionDiv.textContent = expression + ' = '
			currentNumber = eval(expression)
			currentNumberDiv.textContent = currentNumber
			expression = ''
		} else currentNumberDiv.textContent = 'Expressão inválida, digite um valor'
	}

	document.querySelectorAll('.number').forEach((button) => {
		button.addEventListener('click', () =>
			handleNumberInput(button.textContent)
		)
	})

	document.querySelectorAll('.operator').forEach((button) => {
		button.addEventListener('click', () =>
			handleOperatorInput(button.textContent)
		)
	})

	document.querySelector('.clear-all').addEventListener('click', handleClearAll)
	document.querySelector('.clear').addEventListener('click', handleClear)
	document.querySelector('.equals').addEventListener('click', handleEquals)
})()
