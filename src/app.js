import AsteroidsModel from "./asteroidsModel.js";
import AsteroidsView from "./asteroidsView.js";
import AsteroidsController from "./asteroidsController.js";

const model = new AsteroidsModel(),
	view = new AsteroidsView(),
	controller = new AsteroidsController(model, view);

controller.lastTime = Date.now();
controller.gameRender();