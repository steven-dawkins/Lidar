///<reference path="typings/angularjs/angular.d.ts" />
///<reference path="typings/angularjs/angular-route.d.ts" />
var hc = require('./controllers/home');
angular.module('y', ['ngRoute'])
    .controller('homeController', hc.HomeController)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
            .otherwise({
            redirectTo: '/home'
        });
    }]);
//# sourceMappingURL=angular-app.js.map