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

describe('Testing a 500 Error', () => {
    test('Does it return a 500 Error on an incomplete request?', async () => {
        let response = await request.post('/api/player').send({ name: 'SOME GUY' });
        expect(response.status).toEqual(500);
        expect(response.body.message).toEqual("state must not be null.");
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
        let response = await request.patch('/api/player/1').send({
            name: 'Jermaine Johanssen'
        });

        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Jermaine Johanssen');
    });

    test('Should DELETE player', async () => {
        let response = await request.delete('/api/player/1');

        expect(response.status).toEqual(204);
    })
})

describe('Testing REST Router for Player Classes', () => {

    test('Should READ player classes', async () => {
        let response = await request.get('/api/playerclass');

        expect(response.status).toEqual(200);
        expect(response.body.results).toBeTruthy();
    });

    test('Should CREATE player class', async () => {
        let response = await request.post('/api/playerclass').send({
            name: 'Bard',
            level: 22
        })

        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Bard');
    });

    test('Should UPDATE player class', async () => {
        let response = await request.patch('/api/playerclass/1').send({
            name: 'Ninja'
        });

        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Ninja');
    });

    test('Should DELETE player class', async () => {
        let response = await request.delete('/api/playerclass/1');

        expect(response.status).toEqual(204);
    })
})