(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.textToDisplay = "";
  $scope.userText = "";


  $scope.checkFood = function () {

  	var nbfood = 0;
	if ($scope.userText.length > 0){
  		var tmp = $scope.userText.split(",");
  		for (var i = 0; i < tmp.length; i++) {
  			if (tmp[i].replace(/\s/g, '').length >0) {
  				nbfood++;
  			}
  		}
  		
  	}

    if (nbfood === 0){
    	$scope.textToDisplay = "Please enter data first";
    	$scope.colors_current = {'color': "black",'border-color' : 'red','border-style': 'solid'};
    }
    else if (nbfood <= 3){
    	$scope.textToDisplay = "Enjoy!";
    	$scope.colors_current = {'color': "green",'border-color' : 'green','border-style': 'solid'};
    }
    else{
    	$scope.textToDisplay = "Too much!";
    	$scope.colors_current = {'color': "red", 'border-color' : 'green','border-style': 'solid'};
    }
  };

}

})();