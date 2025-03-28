const request = require('supertest');
const express = require('express');
const postRoutes = require('../src/routes/postRoutes');
const axios = require('axios');

jest.mock('axios'); // mock axios requests

const app = express();
app.use(express.json());
app.use('/api/posts', postRoutes);

const mockPosts = [
  { id: 1, title: 'Hello world' },
  { id: 2, title: 'Test title' },
  { id: 3, title: 'another Post' },
  { id: 4, title: 'HELLO Nutan' },
];

describe('GET /api/posts', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockPosts });
  });

  it('should return paginated posts with default page and limit', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('total', mockPosts.length);
    expect(Array.isArray(res.body.posts)).toBe(true);
  });

  it('should return correct number of posts when limit is specified', async () => {
    const res = await request(app).get('/api/posts?limit=2');
    expect(res.statusCode).toBe(200);
    expect(res.body.posts.length).toBe(2);
  });

  it('should return correct page of results', async () => {
    const res = await request(app).get('/api/posts?page=2&limit=2');
    expect(res.statusCode).toBe(200);
    expect(res.body.posts[0].id).toBe(3);
  });

  it('should filter posts by title (case insensitive)', async () => {
    const res = await request(app).get('/api/posts?title=hello');
    expect(res.statusCode).toBe(200);
    expect(res.body.posts.length).toBe(2);
  });

  it('should return one result if only one matches title', async () => {
    const res = await request(app).get('/api/posts?title=test');
    expect(res.statusCode).toBe(200);
    expect(res.body.posts.length).toBe(1);
    expect(res.body.posts[0].title).toMatch(/test/i);
  });

  it('should return empty array if no posts match title', async () => {
    const res = await request(app).get('/api/posts?title=xyznotfound');
    expect(res.statusCode).toBe(200);
    expect(res.body.posts.length).toBe(0);
    expect(res.body.total).toBe(0);
  });

  it('should handle errors from axios gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Axios failed'));
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to fetch posts');
  });
});
