import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByRefreshToken(refresh_token: string): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
}
