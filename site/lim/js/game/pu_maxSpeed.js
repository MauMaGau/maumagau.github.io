define(["agent"],
    function(Agent){

    // define the pu_maxSpeed class as a copy of Agent
    var pu_maxSpeed = Object.create(Agent);


    pu_maxSpeed.init = function(pos){
        this.dir = 0;
        this.maxSpeed = 0.5;
        this.type = 'pu_maxSpeed';
        this.target = require('game').Player;
        this.health = 1;
        this.effect = 'maxSpeed';
        this.bonus = 0.5;
        this.color = '#00f';
        Agent.init.call(this, pos);

        require('game').powerups.push(this);
    }

    pu_maxSpeed.update = function(){
        if(this.Collision.projectileBounding(this, this.target)){
            this.target.powerup(this);
            this.die();
        }
        Agent.update.call(this);
    }

    // Update setMove method to wander aimlessly
    pu_maxSpeed.setMove = function(amount){
        Agent.setMove.call(this, amount);
    }

    // Extend move method to update dir base on mouse pos
    pu_maxSpeed.move = function(pos){
        if(this.Trig.distance(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y) < 100){
            this.dir = this.Trig.radTo(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y);

            var toMoveX = ( Math.cos(this.dir) * (this.maxSpeed) );
            var toMoveY = ( Math.sin(this.dir) * (this.maxSpeed) );

            this.toPos.x += toMoveX;
            this.toPos.y += toMoveY;
        }
        Agent.move.call(this, pos);

    }

    pu_maxSpeed.draw = function(){
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

    pu_maxSpeed.shoot = function(){
        Agent.shoot.call(this);
    }

    pu_maxSpeed.hit = function(){
        return null;
    }

    pu_maxSpeed.die = function(){
        var i = require('game').powerups.indexOf(this);
        require('game').powerups.splice(i, 1);
        Agent.die.call(this);
    }

    return pu_maxSpeed;
});