'use strict';
angular.module('provaClientApp')
	.controller('MainCtrl', function ($scope, $http, templateService) {
		$scope.formList = [];
		templateService.query(function(templates) {
			$scope.formList = templates;
		}, function(data){
			$scope.$emit('alertEvent', data);
		});
		$scope.removeForm = function (id) {
			templateService.delete({templateId: id}, function () {
				$scope.formList.splice($scope.formList.indexOf({id: id}), 1);
			}, function(data){
				$scope.$emit('alertEvent', data);
			});
		};
	});