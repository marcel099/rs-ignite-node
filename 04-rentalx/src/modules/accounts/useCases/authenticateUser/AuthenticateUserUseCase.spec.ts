import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryUserTokensRepository } from "@modules/accounts/repositories/in-memory/InMemoryUserTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserTokensRepository: InMemoryUserTokensRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

const user: ICreateUserDTO = {
  name: "User Test",
  email: "user@test.com",
  password: "1234",
  driver_license: "000123",
};

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserTokensRepository = new InMemoryUserTokensRepository();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUserTokensRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a session token", async () => {
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
