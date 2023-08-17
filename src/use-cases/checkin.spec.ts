import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { inMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'

describe('Check In Use Case', () => {
  it('should be able to check In', async () => {
    const checkInsRepository = new inMemoryCheckInsRepository()
    const checkInUseCase = new CheckInUseCase(checkInsRepository)

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

})