angular.module('app.directives', [])

.directive('disallowSpaces', [function(){
    return {
        restrict: 'A',

        link: function($scope, $element) {
            $element.bind('keydown', function(e) {
                if (e.which === 32) {
                    e.preventDefault();
                }
            });
        }
    }
}]);

/*

app.directive('disallowSpaces', function() {
    return {
        restrict: 'A',

        link: function($scope, $element) {
            $element.bind('keydown', function(e) {
                if (e.which === 32) {
                    e.preventDefault();
                }
            });
        }
    }
});

 */

