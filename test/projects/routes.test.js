'use strict';

const request = require('supertest');
const database = require('../../src/database');
const app = require('../../src/app');
let projects;

beforeAll(async () => {
    await database.connect();
});

beforeEach(async () => {
    projects = database.connection().collection('projects');
    await projects.remove({});
});

test('#POST create a new project', () => {
    return request(app.callback())
        .post('/projects')
        .send({
            name: 'foo project',
            description: 'bar description',
        })
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
            expect(res.body).toHaveProperty('name', 'foo project');
            expect(res.body).toHaveProperty('description', 'bar description');
            expect(res.body.timestamp).toHaveProperty('createdAt');
            expect(res.body.timestamp).toHaveProperty('updatedAt');
        });
});

test('#GET list all projects', () => {
    return projects.insertMany([{
            name: 'foo 2',
            description: 'bar',
        },
        {
            name: 'foo 1',
            description: 'bar',
        },
    ]).then((result) => {
        return request(app.callback())
            .get('/projects')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.type).toBe('application/json');
                expect(res.body).toHaveLength(2);
                expect(res.body[0]).toHaveProperty('name', 'foo 1');
                expect(res.body[1]).toHaveProperty('name', 'foo 2');
            });
    });
});

test('#PUT update project', () => {
    return projects.insertOne({
            name: 'foo',
            description: 'bar',
        })
        .then((result) => result.ops[0])
        .then((result) => {
            return request(app.callback())
                .put(`/projects/${result._id}`)
                .send({
                    name: 'bar',
                    description: 'foo',
                    timestamp: {
                        createAt: result.createdAt,
                        updateAt: result.updatedAt,
                    },
                })
                .then((res) => {
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty('name', 'bar');
                    expect(res.body).toHaveProperty('description', 'foo');
                    expect(res.body.timestamp).toHaveProperty('createdAt');
                    expect(res.body.timestamp).toHaveProperty('updatedAt');
                });
        });
});

test('#GET get a only project', () => {
    return projects.insertOne({
            name: 'foo',
            description: 'bar',
            timestamp: {
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        })
        .then((result) => result.ops[0])
        .then((result) => {
            return request(app.callback())
                .get('/projects/' + result._id)
                .then((res) => {
                    expect(res.status).toBe(200);
                    expect(res.type).toBe('application/json');
                    expect(res.body).toHaveProperty('name', 'foo');
                    expect(res.body).toHaveProperty('description', 'bar');
                    expect(res.body.timestamp).toHaveProperty('createdAt');
                    expect(res.body.timestamp).toHaveProperty('updatedAt');
                });
        });
});

test('#GET get project should return project not found', () => {
    return request(app.callback())
                .get('/projects/' + 123453123451)
                .then((res) => {
                    expect(res.status).toBe(404);
                    expect(res.body)
                        .toHaveProperty('message', 'Project not found');
                    expect(res.body)
                        .toHaveProperty('error',
                         'Project with 123453123451 was not found');
                });
});

test('#PUT update project should return not found', () => {
    return projects.insertOne({
            name: 'foo',
            description: 'bar',
        })
        .then((result) => result.ops[0])
        .then((result) => {
            return request(app.callback())
                .put(`/projects/${123453123451}`)
                .send({
                    name: 'bar',
                    description: 'foo',
                    timestamp: {
                        createAt: result.createdAt,
                        updateAt: result.updatedAt,
                    },
                })
                .then((res) => {
                    expect(res.status).toBe(404);
                    expect(res.body)
                        .toHaveProperty('message', 'Project not found');
                    expect(res.body)
                        .toHaveProperty('error',
                         'Project with 123453123451 was not found');
                });
        });
});

afterAll(() => {
    database.close();
});
