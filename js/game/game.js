define(
    [
        "map",
        "keys",
        "levels",
        "input",
        "collision",
        "trig",
        "agent",
        "player",
        "square",
        "triangle",
        "pentagon"
    ],
    function(
        Map,
        Keys,
        levels,
        Input,
        Collision,
        Trig,
        Agent,
        Player,
        Square,
        Triangle,
        Pentagon
    ){
    var game = {
        running: true, // Game loop will run while this is true
        debug: true, // Run in debug mode. Don't define here.
        fps: 25, // Loops per second. Don't define here.

        canvases: {}, // canvas elements
        ctx: {}, // canvas contexts
        Keys: Keys, // input key mappings
        keysPressed: {}, // Keys pressed during this loop
        assets: {}, // Any images & sounds
        levels: levels, // array of levels

        agents: [], // array of all agent descendants
        mobs: [], // array of all mob type agents only
        projectiles: [], // array of all projectiles
        powerups: [], // array of all powerups
        Player: null, // The player agent

        init: function(){}, // Initialisation method. Run once on page load, before loop
        loop: function(){}, // The main game loop

        Input: Input, // Method for detecting input. Run during loop.
        update: function(){}, // Method for updating game logic. Run during loop.
        draw: function(){}, // Method for drawing. Run during loop

        Map: Map, // The erm... map
        Agent: Agent, // Parent class of all actors in the game (player, mob, projectile...)
        Collision: Collision, // Collision detection
        Trig: Trig, // Trigonometry helper functions (and a few non-trig helpers)

        // Mobs

        loopCounter : 0, // Number of the current loop
        currentLevel: 0, // Number of the current level

        /* Minor config vars */
        powerupChance : 0.99,
        maxPowerupsAlive : 3,

        leftOffset : 0, // Pixels between the left of the game canvas and the left of the browser window

        defaultFillStyle : 'black',


        /* Define game canvases */
        canvases : {
            map: document.getElementById('map_canvas'),
            game: document.getElementById('game_canvas'),
            info: document.getElementById('info_canvas'),
            debug: document.getElementById('debug_canvas')
        },

        preinit : function(){
            if(this.debug){
                console.log('preinit');
            }
        },

        /* Define contexts from canvases */
        ctx : {},

        /* Define the initialisation method */
        init : function(complete){
            if(this.debug){
                console.log('init');
            }

            // Set up canvas contexts
            this.ctx = {
                map: this.canvases.map.getContext('2d'),
                game: this.canvases.game.getContext('2d'),
                info: this.canvases.info.getContext('2d'),
                debug: this.canvases.debug.getContext('2d')
            };

            // Set Map dimensions
            /*this.Map.width = 800;
            this.Map.height = 800;*/
            // Set map width/height by screen size, maintain ratio
            if(window.innerWidth < window.innerHeight){
                game.Map.width = window.innerWidth;
                game.Map.height = window.innerWidth-10;
            }else{
                game.Map.height = window.innerHeight-10;
                game.Map.width = window.innerHeight;
            }

            // Set canvas dimensions
            this.canvases.map.width = this.Map.width;
            this.canvases.map.height = this.Map.height;
            this.canvases.game.width = this.Map.width;
            this.canvases.game.height = this.Map.height;
            this.canvases.info.width = this.Map.width;
            this.canvases.info.height = this.Map.height;
            if(this.debug){
                this.canvases.debug.width = this.Map.width;
                this.canvases.debug.height = this.Map.height;
            }

            // Overlay game onto map
            this.leftOffset = (window.innerWidth / 2) - (this.canvases.map.width / 2);
            console.log(this.leftOffset)
            this.canvases.map.style.position = 'absolute';
            this.canvases.map.style.top = '0';
            this.canvases.map.style.left = this.leftOffset+'px';
            this.canvases.game.style.position = 'absolute';
            this.canvases.game.style.top = '0';
            this.canvases.game.style.left = this.leftOffset+'px';
            this.canvases.info.style.position = 'absolute';
            this.canvases.info.style.top = '0';
            this.canvases.info.style.left = this.leftOffset+'px';
            if(this.debug){
                this.canvases.debug.style.position = 'absolute';
                this.canvases.debug.style.top = '0';
                this.canvases.debug.style.left = this.leftOffset+'px';
            }

            // draw map
            this.Map.draw();

            // Create player (one?)
            this.Player = Object.create(Player);
            this.Player.init({x:this.Map.width/2, y:this.Map.height/2, w:10, h:10});

            // Callback
            complete();

        },

        loop : function(){
            if(this.running){
                this.thisRenderTime = Date.now();
                this.frameTime = (this.thisRenderTime - this.lastRenderTime) / 1000;

                this.update();
                this.draw();
                this.level();
                            //function(){
                this.loopCounter++
                            //}
/*                      )
                    )
                );*/
                game.lastRenderTime = game.thisRenderTime;
                window.requestAnimationFrame(this.loop.bind(this));
            }

        },

        update : function(callback){
            this.Input.output();

            for(var agent in this.agents){
                this.agents[agent].update();
            }

            // Detect hits (after each agent has moved)
            var targets = this.mobs;
            for(var projectile in this.projectiles){
                if(this.projectiles[projectile].firedBy !== this.Player){
                    continue; // no mob ff =)
                }
                var isHit = false;
                var targetHit = null;
                for(var target in targets){
                    if(this.projectiles[projectile].firedBy === targets[target]){
                        continue;
                    }
                    if(
                        this.Collision.projectileBounding(this.projectiles[projectile], targets[target])
                    ){
                        targetHit = targets[target];
                        isHit = true;
                        continue;
                    }
                }
                if(isHit){
                    targetHit.hit(this.projectiles[projectile].damage);
                    this.projectiles[projectile].die();
                }
             }

             // Deal with player seperately because creating a new array of objects to include player with mobs
             // seems ridiculous to js, which insists everything should be passed by reference unless you want to
             // go on a mass hacking spree. (tl;dr I'm a noob)
            for(var projectile in this.projectiles){
                if(this.projectiles[projectile].firedBy === this.Player){
                    continue;
                }
                if(
                    this.Collision.projectileBounding(this.projectiles[projectile], this.Player)
                ){
                    this.Player.hit(this.projectiles[projectile].damage);
                    this.projectiles[projectile].die();
                }
             }

            //callback();
        },

        draw : function(callback){
            this.ctx.game.clearRect(0,0,this.Map.width, this.Map.height);
            if(this.debug){
                //this.ctx.debug.clearRect(0, 0, this.Map.width, this.Map.height);
            }

            for(var agent in this.agents){
                this.agents[agent].draw();
            }

            //callback();
        },

        level : function(callback){
            //console.log(this.mobs)
            if(this.mobs.length > 0){
              return
              //  game.running = false;
            }else{
                this.currentLevel++;

                this.ctx.info.clearRect(0, 0, this.Map.width, this.Map.height);

                if(this.levels[this.currentLevel] === undefined){
                    this.victory();
                    return;
                }

                var level = this.levels[this.currentLevel];

                // Spawn mobs
                for(mob in level.mobs){
                    for(var i=0;i<level.mobs[mob].count; i++){
                        // Pick an edge
                        var edge = Math.random() * 4;
                        if(edge < 1){
                            // tl
                            var spawnX = Trig.randomFromTo(this.Map.tileWidth, this.Map.tileWidth*3);
                            var spawnY = Trig.randomFromTo(this.Map.tileHeight, this.Map.tileHeight*3);
                        }else if(edge < 2){
                            // tr
                            var spawnX = Trig.randomFromTo(this.Map.width - this.Map.tileWidth*3, this.Map.width-this.Map.tileWidth);
                            var spawnY = Trig.randomFromTo(this.Map.tileHeight, this.Map.tileHeight*3);
                        }else if(edge < 3){
                            // bl
                            var spawnX = Trig.randomFromTo(this.Map.tileWidth, this.Map.tileWidth*3);
                            var spawnY = Trig.randomFromTo(this.Map.height - this.Map.tileHeight, this.Map.height - this.Map.tileHeight*3);
                        }else{
                            // br
                            var spawnX = Trig.randomFromTo(this.Map.width - this.Map.tileWidth*3, this.Map.width-this.Map.tileWidth);
                            var spawnY = Trig.randomFromTo(this.Map.height - this.Map.tileHeight, this.Map.height - this.Map.tileHeight*3);
                        }

                        this[level.mobs[mob].type] = Object.create(level.mobs[mob].type);
                        this[level.mobs[mob].type].init({x:spawnX, y:spawnY, w:20, h:20});
                    }
                };

                // Spawn powerups
                for (powerup in level.powerups){
                    this[level.powerups[powerup].type] = Object.create(level.powerups[powerup].type);
                    this[level.powerups[powerup].type].init({x:Trig.randomFromTo(100, 600), y:Trig.randomFromTo(100, 600), w:20, h:20});
                }

                this.ctx.info.fillText(
                    'Level ' + this.currentLevel,
                    this.Map.tileWidth * 2,
                    this.Map.tileHeight * 2
                );

            }
        },

        victory: function(){
            console.log('GAME WON');

            var winText = 'Win.';
            var textWidth = this.ctx.info.measureText(winText);

            this.ctx.info.fillStyle = 'white';
            this.ctx.info.fillRect(
                (this.Map.width / 2) - (textWidth.width/2) - 10,
                (this.Map.height / 2) - 10,
                textWidth + 20,
                40
            );

            this.ctx.info.fillStyle = 'black';
            this.ctx.info.fillText(
                winText,
                (this.Map.width / 2) - (textWidth.width/2),
                (this.Map.height / 2)
            );
            this.running = false;
        },

        playerDead: function(){
            console.log('GAME LOST');

            var winText = 'Lose.';
            var textWidth = this.ctx.info.measureText(winText);

            this.ctx.info.fillStyle = 'white';
            this.ctx.info.fillRect(
                (this.Map.width / 2) - (textWidth.width/2) - 10,
                (this.Map.height / 2) - 10,
                textWidth.width + 20,
                20
            );

            this.ctx.info.fillStyle = 'black';
            this.ctx.info.fillText(
                winText,
                (this.Map.width / 2) - (textWidth.width/2),
                (this.Map.height / 2)
            );
            this.running = false;
        }

    }

    return game;
});
