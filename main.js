var _constants = require('tools.Constants');
var _creepRoles = [require('role.Harvester'), require('role.Upgrader'), require('role.Builder')];
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
            var _role = Game.creeps[name].memory.role;
            _creepRoles[_role].run(Game.creeps[name]);
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