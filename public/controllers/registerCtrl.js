var registerCtrl = function($scope,$http){
    $scope.sortType     = 'full_name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    $scope.serachText = 'կոմիտաս'    
    function successCallback(response){        
        $scope.registry = response.data
        $scope.loading = false
    }
    function errorCallback(error){
        console.log(error)
        $scope.loading = false
        alert(error)
    }
    $scope.searchPerson = function(){
        var srchText = $scope.serachText
        $scope.loading = true
        $http.post('/registry',{'searchText':srchText}).then(successCallback,errorCallback)
    }    
    $scope.serachByAdress=function(address){
        $scope.loading = true
        $http.post('/registry/searchByAdress',{'address':address}).then(successCallback,errorCallback)
    }
}

