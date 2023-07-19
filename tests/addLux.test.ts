import supertest from 'supertest'
import mongoose from 'mongoose';
import { app, server } from '../src/main'

const api = supertest(app)

test('all lux', async () => {
  const response = await api.get('/api/lux').expect(200);
  expect(Array.isArray(response.body)).toBe(true);
});

test('added lux ', async () => {
  const requestBody = {
    "message": "TEST",
    "date": "2023-07-16T04:42:23.578Z"
  }

  await api
    .post('/api/luxear')
    .send(requestBody)
    .expect(200)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})