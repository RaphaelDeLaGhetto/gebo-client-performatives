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

    var CONVERSATION_ID = CLIENT + ':' + Date.now();

    var element,
        scope,
        compile,
        templateCache,
        request;

    /**
     * This function sets scope variables and
     * compiles the directive passed to it
     *
     * The element returned is to be compared to the
     * element generated by _compileTemplate
     *
     * @param Object
     * @param string
     * @param string
     *
     * @return Object
     */
    function _createDirective(sc, email, template) {
        var elm;

        // Setup scope state
        scope.sc = sc;
        scope.email = email;
        scope.conversationId = CONVERSATION_ID;

        // Create directive
        elm = compile(template)(scope);

        // Trigger watchers
        scope.$apply();

        // Return
        return elm;
    }

    /**
     * This function compiles the template at
     * the path provided
     *
     * @param string
     *
     * @return string
     */
    function _compileTemplate(path) {
        var template = templateCache.get(path);
    
        if (!template) {
          return '';
        }

        template = compile(template)(scope);

        var blank = angular.element('<div></div>');
        angular.element(blank).append(template);
    
        return blank.html();
    }

    /**
     * The Request callback that delivers
     * the new message to the sender
     */
    var _message;
    var _callback = function(message) {
        _message = message;
      }

    beforeEach(module('gebo-client-performatives.conversationControl'));

    beforeEach(function() {

        inject(function($rootScope, $compile, $templateCache, Request) {
            scope = $rootScope.$new();
            compile = $compile;
            templateCache = $templateCache;
            request = Request;
        });

        request.setCallback(_callback);
        _message = {};
    });

    it('should have set a callback function', function() {
        request.callback({ some: 'message' });
        expect(_message.some).toEqual('message');
    });

    it('should render the expected server-reply-request output', function() {
        element = _createDirective(REPLY_REQUEST_ACTION, SERVER,
                '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' + 
                '</conversation-control>');  
        expect(element.html()).toEqual(_compileTemplate('templates/server-reply-request.html'));
    });

    it('should render the expected client-reply-request output', function() {
        element = _createDirective(REPLY_REQUEST_ACTION, CLIENT,
                '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                '</conversation-control>');  
        expect(element.html()).toEqual(_compileTemplate('templates/client-reply-request.html'));
    });

    it('should render the expected server-propose-discharge-perform output', function() {
        element = _createDirective(PROPOSE_DISCHARGE_PERFORM_ACTION, SERVER,
                '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                '</conversation-control>');  
        expect(element.html()).toEqual(_compileTemplate('templates/server-propose-discharge-perform.html'));
    });

    it('should render the expected client-propose-discharge-perform output', function() {
        element = _createDirective(PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT,
                '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +
                '</conversation-control>');  
        expect(element.html()).toEqual(_compileTemplate('templates/client-propose-discharge-perform.html'));
    });

    it('should render the expected server-perform output', function() {
        element = _createDirective(PERFORM_ACTION, SERVER,
                '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +
                '</conversation-control>');  
        expect(element.html()).toEqual(_compileTemplate('templates/server-perform.html'));
    });

    it('should render the expected server-reply-propose-discharge-perform output', function() {
        element = _createDirective(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, SERVER,
                '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                '</conversation-control>');  
        expect(element.html()).toEqual(_compileTemplate('templates/server-reply-propose-discharge-perform.html'));
    });

    it('should render the expected client-reply-propose-discharge-perform output', function() {
        element = _createDirective(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT,
                '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                '</conversation-control>');  
        expect(element.html()).toEqual(_compileTemplate('templates/client-reply-propose-discharge-perform.html'));
    });

    describe('Server', function() {

        /**
         * not-understood
         */
        describe('not-understood', function() {
            it('should execute callback with \'not-understood request|action\' message parameter', function() {
                element = _createDirective(REPLY_REQUEST_ACTION, SERVER,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.notUnderstood();

                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('not-understood request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });

        /**
         * refuse 
         */
        describe('refuse', function() {
            it('should execute callback with \'refuse request|action\' message parameter', function() {
                element = _createDirective(REPLY_REQUEST_ACTION, SERVER,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.refuse();

                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('refuse request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });

        /**
         * timeout 
         */
        describe('timeout', function() {
            it('should execute callback with \'timeout request|action\' message parameter', function() {
                element = _createDirective(REPLY_REQUEST_ACTION, SERVER,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.timeout();

                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('timeout request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });

        /**
         * agree
         */
        describe('agree', function() {
            it('should execute callback with \'agree request|action\' message parameter', function() {
                element = _createDirective(REPLY_REQUEST_ACTION, SERVER,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.agree();

                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('agree request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });

        /**
         * failure
         */
        describe('failure', function() {
            it('should execute callback with \'failure perform\' message parameter', function() {
                element = _createDirective(PERFORM_ACTION, SERVER,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.failure();

                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('failure perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });

        /**
         * proposeDischarge
         */
        describe('proposeDischarge', function() {
            it('should execute callback with \'propose discharge|perform\' message parameter', function() {
                element = _createDirective(PROPOSE_DISCHARGE_PERFORM_ACTION, SERVER,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.proposeDischarge();

                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('propose discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });
    });

    describe('Client', function() {

        /**
         * cancel
         */
        describe('cancel', function() {
            it('should execute callback with \'cancel request\' message parameter', function() {
                element = _createDirective(PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.cancel();

                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('cancel request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });

        /**
         * notUnderstood
         */
        describe('notUnderstood', function() {
            it('should execute callback with \'not-understood propose|discharge|perform\' message parameter', function() {
                element = _createDirective(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.notUnderstood();

                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('not-understood propose|discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });

        /**
         * refuse
         */
        describe('refuse', function() {
            it('should execute callback with \'not-understood propose|discharge|perform\' message parameter', function() {
                element = _createDirective(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.refuse();

                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('refuse propose|discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });

        /**
         * timeout
         */
        describe('timeout', function() {
            it('should execute callback with \'timeout propose|discharge|perform\' message parameter', function() {
                element = _createDirective(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.timeout();

                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('timeout propose|discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });

        /**
         * agree
         */
        describe('agree', function() {
            it('should execute callback with \'timeout propose|discharge|perform\' message parameter', function() {
                element = _createDirective(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT,
                    '<conversation-control sc="{{sc}}" email="{{email}}" conversation-id="{{conversationId}}">' +  
                    '</conversation-control>');  
                var isolateScope = element.scope();
                isolateScope.agree();

                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('agree propose|discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toEqual(CONVERSATION_ID);
            });
        });


        /**
         * request
         */
//        describe('request', function() {
//            it('should execute callback with \'agree request|action\' message parameter', function() {
//                element = _createDirective(REPLY_REQUEST_ACTION, SERVER,
//                    '<conversation-control sc="{{sc}}" email="{{email}}"> conversation-id="{{conversationId}}">' +  
//                    '</conversation-control>');  
//                var isolateScope = element.scope();
//                isolateScope.agree();
//            });
//        });
    });
});


