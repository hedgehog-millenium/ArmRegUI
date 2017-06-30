var registerCtrl = function($scope,$http){
    $scope.sortType     = ''; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchText = 'կոմիտաս'    
    $scope.sereachTypes = [            
            {value:'full_name',name:'Full Name'},
            // {value:'first_name',name:'First Name'},
            // {value:'last_name',name:'Last Name'},
            {value:'birth',name:'Birth Date'},            
            {value:'address',name:'Address'}
        ]
    $scope.sereachType = $scope.sereachTypes[0]

    $scope.changeSerach = function(idx){
        $scope.sereachType =  $scope.sereachTypes[idx]
    }
    function successCallback(response){                
        $scope.registry = response.data.registries        
        $scope.searchText = response.data.searchText
        $scope.error = null
        $scope.loading = false
    }
    function errorCallback(error){        
        $scope.error =  error        
        console.warn(error);
        $scope.loading = false
    }
    $scope.searchPerson = function(){        
        var srchText = $scope.searchText        

        if(typeof(srchText) != 'undefined' && srchText.length>2){
            $scope.loading = true
            if($scope.sereachType.value =='full_name')
                $http.post('/registry',{'searchText':srchText}).then(successCallback,errorCallback)            
            else
                $http.post('/registry/SearchByFieldValue',{'field':$scope.sereachType.value,'searchText':srchText}).then(successCallback,errorCallback)            
        }else{
            alert('Search Text Length Shold be more than 2 characters')            
        }
    }    
    $scope.serachByAdress=function(address){
        $scope.loading = true
        $http.post('/registry/searchByAdress',{'address':address}).then(successCallback,errorCallback)
    }
}

