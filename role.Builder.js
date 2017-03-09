/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Builder');
 * mod.thing == 'a thing'; // true
 */
var _constants = require('tools.Constants');
var builder = {
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0)
        {
            creep.memory.building = false;
            creep.say('Getting energy');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.building = true;
            creep.say('Building');
        }
        
        if(creep.memory.building)
        {
            var _targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(_targets.length)
            {
                if(creep.build(_targets[0]) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else
        {
            if(Game.spawns['Berlin'].transferEnergy(creep, creep.carryCapacity) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(Game.spawns['Berlin'], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    role: function()
    {
        return _constants.CREEP_ROLE_BUILDER; 
    }
    
}
module.exports = builder;