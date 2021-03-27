(function () {
    'use strict';

    angular.module('experiment', [])
        .factory('experiment',experiment);
    
        experiment.$inject = ['experimentConfig'];
        function experiment(experiment) {

            function printMsg(){
                console.log("Sample Message from Package");
            }

        }
});