//  Core Bullet class
//  Sprite object, with properties.
//  Fired by all Weapon classes
var Bullet = function (game, key) {

	Phaser.Sprite.call(this, game, 0, 0, key);

	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
	this.anchor.set(0.5);
	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
	this.exists = false;
	this.tracking = false;
	this.scaleSpeed = 0;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

	gx = gx || 0;
	gy = gy || 0;

	this.reset(x, y);
	this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    this.angle = angle;
    this.body.gravity.set(gx, gy);
};

Bullet.prototype.update = function () {

	if (this.tracking) {
		this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
	}

	if (this.scaleSpeed > 0) {
		this.scale.x += this.scaleSpeed;
		this.scale.y += this.scaleSpeed;
	}
};

var Weapon = {};

////////////////////////////////////////////////////
//  A single bullet is fired in front of the ship //
////////////////////////////////////////////////////
Weapon.SingleBullet = function (game) {

	Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 100;

	for (var i = 0; i < 64; i++) {

		this.add(new Bullet(game, 'bullet'), true);
	}

	return this;
};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {

	if (this.game.time.time < this.nextFire) {
		return;
	}

	var x = source.body.x + source.width / 2;
	var y = source.body.y + source.height / 2;

	this.getFirstExists(false).fire(x, y, source.angle - 90, this.bulletSpeed, 0, 0);
	this.nextFire = this.game.time.time + this.fireRate;

};

//////////////////////////////////////////////////////
//  3-way Fire (directly left, above and right) //
//////////////////////////////////////////////////////
Weapon.ThreeWay = function (game) {

	Phaser.Group.call(this, game, game.world, 'Three Way', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 100;

	for (var i = 0; i < 96; i++) {

		this.add(new Bullet(game, 'bullet'), true);
	}

	return this;
};

Weapon.ThreeWay.prototype = Object.create(Phaser.Group.prototype);
Weapon.ThreeWay.prototype.constructor = Weapon.ThreeWay;

Weapon.ThreeWay.prototype.fire = function (source) {

	if (this.game.time.time < this.nextFire) {
		return;
	}

	var x = source.body.x + source.width / 2;
	var y = source.body.y + source.height / 2;

	this.getFirstExists(false).fire(x, y, source.angle - 180, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, source.angle - 90, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, source.angle - 0, this.bulletSpeed, 0, 0);

	this.nextFire = this.game.time.time + this.fireRate;
};

/////////////////////////////////////////////
//  8-way fire, from all sides of the ship //
/////////////////////////////////////////////
Weapon.EightWay = function (game) {

	Phaser.Group.call(this, game, game.world, 'Eight Way', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 100;

	for (var i = 0; i < 96; i++) {
		this.add(new Bullet(game, 'bullet'), true);
	}

	return this;
};

Weapon.EightWay.prototype = Object.create(Phaser.Group.prototype);
Weapon.EightWay.prototype.constructor = Weapon.EightWay;

Weapon.EightWay.prototype.fire = function (source) {

	if (this.game.time.time < this.nextFire) {
		return;
	}

	var x = source.body.x + source.width / 2;
	var y = source.body.y + source.height / 2;

	this.getFirstExists(false).fire(x, y, source.angle - 0, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, source.angle - 45, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, source.angle - 90, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, source.angle - 135, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, source.angle - 180, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, source.angle - 225, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, source.angle - 270, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, source.angle - 315, this.bulletSpeed, 0, 0);

	this.nextFire = this.game.time.time + this.fireRate;
};

////////////////////////////////////////////////////
//  Bullets are fired out scattered on the y axis //
////////////////////////////////////////////////////
Weapon.ScatterShot = function (game) {

	Phaser.Group.call(this, game, game.world, 'Scatter Shot', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 40;

	for (var i = 0; i < 32; i++) {

		this.add(new Bullet(game, 'bullet'), true);
	}

	return this;
};

Weapon.ScatterShot.prototype = Object.create(Phaser.Group.prototype);
Weapon.ScatterShot.prototype.constructor = Weapon.ScatterShot;

Weapon.ScatterShot.prototype.fire = function (source) {

	if (this.game.time.time < this.nextFire) {
		return;
	}

	var x = source.body.x + source.width / 2 + this.game.rnd.between(-10, 10);
	var y = source.body.y + source.height / 2;

	this.getFirstExists(false).fire(x, y, source.angle - 90, this.bulletSpeed, 0, 0);

	this.nextFire = this.game.time.time + this.fireRate;

};

///////////////////////////////////////////////////////////////////////
//  A three-way fire where the top and bottom bullets bend on a path //
///////////////////////////////////////////////////////////////////////
Weapon.SplitShot = function (game) {

	Phaser.Group.call(this, game, game.world, 'Split Shot', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 700;
	this.fireRate = 40;

	for (var i = 0; i < 64; i++) {
		this.add(new Bullet(game, 'bullet'), true);
	}

	return this;
};

Weapon.SplitShot.prototype = Object.create(Phaser.Group.prototype);
Weapon.SplitShot.prototype.constructor = Weapon.SplitShot;

Weapon.SplitShot.prototype.fire = function (source) {

	if (this.game.time.time < this.nextFire) {
		return;
	}

	var x = source.x + source.width / 2;
	var y = source.y + source.height / 2;

	this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, -700, 0);
	this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
	this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 700, 0);

	this.nextFire = this.game.time.time + this.fireRate;

};

///////////////////////////////////////////////////////////////////
//  Rockets that visually track the direction they're heading in //
///////////////////////////////////////////////////////////////////
Weapon.Rockets = function (game) {

	Phaser.Group.call(this, game, game.world, 'Rockets', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 400;
	this.fireRate = 250;

	for (var i = 0; i < 32; i++) {
		this.add(new Bullet(game, 'missile'), true);
	}

	this.setAll('tracking', true);

	return this;
};

Weapon.Rockets.prototype = Object.create(Phaser.Group.prototype);
Weapon.Rockets.prototype.constructor = Weapon.Rockets;

Weapon.Rockets.prototype.fire = function (source) {

	if (this.game.time.time < this.nextFire) {
		return;
	}

	var x = source.x + source.width / 2;
	var y = source.y + source.height / 2;

	this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, -700, 0);
	this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 700, 0);

	this.nextFire = this.game.time.time + this.fireRate;

};