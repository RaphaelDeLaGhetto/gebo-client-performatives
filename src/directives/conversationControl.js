;(function() {
'use strict';                  

angular.module('gebo-client-performatives').
    directive('conversationControl', function () {
        return {
            restrict: 'E',
            scope: {
                type: '=',
            },
            template: '<ng-include src="\'templates/\' + type + \'.html\'"></ng-include>',
         };
      });
  }());

