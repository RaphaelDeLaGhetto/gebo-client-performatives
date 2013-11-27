'use strict';

describe('Service: Request', function () {

    var request;

    beforeEach(module('gebo-client-performatives'));

    beforeEach(inject(function(Request, $injector) {
        request = Request;
    }));

    it('should do something', function() {
        expect(!!request).toBe(true);
    });

});
