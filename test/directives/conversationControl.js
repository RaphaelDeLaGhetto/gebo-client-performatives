'use strict';

/**
 * Test pattern inspired by: daniellmb
 *
 * 2013-11-29
 * https://github.com/daniellmb/angular-test-patterns/blob/master/patterns/directive.md#render-the-expected-output-
 */

describe('Directive: conversationControl', function () {


    var element, scope, compile, defaultType, templateCache,
        validTemplate = '<conversation-control type="server-reply-request"></conversation-control>';

    function _createDirective(type, template) {
        var element;

        // Setup scope state
        scope.type = type || defaultType;

        // Create directive
        element = compile(template || validTemplate)(scope);

        // Trigger watchers
        scope.$apply();

        // Return
        return element;
    }

    beforeEach(module('gebo-client-performatives.conversationControl'));

    beforeEach(function() {
        defaultType = 'server-reply-request';

        inject(function($rootScope, $compile, $templateCache) {
            scope = $rootScope.$new();
            compile = $compile;
            templateCache = $templateCache;
        });
    });


    it('should render the expected server-reply-request output', function() {
        element = _createDirective('server-reply-request', '<conversation-control type="{{type}}"></conversation-control>');  
        console.log('element');
        console.log(element.html());
        expect(element.html()).toEqual(templateCache.get('templates/server-reply-request.html'));
    });

    it('should render the expected client-reply-request output', function() {
        element = _createDirective('client-reply-request', '<conversation-control type="{{type}}"></conversation-control>');  
        console.log('element');
        console.log(element.html());
        expect(element.html()).toEqual(templateCache.get('templates/client-reply-request.html'));
    });


});


