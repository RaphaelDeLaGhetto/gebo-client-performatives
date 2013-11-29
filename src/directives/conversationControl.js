;(function() {
'use strict';                  

angular.module('gebo-client-performatives.conversationControl',
        ['templates/server-reply-request.html', 'templates/client-reply-request.html']).
    directive('conversationControl', function ($templateCache) {

    function _link(scope, element, attributes) {
        console.log('_link');        
        console.log(attributes);        
        console.log(element);

        attributes.$observe('type', function(newValue) {
            console.log('newValue');
            console.log(newValue);
//            scope.type = newValue;
            element.html($templateCache.get('templates/' + attributes.type + '.html'));
        });
      };

    return {
            restrict: 'E',
            link: _link,
         };
      });
  }());

