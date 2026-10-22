define(["agent"],
    function(Agent){

    // define the Square class as a copy of Agent
    var Square = Object.create(Agent);


    Square.init = function(pos){
        this.dir = Math.random() * (0 - 6.28); // 6.28 is 2 PI, a full circle (ish)
        this.maxSpeed = 2;
        this.type = 'Square';
        this.health = 3;
        this.damage = 4;
        this.target = require('game').Player;
        Agent.init.call(this, pos);

        require('game').mobs.push(this);
    }

    Square.update = function(){
        if(this.Collision.projectileBounding(this, this.target)){
            this.target.hit(this.damage);
            this.die();
        }
        Agent.update.call(this);
    }

    // Update setMove method to wander aimlessly
    Square.setMove = function(amount){
        Agent.setMove.call(this, amount);
    }

    // Extend move method to update dir base on mouse pos
    Square.move = function(pos){
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

    Square.draw = function(){
        Agent.draw.call(this);
    }

    Square.shoot = function(){
        Agent.shoot.call(this);
    }

    Square.die = function(){
        var i = require('game').mobs.indexOf(this);
        require('game').mobs.splice(i, 1);
        Agent.die.call(this);
    }

    return Square;
});