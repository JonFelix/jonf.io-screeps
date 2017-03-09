/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tools.Std');
 * mod.thing == 'a thing'; // true
 */

var std = { 
    HashLength: function(obj) {
        var size = 0, key;
        for (key in obj) 
        {
            if (obj.hasOwnProperty(key)) 
            {
                size++;
            }
        }
        return size;
    }
}
module.exports= std;