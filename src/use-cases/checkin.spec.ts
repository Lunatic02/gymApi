import { compare } from 'bcryptjs'
import { expect, describe, it, vi } from 'vitest'
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
  it('should not be able to check In twice in the same day', async () => {
    const checkInsRepository = new inMemoryCheckInsRepository()
    const checkInUseCase = new CheckInUseCase(checkInsRepository)

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })


    await expect(checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check In twice but in different days', async () => {
    const checkInsRepository = new inMemoryCheckInsRepository()
    const checkInUseCase = new CheckInUseCase(checkInsRepository)

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))


    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })
    expect(checkIn.id).toEqual(expect.any(String))

  })
})