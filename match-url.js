'use strict';

angular.module('core').directive('matchUrl', ['$location', function ($location) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {
            var functionToRun = $attr.matchUrlFunction; // run a function on match
            var classToAdd = $attr.matchUrlClass || 'active'; // set a specific class - defaults to active
            var elementPath = $element[0].href || $attr.ngHref || $attr.href;
            var baseURI = $element[0].baseURI;
            
            $scope.$location = $location;
            $scope.$watch('$location.path()', function (locationPath) {
                if (elementPath) {
                    elementPath = elementPath.replace(baseURI, '').replace(/^#!/, '').replace(/\?(.*)/, ''); // if url starts with '#!' remove it, remove all query string
                    if (locationPath.substring(0, elementPath.length) === elementPath) {
                        if (functionToRun) {
                            $scope.$eval(functionToRun);
                        }
                        $element.addClass(classToAdd);
                    } else {
                        $element.removeClass(classToAdd);
                    }
                }

            });
        }
    };
}]);
