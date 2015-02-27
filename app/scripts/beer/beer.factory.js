(function (){

	angular.module('Beers')

	.factory('BeerFactory', ['$http', 'PARSE', '$rootScope', '$location',
		function ($http, PARSE, $rootScope, $location) {

			//Fetch Beers
			var getAllBeers = function (){
				return $http.get(PARSE.URL + 'classes/beers', PARSE.CONFIG)
			};

			var addBeer = function (data){
				$http.post(PARSE.URL + 'classes/beers', data, PARSE.CONFIG)
					.success( function (){
						$rootScope.$broadcast('beer:added');
					}
				);
			};

			var deleteBeer = function (){
				$http.delete(PARSE.URL + 'classes/beers/' + event.target.attributes.class.value, PARSE.CONFIG);
				$(event.target).parent().remove();
			};

			var addImage = function (){
				filepicker.pickAndStore({}, {}, function (pic){
					$rootScope.$broadcast('beer:imageUploaded', pic[0]);
				});
			};

			return {
				fetch: getAllBeers,
				post: addBeer,
				attImg: addImage,
				dltBeer: deleteBeer
			}


		}
	]);

}());