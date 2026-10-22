define(["agent"],
    function(Agent){

    // define the Projectile class as a copy of Agent
    var Projectile = Object.create(Agent);


    Projectile.init = function(pos, dir, type, firedBy, maxSpeed, damage){
        Agent.init.call(this, pos);
        this.dir = dir;
        this.maxSpeed = maxSpeed;
        this.damage = damage;
        this.type = 'Projectile';
        this.firedBy = firedBy;
        this.health = 1;

        require('game').projectiles.push(this);
    }

    Projectile.update = function(){
        Agent.update.call(this);
    }

    // Extend move method to update dir base on mouse pos
    Projectile.move = function(pos){
        var toMoveX = ( Math.cos(this.dir) * (this.maxSpeed) );
        var toMoveY = ( Math.sin(this.dir) * (this.maxSpeed) );

        // Detect grid hit and die
        if(
                ! this.Collision.grid(this.pos.x + toMoveX, this.pos.y + toMoveY)
        ){
            this.pos.x += toMoveX;
            this.pos.y += toMoveY;
        }else{
            this.die();
        }
        //Agent.move.call(this, this.toPos);
    }

    Projectile.draw = function(){
        Agent.draw.call(this);
    }

    Projectile.shoot = function(){
        console.log('this shouldnt be. projectile:shoot');
        return null;
    }

    Projectile.die = function(){
        var i = require('game').projectiles.indexOf(this);
        require('game').projectiles.splice(i, 1);
        Agent.die.call(this);
    }

    return Projectile;
});