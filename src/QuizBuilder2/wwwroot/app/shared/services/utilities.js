var Utilities = function() {
    
    /**
     * [[Description]]
     * @param {Array}  array    The array to search
     * @param {String} property The property to compare
     * @param {Object} value    The property value you are looking for
     */
    var find = function(array, property, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][property] == value) {
                return array[i];
            }
        }
    }

    return {
        find: find
    }
    
}();