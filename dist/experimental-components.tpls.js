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
(function() {
    'use strict';
  
    angular.module('experiment')
      .controller('CircleController', CircleController);
  
    function CircleController() {
      this.radius = null;
    }
  }());
  
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
