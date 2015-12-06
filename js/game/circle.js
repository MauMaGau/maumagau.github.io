define(["agent", "projectile"],
    function(Agent, Projectile){

    // define the Circle class as a copy of Agent
    var Circle = Object.create(Agent);


    Circle.init = function(pos){
        this.dir = Math.random() * (0 - 6.28); // 6.28 is 2 PI, a full circle (ish)
        this.maxSpeed = 3;
        this.type = 'Circle';
        this.health = 2;
        this.target = require('game').Player;
        this.reloadSpeed = this.Trig.randomFromTo(50, 70);
        //this.color = this.color;
        Agent.init.call(this, pos);

        require('game').mobs.push(this);
    }

    Circle.update = function(){
        Agent.update.call(this);
        if(this.lastShot < require('game').loopCounter - this.reloadSpeed){
            this.shoot();
        }
    }

    // Update setMove method to wander aimlessly
    Circle.setMove = function(amount){
        Agent.setMove.call(this, amount);
    }

    // Extend move method to update dir based on dir to player
    Circle.move = function(pos){
        // Set this.dir
        this.dir = this.Trig.radTo(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y)

        var toMoveX = ( Math.cos(this.dir) * (this.maxSpeed) );
        var toMoveY = ( Math.sin(this.dir) * (this.maxSpeed) );

        if(
                ! this.Collision.grid(this.pos.x + toMoveX, this.pos.y + toMoveY)
        ){
            this.toPos.x += toMoveX;
            this.toPos.y += toMoveY
        }else{
            // get dir by moving negative toPos and calcing dir from that (hackey hackey)
            if(this.Collision.grid(this.pos.x, this.pos.y + toMoveY)){
                this.dir = this.Trig.radTo(this.pos.x, this.pos.y, this.pos.x+toMoveX, this.pos.y-toMoveY);
            }
            if(this.Collision.grid(this.pos.x + toMoveX, this.pos.y)){
                this.dir = this.Trig.radTo(this.pos.x, this.pos.y, this.pos.x-toMoveX, this.pos.y+toMoveY);
            }
            this.toPos.x += ( Math.cos(this.dir) * (this.maxSpeed) );
            this.toPos.y += ( Math.sin(this.dir) * (this.maxSpeed) );
        }
        Agent.move.call(this, pos);
    }

    Circle.draw = function(){
        if(this.lastHit > require('game').loopCounter - 5){
            require('game').ctx.game.fillStyle = 'blue';
        }else{
            require('game').ctx.game.fillStyle = this.color;
        }
        require('game').ctx.game.beginPath();
        require('game').ctx.game.arc(this.pos.x, this.pos.y, this.pos.w/2, 0, Math.PI*2, true);
        require('game').ctx.game.fill();

        require('game').ctx.game.fillStyle = require('game').defaultFillStyle;
    }

    Circle.shoot = function(){
        var dir = this.Trig.radTo(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y); // too hard
        Agent.shoot.call(this, dir, Projectile, 20, 4);
        this.lastShot = require('game').loopCounter;
    }

    Circle.die = function(){
        var i = require('game').mobs.indexOf(this);
        require('game').mobs.splice(i, 1);
        Agent.die.call(this);
    }

    return Circle;
});