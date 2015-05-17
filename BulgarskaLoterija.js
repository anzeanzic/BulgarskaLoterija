angular.module('BulgarianLottery', []);
angular.module('BulgarianLottery').controller('PromiseController', function($scope, $q) {
	var alreadyDrawnNumbers = [];

	$scope.startDrawingNumbers = function() {
		$scope.status = "Drawing first number ...";
		DrawANumber().then(function(success) {
			$scope.drawnNumber1 = success.number;
			$scope.drawingTime1 = (success.drawingTime/1000).toFixed(2)+" s";
			$scope.status = "Drawing second number ...";
			DrawANumber().then(function(success) {
				$scope.drawnNumber2 = success.number;
				$scope.drawingTime2 = (success.drawingTime/1000).toFixed(2)+" s";
				$scope.status = "Drawing third number ...";
				DrawANumber().then(function(success) {
					$scope.drawnNumber3 = success.number;
					$scope.drawingTime3 = (success.drawingTime/1000).toFixed(2)+" s";	
					$scope.status = "Finished";
				}, function(error) {});
			}, function(error) {})
		}, function(error) {

		});
	}

	function DrawANumber() {
		var defer = $q.defer();	

		var number = Math.ceil((Math.random() * 100) + 1);
		if (alreadyDrawnNumbers.indexOf(number)) { 
			var drawTimeout = ((Math.random() * 3) + 2)*1000;
			setTimeout(function() {
				alreadyDrawnNumbers.push(number);
				defer.resolve({ number: number, drawingTime: drawTimeout });
			}, drawTimeout);
		}
		else {
			DrawANumber();
		}

		return defer.promise;
	};

	/*function CheckIfNumberWasAlreadyDrawn(number) {
		if (alreadyDrawnNumbers.length > 0) {
			for (var i = 0; i < alreadyDrawnNumbers.length; i++) {

			}
		}
	}*/



});

/*
DN
Sproti pokaži rezultat loterije


chain promise
*/
