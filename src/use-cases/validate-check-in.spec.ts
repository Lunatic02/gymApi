import { inMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'
import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: inMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)
  })

  afterEach(() => {
    // Limpar recursos, se necessário
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toBeInstanceOf(Date)
    expect(checkInsRepository.items[0].validated_at).toBeInstanceOf(Date)
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
