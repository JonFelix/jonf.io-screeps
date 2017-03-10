/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Harvester');
 * mod.thing == 'a thing'; // true
 */
var _constants = require('tools.Constants');
var harvester = {
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity)
        {
            var _resources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(_resources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(_resources[0], {visualizePathStyle: {stroke: _constants.CREEP_GATHERING_COLOR}});
                creep.say('Gathering');
            }
        }
        else
        {
            var _storage = creep.room.find(FIND_MY_STRUCTURES).filter(function(obj) {
                return obj.structureType == STRUCTURE_EXTENSION || obj.structureType == STRUCTURE_SPAWN || obj.structureType == STRUCTURE_STORAGE;
                });
            for(var index in _storage)
            {
                if(_storage[index].energy < _storage[index].energyCapacity)
                {
                    if(creep.transfer(_storage[index], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(_storage[index], {visualizePathStyle: {stroke: _constants.CREEP_STORING_COLOR}});
                        creep.say('Storing');
                    }
                }
            }
        }
    },
    role: function()
    {
        return _constants.CREEP_ROLE_HARVESTER; 
    }
}
module.exports = harvester;