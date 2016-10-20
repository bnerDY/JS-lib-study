var app = angular.module('myApp',[]);
app.controller('MenuController',['$scope','MyFactory',function(a,b) {
	b.setName("lung tung");
	a.name = b.getName();

}]);

app.controller('MenuController', function($scope, MyFactory){
	MyFactory.setName("random");
	$scope.name = MyFactory.getName();
});

app.factory("MyFactory", function() {
	var people = {};
	var _name = "";

	people.setName = function(name) {
		_name = name;
	};

	people.getName = function() {
		return _name;
	};

	return people;
})
;
