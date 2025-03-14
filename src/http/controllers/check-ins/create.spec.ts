import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        name: 'JavaScript Gym',
        latitude: -8.055198,
        longitude: -34.8961962,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -8.055198,
        longitude: -34.8961962,
      })

    expect(response.statusCode).toEqual(201)
  })
})
