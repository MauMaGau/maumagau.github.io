define(['map', 'trig'],function(Map, Trig){

    var Collision = {
        grid : function(){},
        agent : function(){}
    }

    // x, y of agent
    Collision.grid = function(x, y){
        // Get tile
        var colX = Math.floor(x/Map.tileWidth);
        var colY = Math.floor(y/Map.tileHeight);
        // quick calc
        if(
            y > Map.height ||
            x > Map.width ||
            x < 0 ||
            y < 0){
            return true;
        }
        var colTile = Map.grids[colY][colX];

        // TODO bounding box collision

        if(colTile !== 0){
            return true;
        }
        return false;
    }

    /*
        agent1 can be player or mob
    */
    Collision.agents = function(x, y, w, h){
        // Get agents within proximity
        var agentsToDetect = require('game').mobs.slice(0); // make copy of array (js wtf)
        agentsToDetect.push(require('game').Player);
        var prox_mobs = [];
        for(var i=0;i<agentsToDetect.length;i++){
            // Ignore agents too far away
            if(Trig.distance(x, y, agentsToDetect[i].pos.x, agentsToDetect[i].pos.y) < 100){
                prox_mobs.push(agentsToDetect[i]);
            }
        }
        for(var i=0;i<prox_mobs.length;i++){
            var mob = prox_mobs[i];
            if(require('game').debug){
            //  require('game').ctx.debug.strokeRect(x-(w/2), y-( (agent1.pos.h)/2), w,  (agent1.pos.h));
            //  require('game').ctx.debug.strokeRect(mob.x-(mob.w/2), mob.y-(mob.h/2), mob.w, mob.h);
            }
            // Get coords of each agents 'bounding box'
            if(
                x-(w/2) > mob.pos.x-(mob.pos.w/2) + mob.pos.w ||
                y-(h/2) > mob.pos.y-(mob.pos.h/2) + mob.pos.h ||
                mob.pos.x-(mob.pos.w/2) > x-(w/2) + w ||
                mob.pos.y-(mob.pos.h/2) > y-(h/2) + h
            ){
                // no collision
            }else{
                return true;
            }
        }

        return false;

    }


    Collision.projectileBounding = function(agent1, agent2){
        // quick distance check
        if(Trig.distance(agent1.pos.x, agent1.pos.y, agent2.pos.x, agent2.pos.y) < 100){
            // slower bounding check
            if(
                // (agent1 x - half width) > (agent2 x + half width) = agent1 left > agent2 right
                agent1.pos.x-( (agent1.pos.w)/2) > ( agent2.pos.x + ( (agent2.pos.w)/2) )||
                // (agent1 y - half height) > agent2 y + half height) = agent1 top > agent2 bottom
                agent1.pos.y-( (agent1.pos.h)/2) > ( agent2.pos.y + ( (agent2.pos.h)/2) ) ||
                // (agent2 x - half width) > (agent1 x + half width) = agent2 left > agent1 right
                agent2.pos.x-( (agent2.pos.w)/2) > ( agent1.pos.x + ( (agent1.pos.w)/2) ) ||
                // (agent2 y - half height) > (agent1 y + half height) = agent2 top > agent1 bottom
                agent2.pos.y-( (agent2.pos.h)/2) > ( agent1.pos.y + ( (agent1.pos.h)/2) )
            ){
                return false;
            }else{
                return true;
            }
        }

        return false;
    }
    /*
        agent1 = projectile
    */
    Collision.projectile = function(agent1, agent2){
        // draw two lines for each agent, representing the path of opposing corners
        // test each line for a collision
        var sqrt2 = Math.SQRT2;
        var diag1 = ( (agent1.pos.h)*sqrt2)/2;
        var diag2 = ( (agent2.pos.h)*sqrt2)/2;

        var thetaSBR = Trig.normaliseRad(agent1.dir + Trig.degRad(135));
        var thetaSBL = Trig.normaliseRad(agent1.dir - Trig.degRad(135));

        var thetaEFR = Trig.normaliseRad(agent1.dir + Trig.degRad(45));
        var thetaEFL = Trig.normaliseRad(agent1.dir - Trig.degRad(45));

        var thetaSBR2 = Trig.normaliseRad(agent2.dir + Trig.degRad(135));
        var thetaSBL2 = Trig.normaliseRad(agent2.dir - Trig.degRad(135));

        var thetaEFR2 = Trig.normaliseRad(agent2.dir + Trig.degRad(45));
        var thetaEFL2 = Trig.normaliseRad(agent2.dir - Trig.degRad(45));

        // assumes agent is square with use of height
        var SBLX = agent1.lastPos.x+(Math.cos(thetaSBL)*diag1);
        var SBLY = agent1.lastPos.y+(Math.sin(thetaSBL)*diag1);

        var SBRX = agent1.lastPos.x+(Math.cos(thetaSBR)*diag1);
        var SBRY = agent1.lastPos.y+(Math.sin(thetaSBR)*diag1);

        var EFLX = agent1.pos.x+(Math.cos(thetaEFL)*diag1);
        var EFLY = agent1.pos.y+(Math.sin(thetaEFL)*diag1);

        var EFRX = agent1.pos.x+(Math.cos(thetaEFR)*diag1);
        var EFRY = agent1.pos.y+(Math.sin(thetaEFR)*diag1);

        var SBLX2 = agent2.lastPos.x+(Math.cos(thetaSBL2)*diag2);
        var SBLY2 = agent2.lastPos.y+(Math.sin(thetaSBL2)*diag2);

        var SBRX2 = agent2.lastPos.x+(Math.cos(thetaSBR2)*diag2);
        var SBRY2 = agent2.lastPos.y+(Math.sin(thetaSBR2)*diag2);

        var EFLX2 = agent2.pos.x+(Math.cos(thetaEFL2)*diag2);
        var EFLY2 = agent2.pos.y+(Math.sin(thetaEFL2)*diag2);

        var EFRX2 = agent2.pos.x+(Math.cos(thetaEFR2)*diag2);
        var EFRY2 = agent2.pos.y+(Math.sin(thetaEFR2)*diag2);

        /*require('game').ctx.debug.beginPath();
        require('game').ctx.debug.moveTo(SBLX, SBLY);
        require('game').ctx.debug.lineTo(SBRX, SBRY);
        require('game').ctx.debug.stroke();

        require('game').ctx.debug.beginPath();
        require('game').ctx.debug.moveTo(EFLX, EFLY);
        require('game').ctx.debug.lineTo(EFRX, EFRY);
        require('game').ctx.debug.stroke();*/

        // Detect instersection of 'left' lines
        if(Trig.lineIntersect(EFLX, EFLY, SBLX, SBLY, EFLX2, EFLY2, SBLX2, SBLY2, '#0f0', '#00f')){
            return true;
        }

        // Detect intersection of 'right' lines
        if(Trig.lineIntersect(EFRX, EFRY, SBRX, SBRY, EFRX2, EFRY2, SBRX2, SBRY2, '#F00', '#FF0')){
            return true;
        }

        // Detect intesection of front face with agent1 (projectile)
        // adjust xy coords to center of front face
        var fX = agent2.pos.x + (Math.cos(agent2.dir) * ( (agent2.pos.h)/2));
        var fY = agent2.pos.y + (Math.sin(agent2.dir) * ( (agent2.pos.h)/2));

        var x = fX + ( Math.cos( agent2.dir-Trig.degRad(90) ) * ( (agent2.pos.h)/2) );
        var y = fY + ( Math.sin( agent2.dir-Trig.degRad(90) ) * ( (agent2.pos.h)/2) );
        // end line at...
        var dirPerpC = agent2.dir + Trig.degRad(90);

        var x2 = x + (Math.cos( dirPerpC ) * ( (agent2.pos.w)));
        var y2 = y + (Math.sin( dirPerpC ) * ( (agent2.pos.h)));

        if(Trig.lineIntersect(agent1.pos.x, agent1.pos.y, agent1.lastPos.x, agent1.lastPos.y, x, y, x2, y2, '#f00', '#00f')){
            return true;
        }

        // adjust xy coords to center of rear face
        var rX = agent2.pos.x - (Math.cos(agent2.dir) * ( (agent2.pos.w)/2));
        var rY = agent2.pos.y - (Math.sin(agent2.dir) * ( (agent2.pos.h)/2));

        var x = rX + ( Math.cos( agent2.dir-Trig.degRad(90) ) * ( (agent2.pos.w)/2) );
        var y = rY + ( Math.sin( agent2.dir-Trig.degRad(90) ) * ( (agent2.pos.h)/2) );
        // end line at...
        var dirPerpC = agent2.dir + Trig.degRad(90);

        var x2 = x + (Math.cos( dirPerpC ) * ( (agent2.pos.w)));
        var y2 = y + (Math.sin( dirPerpC ) * ( (agent2.pos.h)));

        if(Trig.lineIntersect(agent1.pos.x, agent1.pos.y, agent1.lastPos.x, agent1.lastPos.y, x, y, x2, y2, '#f00', '#00f')){
            return true;
        }

        return false;
    }

    return Collision;
});