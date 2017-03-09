var _constants = require('tools.Constants');
var _creepRoles = [require('role.Harvester'), require('role.Upgrader'), require('role.Builder')];
var _randomString = require('tools.RandomString');
var _gc = require('tools.GarbageCollector');
var _std = require('tools.Std');
var _settings = require('SETTINGS');


var _roleToSpawn = 0;

module.exports.loop = function() {
    // executed every tick
    var _workerCost = _constants.CREEP_PART_WORK_COST + _constants.CREEP_PART_MOVE_COST + _constants.CREEP_PART_CARRY_COST;
    for(var name in Game.spawns)
    {
        if(Game.spawns[name].energy >= _workerCost)
        {
            if(_std.HashLength(Game.creeps) < _settings.CreepCount)
            {
                var _name = _randomString.generate()
                console.log(_name + ": Spawning");
                Game.spawns[name].createCreep([WORK, CARRY, MOVE], _name);
            }
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
            if(_role == 0)
            {
                if(Game.creeps[name].room.find(FIND_MY_SPAWNS)[0].energy == Game.creeps[name].room.find(FIND_MY_SPAWNS)[0].energyCapacity) // TEMPORARY FIX
                {
                    console.log(Game.creeps[name].room.find(FIND_MY_SPAWNS)[0].name + " is full on Energy, temporary switch " + name + "'s role to Upgrader");
                    _role = 1;
                }
            }
            if(_role == 2)
            {
                if(Game.creeps[name].room.find(FIND_CONSTRUCTION_SITES).length == 0 || !Game.creeps[name].room.find(FIND_CONSTRUCTION_SITES).length)
                {
                    console.log("No active construction sites, temporary switch " + name + "'s role to Upgrader");
                    _role = 1;
                }
            }
            _creepRoles[_role].run(Game.creeps[name]);
        }
        else if(!Game.creeps[name].spawning)
        {
            if(_roleToSpawn == _creepRoles.length)
            {
                _roleToSpawn = 0;
            }
            Game.creeps[name].memory.role = _roleToSpawn;
            _roleToSpawn++;
        }
    }
    _gc._creeps();
}