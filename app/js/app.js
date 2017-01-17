'use strict';

var housingApp = angular.module('housingApp', []);

housingApp.controller('HousingFormController', ['$scope',
  function HousingFormController($scope) {

    $scope.houseType = function() {
      if ($('.house:checkbox').is(':checked')) {
        return 'house';
      } else if ($('.condo:checkbox').is(':checked')) {
        return 'condo';
      } else {
        return undefined;
      }
    };

    $scope.priceType = function() {
      if ($('.income:checkbox').is(':checked')) {
        return 'income';
      } else if ($('.savings:checkbox').is(':checked')) {
        return 'savings';
      } else {
        return undefined;
      }
    };
}]);
