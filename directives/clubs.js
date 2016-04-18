(function () {
    "use strict";

    function Controller($scope, clubsService) {

        $scope.displayNewClubForm = false;
        $scope.displayseeNewClubForm = false;

        $scope.emptyClub = {
            id: '',
            Name: '',
            Stadionname: '',
            Trainer: ''
        };

        $scope.club = {
            id: '',
            Name: '',
            Stadionname: '',
            Trainer: ''
        };

        $scope.clubs = clubsService.getClubListPromise().then(
            function successCallback(response) {
                $scope.clubs = response.data['soccer'];
            }, function errorCallback(response) {
                $scope.clubs = [];
            }
        );

        $scope.openAddNewClub = function(){
            if ($scope.displayNewClubForm == false) {
                $scope.displayNewClubForm = true;
            } else {
                $scope.displayNewClubForm = false
            }
        };

        $scope.seeNewClub = function() {
            if ($scope.displayseeNewClubForm == false) {
                $scope.displayseeNewClubForm = true;
            } else {
                $scope.displayseeNewClubForm = false;
            }
        };

        $scope.saveNewClub = function() {
            if (!$scope.club.Name == "" && !$scope.club.Stadionname == "" && !$scope.club.Trainer == "") {
            clubsService.addNewClubPromise($scope.club).then(
                function successCallback(response) {
                    $scope.clubs = response.data['soccer'];
                    $scope.club = $scope.emptyClub;
                    $scope.displayNewClubForm = false;
                }, function errorCallback(response) {
                    console.log(":,(");
                }
            );
            } else {
                alert("Sie haben ein Feld nicht ausgefüllt!");
            }

        };

        $scope.deleteClub = function(clubId) {
            if (confirm("Wollen Sie den Club wirklich löschen?") == true) {
                clubsService.deleteClubPromise(clubId).then(
                    function successCallback(response) {
                        $scope.clubs = response.data['soccer'];
                    }, function errorCallback(response) {
                        console.log("Something went very wrong");
                    }
                );
            }
        }
    }

    var app = angular.module('lehrlingsApp');

    app.directive("clubs", function () {
        return {
            restrict: "E",
            templateUrl: "directives/clubs.html",
            controller: Controller
        };
    });
})();