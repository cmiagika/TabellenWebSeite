<!DOCTYPE HTML>
<html ng-app="lehrlingsApp">
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-route.js"></script>
        <script src="app/lehrlingsApp.js"></script>
        <script src="directives/clubs.js"></script>
        <script src="directives/movies.js"></script>
        <script src="directives/player.js"></script>
        <script src="directives/navigation.js"></script>
        <script src="services/clubService.js"></script>
        <script src="services/movieService.js"></script>
        <script src="services/playerService.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" href="app/lehrlingsapp.css"></link>
        <meta charset="utf-8" />
    </head>
    <body ng-controller="appCtrl">
        <navigation></navigation>
        <div ng-view></div>
    </body>
</html>