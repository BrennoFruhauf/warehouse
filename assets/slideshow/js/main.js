;(() => {
	function getElement(selector, parentElement) {
		return (parentElement || document).querySelector(selector)
	}

	function getElements(selector, parentElement) {
		return (parentElement || document).querySelectorAll(selector)
	}

	function createNewElement(tagName, properties) {
		return Object.assign(document.createElement(tagName), properties)
	}

	function restDivision(n, m) {
		return ((n % m) + m) % m
	}

	function slideShow(slide) {
		const animationTime = 1000
		const delay = 5000

		const elSlide = getElement('#slides', slide)
		const elsSlide = getElements('.slide', elSlide)
		const elsBtns = []

		let timer
		let count = 0
		let totalSlide = elsSlide.length

		if (totalSlide < 2) return

		function animate(ms = animationTime) {
			const mod = restDivision(count, totalSlide)

			elSlide.style.transitionDuration = `${ms}ms`
			elSlide.style.transform = `translateX(${(-count - 1) * 100}%)`
			elsSlide.forEach((el, i) => el.classList.toggle('active', mod === i))
			elsBtns.forEach((el, i) => el.classList.toggle('active', mod === i))
		}

		function next() {
			if (count >= totalSlide) return
			count++
			animate()
		}

		function play() {
			timer = setInterval(next, delay + animationTime)
		}

		function stop() {
			clearInterval(timer)
		}

		function goTo(index) {
			count = index
			stop()
			play()
			animate()
		}

		const elNavigation = createNewElement('div', {
			id: 'navigation',
		})

		for (let i = 0; i < totalSlide; i++) {
			const elBtn = createNewElement('button', {
				type: 'button',
				className: 'bullet',
				onclick: () => goTo(i),
			})
			elsBtns.push(elBtn)
		}

		elSlide.addEventListener('transitionend', () => {
			if (count >= totalSlide) count = 0
			animate(0)
		})

		elNavigation.append(...elsBtns)
		slide.append(elNavigation)

		elSlide.prepend(elsSlide[totalSlide - 1].cloneNode(true))
		elSlide.append(elsSlide[0].cloneNode(true))
		animate()
		play()
	}

	slideShow(document.querySelector('#slide'))
})()
