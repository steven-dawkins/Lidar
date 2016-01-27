///<reference path="../typings/angularjs/angular.d.ts" />
///<reference path="../typings/angularjs/angular-route.d.ts" />

import hc = require("./controllers/home");
import THREE = require("three");
import LidarRenderer = require("./LidarRenderer");

angular.module("y", ["ngRoute"])
	.controller("homeController", hc.HomeController)
    .directive("time", ["$interval", "dateFilter", function($interval, dateFilter) {

    function link(scope, element, attrs): void {
        let format,
            timeoutId;

        function updateTime(): void {
            element.text(dateFilter(new Date(), format));
        }

        scope.$watch(attrs.myCurrentTime, value => {
            format = value;
            updateTime();
        });

        element.on("$destroy", () => {
            $interval.cancel(timeoutId);
        });

        // start the UI update process; save the timeoutId for canceling
        timeoutId = $interval(() => {
            updateTime(); // update DOM
        }, 1000);
    }

    return {
        link: link
    };
    }])
	.config(["$routeProvider", ($routeProvider: angular.route.IRouteProvider) => {

			$routeProvider.when("/home", {
					templateUrl: "views/home.html",
					controller: "homeController"
				})
				.otherwise({
					redirectTo: "/home"
				});

		}]);


let global: any;
global.document = window.document;

document.addEventListener("DOMContentLoaded", event => {
    let r = new LidarRenderer(document.body);
    r.animate(requestAnimationFrame);
});