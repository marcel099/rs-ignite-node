import { Delivery } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";

interface IUpdateEndDate {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateEndDate): Promise<void> {
    const delivery = await prisma.delivery.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
      data: {
        ended_at: new Date(),
      }
    });

    // return result;
  }
}