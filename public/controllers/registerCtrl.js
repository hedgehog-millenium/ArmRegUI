var registerCtrl = function($scope,$http){
    $scope.sortType     = ''; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    $scope.serachText = 'կոմիտաս'    
    function successCallback(response){        
        $scope.registry = response.data        
        $scope.loading = false
    }
    function errorCallback(error){
        console.log(error)
        $scope.loading = false
        alert('Status Code: ' + error.status +', statusText: '+error.statusText)
    }
    $scope.searchPerson = function(){
        var srchText = $scope.serachText

        if(typeof(srchText) != 'undefined' && srchText.length>3){
            $scope.loading = true
            $http.post('/registry',{'searchText':srchText}).then(successCallback,errorCallback)            
        }else{
            alert('Search Text Length Shold be more than 3 characters')            
        }
    }    
    $scope.serachByAdress=function(address){
        $scope.loading = true
        $http.post('/registry/searchByAdress',{'address':address}).then(successCallback,errorCallback)
    }
}

