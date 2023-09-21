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

describe('Testing a 404 Error', () => {
    test('Does it return a 404 Error on a bad path?', async () => {
        let response = await request.get('/someBogusPath');

        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual("PAGE NOT FOUND.");  
    })
    test('Does it return a 404 Error on a bad method?', async () => {
        let response = await request.put('/api/player');

        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual("PAGE NOT FOUND.");  
    })
})

describe('Testing REST Router for Player Info', () => {

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