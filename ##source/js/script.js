// Хранилише обьектов - квадратиков
let rectsArray = [];
let counter = 0;
let interval;
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.addEventListener("click", (event) => {
	document.querySelector("#score").textContent = counter;
	for (let obj of rectsArray) {
		if (
			obj.x <= event.offsetX &&
			event.offsetX <= obj.x + obj.h &&
			obj.y <= event.offsetY &&
			event.offsetY <= obj.y + obj.w
		) {
			counter += 1;
			rectsArray.splice(rectsArray.indexOf(obj), 1); // Удалить елемент из массива
		}
	}
});

// Кнопка Stop
const buttonStop = document.querySelector("#stop");
buttonStop.addEventListener("click", (event) => {
	clearInterval(interval);
	rectsArray = [];
});

// Создать рандомные цвета
function getRandomColor() {
	let r = function () {
		return Math.floor(Math.random() * 256);
	};
	return "rgb(" + r() + "," + r() + "," + r() + ")";
}

// Создать рандомную скорость
function getRandomSpeed() {
	return Math.ceil(Math.random() * 3);
}

class Rect {
	constructor(x, y, w, h, color, speed) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.speed = speed;
		this.status = false;
	}

	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		this.y = this.y + this.speed;
		ctx.closePath();
	}
}

// Создать новый квадратик и закинуть его в массив
function createCanvasRects() {
	function generateX() {
		return Math.trunc(
			Math.random() *
				(canvas.width - (canvas.width - 20) + canvas.width - 40)
		);
	}
	const canvas = document.querySelector("#canvas");
	// let x = Math.trunc(Math.random() * canvas.width);
	let x = generateX();
	let color = getRandomColor();
	let speed = getRandomSpeed();

	rectsArray.push(new Rect(x, 0, 20, 20, color, speed));
}

function fall() {
	rectsArray = rectsArray.filter((element) => {
		element.draw();
		return element.y < canvas.width;
	});
}
// Кнопка Start
const buttonStart = document.querySelector("#start");
buttonStart.addEventListener("click", (event) => {
	counter = 0; // Обнулил счетчик

	interval = setInterval(function () {
		const canvas = document.querySelector("#canvas");
		const ctx = canvas.getContext("2d");
		document.querySelector("#score").textContent = counter; // Вывел на страницу в score
		createCanvasRects();
	}, Math.trunc(Math.random() * 1400));
});

function animate() {
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	fall();

	requestAnimationFrame(animate);
}

document.body.onload = animate; // Создали Канвас
