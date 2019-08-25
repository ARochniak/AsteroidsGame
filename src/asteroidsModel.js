export default class AsteroidsModel {
	constructor () {

		this.level = 1;

		this.gameBegin = false;

		this.sizes = {
			canvas: {
				width: 1060,
				height: 640
			},
			asteroid: 30,
			spaceship: 60
		};

		
		this.asteroids = [];

		this.ssDirection = {
			left: false,
			top: false,
			right: false,
			bottom: false
		};

		this.spaceship = {
			x: 0,
			y: 0,
			speed: 7
		};
		this.spaceStation = {
			x: this.sizes.canvas.width - this.sizes.spaceship,
			y: this.sizes.canvas.height - this.sizes.spaceship
		};
	}

	setAsteroids (amount, speed) {
		const min = this.sizes.spaceship*2,
			self = this;
		let	x = random("width"),
			y = random("height");

		this.asteroids = [];

		for (let ast, i = 0; i < amount; i++) {
			ast = {
				x: x,
				y: y,
				dx: Math.random() > 0.5 ? speed : -speed,
				dy: Math.random() > 0.5 ? speed : -speed,
			};
			this.asteroids.push(ast);

			// make starting position of asteroids without collisiions

			x = random("width");
			y = random("height");

			for (let j = 0; j < this.asteroids.length;) {

				if ( Math.abs(this.asteroids[j].x - x) < this.sizes.asteroid*1.5 &&
				Math.abs(this.asteroids[j].y - y) < this.sizes.asteroid*1.5 ) {
					j = 0;
					x = random("width");
					y = random("height");
				}
				else j++;
			}
		}

		function random(a) {
			let rand = min + Math.random() * (self.sizes.canvas[a] - min*2 + 1);
			return Math.floor(rand);
		}
	}

	levelUp () {
		this.level++;
		this.resetStarship();
		this.setAsteroids(this.level, 4);
}

	spaceshipCoordsChange () {
		const ssDirection = this.ssDirection,
			sizes = this.sizes,
			coords = this.spaceship;

		for (let i in ssDirection) {
			if ( ssDirection[i] ) {
				switch(i) {
					case "left":
						if (coords.x > coords.speed) coords.x -= coords.speed;
						else coords.x = 0;
						break;
					case "top":
						if (coords.y > coords.speed) coords.y -= coords.speed;
						else coords.y = 0;
						break;
					case "right":
						if (sizes.canvas.width - coords.x > sizes.spaceship + coords.speed) 
							coords.x += coords.speed;
						else coords.x = sizes.canvas.width - sizes.spaceship;
						break;
					case "bottom":
						if (sizes.canvas.height - coords.y > sizes.spaceship + coords.speed) 
							coords.y += coords.speed;
						else coords.y = sizes.canvas.height - sizes.spaceship;
						break;
				}
			}
		}
	}

	asteroidsBouncing () {

		// check for collisions with border

		const asts = this.asteroids,
			size = this.sizes.asteroid;
		
		asts.forEach((ast, i) => {
			if (ast.x + ast.dx > this.sizes.canvas.width-size || ast.x + ast.dx < 0) {
			    ast.dx = -ast.dx;
			}
			if (ast.y + ast.dy > this.sizes.canvas.height-size || ast.y + ast.dy < 0) {
			   ast.dy = -ast.dy;
			}

			// check for collisions between asteroids

			for (let j = i + 1; j < asts.length; j++) {
				if ( Math.abs( ast.x + ast.dx - asts[j].x - asts[j].dx ) < size &&
				Math.abs( ast.y + ast.dy - asts[j].y - asts[j].dy ) < size ) {

					// find out direction after collission

					if ( Math.abs( ast.x - asts[j].x ) >= size ) {
						ast.dx = -ast.dx;
						asts[j].dx = -asts[j].dx;
					}
					else {
						ast.dy = -ast.dy;
						asts[j].dy = -asts[j].dy;
					}
					break;
				}
			}

			// change asteroid position

			asts[i].x += asts[i].dx;
			asts[i].y += asts[i].dy;
		})
		return this;		
	}

	moveStarship (code) {
		if (!this.gameBegin) this.gameBegin = true;
		const direction = this.ssDirection;
		switch(code) {
			case 37:
				direction.left = true;
				break;
			case 38:
				direction.top = true;
				break;										
			case 39:
				direction.right = true;
				break;
			case 40:
				direction.bottom = true;
				break;
		}
	}

	stopMovingStarship (code) {
		const direction = this.ssDirection;
		switch(code) {
			case 37:
				direction.left = false;
				break;
			case 38:
				direction.top = false;
				break;										
			case 39:
				direction.right = false;
				break;
			case 40:
				direction.bottom = false;
				break;
		}
	}

	resetStarship () {
		this.spaceship.x = this.spaceship.y = 0;
		this.gameBegin = false;
		for (let direction in this.ssDirection) 
			this.ssDirection[direction] = false;
	}
}