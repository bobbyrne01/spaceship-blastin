window.onload = function() {

	function gofull() {
		game.scale.startFullScreen();
	}

	var game = new Phaser.Game(
		800,
		600,
		Phaser.AUTO,
		'Game', {
			preload: preload,
			create: create,
			update: update,
			render: render
		});

	function preload() {

		game.time.advancedTiming = true;
		game.time.desiredFps = 60;
	}

	function create() {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.stage.backgroundColor = '#000';

		//game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; // Stretch to fill
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE; // Keep original size
		// game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // Maintain aspect ratio

		game.input.onDown.add(gofull, this);

	}

	function update() {

	}

	function render() {

		game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");

		if (game.scale.isFullScreen) {

			game.debug.text('ESC to leave fullscreen', 270, 16);

		} else {
			game.debug.text('Click / Tap to go fullscreen', 270, 16);
		}
	}

};