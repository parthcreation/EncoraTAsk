// tests/postRoutes.test.js
const request = require('supertest');
const express = require('express');
const postRoutes = require('../src/routes/postRoutes');

const app = express();
app.use(express.json());
app.use('/api/posts', postRoutes);

describe('GET /api/posts', () => {
  it('should return paginated posts with default page and limit', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('posts');
    expect(Array.isArray(res.body.posts)).toBe(true);
  });

  it('should return correct number of posts when limit is specified', async () => {
    const res = await request(app).get('/api/posts?limit=5');
    expect(res.statusCode).toBe(200);
    expect(res.body.posts.length).toBeLessThanOrEqual(5);
  });
});
