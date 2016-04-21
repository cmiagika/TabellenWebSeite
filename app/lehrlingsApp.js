(function () {
    "use strict";
    var app = angular.module('lehrlingsApp', ['ngRoute', 'ngAnimate']);

    app.controller('appCtrl', function ($scope) {
        return undefined;
    });

    app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                template: "Um die Tabelle anzuzeigen wählen Sie eine Kategorie aus."
            })
            .when("/clubs", {
                templateUrl: "controller/clubs.html"
            })
            .when("/movies", {
                templateUrl: "controller/movies.html"
            })
            .when("/player", {
                templateUrl: "controller/player.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    });

})();