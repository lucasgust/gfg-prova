/*global $*/
'use strict';

angular.module('provaClientApp')
	.controller('EditCtrl', function ($scope, $http, $routeParams, templateService) {

	$scope.fieldList = [];
	$scope.fieldNew = {};
	$scope.newFieldFlag = false;
	$scope.form = {};

	document.querySelectorAll('.btn-success')[0].style.display = 'none';

	templateService.get({templateId: $routeParams.templateEdit}, function(form) {
		$scope.form = form;
		$scope.fieldList = $scope.form.fields;
	}, function(){
		$scope.$emit('alertEvent', {status: 500, messages: [{message: 'alguma coisa 1'}, {message: 'alguma coisa 2'}, {message: 'alguma coisa 3'}]});
	});

	var createForm = function () {
		templateService.update({templateId: $routeParams.templateEdit}, $scope.form, function () {
		}, function(){
			$scope.$emit('alertEvent', {status: 400, messages: [{message: 'alguma coisa 1'}, {message: 'alguma coisa 2'}, {message: 'alguma coisa 3'}]});
		});
	};

	var fieldError = function (field) {
		var error = 0;

		error += field.type === undefined || field.type === '' ? 1 : 0;
		error += field.label === undefined || field.label === '' ? 1 : 0;

		if (error === 0) {
			return false;
		}

		return true;
	};

	var toString = function (arrayRadios) {
		var radios = '';
		arrayRadios.forEach(function (data) {
			radios += data.label + ':' + data.value + ',';
		});
		return radios.substring(0, radios.lastIndexOf(','));
	};

	var toArray = function (input) {
		var arrayRadios = [];
		var radios = input.split(',');

		radios.forEach(function (data) {
			var radio = data.split(':');

			arrayRadios.push({label: radio[0], value: radio[1]});
		});

		return arrayRadios;
	};

	$scope.changeRadio = function (field) {
		field.radios = toArray(field.radiosView);
	};

	$scope.addField = function () {
		if (fieldError($scope.fieldNew)) {
			return false;
		}

		$scope.fieldList.push($scope.fieldNew);

		$scope.fieldNew = {};

		$('#addField').modal('hide');
	};

	$scope.editField = function (field) {
		if (field.radios) {
			field.radiosView = toString(field.radios);
		}
		$scope.fieldNew = field;
		$scope.newFieldFlag = false;
	};

	$scope.removeField = function (form) {
		function removeItem (element) {
			return element.label !== form.label;
		}
		$scope.fieldList = $scope.fieldList.filter(removeItem);
	};

	$scope.upAlert = function () {
		console.log('yahoo');
	};

	$scope.createForm = createForm;

});