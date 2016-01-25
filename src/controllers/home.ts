///<reference path="../../typings/angularjs/angular.d.ts" />

import Logger = require("../Logger");
import LidarLoader = require("../LidarLoader");

let log = new Logger();

export interface IHomeScope extends ng.IScope {
	Message: string;
}

export class HomeController {
	constructor($scope: IHomeScope){
		$scope.Message = "Welcome to y!";

        let lidar = new LidarLoader("./LIDAR-DTM-1M-SU49/su4090_DTM_1m.asc");

        lidar.Load()
            .then(props =>
            {
                log.info(props.length);
                log.info("Loaded data");

                $scope.Message = `Loaded grid: ${props.length} x ${props[0].length}`;
                $scope.$apply();
            })
            .done();
	}
}