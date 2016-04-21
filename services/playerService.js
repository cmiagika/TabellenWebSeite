(function () {

    "use strict";

    var app = angular.module('lehrlingsApp');

    app.service('playerService', function($http) {

        this.getPlayerListPromise = function() {

            return $http({
                method: 'GET',
                url: '/api/Api.php',
                params: { action: 'player' }
            });
        };

        this.addNewPlayerPromise = function(player) {

            return $http({
                method: 'GET',
                url: '/api/Api.php',
                params: {
                    action: 'setPlayer',
                    player: JSON.stringify(player)
                }
            });
        };

        this.deletePlayerPromise = function(playerId) {

            return $http ({
                method: 'GET',
                url: '/api/Api.php',
                params: {
                    action: 'deletePlayer',
                    id: playerId
                }
            })
        }
    });
})();
