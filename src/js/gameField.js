const doc = document;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var img = new Image(canvas.width, canvas.height);
var score = doc.createElement('div');
score.id = 'score';
score.innerHTML = '0';
canvas.innerHTML = score.innerHTML;

img.src = 'img/field.jpg';

canvas.width = doc.documentElement.clientWidth -10;
canvas.height = doc.documentElement.clientHeight -10;

img.onload = function() {
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
};

//Create the canvas

function CreateField() {
	this.canvas = canvas;
	this.ctx = ctx;
	this.img = img;
	this.scope = 0;
}

CreateField.prototype = {

	start() {
		this.canvas.width = canvas.width;
		this.canvas.height = canvas.height;

		this.frame = 0;
		//this.enemies = [];
	},

	clear() {
		this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
		this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
		this.scope += 1;
	}
};

 function Person() {
 	this.ctx = doc.querySelector('canvas').getContext('2d');
	this.x = x;
	this.y = y;
	this.sheetWidth = sheetWidth;
	this.sheetHeight = sheetHeight;
	this.cols = cols;
	this.rows = rows;
	this.speed = 0;
	this.move = 0;
	this.frames = frames;
	this.image = new Image();
	this.image.src = src;
	this.width = this.sheetWidth / this.cols;
	this.height = this.sheetHeight / this.rows;
	this.currentFrame = 0;
	this.xPos = xPos;
	this.yPos = yPos;
}

Person.prototype = {

	drawImage(z = 1, currentFrame = 0, xPos, yPos) {
		//this.ctx.drawImage(this.image, 0, this.height * z, this.width, this.height, this.x, this.y, this.width, this.height);
		currentFrame = ++currentFrame % this.cols;
		console.log(currentFrame);
		this.srcX = currentFrame * this.width;
		console.log(this.srcX);
		this.srcY = z * this.height;
		this.ctx.drawImage(this.image, this.x * currentFrame, this.y * z, this.width, this.height, xPos * currentFrame, yPos * z, this.width, this.height);
		},

	update(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.draw(z), 0, 0, this.width, this.height);
		ctx.restore();
		return this;
	},

 getNewPos(options) {
	this.speed = 0;
	this.moveAngle = 0;
	}
};

var xPosInit = (doc.documentElement.clientWidth - 10) / 2;
var yPosInit = (doc.documentElement.clientHeight - 10) / 2;

function Player (src, sheetWidth = 800, sheetHeight = 450, cols =9, rows = 4) {
	this.ctx = doc.querySelector('canvas').getContext('2d');
	this.sheetWidth = sheetWidth;
	this.sheetHeight = sheetHeight;
	this.cols = cols;
	this.rows = rows;
	this.speed = 0;
	this.move = 0;
	this.frames = frames;
	this.image = new Image();
	this.image.src = src;
	this.width = this.sheetWidth / this.cols;
	this.height = this.sheetHeight / this.rows;
	this.currentFrame = 0;
	this.currentIndex  = 1;
	this.x = this.currentFrame * this.width;
	this.y = this.currentIndex * this.height;
	this.xPos = xPosInit;
	this.yPos = yPosInit;
}

Player.prototype = {
	update() {
		this.xNewPos = this.xPos;
		this.yNewPos = this.yPos;
	},

	reset() {
		this.xPos = xPosInit;
		this.yPos = yPosInit;
	},

	render() {
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height, this.xPos, this.yPos, this.width, this.height);
	},

	go(key) {
		if (key === 'left') {
			this.currentFrame = 1;
			this.x = this.currentFrame * this.width;
			this.currentIndex = 3;
			this.y = this.currentIndex * this.height;
			this.render();
		}

		if (key === 'up') {
			this.x = 0;
			this.y = 0;
			this.render();
		}

		if (key === 'right') {
			this.x = 0;
			this.currentIndex = 1;
			this.y = this.currentIndex * this.height;
			this.render();
		}

		if (key === 'down') {
			this.currentIndex = 2;
			this.x = 0;
			this.y = this.currentIndex * this.height;
			this.render();
		}

		this.currentFrame = ++this.currentFrame % this.cols;
		this.x = this.currentFrame * this.width;
		this.y = this.currentIndex * this.height;
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height, this.xPos, this.yPos, this.width, this.height);
	},

	stop(key) {
		if (key === 'left') {
			this.x = 0;
			this.currentIndex = 3;
			this.y = this.currentIndex * this.height;
			this.render();
		}

		if (key === 'up') {
			this.x = 0;
			this.currentIndex = 0;
			this.y = this.currentIndex * this.height;
			this.render();
		}

		if (key === 'right') {
			this.x = 0;
			this.currentIndex = 1;
			this.y = this.currentIndex * this.height;
			this.render();
		}

		if (key === 'down') {
			this.currentIndex = 2;
			this.x = 0;
			this.y = this.currentIndex * this.height;
			this.render();
		}
	},

	handleInput(key) {
		this.update();
		if (key === 'left') {
			this.xPos = this.xNewPos - 3;
			if (this.xPos < -40) {
				this.xPos = doc.documentElement.clientWidth - 25;
			}
			this.x = 0;
			this.currentIndex = 3;
			this.y = this.currentIndex * this.height;
			this.go();
		}

		if (key === 'up') {
			this.yPos = this.yNewPos - 3;
			if (this.yPos < -70) {
				this.yPos = doc.documentElement.clientHeight - 25;
			}
			this.x = 0;
			this.currentIndex = 0;
			this.y = this.currentIndex * this.height;
			this.go();
	}

		if (key === 'right') {
			this.xPos = this.xNewPos + 3;
			if (this.xPos > doc.documentElement.clientWidth - 25) {
				this.xPos = -40;
			}
			this.x = 0;
			this.currentIndex = 1;
			this.y = this.currentIndex * this.height;
			this.go();
		}

		if (key === 'down') {
			this.yPos = this.yNewPos + 3;
			if (this.yPos > doc.documentElement.clientHeight - 25) {
				this.yPos = -70;
			}
			this.currentIndex = 2;
			this.x = 0;
			this.y = this.currentIndex * this.height;
			this.go();
		}
	}
};

//Player.prototype = Object.create(Person.prototype);

function start () {
	window.addEventListener('DOMContentLoaded', () => {
		var playGame = new CreateField();
		playGame.start();
		let interval = setInterval(function() {
			playGame.clear();
			person.render();
		}, 10);

		var person = new Player('img/knight.png');
		var player = person.image;
		player.onload = function () {
			person.render();
		};


		document.addEventListener('keydown', function(e) {
			var keys = {
				37: 'left',
				38: 'up',
				39: 'right',
				40: 'down'
			};
			// if(!paused) {
			person.handleInput(keys[e.keyCode]);
			// }
		});

		doc.addEventListener('keyup', function(e) {
			var keys = {
				37: 'left',
				38: 'up',
				39: 'right',
				40: 'down'
			};
			person.stop(keys[e.keyCode]);
		})
	});
}