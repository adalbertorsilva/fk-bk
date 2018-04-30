'use strict';

class BaseUrl {
    constructor(protocol, baseUrl) {
        this.baseUrl = `${protocol}://${baseUrl}/`;
    }
}

module.exports = BaseUrl;
