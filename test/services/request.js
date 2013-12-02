'use strict';

describe('Service: Request', function () {

    var request;

    var CLIENT = 'yanfen@example.com',
        SERVER = 'dan@example.com',
        GEBO = 'https://somegebo.com';

    /**
     * Conversation
     */
    var REQUEST_CONVERSATION = {
            conversationId: CLIENT + ':' + Date.now(), 
        };

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

    /**
     * The Request callback that delivers
     * the new message to the sender
     */
    var _message;
    var _callback = function(message) {
        _message = message;
      }

    beforeEach(module('gebo-client-performatives.request'));

    beforeEach(inject(function(Request, $injector) {
        request = Request;

        // Set callback
        request.setCallback(_callback);
        _message = {};
    }));

    it('should do something', function() {
        expect(!!request).toBe(true);
    });

    it('should have set a callback function', function() {
        request.callback({ some: 'message' });
        expect(_message.some).toEqual('message');
    });

    describe('Client', function() {
        describe('request', function() {
            it('should return a properly formatted \'request action\' message', function() {
                request.request(CLIENT, SERVER, 'friend', GEBO);
                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('request');
                expect(_message.action).toEqual('friend');
                expect(_message.gebo).toEqual(GEBO);
                expect(_message.conversationId).toBe(undefined);
            });
        }); 
    
        describe('cancel', function() {
            it('should return a \'cancel request|action\' message', function() {
                request.cancel(PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('cancel request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });

        describe('notUnderstood', function() {
            it('should return a \'not-understood propose|discharge|perform|action\' message', function() {
                request.notUnderstood(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('not-understood propose|discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });

        describe('refuse', function() {
            it('should return a \'refuse propose discharge|perform|action\' message', function() {
                request.refuse(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('refuse propose|discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });

        describe('timeout', function() {
            it('should return a \'timeout propose discharge|perform|action\' message', function() {
                request.timeout(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('timeout propose|discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });

        describe('agree', function() {
            it('should return a \'agree propose|discharge|perform|action\' message', function() {
                request.agree(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(CLIENT);
                expect(_message.receiver).toEqual(SERVER);
                expect(_message.performative).toEqual('agree propose|discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });
    });

    describe('Server', function() {
        describe('notUnderstood', function() {
            it('should return a properly formatted \'not-understood request|action\' message', function() {
                request.notUnderstood(REPLY_REQUEST_ACTION, SERVER, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('not-understood request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        }); 
    
        describe('refuse', function() {
            it('should return a \'refuse request|action\' message', function() {
                request.refuse(REPLY_REQUEST_ACTION, SERVER, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('refuse request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });

        // When 'reply request|action' times out
        describe('timeout', function() {
            it('should return a \'timeout request|action\' message', function() {
                request.timeout(REPLY_REQUEST_ACTION, SERVER, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('timeout request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });

        describe('agree', function() {
            it('should return a \'agree request|action\' message', function() {
                request.agree(REPLY_REQUEST_ACTION, SERVER, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('agree request');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });

        describe('failure', function() {
            it('should return a  \'failure perform|action\' message', function() {
                request.failure(PERFORM_ACTION, SERVER, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('failure perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });

        // When 'perform action' times out
        describe('timeout', function() {
            it('should return a \'timeout perform|action\' message', function() {
                request.timeout(PERFORM_ACTION, SERVER, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('timeout perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });

        describe('proposeDischarge', function() {
            it('should return a \'propose discharge|perform|action\' message', function() {
                // This may require the PERFORM_ACTION SC instead...
                request.proposeDischarge(PROPOSE_DISCHARGE_PERFORM_ACTION, SERVER, REQUEST_CONVERSATION.conversationId);
                expect(_message.sender).toEqual(SERVER);
                expect(_message.receiver).toEqual(CLIENT);
                expect(_message.performative).toEqual('propose discharge|perform');
                expect(_message.action).toEqual('friend');
                expect(_message.conversationId).toBe(REQUEST_CONVERSATION.conversationId);
            });
        });
    });

    /**
     * This will likely fall victim to reorganization
     */
    describe('Utils', function() {

        describe('getDirectiveName', function() {
            it('should return client-reply-request', function() {
                var name = request.getDirectiveName(REPLY_REQUEST_ACTION, CLIENT);
                expect(name).toEqual('client-reply-request');
            });

            it('should return server-reply-request', function() {
                var name = request.getDirectiveName(REPLY_REQUEST_ACTION, SERVER);
                expect(name).toEqual('server-reply-request');
            });

            it('should return client-propose-discharge-perform', function() {
                var name = request.getDirectiveName(PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT);
                expect(name).toEqual('client-propose-discharge-perform');
            });

            it('should return server-propose-discharge-perform', function() {
                var name = request.getDirectiveName(PROPOSE_DISCHARGE_PERFORM_ACTION, SERVER);
                expect(name).toEqual('server-propose-discharge-perform');
            });

            it('should return server-perform', function() {
                var name = request.getDirectiveName(PERFORM_ACTION, SERVER);
                expect(name).toEqual('server-perform');
            });

            it('should return client-reply-propose-discharge-perform', function() {
                var name = request.getDirectiveName(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT);
                expect(name).toEqual('client-reply-propose-discharge-perform');
            });

            it('should return server-reply-propose-discharge-perform', function() {
                var name = request.getDirectiveName(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, SERVER);
                expect(name).toEqual('server-reply-propose-discharge-perform');
            });
        });
    });
});

