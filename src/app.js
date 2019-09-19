import AsteroidsModel from "./asteroidsModel.js";
import AsteroidsView from "./asteroidsView.js";
import AsteroidsController from "./asteroidsController.js";

const model = new AsteroidsModel(),
	view = new AsteroidsView(),
	controller = new AsteroidsController(model, view),
	startButton = document.getElementById("startButton");

controller.lastTime = Date.now();
controller.gameRender();
startButton.onclick = () => {
	controller.bindKeyHandlers();
	document.querySelector(".transparentBg").style.display = "none";
};