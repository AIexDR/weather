alert('myApp loaded');
var myApp = angular.module('myApp',[]);

myApp.controller('myCtrl', ['$scope', 'myService', function($scope, myService) {
  $scope.data = {
    options: myService.cities
   };
  $scope.data.selectedCity = $scope.data.options[0];
  $scope.$watch('data.selectedCity', function(newValue, oldValue) {
	console.log(newValue);
	myService.getWeather($scope.data.selectedCity.name).then(function success(response){
       // here you will get your server data
	   $scope.data.weather = response.data;
    }, function error(){});
	
	});
}]);

myApp.factory('myService', ['$http', function($http){
	var weather;
	function getWeather(city) {
		return $http({
		  method: 'GET',
		  url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=0080ca53505217d4af2030329364a3aa'
		});
	}
	return {
		get cities() {
			return [
				{"_id":520555,"name":"Nizhniy Novgorod","country":"RU","coord":{"lon":44.002048,"lat":56.328674}},
				{"_id":5128638,"name":"New York","country":"US","coord":{"lon":-75.499901,"lat":43.000351}},
				{"_id":707860,"name":"Hurzuf","country":"UA","coord":{"lon":34.283333,"lat":44.549999}},
				{"_id":519188,"name":"Novinki","country":"RU","coord":{"lon":37.666668,"lat":55.683334}},
				{"_id":1283378,"name":"Gorkha","country":"NP","coord":{"lon":84.633331,"lat":28}},
				{"_id":1270260,"name":"State of Haryana","country":"IN","coord":{"lon":76,"lat":29}},
				{"_id":708546,"name":"Holubynka","country":"UA","coord":{"lon":33.900002,"lat":44.599998}},
				{"_id":1283710,"name":"Bagmati Zone","country":"NP","coord":{"lon":85.416664,"lat":28}},
				{"_id":529334,"name":"Mar’ina Roshcha","country":"RU","coord":{"lon":37.611111,"lat":55.796391}},
				{"_id":1269750,"name":"Republic of India","country":"IN","coord":{"lon":77,"lat":20}},
				{"_id":1283240,"name":"Kathmandu","country":"NP","coord":{"lon":85.316666,"lat":27.716667}},
				{"_id":703363,"name":"Laspi","country":"UA","coord":{"lon":33.733334,"lat":44.416668}}
			];
		},
		getWeather: getWeather
	}
}])