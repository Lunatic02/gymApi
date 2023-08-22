import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { inMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

describe('Create Gym Use Case', () => {
  it('should be able to create a gym', async () => {
    const gymsRepository = new inMemoryGymsRepository()
    const registerUseCase = new CreateGymUseCase(gymsRepository)

    const { gym } = await registerUseCase.execute({
      title: 'Sesc',
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude:-49.4889672
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})