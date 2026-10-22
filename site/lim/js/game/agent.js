define(["collision", "trig"], function(Collision, Trig){
    var Agent = {
        Collision: Collision,
        Trig: Trig,

        type: 'Agent',
        color: 'black',

        lastPos: {x: 0, y: 0, w: 0, h: 0},
        toPos: {x: 0, y: 0, w: 0, h: 0},
        pos: {x: 0, y: 0, w: 0, h: 0},

        dir: 0,
        xSpeed: 0,
        ySpeed: 0,

        alive: 0,
        lastHit: 0, // time last hit by projectile

        target: null,
        lastShot: 0,

        health: 2,
        maxHealth: 2,
        ammo: 0,
        maxSpeed: 0,
        reloadSpeed: 0,

        init: function(pos){
            this.pos = pos;
            this.lastPos = pos;

            require('game').agents.push(this);
        },

        update: function(){
            this.move(this.toPos)

            this.lastPos = {x:this.pos.x, y:this.pos.y, w:this.pos.w, h:this.pos.h};
            this.toPos = {x:0, y:0, w:0, h:0};
        },

        draw: function(){
            if(this.lastHit > require('game').loopCounter - 5){
                require('game').ctx.game.fillStyle = 'blue';
            }else{
                require('game').ctx.game.fillStyle = this.color;
            }

            require("game").ctx.game.fillRect(
                this.pos.x - ( (this.pos.w)/2 ),
                this.pos.y - ( (this.pos.h)/2 ),
                this.pos.w,
                this.pos.h
            );

            require('game').ctx.game.fillStyle = require('game').defaultFillStyle;
        },

        // amount is {x, y, w, h} to move
        setMove: function(amount){
            this.toPos.x += amount.x;
            this.toPos.y += amount.y;
        },

        // amount is {x, y, w, h} coords
        move: function(amount){
            if(
                ! Collision.grid(this.pos.x+amount.x, this.pos.y+amount.y)
            ){
                this.pos.x += amount.x;
                this.pos.y += amount.y;
            }
        },

        setTarget: function(agent){

        },

        shoot: function(dir, Projectile, maxSpeed, damage){
            var projectile1 = Object.create(Projectile);
            projectile1.init(
                {
                    x: this.pos.x,
                    y: this.pos.y,
                    w: 5,
                    h: 5
                },
                dir,
                'todo',
                this, // firedBy
                maxSpeed, // projectile speed
                damage
            );
            delete projectile1;
        },

        hit: function(damage){
            this.health -= damage;
            this.lastHit = require('game').loopCounter;
            if(this.health <= 0){
                this.die();
            }
        },

        die: function(){
            var i = require('game').agents.indexOf(this);
            require('game').agents.splice(i, 1);
        }

    }

    return Agent;
})