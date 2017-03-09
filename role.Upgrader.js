/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Upgrader');
 * mod.thing == 'a thing'; // true
 */

var upgrader = {
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity)
        {
            
            var _resources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(_resources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(_resources[0]);
            }
        }
        else
        {
            if(creep.transfer(Game.spawns['Berlin'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(Game.spawns['Berlin']);
            }
        }
    }
    
}
module.exports = upgrader