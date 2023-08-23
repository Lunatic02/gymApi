import { Prisma, checkIn } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn>
  finByUserIdOnDate(userId: string, date: Date): Promise<checkIn | null>
  findManyByUserId(userId: string, page: number): Promise<checkIn[]>
}