var housingApp = angular.module('housingApp', []);

housingApp.controller('HousingFormController', ['$scope',
  function HousingFormController($scope) {
    $scope.houseType = $('.house:checkbox');
}]);
