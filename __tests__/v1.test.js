'use strict';

const { server } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});


describe('v1 Test', () => {


  it('Creates a record', async () => {
    let response = await request.post('/api/v1/food').send({
      name: 'tacos',
      calories: 100,
      type: 'protein',

    });

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('tacos');
  });

  it('Gets all records', async () => {
    let response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Gets a record', async () => {
    let response = await request.get('/api/v1/food/1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tacos');
  });

  it('Deletes a record', async () => {
    let response = await request.delete('/api/v1/food/1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });


});
