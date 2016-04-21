(function () {
    "use strict";

    function Controller($scope, playerService, clubsService) {

        $scope.displayNewPlayerForm = false;
        $scope.displayseeNewPlayerForm = false;

        $scope.emptyPlayer = {
            id: '',
            name: '',
            alter: '',
            preis: '',
            club: undefined
        };

        $scope.player = {
            id: '',
            name: '',
            alter: '',
            preis: '',
            club: undefined
        };

        $scope.play = playerService.getPlayerListPromise().then(
            function successCallback(response) {
                $scope.play = response.data['player'];
            }, function errorCallback(response) {
                $scope.play = [];
            }
        );

        $scope.clubs = clubsService.getClubListPromise().then(
            function successCallback(response) {
                $scope.clubs = response.data['soccer'];
            }, function errorCallback(response) {
                $scope.clubs = [];
            }
        );

        $scope.openAddNewPlayer = function(){
            if ($scope.displayNewPlayerForm == false) {
                $scope.displayNewPlayerForm = true;
            } else {
                $scope.displayNewPlayerForm = false
            }
        };

        $scope.seeNewPlayer = function() {
            if ($scope.displayseeNewPlayerForm == false) {
                $scope.displayseeNewPlayerForm = true;
            } else {
                $scope.displayseeNewPlayerForm = false;
            }
        };

        $scope.saveNewPlayer = function() {
            console.log($scope.player);
            if (!$scope.player.name == "" && !$scope.player.alter == "" && $scope.player.alter == parseInt($scope.player.alter) && !$scope.player.preis == "" && $scope.player.preis == parseInt($scope.player.preis))  {
                playerService.addNewPlayerPromise($scope.player).then(
                    function successCallback(response) {
                        $scope.play = response.data['player'];
                        _.each($scope.emptyPlayer,function(val,key) {
                            $scope.player[key] = val;
                        });
                        $scope.displayNewPlayerForm = false;
                    }, function errorCallback(response) {
                        console.log(":,(");
                    }
                );
            } else {
                alert("Sie haben ein Feld nicht oder nicht richtig ausgefüllt!");
            }

        };

        $scope.deletePlayer = function(playerId) {
            if (confirm("Wollen Sie den Spieler wirklich löschen?") == true) {
                playerService.deletePlayerPromise(playerId).then(
                    function successCallback(response) {
                        $scope.play = response.data['player'];
                    }, function errorCallback(response) {
                        console.log("Something went very wrong");
                    }
                );
            }
        }
    }

    var app = angular.module('lehrlingsApp');

    app.directive("player", function () {
        return {
            restrict: "E",
            templateUrl: "directives/player.html",
            controller: Controller
        };
    });
})();