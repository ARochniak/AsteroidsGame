export default class AsteroidsController {

	constructor (Model, View) {
		this.model = Model;
		this.view = View;
		this.lastTime = 0;

		this.view.setCanvas(this.model.sizes);
		this.model.setAsteroids(this.model.level);
		this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
	}

	bindButtonsTouch () {
		const buttons = document.querySelectorAll('.buttons div');
		buttons.forEach( button => {
			button.addEventListener("touchstart", this.touchStartHandler.bind(this));
			button.addEventListener("touchend", this.touchEndHandler.bind(this));

		})
	}
	bindKeyHandlers () {
		this.view.bind("keydown", this.keyDownHandler.bind(this));
		this.view.bind("keyup", this.keyUpHandler.bind(this));
	}

	gameRender () {
		const asts = this.model.asteroids,
			spaceship = this.model.spaceship,
			sizes = this.model.sizes,
			dt = (Date.now() - this.lastTime) / 1000.0;
		
		this.view.drawAll({
			spaceStation: this.model.spaceStation, 
			spaceship: spaceship,
			asteroids: asts}, 
			sizes,
			this.model.gameBegin,
			dt);

		this.checkLose(asts, spaceship, sizes, dt)
			.checkWin(spaceship, sizes);
	
		this.model.asteroidsBouncing(dt)
			.spaceshipCoordsChange(dt);

		this.lastTime = Date.now();
		
		requestAnimationFrame(this.gameRender.bind(this));
	}


	checkIntersection (ss, ast, sizes) {
		const spaceshipRadius = sizes.spaceship/2,
			asteroidRadius = sizes.asteroid/2,
			cathetus1 = Math.abs(ss.x + spaceshipRadius - ast.x - asteroidRadius),
			cathetus2 = Math.abs(ss.y + spaceshipRadius - ast.y - asteroidRadius),
			distance = Math.sqrt(cathetus1*cathetus1 + cathetus2*cathetus2);

		return spaceshipRadius + asteroidRadius > distance;
	}
	
	checkLose (asts, spaceship, sizes, dt) {

		// let player chose when start the game
		
		if (!this.model.gameBegin) return this;

		// check for collision between spaceship and asteroids
		if (!spaceship.destroyed) {
			for (let i = 0; i < asts.length; i++) {
				if ( this.checkIntersection(spaceship, asts[i], sizes) ) {
					document.removeEventListener('keydown', this.keyDownHandler);
					document.removeEventListener('keyup', this.keyUpHandler);
					this.view.drawExplosion(dt, spaceship, this.gameEnd.bind(this));
					this.model.destroySpaceship();
				}
			}	
		}
		else {
			this.view.drawExplosion(dt, spaceship, this.gameEnd.bind(this));
		}
		return this;
	}

	gameEnd () {
		document.location.reload();
		alert('You lose!');
	}

	checkWin (spaceship, sizes) {

		// check if spaceship came to spacestation

		if (spaceship.x === sizes.canvas.width - sizes.spaceship &&
		spaceship.y === sizes.canvas.height - sizes.spaceship) {
			setTimeout( () => alert('You complete the level!'), 0);
			this.model.levelUp();
		};
	}

	keyDownHandler (e) {
		if (e.repeat) return;
		let direction;
		switch(e.keyCode) {
			case 37:
				direction = 'left';
				break;
			case 38:
				direction = 'up';
				break;										
			case 39:
				direction = 'right';
				break;
			case 40:
				direction = 'down';
				break;
		}
		this.model.moveStarship(direction);
	}

	keyUpHandler (e) {
		let direction;

		switch(e.keyCode) {
			case 37:
				direction = 'left';
				break;
			case 38:
				direction = 'up';
				break;										
			case 39:
				direction = 'right';
				break;
			case 40:
				direction = 'down';
				break;
		}
		this.model.stopMovingStarship(direction);
	}
	touchStartHandler (e) {
		e.preventDefault();
		const target = e.target;
		const direction = target.textContent.toLowerCase();
		console.log(direction);

		this.model.moveStarship(direction);
	}
	touchEndHandler (e) {
		e.preventDefault();
		const target = e.target;
		const direction = target.textContent.toLowerCase();
		console.log(direction);

		this.model.stopMovingStarship(direction);
	}
}