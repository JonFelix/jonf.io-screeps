var _creepRoles = [require('role.Harvester')];
var _randomString = require('tools.RandomString');
var _constants = require('tools.Constants');



module.exports.loop = function() {
    // executed every tick
    
    var _workerCost = _constants.CREEP_PART_WORK_COST + _constants.CREEP_PART_MOVE_COST + _constants.CREEP_PART_CARRY_COST;
    if(Game.spawns['Berlin'].energy >= _workerCost)
    {
        //var creep = Game.spawns['Berlin'].createCreep([WORK, CARRY, MOVE], _randomString.generate());
        //creep.memory.role = 'harvester';
    }
    for(var name in Game.creeps)
    {
        _creepRoles[0].run(Game.creeps[name]);
    }
}