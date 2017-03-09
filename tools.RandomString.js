/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tools.RandomString');
 * mod.thing == 'a thing'; // true
 */
var RandomString = {
    generate: function()
    {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    }
}

module.exports = RandomString;