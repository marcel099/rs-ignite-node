import { Request, Response } from "express";

import { FindAllClientDeliveriesUseCase } from "./FindAllClientDeliveriesUseCase";

export class FindAllClientDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_client } = request;

    const findAllClientDeliveriesUseCase = new FindAllClientDeliveriesUseCase();

    const deliveries = await findAllClientDeliveriesUseCase.execute(id_client);

    return response.json(deliveries);
  }
}