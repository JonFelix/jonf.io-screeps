var _constants = require('tools.Constants');
var _creepRoles = {harvester:require('role.Harvester'), upgrader:require('role.Upgrader')};
var _randomString = require('tools.RandomString');




module.exports.loop = function() {
    // executed every tick
    
    var _workerCost = _constants.CREEP_PART_WORK_COST + _constants.CREEP_PART_MOVE_COST + _constants.CREEP_PART_CARRY_COST;
    if(Game.spawns['Berlin'].energy >= _workerCost)
    {
        if(Game.creeps.length < 6)
        {
            var _name = _randomString.generate()
            console.log(_name + ": Spawning");
            Game.spawns['Berlin'].createCreep([WORK, CARRY, MOVE], _name);
        }
    }
    for(var name in Game.creeps)
    {
        if(Game.creeps[name].ticksToLive <= 0)
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
        }
        else if(!Game.creeps[name].spawning)
        {
            var _harvesterCount = 0;
            var _upgraderCount = 0;
            for(var i = 0; i < Game.creeps.length; i++)
            {
                if(!Game.creeps[i].spawning)
                {
                    if(Game.creeps[i].memory.role == _constants.CREEP_ROLE_HARVESTER)
                    {
                        _harvesterCount++;  
                    }
                    if(Game.creeps[i].memory.role == _constants.CREEP_ROLE_UPGRADER)
                    {
                        _upgraderCount++;  
                    }
                    if(_upgraderCount < _harvesterCount)
                    {
                        Game.creeps[name].memory.role = _constants.CREEP_ROLE_UPGRADER;
                    }
                    else
                    {
                        Game.creeps[name].memory.role = _constants.CREEP_ROLE_HARVESTER;    
                    }
                }
            }
        }
    }
}