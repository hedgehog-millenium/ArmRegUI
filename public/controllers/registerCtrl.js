var registerCtrl = function ($scope, $http) {
    $scope.sortType = ''; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchText = 'կոմիտաս'
    $scope.searchTypes = [
        { value: 'full_name', name: 'Full Name' },
        // {value:'first_name',name:'First Name'},
        // {value:'last_name',name:'Last Name'},
        { value: 'birth', name: 'Birth Date' },
        { value: 'address', name: 'Address' }
    ]
    $scope.searchType = $scope.searchTypes[0]

    $scope.changeSearch = function (idx) {
        $scope.searchType = $scope.searchTypes[idx]
    }
    function successCallback(response) {
        $scope.registry = response.data.registries
        $scope.searchedText = response.data.searchText
        $scope.error = null
        $scope.loading = false
    }
    function errorCallback(error) {
        $scope.error = error
        console.warn(error);
        $scope.loading = false
    }
    function clearLastSearch() {
        $scope.searchedText = null
        $scope.filterText = ''
    }
    $scope.searchPerson = function () {
        clearLastSearch()
        var srchText = $scope.searchText

        if (typeof (srchText) != 'undefined' && srchText.length > 2) {
            $scope.loading = true
            if ($scope.searchType.value == 'full_name')
                $http.post('/registry', { 'searchText': srchText }).then(successCallback, errorCallback)
            else
                $http.post('/registry/SearchByFieldValue', { 'field': $scope.searchType.value, 'searchText': srchText }).then(successCallback, errorCallback)
        } else {
            alert('Search Text Length Should be more than 2 characters')
        }
    }
    $scope.searchByAddress = function (address) {
        clearLastSearch()
        $scope.loading = true
        $http.post('/registry/searchByAddress', { 'address': address }).then(successCallback, errorCallback)
        // $http.post('/registry/SearchByFieldValue',{'field':'address','searchText':address}).then(successCallback,errorCallback)
    }
}

