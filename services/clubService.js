(function () {

    "use strict";

    var app = angular.module('lehrlingsApp');

    app.service('clubsService', function($http) {

        this.getClubListPromise = function() {
            return $http({
                method: 'GET',
                url: '/api/Api.php',
                params: { action: 'soccer' }
            });
        };

        this.addNewClubPromise = function(club) {

            return $http({
                method: 'GET',
                url: '/api/Api.php',
                params: {
                    action: 'setClub',
                    club: JSON.stringify(club)
                }
            });
        };

        this.deleteClubPromise = function(clubId) {

            return $http ({
                method: 'GET',
                url: '/api/Api.php',
                params: {
                    action: 'deleteClub',
                    id: clubId
                }
            })
        }
    });
})();
