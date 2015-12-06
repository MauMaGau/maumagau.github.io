define(function(){

    var Trig = {

        normaliseDeg : function(degrees){
            while(degrees >= 360){
                degrees -= 360;
            }
            while(degrees < 0){
                degrees += 360;
            }
            return degrees;
        },

        normaliseRad : function(radians){
            var radInCircle = 360*(Math.PI/180);
            while(radians < 0){
                radians += radInCircle;
            }
            while(radians >= radInCircle){
                radians = (radInCircle) - radians;
            }

            return radians;
        },

        degRad : function(degrees){
            return degrees*(Math.PI/180);
        },

        radDeg : function(radians){
            return radians*(180/Math.PI);
        },

        lineIntersect : function(ex1, ey1, sx1, sy1, ex2, ey2, sx2, sy2, debugColour1, debugColour2){
            if(require('game').debug){
                require('game').ctx.debug.strokeStyle = debugColour1;
                require('game').ctx.debug.beginPath();
                require('game').ctx.debug.moveTo(sx1, sy1);
                require('game').ctx.debug.lineTo(ex1, ey1);
                require('game').ctx.debug.stroke();
                require('game').ctx.debug.strokeStyle = '#000';

                require('game').ctx.debug.strokeStyle = debugColour2;
                require('game').ctx.debug.beginPath();
                require('game').ctx.debug.moveTo(sx2, sy2);
                require('game').ctx.debug.lineTo(ex2, ey2);
                require('game').ctx.debug.stroke();
                require('game').ctx.debug.strokeStyle = '#000';
            }

            // Calc for top-left path (of sprite)
            var denom = ((ey2 - sy2) * (ex1 - sx1)) - ((ex2 - sx2) * (ey1 - sy1));

            var uA = ((ex2 - sx2)*(sy1 - sy2))-((ey2 - sy2)*(sx1- sx2));

            var uB = ((ex1 -sx1)*(sy1 -sy2))-((ey1 -sy1)*(sx1-sx2));

            uA = (Math.round(uA * 100)/100) / denom;
            uB = (Math.round(uB * 100)/100) / denom;

            var hit1 = (uA >= 0 && uA <= 1) && (uB >= 0 && uB <= 1);

            if(hit1){
                return true;
            }

            return false;
        },

        distance: function(x1, y1, x2, y2){
            var distance = Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
            return distance;

        },

        radTo: function(x1, y1, x2, y2){
            var radTo = Math.atan2((y2 - y1), (x2 - x1));
            return radTo;
        },

        degTo: function(x1, y1, x2, y2){
            var radTo = this.radTo(x1, y1, x2, y2);
            var degTo = this.radDeg(radTo);

            return radTo;
        },

        randomFromTo: function(from,to)
        {
            return Math.floor(Math.random()*(to-from+1)+from);
        }

    }

    return Trig;
});