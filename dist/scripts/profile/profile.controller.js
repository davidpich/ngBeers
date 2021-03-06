;(function (){

	'use strict';

	angular.module('Beers')

	.controller('ProfileController', ['$scope', 'UserFactory', 'BeerFactory', 
		function ($scope, UserFactory, BeerFactory){

			//Display Your Email
			var user = UserFactory.user();
			if(user){
				$scope.userProfile = user.username;
			}

			// Display Your Beers
			BeerFactory.fetch().success( function (data){
				var a = data.results;
				var b = a.filter( function (beer){
					if(beer.user.username === user.username){
						return beer
					}
				});
				$scope.beerCol = b;
			});

			// Delete Your Beers
			$scope.dltThis = function (id){
				BeerFactory.dltBeer(id)
					.success( function (){
						for (var i = 0; i < $scope.beerCol.length; i++){
							if ($scope.beerCol[i].objectId === id){
								$scope.beerCol.splice(i, 1);
								return;
							}
						}
					});
			}

		}

	]);

}());