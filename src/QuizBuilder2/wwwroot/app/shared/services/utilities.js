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

    var findMax = function(array, property) {
        var currentMax = array[0];
        for (var i = 0; i < array.length; i++) {
            if (array[i][property] > currentMax[property]) {
                currentMax = array[i];
            }
        }
        return currentMax;
    }

    return {
        find: find,
        remove: remove,
        findMax: findMax
    }
    
}();