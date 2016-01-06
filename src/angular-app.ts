///<reference path="../typings/angularjs/angular.d.ts" />
///<reference path="../typings/angularjs/angular-route.d.ts" />

import hc = require("./controllers/home");
import THREE = require("three");

angular.module("y", ["ngRoute"])
	.controller("homeController", hc.HomeController)
    .directive("time", ["$interval", "dateFilter", function($interval, dateFilter) {

    function link(scope, element, attrs) {
        let format,
            timeoutId;

        function updateTime() {
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

// console.log(document);
// console.log(document.appendChild);

class LidarRenderer
{

    private camera;
    private scene;
    private renderer;
    private geometry;
    private material;
    private mesh;

    constructor()
    {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 1000;

        this.scene = new THREE.Scene();

        this.geometry = new THREE.BoxGeometry( 200, 200, 200 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );


        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.renderer.domElement );
        // document.appendChild( renderer.domElement );
    }

    public animate(): void
    {
        console.log("animate");
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( () => this.animate() );

        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;

        this.renderer.render( this.scene, this.camera );
    }
}

document.addEventListener("DOMContentLoaded", event => {

    let r = new LidarRenderer();
    r.animate();
});