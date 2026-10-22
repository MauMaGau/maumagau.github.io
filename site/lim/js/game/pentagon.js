define(["agent", "projectile"],
    function(Agent, Projectile){

    // define the Pentagon class as a copy of Agent
    var Pentagon = Object.create(Agent);


    Pentagon.init = function(pos){
        this.dir = Math.random() * (0 - 6.28); // 6.28 is 2 PI, a full circle (ish)
        this.maxSpeed = 0.3;
        this.type = 'Pentagon';
        this.health = 4;
        this.target = require('game').Player;
        this.reloadSpeed = 200;
        //this.color = this.color;
        Agent.init.call(this, pos);

        require('game').mobs.push(this);
    }

    Pentagon.update = function(){
        Agent.update.call(this);
        if(this.lastShot < require('game').loopCounter - this.reloadSpeed){
            this.shoot();
        }
    }

    // Update setMove method to wander aimlessly
    Pentagon.setMove = function(amount){
        Agent.setMove.call(this, amount);
    }

    // Extend move method to update dir base on mouse pos
    Pentagon.move = function(pos){
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

    Pentagon.draw = function(){
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
            this.pos.y
        );
        require('game').ctx.game.lineTo(
            this.pos.x + (((this.pos.w)/2)/2),
            this.pos.y + ((this.pos.h)/2)
        );
        require('game').ctx.game.lineTo(
            this.pos.x - (((this.pos.w)/2)/2),
            this.pos.y + ((this.pos.h)/2)
        );
        require('game').ctx.game.lineTo(
            this.pos.x - ((this.pos.w)/2),
            this.pos.y
        );
        require('game').ctx.game.fill();

        require('game').ctx.game.fillStyle = require('game').defaultFillStyle;
    }

    Pentagon.shoot = function(){
        // shoot one projectile from each side
        var hexAngle = 6.28 / 5;
        var dir = hexAngle;
        Agent.shoot.call(this, dir, Projectile, 1, 4);
        var dir = hexAngle*2;
        Agent.shoot.call(this, dir, Projectile, 1, 4);
        var dir = hexAngle*3;
        Agent.shoot.call(this, dir, Projectile, 1, 4);
        var dir = hexAngle*4;
        Agent.shoot.call(this, dir, Projectile, 1, 4);
        var dir = hexAngle*5;
        Agent.shoot.call(this, dir, Projectile, 1, 4);


        this.lastShot = require('game').loopCounter;
    }

    Pentagon.die = function(){
        var i = require('game').mobs.indexOf(this);
        require('game').mobs.splice(i, 1);
        Agent.die.call(this);
    }

    return Pentagon;
});