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
            //creep.say('Gathering');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.building = true;
            //creep.say('Building');
        }
        
        if(creep.memory.building)
        {
            var _targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(_targets.length)
            {
                if(creep.build(_targets[0]) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(_targets[0], {visualizePathStyle: {stroke: _constants.CREEP_BUILDING_COLOR}});
                }
            }
        }
        else
        {
            var _resources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(_resources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(_resources[0], {visualizePathStyle: {stroke: _constants.CREEP_GATHERING_COLOR}});
                //creep.say('Gathering');
            }
        }
    },
    role: function()
    {
        return _constants.CREEP_ROLE_BUILDER; 
    }
    
}
module.exports = builder;