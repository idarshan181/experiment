(function () {
    'use strict';
    angular.module('experiment')
        .constant('experimentConfig', {
            pageName: 'library',
            target: 'body',
            templates: {
                circle: 'directives/circle/circle.html',
            },
        });
});