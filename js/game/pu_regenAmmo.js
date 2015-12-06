define(["agent"],
    function(Agent){

    // define the pu_regenHealth class as a copy of Agent
    var pu_regenHealth = Object.create(Agent);


    pu_regenHealth.init = function(pos){
        this.dir = 0;
        this.maxSpeed = 0.5;
        this.type = 'pu_regenHealth';
        this.target = require('game').Player;
        this.health = 1;
        this.effect = 'regenAmmo';
        this.bonus = 0.3;
        this.color = '#000';
        Agent.init.call(this, pos);

        require('game').powerups.push(this);
    }

    pu_regenHealth.update = function(){
        if(this.Collision.projectileBounding(this, this.target)){
            this.target.powerup(this);
            this.die();
        }
        Agent.update.call(this);
    }

    // Update setMove method to wander aimlessly
    pu_regenHealth.setMove = function(amount){
        Agent.setMove.call(this, amount);
    }

    // Extend move method to update dir base on mouse pos
    pu_regenHealth.move = function(pos){
        if(this.Trig.distance(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y) < 100){
            this.dir = this.Trig.radTo(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y);

            var toMoveX = ( Math.cos(this.dir) * (this.maxSpeed) );
            var toMoveY = ( Math.sin(this.dir) * (this.maxSpeed) );

            this.toPos.x += toMoveX;
            this.toPos.y += toMoveY;
        }
        Agent.move.call(this, pos);

    }

    pu_regenHealth.draw = function(){
        require('game').ctx.game.fillStyle = this.color;
        require('game').ctx.game.beginPath();
        require('game').ctx.game.moveTo(this.pos.x+(this.pos.w/6), this.pos.y-(this.pos.h/2)); //1
        require('game').ctx.game.lineTo(this.pos.x-(this.pos.w/6), this.pos.y-(this.pos.h/2)); //2
        require('game').ctx.game.lineTo(this.pos.x-(this.pos.w/6), this.pos.y-(this.pos.h/6)); //3
        require('game').ctx.game.lineTo(this.pos.x-(this.pos.w/2), this.pos.y-(this.pos.h/6)); //4
        require('game').ctx.game.lineTo(this.pos.x-(this.pos.w/2), this.pos.y+(this.pos.h/6)); //5
        require('game').ctx.game.lineTo(this.pos.x-(this.pos.w/6), this.pos.y+(this.pos.h/6)); //6
        require('game').ctx.game.lineTo(this.pos.x-(this.pos.w/6), this.pos.y+(this.pos.h/2)); //7
        require('game').ctx.game.lineTo(this.pos.x+(this.pos.w/6), this.pos.y+(this.pos.h/2)); //8
        require('game').ctx.game.lineTo(this.pos.x+(this.pos.w/6), this.pos.y+(this.pos.h/6)); //9
        require('game').ctx.game.lineTo(this.pos.x+(this.pos.w/2), this.pos.y+(this.pos.h/6)); //10
        require('game').ctx.game.lineTo(this.pos.x+(this.pos.w/2), this.pos.y-(this.pos.h/6)); //11
        require('game').ctx.game.lineTo(this.pos.x+(this.pos.w/6), this.pos.y-(this.pos.h/6)); //12
        require('game').ctx.game.fill();
        require('game').ctx.game.fillStyle = require('game').defaultFillStyle;
    }

    pu_regenHealth.shoot = function(){
        Agent.shoot.call(this);
    }

    pu_regenHealth.hit = function(){
        return null;
    }

    pu_regenHealth.die = function(){
        var i = require('game').powerups.indexOf(this);
        require('game').powerups.splice(i, 1);
        Agent.die.call(this);
    }

    return pu_regenHealth;
});