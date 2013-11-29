'use strict';

/**
 * Test pattern inspired by: daniellmb
 *
 * 2013-11-29
 * https://github.com/daniellmb/angular-test-patterns/blob/master/patterns/directive.md#render-the-expected-output-
 */

describe('Directive: conversationControl', function () {

    var CLIENT = 'yanfen@example.com',
        SERVER = 'dan@example.com';

    /**
     * Social commitments
     */
    var REPLY_REQUEST_ACTION = {
            performative: 'reply request',
            action: 'friend',
            message: { content: 'some data' },
            creditor: CLIENT,
            debtor: SERVER, 
            created: Date.now(),
            fulfilled: null,
        },
        PROPOSE_DISCHARGE_PERFORM_ACTION = {
            performative: 'propose discharge|perform',
            action: 'friend',
            message: { content: 'some data' },
            creditor: CLIENT,
            debtor: SERVER, 
            created: Date.now(),
            fulfilled: null,
        },
        PERFORM_ACTION = {
            performative: 'perform',
            action: 'friend',
            message: { content: 'some data' },
            creditor: CLIENT,
            debtor: SERVER, 
            created: Date.now(),
            fulfilled: null,
        },
        REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION = {
            performative: 'reply propose|discharge|perform',
            action: 'friend',
            message: { content: 'some data' },
            creditor: SERVER,
            debtor: CLIENT, 
            created: Date.now(),
            fulfilled: null,
        };

    var element,
        scope,
        compile,
        templateCache,
        request;

    function _createDirective(sc, email, template) {
        var elm;

        // Setup scope state
        scope.sc = sc;
        scope.email = email;

        // Create directive
        elm = compile(template)(scope);

        // Trigger watchers
        scope.$apply();

        // Return
        return elm;
    }

    beforeEach(module('gebo-client-performatives.conversationControl'));

    beforeEach(function() {

        inject(function($rootScope, $compile, $templateCache, Request) {
            scope = $rootScope.$new();
            compile = $compile;
            templateCache = $templateCache;
            request = Request;
        });
    });


    it('should render the expected server-reply-request output', function() {
        element = _createDirective(REPLY_REQUEST_ACTION, SERVER,
                '<conversation-control sc="{{sc}}" email="{{email}}"></conversation-control>');  
        expect(element.html()).toEqual(templateCache.get('templates/server-reply-request.html'));
    });

    it('should render the expected client-reply-request output', function() {
        element = _createDirective(REPLY_REQUEST_ACTION, CLIENT,
                '<conversation-control sc="{{sc}}" email="{{email}}"></conversation-control>');  
        expect(element.html()).toEqual(templateCache.get('templates/client-reply-request.html'));
    });

    it('should render the expected server-propose-discharge-perform output', function() {
        element = _createDirective(PROPOSE_DISCHARGE_PERFORM_ACTION, SERVER,
                '<conversation-control sc="{{sc}}" email="{{email}}"></conversation-control>');  
        expect(element.html()).toEqual(templateCache.get('templates/server-propose-discharge-perform.html'));
    });

    it('should render the expected client-propose-discharge-perform output', function() {
        element = _createDirective(PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT,
                '<conversation-control sc="{{sc}}" email="{{email}}"></conversation-control>');  
        expect(element.html()).toEqual(templateCache.get('templates/client-propose-discharge-perform.html'));
    });

    it('should render the expected server-perform output', function() {
        element = _createDirective(PERFORM_ACTION, SERVER,
                '<conversation-control sc="{{sc}}" email="{{email}}"></conversation-control>');  
        expect(element.html()).toEqual(templateCache.get('templates/server-perform.html'));
    });

    it('should render the expected server-reply-propose-discharge-perform output', function() {
        element = _createDirective(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, SERVER,
                '<conversation-control sc="{{sc}}" email="{{email}}"></conversation-control>');  
        expect(element.html()).toEqual(templateCache.get('templates/server-reply-propose-discharge-perform.html'));
    });

    it('should render the expected client-reply-propose-discharge-perform output', function() {
        element = _createDirective(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT,
                '<conversation-control sc="{{sc}}" email="{{email}}"></conversation-control>');  
        expect(element.html()).toEqual(templateCache.get('templates/client-reply-propose-discharge-perform.html'));
    });

});


