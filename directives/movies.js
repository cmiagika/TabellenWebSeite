(function () {
    "use strict";

    function Controller($scope, movieService) {

        $scope.displayNewMovieForm = false;
        $scope.displayseeNewMovieForm = false;

        $scope.emptymov = {
            Filmname: '',
            Beschreibung: '',
            Regisseur: ''
        };

        $scope.mov = {
            Filmname: '',
            Beschreibung: '',
            Regisseur: ''
        };

        $scope.openAddNewMovie = function(){
            if ($scope.displayNewMovieForm == false) {
                $scope.displayNewMovieForm = true;
            } else {
                $scope.displayNewMovieForm = false
            }
        };

        $scope.seeNewMovie = function() {
            if ($scope.displayseeNewMovieForm == false) {
                $scope.displayseeNewMovieForm = true;
            } else {
                $scope.displayseeNewMovieForm = false;
            }
        };

        $scope.movie = movieService.getMovieListPromise().then(
            function successCallback(response) {
                $scope.movie = response.data['movies'];
            }, function errorCallback(response) {
                $scope.movie = [];
            }
        );

        $scope.saveNewMovie = function() {
            if (!$scope.mov.Filmname == "" && !$scope.mov.Beschreibung == "" && !$scope.mov.Regisseur == "") {
                movieService.addNewMoviePromise($scope.mov).then(
                    function successCallback(response) {
                        $scope.movie = response.data['movies'];
                        $scope.mov = $scope.emptymov;
                        $scope.displayNewMovieForm = false;
                    }, function errorCallback(response) {
                        console.log(":,(");
                    }
                );
            } else {
                alert("Sie haben ein Feld nicht ausgefüllt!");
            }

        };

        $scope.deleteMovie = function(moviesId) {
            if (confirm("Wollen Sie den Film wirklich löschen?") == true) {
                movieService.deleteMoviePromise(moviesId).then(
                    function successCallback(response) {
                            $scope.movie = response.data['movies'];
                    }, function errorCallback(response) {
                        console.log("Something went very wrong");
                    }
                );
            }
        }
    }

    var app = angular.module('lehrlingsApp');

    app.directive("movies", function () {
        return {
            restrict: "E",
            templateUrl: "directives/movies.html",
            controller: Controller
        };
    });
})();