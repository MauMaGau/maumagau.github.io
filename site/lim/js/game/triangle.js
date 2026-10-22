define(["agent", "projectile"],
    function(Agent, Projectile){

    // define the Triangle class as a copy of Agent
    var Triangle = Object.create(Agent);


    Triangle.init = function(pos){
        this.dir = Math.random() * (0 - 6.28); // 6.28 is 2 PI, a full circle (ish)
        this.maxSpeed = 0.5;
        this.type = 'Triangle';
        this.health = 2;
        this.target = require('game').Player;
        this.reloadSpeed = this.Trig.randomFromTo(150, 200);
        this.damage = 4;
        //this.color = this.color;
        Agent.init.call(this, pos);

        require('game').mobs.push(this);
    }

    Triangle.update = function(){
        Agent.update.call(this);
        if(this.lastShot < require('game').loopCounter - this.reloadSpeed){
            this.shoot();
        }
    }

    // Update setMove method to wander aimlessly
    Triangle.setMove = function(amount){
        Agent.setMove.call(this, amount);
    }

    // Extend move method to update dir based on dir to player
    Triangle.move = function(pos){
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

    Triangle.draw = function(){
        if(this.lastHit > require('game').loopCounter - 5){
            require('game').ctx.game.fillStyle = 'blue';
        }else{
            require('game').ctx.game.fillStyle = this.color;
        }

        require('game').ctx.game.beginPath();
        require('game').ctx.game.moveTo(
            this.pos.x,
            this.pos.y-((this.pos.h)/2)
        );
        require('game').ctx.game.lineTo(
            this.pos.x + ((this.pos.w)/2),
            this.pos.y + ((this.pos.h)/2)
        );
        require('game').ctx.game.lineTo(
            this.pos.x - ((this.pos.w)/2),
            this.pos.y + ((this.pos.h)/2)
        );
        require('game').ctx.game.fill();

        require('game').ctx.game.fillStyle = require('game').defaultFillStyle;
    }

    Triangle.shoot = function(){
        var dir = this.Trig.radTo(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y); // too hard
        Agent.shoot.call(this, dir, Projectile, 4, 4);
        this.lastShot = require('game').loopCounter;
    }

    Triangle.die = function(){
        var i = require('game').mobs.indexOf(this);
        require('game').mobs.splice(i, 1);
        Agent.die.call(this);
    }

    return Triangle;
});