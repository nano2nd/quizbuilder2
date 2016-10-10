var Utilities = function() {
    
    var find = function(array, property, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][property] == value) {
                return array[i];
            }
        }
    }

    var remove = function(array, property, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][property] == value) {
                array.splice(i,1);
            }
        }
    }

    return {
        find: find,
        remove: remove
    }
    
}();