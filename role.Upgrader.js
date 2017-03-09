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
            if(Game.spawns['Berlin'].transferEnergy(creep, creep.carryCapacity) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(Game.spawns['Berlin']);
            }
        }
        else
        {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(creep.room.controller);
            }
        }
    },
    role: function()
    {
        return _constants.CREEP_ROLE_UPGRADER; 
    }
}
module.exports = upgrader;