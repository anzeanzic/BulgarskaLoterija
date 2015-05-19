angular.module('BulgarianLottery', []);
angular.module('BulgarianLottery').controller('PromiseController', function($scope, $q) {
	$scope.loading = false;
	var alreadyDrawnNumbers = [];

	$scope.startDrawingNumbers = function() {
		$scope.status = "Drawing first number ...";
		$scope.loading = true;
		// initialize
		$scope.drawnNumber1 = '';
		$scope.drawnNumber2 = '';
		$scope.drawnNumber3 = '';
		$scope.drawingTime1 = '';
		$scope.drawingTime2 = ''; 
		$scope.drawingTime3 = '';

		// first drawing
		DrawANumber().then(function(success) {
			$scope.drawnNumber1 = success.number;
			$scope.drawingTime1 = (success.drawingTime/1000).toFixed(2)+" s";
			$scope.status = "Drawing second number ...";

			// second drawing
			DrawANumber().then(function(success) {
				$scope.drawnNumber2 = success.number;
				$scope.drawingTime2 = (success.drawingTime/1000).toFixed(2)+" s";
				$scope.status = "Drawing third number ...";

				// third drawing
				DrawANumber().then(function(success) {
					$scope.drawnNumber3 = success.number;
					$scope.drawingTime3 = (success.drawingTime/1000).toFixed(2)+" s";	
					$scope.status = "Drawing finished!";
					$scope.loading = false;
				}, function(error) {
					$scope.loading = false;
					$scope.status = error;
				});
			}, function(error) {
				$scope.loading = false;
				$scope.status = error;
			})
		}, function(error) {
			$scope.loading = false;
			$scope.status = error;
		});
	}

	function DrawANumber() {
		var defer = $q.defer();	
		var number = Math.floor((Math.random() * 100) + 1);
		var drawnNumberIndex = alreadyDrawnNumbers.indexOf(number);
		
		if (drawnNumberIndex === -1) { 
			var drawTimeout = Math.floor(((Math.random() * 3) + 2)*1000);
			setTimeout(function() {
				alreadyDrawnNumbers.push(number);
				defer.resolve({ number: number, drawingTime: drawTimeout });
			}, drawTimeout);
		}
		else if (drawnNumberIndex > -1) {
			DrawANumber();
		}
		else {
			defer.reject('Drawing the number failed. Please restart the drawing!');
		}

		return defer.promise;
	};
});