import { Prisma, User, checkIn } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class inMemoryCheckInsRepository implements CheckInsRepository {
  public items: checkIn[] = []

  async create(data: Prisma.checkInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null, 
      created_at: new Date()
    }

    this.items.push(checkIn)
    return checkIn
  }


}