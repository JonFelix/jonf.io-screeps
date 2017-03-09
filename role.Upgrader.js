/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Upgrader');
 * mod.thing == 'a thing'; // true
 */
var _constants = require('tools.Constants');
var upgrader = {
    run: function(creep) {
        if(creep.carry.energy <= 0)
        {
            var _resources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(_resources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(_resources[0], {visualizePathStyle: {stroke: _constants.CREEP_GATHERING_COLOR}});
                //creep.say('Gathering');
            }
        }
        else
        {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: _constants.CREEP_UPGRADING_COLOR}});
                //creep.say('Upgrading');
            }
        }
    },
    role: function()
    {
        return _constants.CREEP_ROLE_UPGRADER; 
    }
}
module.exports = upgrader;