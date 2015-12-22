///<reference path="../typings/angularjs/angular.d.ts" />

export interface IHomeScope extends ng.IScope {
	Message: string;
}

export class HomeController {
	constructor($scope: IHomeScope){
		$scope.Message = "Welcome to y!";


	}
}