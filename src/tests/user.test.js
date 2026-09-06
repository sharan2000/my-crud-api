const request = require('supertest');
const app = require('../../server');
const sequelize = require('../config/database');
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');

// Set the environment variable for testing
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  // Reset the database before running tests
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close the database connection after tests finish
  await sequelize.close();
});

describe('User API Endpoints', () => {
  let createdUserId;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('Jane Doe');
    
    createdUserId = res.body.id; // Save ID for later tests
  });

  it('should not allow duplicate emails', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Jane Clone',
        email: 'jane@example.com'
      });

    expect(res.statusCode).toEqual(400);
  });

  it('should fetch all users', async () => {
    const res = await request(app).get('/api/users');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
  });

  it('should fetch a single user by ID', async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toEqual('jane@example.com');
  });
});