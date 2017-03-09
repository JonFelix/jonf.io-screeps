var _constants = require('tools.Constants');
var _creepRoles = {harvester:require('role.Harvester'), upgrader:require('role.Upgrader'), builder:require('role.Builder')};
var _randomString = require('tools.RandomString');


var _roleToSpawn = 0;

module.exports.loop = function() {
    // executed every tick
    
    var _workerCost = _constants.CREEP_PART_WORK_COST + _constants.CREEP_PART_MOVE_COST + _constants.CREEP_PART_CARRY_COST;
    if(Game.spawns['Berlin'].energy >= _workerCost)
    {
        if(Game.creeps.length < 6 || !Game.creeps.length)
        {
            var _name = _randomString.generate()
            console.log(_name + ": Spawning");
            Game.spawns['Berlin'].createCreep([WORK, CARRY, MOVE], _name);
        }
    }
    for(var name in Game.creeps)
    {
        if(Game.creeps[name].ticksToLive <= 10)
        {
            console.log(name + ": Suicide");
            Game.creeps[name].suicide();
        }
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
            else if(Game.creeps[name].memory.role == _constants.CREEP_ROLE_BUILDER)
            {
                _creepRoles['builder'].run(Game.creeps[name]);
            }
        }
        else if(!Game.creeps[name].spawning)
        {
            if(_roleToSpawn = _creepRoles.length)
            {
                _roleToSpawn = 0;
            }
            Game.creeps[name].memory.role = _roleToSpawn;
            _roleToSpawn++;
        }
    }
}