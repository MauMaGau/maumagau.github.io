define(function(){
    var Input = {

        addKey : function(){},
        removeKey : function(){},
        mouseMove : function(){},
        mouseDown : function(){},
        mouseUp : function(){},
        output : function(){},

        mouseE : null // The mouse click event

    }
    Input.addKey = function(e){
        require('game').keysPressed[e.which] = true;
    };
    Input.removeKey = function(e){
        delete require('game').keysPressed[e.which];
    };
    Input.mouseMove = function(e){
        require('game').Player.setMouse(
            e.clientX - require('game').ctx.game.canvas.offsetLeft,
            e.clientY - require('game').ctx.game.canvas.offsetTop
        )
    };
    Input.mouseDown = function(e){
        require('game').keysPressed['mousedown'] = true;
    }
    Input.mouseUp = function(e){
        delete require('game').keysPressed['mousedown'];
    }
    Input.output = function(){
        if(require('game').keysPressed.hasOwnProperty( require('game').Keys.right )){
            // right
            require("game").Player.setMove({
                x: require("game").Player.maxSpeed
            });
        }else if( ! require('game').keysPressed.hasOwnProperty( require('game').Keys.left )){
            // not right
        }

        if(require('game').keysPressed.hasOwnProperty( require('game').Keys.left )){
            // left
            require("game").Player.setMove({
                x: -require("game").Player.maxSpeed
            });
        }else if( ! require('game').keysPressed.hasOwnProperty( require('game').Keys.right )){
            // not left
        }

        if(require('game').keysPressed.hasOwnProperty( require('game').Keys.up )){
            // up
            require("game").Player.setMove({
                y: -require("game").Player.maxSpeed
            });
        }else if( ! require('game').keysPressed.hasOwnProperty( require('game').Keys.down ) ){
            // not up
        }

        if(require('game').keysPressed.hasOwnProperty( require('game').Keys.down )){
            // down
            require("game").Player.setMove({
                y: require("game").Player.maxSpeed
            });
        }else if( ! require('game').keysPressed.hasOwnProperty( require('game').Keys.up ) ){
            // not down
        }

        if(require('game').keysPressed.hasOwnProperty( require('game').Keys.fire )){
            // shoot
            require('game').Player.setMouseClick();
        }
    }

    return Input;
});