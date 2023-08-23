import { Prisma, checkIn } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn>
  finByUserIdOnDate(userId: string, date: Date): Promise<checkIn | null>
  countByUserId(userId: string): Promise<number>
  findManyByUserId(userId: string, page: number): Promise<checkIn[]>
  findById(id: string) : Promise<checkIn | null>
  save(checkIn: checkIn): Promise<checkIn>
}