
		const app = angular.module("myBookmarkApp", []);

		app.controller("myCtrlReg", function ($scope, $http) {
			$scope.regError = "";
			$scope.addUser = () => {
				let regDetails = {
					name: $scope.username,
					pass: $scope.password
				}
				console.log(regDetails)
				$http({
					url: '/user/add',
					method: "POST",
					data: regDetails
        		})
				.then((data)=>{
					console.log(data);
					$scope.loginError = "Account created successfully";
					window.location.href = '/';
				}, (err) => {
					console.log(err);
					$scope.loginError = err;
				});
			}
		});
			<style>

input.ng-valid {
    background-color:silver;
}
input.ng-invalid.ng-dirty{border:1px solid red;}
</style>