/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tools.GarbageCollector');
 * mod.thing == 'a thing'; // true
 */
var _gc = {
    _creeps: function() {
        for(var name in Memory.creeps) 
        {
            if(!Game.creeps[name]) 
            {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
    
}

module.exports = _gc;