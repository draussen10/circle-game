const $startBtn = document.getElementById('start')
const $screens = document.querySelectorAll('.screen')
const $timeList = document.getElementById('time-list')
const $time = document.getElementById('time')
const $board = document.getElementById('board')

const colors = ['#F9ED69', '#F08A5D', '#B83B5E', '#6A2C70']

let time = 0
let score = 0

$startBtn.addEventListener('click', (e) => {
	e.preventDefault()

	$screens[0].classList.add('up')
})

$timeList.addEventListener('click', e => {
	if(e.target.classList.contains('time-btn')) {
		time = +e.target.getAttribute('data-time')
		$screens[1].classList.add('up')
		startGame()
	}
})

function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

function decreaseTime() {
	if(time === 0) {
		finishGame()
		return
	}
	let current = --time
	if(current < 10) {current = `0${current}`}
	setTime(current)
}

function setTime(value) {
	$time.innerHTML = `00:${value}`
}

$board.addEventListener('click', e => {
	if(e.target.classList.contains('circle')) {
		score++
		e.target.remove()
		createRandomCircle()
	}
})

function finishGame() {
	$board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
	$time.parentNode.classList.add('hide')
}

function createRandomCircle() {
	const $circle = document.createElement('div')
	$circle.classList.add('circle')

	const {width, height} = $board.getBoundingClientRect()
	const size = getRandomNumber(20, 100)

	$circle.style.width = $circle.style.height = `${size}px`
	$circle.style.top = `${getRandomNumber(0, height - size)}px`
	$circle.style.left = `${getRandomNumber(0, width - size)}px`
	$circle.style.background = colors[getRandomNumber(0, colors.length)]

	$board.append($circle)
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}