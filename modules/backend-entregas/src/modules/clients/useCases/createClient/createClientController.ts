import { Request, Response } from "express";

import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      username,
      password,
    } = request.body;

    const createClientUseCase = new CreateClientUseCase();

    const newClient = await createClientUseCase.execute({
      username,
      password,
    });

    return response.json(newClient);
  }
}
