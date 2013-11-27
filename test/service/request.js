'use strict';

describe('Service: Request', function () {

    var request;

    var CLIENT = 'yanfen@example.com',
        SERVER = 'dan@example.com',
        GEBO = 'https://somegebo.com';

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

    beforeEach(module('gebo-client-performatives'));

    beforeEach(inject(function(Request, $injector) {
        request = Request;
    }));

    it('should do something', function() {
        expect(!!request).toBe(true);
    });

    describe('Client', function() {
        describe('request', function() {
            it('should return a properly formatted \'request action\' message', function() {
                var message = request.request(CLIENT, SERVER, 'friend', GEBO);
                expect(message.sender).toEqual(CLIENT);
                expect(message.receiver).toEqual(SERVER);
                expect(message.performative).toEqual('request');
                expect(message.action).toEqual('friend');
                expect(message.gebo).toEqual(GEBO);
            });
        }); 
    
        describe('cancel', function() {
            it('should return a \'cancel request|action\' message', function() {
                var message = request.cancel(PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT);
                expect(message.sender).toEqual(CLIENT);
                expect(message.receiver).toEqual(SERVER);
                expect(message.performative).toEqual('cancel request');
                expect(message.action).toEqual('friend');
            });
        });

        describe('notUnderstood', function() {
            it('should return a \'not-understood propose discharge|perform|action\' message', function() {
                var message = request.notUnderstood(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT);
                expect(message.sender).toEqual(CLIENT);
                expect(message.receiver).toEqual(SERVER);
                expect(message.performative).toEqual('not-understood propose|discharge|perform');
                expect(message.action).toEqual('friend');
            });
        });

        describe('refuse', function() {
            it('should return a \'refuse propose discharge|perform|action\' message', function() {
                var message = request.refuse(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT);
                expect(message.sender).toEqual(CLIENT);
                expect(message.receiver).toEqual(SERVER);
                expect(message.performative).toEqual('refuse propose|discharge|perform');
                expect(message.action).toEqual('friend');
            });
        });

        describe('timeout', function() {
            it('should return a \'timeout propose discharge|perform|action\' message', function() {
                var message = request.timeout(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT);
                expect(message.sender).toEqual(CLIENT);
                expect(message.receiver).toEqual(SERVER);
                expect(message.performative).toEqual('timeout propose|discharge|perform');
                expect(message.action).toEqual('friend');
            });
        });

        describe('agree', function() {
            it('should return a \'agree propose|discharge|perform|action\' message', function() {
                var message = request.agree(REPLY_PROPOSE_DISCHARGE_PERFORM_ACTION, CLIENT);
                expect(message.sender).toEqual(CLIENT);
                expect(message.receiver).toEqual(SERVER);
                expect(message.performative).toEqual('agree propose|discharge|perform');
                expect(message.action).toEqual('friend');
            });
        });
    });

    describe('Server', function() {
        describe('notUnderstood', function() {
            it('should return a properly formatted \'not-understood request|action\' message', function() {
                var message = request.notUnderstood(REPLY_REQUEST_ACTION, SERVER);
                expect(message.sender).toEqual(SERVER);
                expect(message.receiver).toEqual(CLIENT);
                expect(message.performative).toEqual('not-understood request');
                expect(message.action).toEqual('friend');
            });
        }); 
    
        describe('refuse', function() {
            it('should return a \'refuse request|action\' message', function() {
                var message = request.refuse(REPLY_REQUEST_ACTION, SERVER);
                expect(message.sender).toEqual(SERVER);
                expect(message.receiver).toEqual(CLIENT);
                expect(message.performative).toEqual('refuse request');
                expect(message.action).toEqual('friend');
            });
        });

        // When 'reply request|action' times out
        describe('timeout', function() {
            it('should return a \'timeout request|action\' message', function() {
                var message = request.timeout(REPLY_REQUEST_ACTION, SERVER);
                expect(message.sender).toEqual(SERVER);
                expect(message.receiver).toEqual(CLIENT);
                expect(message.performative).toEqual('timeout request');
                expect(message.action).toEqual('friend');
            });
        });

        describe('agree', function() {
            it('should return a \'agree request|action\' message', function() {
                var message = request.agree(REPLY_REQUEST_ACTION, SERVER);
                expect(message.sender).toEqual(SERVER);
                expect(message.receiver).toEqual(CLIENT);
                expect(message.performative).toEqual('agree request');
                expect(message.action).toEqual('friend');
            });
        });

        describe('failure', function() {
            it('should return a  \'failure perform|action\' message', function() {
                var message = request.failure(PERFORM_ACTION, SERVER);
                expect(message.sender).toEqual(SERVER);
                expect(message.receiver).toEqual(CLIENT);
                expect(message.performative).toEqual('failure perform');
                expect(message.action).toEqual('friend');
            });
        });

        // When 'perform action' times out
        describe('timeout', function() {
            it('should return a \'timeout perform|action\' message', function() {
                var message = request.timeout(PERFORM_ACTION, SERVER);
                expect(message.sender).toEqual(SERVER);
                expect(message.receiver).toEqual(CLIENT);
                expect(message.performative).toEqual('timeout perform');
                expect(message.action).toEqual('friend');
            });
        });

        describe('proposeDischarge', function() {
            it('should return a \'propose discharge|perform|action\' message', function() {
                // This may require the PERFORM_ACTION SC instead...
                var message = request.proposeDischarge(PROPOSE_DISCHARGE_PERFORM_ACTION, SERVER);
                expect(message.sender).toEqual(SERVER);
                expect(message.receiver).toEqual(CLIENT);
                expect(message.performative).toEqual('propose discharge|perform');
                expect(message.action).toEqual('friend');
            });
        });
    });

});
