'use strict';

const supertest = require('supertest');
const server = require('../lib/server');
const { sequelize } = require('../lib/models');
const request = supertest(server.app);

// setup db for test suite
beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.drop();
});

describe('Testing REST Router', () => {

    test('Should READ players', async () => {
        let response = await request.get('/api/player');

        expect(response.status).toEqual(200);
        expect(response.body.results).toBeTruthy();
    });

    test('Should CREATE player', async () => {
        let response = await request.post('/api/player').send({
            name: 'Joe Johnson',
            state: 'WA'
        })

        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Joe Johnson');
    });

    test('Should UPDATE player', async () => {
        let response = (await request.patch('/api/player')).send({
            name: 'Joseph Johnson'
        });

        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Joseph Johnson');
    });

    test('Should DELETE player', async () => {
        let response = await request.delete('/api/player/1');

        expect(response.status).toEqual(204);
    })
})