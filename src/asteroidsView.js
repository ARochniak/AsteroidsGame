import Sprite from "./sprite.js";

export default class MoleculesView {

	constructor () {
		this.canvas = document.getElementById('asteroidsCanvas');
		this.ctx = this.canvas.getContext('2d');
		this.spaceshipImg = new Image();
		this.spaceshipTransparentImg = new Image();
		this.asteroidImg = new Image();
		this.spaceStationImg = new Image();
		this.explosionImg = new Image();
		this.spaceshipImg.src = '../images/spaceship.png';
		this.spaceshipTransparentImg.src = '../images/transparent_spaceship.png';
		this.asteroidImg.src = '../images/asteroid.png';
		this.spaceStationImg.src = '../images/spacestation.png';
		this.explosionImg.src = '../images/explosion.png';
	}

	setCanvas (sizes) {
		this.canvas.width = sizes.canvas.width;
		this.canvas.height = sizes.canvas.height;
		this.explosion = new Sprite ({
			img: this.explosionImg,
			pos: [0,0],
			size: [100, 100],
			speed: 10,
			frames: [0,1,2,3,4],
			once: true,
			gameSize: sizes.spaceship});
	}

	drawAsteroid (coords, size) {
		this.ctx.drawImage(this.asteroidImg, coords.x, coords.y, size, size);
	}

	drawExplosion (dt, spaceship, callback) {
		this.explosion.render(this.ctx, spaceship, callback);
		this.explosion.update(dt);
	}
	
	drawSpaceship (coords, size, gameBegin) {
		if (gameBegin && !coords.destroyed)
			this.ctx.drawImage(this.spaceshipImg, coords.x, coords.y, size, size);
		else if (!gameBegin)
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

	drawAll (allObjects, sizes, gameBegin, dt) {

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