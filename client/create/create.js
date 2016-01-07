angular.module('create', [])

.controller('createCtrl', ['$scope', 'Meals', function($scope, Meals) {

  //Pull ingredients and restrictions from Meals factory
    $scope.ingredients = Meals.ingredients
    $scope.restrictions = Meals.restrictions

    $scope.data = {}


  //Add meal via POST request from Meals factory
    $scope.addMeal = function(meal) {
     
  /*This is a bit confusing. We're importing userData into the final data object
  From here, we do a POST request and add to DB
  */
      $scope.userInput = angular.copy(meal)
      $scope.data.creator = $scope.userInput.creator
      $scope.data.description = $scope.userInput.description
      $scope.data.quantity = $scope.userInput.quantity
      console.log($scope.data)
      Meals.storeMeal($scope.data).then(function(d) {
        return d;
      })
    }

  //These button functions are activated when the user chooses from dropdown
    $scope.addProtein= function(ingredient, meal) {
      console.log('addProt')
      $scope.data.protein = ingredient.name
    }

     $scope.addRestrict= function(diet, meal) {
      console.log('restrict')
      $scope.data.diet = diet
    }
}])