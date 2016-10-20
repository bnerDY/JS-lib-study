angular.module('confusionApp', ['ngRoute'])
.config(function($routeProvider){
	$routeProvider
		// route for the contact us page
		.when('/contactus', {
			templateUrl: 'contactus.html',
			controller: 'ContactController'
		})

		// route for menu page
		.when('/menu', {
			templateUrl: 'menu.html',
			controller: 'MenuController'
		})

		// route for dish detail page
		.when('/menu/:id', {
			templateUrl: 'dishdetail.html',
			controller: 'DishDetailController'
		})

		.otherwise('/contactus');
})
;


