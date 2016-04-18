(function () {

    "use strict";

    var app = angular.module('lehrlingsApp');

    app.service('movieService', function($http) {

        this.getMovieListPromise = function() {
            return $http({
                method: 'GET',
                url: '/api/Api.php',
                params: { action: 'movies' }
            });
        };

        this.addNewMoviePromise = function(mov) {

            return $http({
                method: 'GET',
                url: '/api/Api.php',
                params: {
                    action: 'setMovie',
                    mov: JSON.stringify(mov)
                }
            });
        };

        this.deleteMoviePromise = function(moviesId) {

            return $http ({
                method: 'GET',
                url: '/api/Api.php',
                params: {
                    action: 'deleteMovie',
                    id: moviesId
                }
            })
        }
    });
})();
