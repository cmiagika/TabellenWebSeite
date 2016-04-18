(function () {
    "use strict";

    function Controller($scope, $http) {

    }

    var app = angular.module('lehrlingsApp');

    app.directive("navigation", function () {
        return {
            restrict: "E",
            templateUrl: "directives/navigation.html",
            controller: Controller
        };
    });
})();