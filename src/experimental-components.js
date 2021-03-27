(function () {
    'use strict';

    angular.module('experiment', [])
        .factory('experiment',experiment);
    
        experiment.$inject = ['experimentConfig'];
        function experiment() {

            console.log(experimentConfig);

        }
});