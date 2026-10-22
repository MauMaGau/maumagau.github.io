define(["agent", "projectile"],
    function(Agent, Projectile){

    // define the player class as a copy of Agent
    var Player = Object.create(Agent);

    Player.init = function(pos){
        this.type = 'Player';
        this.reloadSpeed = .30;
        this.health = 10;
        this.pos.w = this.health;
        this.pos.h = this.health;
        this.maxHealth = 30;
        this.regenHealth = 0.01;
        this.ammo = 10;
        this.regenAmmo = 0.1;
        this.maxAmmo = 10;
        this.maxSpeed = 1;
        Agent.init.call(this, pos)
    }

    Player.update = function(){
        // Less move
        if(this.toPos.x === 0 && this.toPos.y === 0){
            // More ammo
                if(this.ammo < this.maxAmmo){
                    this.ammo += this.regenAmmo;
                }
        }

        // Less shoot
        if(this.lastShot < require('game').loopCounter - 5){
            // More HP
                if(this.health < this.maxHealth){
                    this.health += this.regenHealth;
                    this.pos.w += this.regenHealth;
                    this.pos.h += this.regenHealth;
                }
        }

        Agent.update.call(this);
    }

    Player.setMouse = function(mouseX, mouseY){
        this.dir = this.Trig.radTo(this.pos.x, this.pos.y, mouseX, mouseY);
    }

    Player.setMouseClick = function(){
        if(this.lastShot < require('game').loopCounter - this.reloadSpeed){
            this.shoot();
        }
    }

    // Update setMove method to user keyboard input
    Player.setMove = function(amount){

        if(amount.x !== undefined){
            //this.xSpeed += amount.x;
            //this.toPos.x += this.xSpeed;
            this.toPos.x += amount.x;
        }

        if(amount.y !== undefined){
            this.toPos.y += amount.y;
        }
    }

    // Extend move method to update dir base on mouse pos
    Player.move = function(pos){
        Agent.move.call(this, pos);
    }

    Player.draw = function(){
        // Draw ammo
        var ammo = this.ammo / 10;
        var ammoH = 5; var ammoW = 10;
        var ammoYP = 3; // Y Padding
        for(var i=0; i<ammo; i++){
            require("game").ctx.game.fillRect(
                this.pos.x - (this.maxHealth/2) -20  - ammoW/2,
                this.pos.y - ((ammoH/2) + (i*(ammoH + ammoYP)) ),
                ammoW,
                ammoH
            );
        }

        // Draw max health
        require('game').ctx.game.strokeRect(
            this.pos.x - (this.maxHealth/2),
            this.pos.y - (this.maxHealth/2),
            this.maxHealth,
            this.maxHealth
        );

        // Draw current health
        Agent.draw.call(this);
    }

    Player.shoot = function(e){
        // Check we have nuff ammo
        if(this.ammo < 1){
            return;
        }
        //var mouseDir = this.Trig.radTo(this.pos.x, this.pos.y, e.x, e.y); Fails when mouse held down
        var mouseDir = this.dir;

        var projectile1 = Object.create(Projectile);
        projectile1.init(
            {
                x: this.pos.x,
                y: this.pos.y,
                w: 5,
                h: 5
            },
            mouseDir,
            'todo',
            this,
            10, // projectile speed
            1
        );
        delete projectile1;
        this.lastShot = require('game').loopCounter
        this.ammo--;
    }

    Player.hit = function(damage){
        this.pos.w -= damage;
        this.pos.h -= damage;
        Agent.hit.call(this, damage);
    }

    Player.powerup = function(Powerup){
        this[Powerup.effect] += Powerup.bonus;
    }

    Player.die = function(){
        require('game').playerDead();
        console.log('you dead');
    }

    return Player;
});