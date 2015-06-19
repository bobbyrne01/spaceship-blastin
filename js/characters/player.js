function setupPlayer() {

	player = game.add.sprite(
		game.world.width / 2,
		game.world.height,
		'player');
	player.scale.setTo(0.25, 0.25);
	player.acceleration = 1500;
	player.drag = 400;
	player.maxSpeed = 400;
	player.currentWeapon = 0;
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.body.maxVelocity.setTo(player.maxSpeed, player.maxSpeed);
	player.body.drag.setTo(player.drag, player.drag);

	// Add an emitter for the ship's trail
	player.shipTrail = game.add.emitter(player.x + player.body.width / 2, player.y + player.body.height, 400);
	player.shipTrail.width = 10;
	player.shipTrail.makeParticles('trail');
	player.shipTrail.setXSpeed(30, -30);
	player.shipTrail.setYSpeed(200, 180);
	player.shipTrail.setRotation(50, -50);
	player.shipTrail.setAlpha(1, 0.01, 800);
	player.shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
	player.shipTrail.start(false, 5000, 10);

	weapons.push(new Weapon.SingleBullet(game));
	weapons.push(new Weapon.ThreeWay(game));
	weapons.push(new Weapon.EightWay(game));
	weapons.push(new Weapon.ScatterShot(game));
	weapons.push(new Weapon.SplitShot(game));
	weapons.push(new Weapon.Rockets(game));
	weapons.push(new Weapon.ScaleBullet(game));

	for (var i = 1; i < weapons.length; i++) {
		weapons[i].visible = false;
	}

	weapons[player.currentWeapon].visible = true;
}
