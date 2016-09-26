// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    /*
      Defines enemy spawn coordinates, x at -100 so the enemy will spawn off screen.
      y coordinate is randomly selected from the values in the enemyYArray.
      Used Math.random to define moving speed.
    */
    this.x = -100;
    var enemyYArray = [60, 143, 223];
    var random = Math.floor(Math.random()*enemyYArray.length);
    this.y = enemyYArray[random];
    this.speed = Math.floor((Math.random()+5)*50);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, index) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    /*
      Update x position by adding the product of speed and dt to itself.
      If x coordinate is over 550, meaning the enemy sprite is off the canvas, remove it from allEnemies array and push a new enemy object.
    */
    this.x = this.x + this.speed*dt;
    if (this.x>550) {
        allEnemies.splice(index, 1);
        allEnemies.push(new Enemy());
    }
    /*
      Checks if the player sprite is colliding with enemy sprite, if true reposition player sprite to starting location.
    */
    if (this.x < player.x + 50 &&
        this.x + 50 > player.x &&
        this.y < player.y + 50 &&
        50 + this.y > player.y) {
        player.x = 202;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/*
  Player constructor function, includes starting x and y coordinates and sprite used for player.
*/
var Player = function() {
    this.x = 202;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};
/*
  Player constructor method used to update player location after reaching the water blocks.
  If player lands on a water block, player will be returned to starting location after 500ms.
  Set this keyword to self, otherwise this will reference the global object inside setTimeout.
*/
Player.prototype.update = function() {
    if (this.y < 50) {
        var self = this;
        setTimeout(function() {
            self.x = 202;
            self.y = 400;
        }, 500);
    }
};
/*
  @param string str - keycode passed in from player movement.
  If conditions make sure player can not move off canvas.
*/
Player.prototype.handleInput = function(str) {
    if (str === 'left'&&this.x>50) {
        this.x -= 101;
    } else if (str === 'up'&&this.y>50) {
        this.y -= 83;
    } else if (str === 'right'&&this.x<400) {
        this.x += 101;
    } else if (str === 'down'&&this.y<400) {
        this.y += 83;
    }

};
// Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy()]

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
