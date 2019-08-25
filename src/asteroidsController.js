export default class AsteroidsController {

	constructor (Model, View) {
		this.model = Model;
		this.view = View;

		this.view.setCanvas(this.model.sizes.canvas);
		this.model.setAsteroids(this.model.level, 4);
		this.view.bind("keydown", this.keyDownHandler.bind(this));
		this.view.bind("keyup", this.keyUpHandler.bind(this));
	}

	gameRender () {
		const asts = this.model.asteroids,
			spaceship = this.model.spaceship,
			sizes = this.model.sizes;
		
		this.view.drawAll({
			spaceStation: this.model.spaceStation, 
			spaceship: spaceship,
			asteroids: asts}, 
			sizes,
			this.model.gameBegin);

		this.checkLose(asts, spaceship, sizes)
			.checkWin(spaceship, sizes);
	
		this.model.asteroidsBouncing()
			.spaceshipCoordsChange();
		
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
	
	checkLose (asts, spaceship, sizes) {

		// let player chose when start the game
		
		if (!this.model.gameBegin) return this;

		// check for collision between spaceship and asteroids

		for (let i = 0; i < asts.length; i++) {
			if ( this.checkIntersection(spaceship, asts[i], sizes) ) {
				setTimeout( () => alert('You lose!'), 0);
				document.location.reload();
			}
		}	
		return this;
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
		this.model.moveStarship(e.keyCode);
	}

	keyUpHandler (e) {
		this.model.stopMovingStarship(e.keyCode);
	}
}