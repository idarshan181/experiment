(function () {
    'use strict';

    angular.module('experiment')
        .directive('circle', circle);

    experiment.$inject = ['$injector', 'experimentConfig', 'experiment'];

    function circle($injector, experimentConfig, experiment) {
        return {
            templateUrl: function () {
                return toastrConfig.templates.circle;
            },
            controller: 'CircleController',
            link: circleLinkFunction
        };

        function circleLinkFunction(scope, element,attr,circleCtrl) {
            console.log(scope);
            console.log(element);
            console.log(attr);
            console.log(circleCtrl);
        }
    }
})