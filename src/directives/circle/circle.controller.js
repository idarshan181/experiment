(function() {
    'use strict';
  
    angular.module('experiment')
      .controller('CircleController', CircleController);
  
    function CircleController() {
      this.radius = null;
    }
  }());
  