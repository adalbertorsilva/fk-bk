'use strict';

const request = require('supertest');
const app = require('../src/app');

test('hello world works', () => {
    request(app.callback())
        .get('/')
        .end((err, res) => {
            expect(err).toBeNull();
            expect(res.text).toBe('Hello World');
        });
});
