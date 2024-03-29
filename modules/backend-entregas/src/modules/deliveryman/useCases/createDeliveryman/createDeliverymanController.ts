import { Request, Response } from "express";

import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";

export class CreateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      username,
      password,
    } = request.body;

    const createDeliverymanUseCase = new CreateDeliverymanUseCase();

    const newDeliveryman = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json(newDeliveryman);
  }
}
