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
    },
    GetFirstHashEntry: function(obj)
    {
        for (key in obj) 
        {
            return key;
        }  
    },
    RandomString: function(length)
    {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
    }
}
module.exports= std;