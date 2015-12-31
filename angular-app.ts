///<reference path="typings/angularjs/angular.d.ts" />
///<reference path="typings/angularjs/angular-route.d.ts" />

import hc = require("./src/controllers/home");
import THREE = require("three");

angular.module("y", ["ngRoute"])
	.controller("homeController", hc.HomeController)
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

        let camera, scene, renderer;
        let geometry, material, mesh;

document.addEventListener("DOMContentLoaded", function(event) {
    init();
    animate();
});


        function init(): void {

            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 1000;

            scene = new THREE.Scene();

            geometry = new THREE.BoxGeometry( 200, 200, 200 );
            material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );


            renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );

            document.body.appendChild( renderer.domElement );
            // document.appendChild( renderer.domElement );

        }

        function animate(): void {

            // note: three.js includes requestAnimationFrame shim
            requestAnimationFrame( animate );

            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;

            renderer.render( scene, camera );

        }