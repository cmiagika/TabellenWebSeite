(function () {
    "use strict";

    function Controller($scope, clubsService) {

        $scope.displayNewClubForm = false;
        $scope.displayseeNewClubForm = false;

        $scope.emptyClub = {
            id: '',
            name: '',
            stadionname: '',
            trainer: ''
        };

        $scope.club = {
            id: '',
            name: '',
            stadionname: '',
            trainer: ''
        };

        $scope.clubs = clubsService.getClubListPromise().then(
            function successCallback(response) {
                $scope.clubs = response.data['soccer'];
                console.log($scope.clubs)
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
            if (!$scope.club.name == "" && !$scope.club.stadionname == "" && !$scope.club.trainer == "") {
            clubsService.addNewClubPromise($scope.club).then(
                function successCallback(response) {
                    $scope.clubs = response.data['soccer'];
                    _.each($scope.emptyClub,function(val,key) {
                        $scope.club[key] = val;
                    });
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