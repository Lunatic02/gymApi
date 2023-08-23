import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: inMemoryGymsRepository; // Change the type to match the imported type
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);

  })

  it('should be able to search for gyms', async () => {

    await gymsRepository.create({
      title: 'melburn',
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude:-49.4889672
    })
    await gymsRepository.create({
      title: 'sesc',
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude:-49.4889672
    })

    const { gyms } = await sut.execute({
     query: 'melburn',
     page: 1
    });

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'melburn'}),
    ])
  });
  it('should be able to fetch paginated gyms search', async () => {

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `sesc ${i}`,
        description: null,
        phone: null,
        latitude: -27.0747279,
        longitude:-49.4889672
      })
    }


    const { gyms } = await sut.execute({
      query: 'sesc',
      page: 2
    });

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'sesc 21' }),
      expect.objectContaining({ title: 'sesc 22' })
    ])
  });
})