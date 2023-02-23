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


describe('ACL Integration', () => {


  it('it allows a user to sign up', async () => {
    let response = await request.post('/signup').send({
      username: 'test',
      password: 'pass123',
      role: 'admin',
    });

    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('test');
  });


  it('it allows a user to sign in', async () => {
    let response = await request.post('/signin').auth('test', 'pass123');

    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('test');
  });


});
