///<reference path="../typings/angularjs/angular.d.ts" />
///<reference path="../typings/angularjs/angular-route.d.ts" />

import hc = require("./controllers/home");
import THREE = require("three");
import Logger = require("./Logger");
import app = require("./app");

let log = new Logger();

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


class LidarRenderer
{

    private camera;
    private scene: THREE.Scene;
    private renderer;
    private geometry;
    private material;
    private mesh: THREE.Mesh;
    private object: THREE.Mesh;

    constructor()
    {
        // function onDocumentMouseMove( event ) {

        //     event.preventDefault();

        //     if ( isMouseDown ) {

        //         let theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 )
        //                 + onMouseDownTheta;
        //         let phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 )
        //             + onMouseDownPhi;

        //         phi = Math.min( 180, Math.max( 0, phi ) );

        //         camera.position.x = radious * Math.sin( theta * Math.PI / 360 )
        //                             * Math.cos( phi * Math.PI / 360 );
        //         camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
        //         camera.position.z = radious * Math.cos( theta * Math.PI / 360 )
        //                             * Math.cos( phi * Math.PI / 360 );
        //         camera.updateMatrix();

        //     }

        //     let mouse3D = projector.unprojectVector(
        //         new THREE.Vector3(
        //             ( event.clientX / renderer.domElement.width ) * 2 - 1,
        //             - ( event.clientY / renderer.domElement.height ) * 2 + 1,
        //             0.5
        //         ),
        //         camera
        //     );
        //     ray.direction = mouse3D.subSelf( camera.position ).normalize();

        //     interact();
        //     render();

        // }

        // document.onmousemove = onDocumentMouseMove;

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 1000;

        this.scene = new THREE.Scene();

        this.geometry = new THREE.BoxGeometry( 200, 200, 200 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );

        let geom = new THREE.Geometry();
        let v1 = new THREE.Vector3(0,0,0);
        let v2 = new THREE.Vector3(0,500,0);
        let v3 = new THREE.Vector3(0,500,500);

        geom.vertices.push(v1);
        geom.vertices.push(v2);
        geom.vertices.push(v3);

        geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geom.computeFaceNormals();

        this.object = new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );

        this.object.position.z = -100; // move a bit back - size of 500 is a bit big
        this.object.rotation.y = -Math.PI * .5; // triangle is pointing in depth, rotate it -90 degrees on Y

        this.scene.add(this.object);

        let lidar = new app.LidarLoader("./LIDAR-DTM-1M-SU49/su4090_DTM_1m.asc");

        lidar.Load()
            .then(props =>
            {
                let group = new THREE.Group();

                let material = new THREE.LineBasicMaterial({
                    color: 0x0000ff
                });

                let scale = 4.0;

                for (let i = 0; i < props.length; i++)
                {
                    let geometry = new THREE.Geometry();

                    for (let j = 0; j < props[0].length; j++)
                    {
                        geometry.vertices.push(new THREE.Vector3(i * scale - props.length * scale / 2, props[i][j] * 50 - 3700, j * scale - props.length * scale / 2));
                    };


                    let line = new THREE.Line(geometry, material);
                    group.add(line);
                }

                this.scene.add(group);

                log.info(props.length);
                log.info("Loaded data");
            })
            .done();


        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.renderer.domElement );
        // document.appendChild( renderer.domElement );
    }

    public animate(): void
    {
        log.info("animate");
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( () => this.animate() );

        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;

        this.object.rotation.x += 0.01;
        this.object.rotation.y += 0.02;


        this.renderer.render( this.scene, this.camera );
    }
}

document.addEventListener("DOMContentLoaded", event => {

    let r = new LidarRenderer();
    r.animate();
});