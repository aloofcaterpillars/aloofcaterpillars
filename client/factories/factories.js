angular.module('factories', [])

.factory('Meals', function($http) {
  
  var ingredients = [
      { ingredient: 'meat', name: 'Chicken' },
      { ingredient: 'meat', name: 'Beef' },
      { ingredient: 'meat', name: 'Pork' },
      { ingredient: 'meat', name: 'Bacon' },
      { ingredient: 'veg', name: 'Eggs' },
      { ingredient: 'veg', name: 'Beans' },
      { ingredient: 'veg', name: 'Tofu' },
      { ingredient: 'veg', name: 'Grass' }
    ];

  var restrictions = [
    'Vegetarian', 'Paleo',  'Gluten-Free', 'Low-Carb'
  ]



  var storeMeal = function(meal) {
    return $http({
      method: 'POST',
      url: '/api/create',
      data: meal
    })
    .then(function(resp) {
      return resp.data
    })
  }

  return {
    storeMeal: storeMeal,
    ingredients: ingredients,
    restrictions: restrictions
  }
})