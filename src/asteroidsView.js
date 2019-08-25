export default class MoleculesView {

	constructor () {
		this.canvas = document.getElementById('asteroidsCanvas');
		this.ctx = this.canvas.getContext('2d');
		this.spaceshipImg = new Image();
		this.spaceshipTransparentImg = new Image();
		this.asteroidImg = new Image();
		this.spaceStationImg = new Image();
	}

	setCanvas (size) {
		this.canvas.width = size.width;
		this.canvas.height = size.height;
		this.spaceshipImg.src = './images/spaceship.png';
		this.spaceshipTransparentImg.src = './images/transparent_spaceship.png';
		this.asteroidImg.src = './images/asteroid.png';
		this.spaceStationImg.src = './images/spacestation.png';
	}

	drawAsteroid (coords, size) {
		this.ctx.drawImage(this.asteroidImg, coords.x, coords.y, size, size);
	}
	
	drawSpaceship (coords, size, gameBegin) {
		if (gameBegin)
			this.ctx.drawImage(this.spaceshipImg, coords.x, coords.y, size, size);
		else 
			this.ctx.drawImage(this.spaceshipTransparentImg, coords.x, coords.y, size, size);
	}

	clearCanvas () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		return this;
	}

	drawSpaceStation (coords, size) {
		this.ctx.drawImage(this.spaceStationImg, coords.x, coords.y, size, size);
		return this;
	}

	drawAll (allObjects, sizes, gameBegin) {
		this.clearCanvas()
			.drawSpaceStation(allObjects.spaceStation, sizes.spaceship)
			.drawSpaceship(allObjects.spaceship, sizes.spaceship, gameBegin);
			
		allObjects.asteroids.forEach( (ast) => {
			this.drawAsteroid(ast, sizes.asteroid);
		});
	}

	bind (event, handler) {
		document.addEventListener(event, handler);
	}
}