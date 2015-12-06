require(['game'], function(game) {

	if(game.debug){
		console.log(game);
	}

	(function() {
	  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	  window.requestAnimationFrame = requestAnimationFrame;
	})();

	game.preinit();
	game.init(function(){
		window.addEventListener("keydown", game.Input.addKey, true);
		window.addEventListener("keyup", game.Input.removeKey, true);
		window.addEventListener("mousemove", game.Input.mouseMove, true);
		window.addEventListener("mousedown", game.Input.mouseDown, true);
		window.addEventListener("mouseup", game.Input.mouseUp, true);

		console.log('game initialised.');

		game.loop();
	});

	/*$(document).on('click', '#debug1', function(){
		console.log(game.agents, game.mobs);
	})*/
});
