var _constants = require('tools.Constants');
var _creepRoles = {harvester:require('role.Harvester'), upgrader:require('role.Upgrader')};
var _randomString = require('tools.RandomString');




module.exports.loop = function() {
    // executed every tick
    
    var _workerCost = _constants.CREEP_PART_WORK_COST + _constants.CREEP_PART_MOVE_COST + _constants.CREEP_PART_CARRY_COST;
    if(Game.spawns['Berlin'].energy >= _workerCost)
    {
        var creep = Game.spawns['Berlin'].createCreep([WORK, CARRY, MOVE], _randomString.generate());
    }
    for(var name in Game.creeps)
    {
        if(Game.creeps[name].memory.role != null)
        {
            if(Game.creeps[name].memory.role == _constants.CREEP_ROLE_HARVESTER)
            {
                _creepRoles['harvester'].run(Game.creeps[name]);
            }
            else if(Game.creeps[name].memory.role == _constants.CREEP_ROLE_UPGRADER)
            {
                _creepRoles['upgrader'].run(Game.creeps[name]);
            }
        }
        else
        {
            Game.creeps[name].memory.role = 0;
        }
    }
}